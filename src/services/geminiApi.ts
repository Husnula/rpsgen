const GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models";

const MODEL_CHAIN = [
  "gemini-2.5-flash",
  "gemini-2.5-flash-lite",
  "gemini-2.0-flash",
  "gemini-1.5-flash"
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


const StateManager = {
  getStickyState: (userId: string) => {
    try {
      const stored = localStorage.getItem(`gemini_sticky_${userId}`);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn("Error reading state", e);
    }
    return null;
  },
  setStickyState: (userId: string, keyIdx: number, modelIdx: number) => {
    try {
      const today = new Date().toISOString().slice(0, 10);
      localStorage.setItem(`gemini_sticky_${userId}`, JSON.stringify({ keyIdx, modelIdx, date: today }));
    } catch (e) {
      console.warn("Error saving state", e);
    }
  }
};

export const callGeminiWithFallback = async (prompt: string, apiKeys: string[], userId: string = "default", config: any = {}) => {
  const validKeys = apiKeys.filter(k => k.trim() !== "");
  if (validKeys.length === 0) throw new Error("Minimal 1 API Key dibutuhkan di Pengaturan.");

  const today = new Date().toISOString().slice(0, 10);
  let startKeyIdx = 0, startModelIdx = 0;

  const sticky = StateManager.getStickyState(userId);
  if (sticky && sticky.date === today) {
    startKeyIdx = sticky.keyIdx || 0;
    startModelIdx = sticky.modelIdx || 0;
  }

  const attempts: string[] = [];
  const generationConfig: any = config.generationConfig || { temperature: 0.7, maxOutputTokens: 16384 };
  if (config.schema) {
    generationConfig.responseMimeType = "application/json";
    generationConfig.responseSchema = config.schema;
  }

  const bodyPayload = JSON.stringify({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig,
  });

  for (let ki = 0; ki < validKeys.length; ki++) {
    const keyIdx = (startKeyIdx + ki) % validKeys.length;
    const apiKey = validKeys[keyIdx];
    const keyTag = `key#${keyIdx + 1}(${apiKey.slice(-4)})`;
    let keyInvalid = false;

    for (let mi = 0; mi < MODEL_CHAIN.length; mi++) {
      const modelIdx = (ki === 0) ? (startModelIdx + mi) % MODEL_CHAIN.length : mi;
      const model = MODEL_CHAIN[modelIdx];
      const tag = `${keyTag} × ${model}`;

      let modelSuccess = false;
      let finalData = null;
      let maxRetries = config.maxRetries ?? 2;

      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          const url = `${GEMINI_BASE_URL}/${model}:generateContent?key=${apiKey}`;
          const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: bodyPayload,
          });

          const code = response.status;
          
          if (response.ok) {
            const json = await response.json();
            const text = json.candidates?.[0]?.content?.parts?.[0]?.text || "";
            StateManager.setStickyState(userId, keyIdx, modelIdx);
            
            let parsedData = null;
            if (config.schema) {
              try {
                let cleanText = text.trim();
                if (cleanText.startsWith("```")) {
                  const match = cleanText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
                  if (match) {
                    cleanText = match[1];
                  } else {
                    cleanText = cleanText.replace(/^```(?:json)?\s*/, '').replace(/\s*```$/, '');
                  }
                }
                parsedData = JSON.parse(cleanText);
              } catch (e) {
                const errMsg = "Format respons tidak valid/terpotong";
                attempts.push(`${tag} (att ${attempt}) → exception: ${errMsg}`);
                console.warn(`[Gemini API] ${tag} att ${attempt} exception: ${errMsg}`);
                console.warn(`[Gemini API] Failed text snippet: ${text.substring(0, 200)}...`);
                await delay(300 * attempt);
                continue; // Retry same model
              }

              if (config.validate) {
                const validationError = config.validate(parsedData);
                if (validationError) {
                  attempts.push(`${tag} (att ${attempt}) → validation: ${validationError}`);
                  console.warn(`[Gemini API] ${tag} att ${attempt} validation failed: ${validationError}`);
                  await delay(800 * attempt);
                  continue; // Retry same model
                }
              }

              modelSuccess = true;
              finalData = { data: parsedData, usedKey: keyTag, usedModel: model, attempts };
              break; // Break retry loop
            }

            modelSuccess = true;
            finalData = { data: text.trim(), usedKey: keyTag, usedModel: model, attempts };
            break; // Break retry loop
          }

          const errorText = await response.text();
          attempts.push(`${tag} (att ${attempt}) → ${code}`);
          console.log(`[Gemini API] ${tag} att ${attempt} → ${code}`);

          if (code === 401) {
            keyInvalid = true; 
            break; // Break retry loop, go to next key
          }
          if (code === 403 || code === 429) {
            // 403 Forbidden (model tidak bisa diakses) atau 429 Rate Limit
            // Pindah langsung ke model selanjutnya dalam chain
            break; 
          }
          if ([503, 500].includes(code)) {
            await delay(1000 * attempt); 
            continue; // Retry same model
          }
          if (code === 404) {
            break; // Model tidak ada, langsung pindah ke model berikutnya
          }

          // Other errors, break retry loop and try next model
          break;

        } catch (error: any) {
          attempts.push(`${tag} (att ${attempt}) → exception: ${error.message}`);
          console.warn(`[Gemini API] ${tag} att ${attempt} exception: ${error.message}`);
          await delay(1000 * attempt);
          continue; // Retry same model
        }
      }

      if (modelSuccess && finalData) return finalData;
      if (keyInvalid) break; // Break model loop, try next key
    }
    
    if (keyInvalid) console.log(`[Gemini API] ${keyTag} diabaikan (Invalid Key).`);
  }

  throw new Error("Semua kombinasi Key × Model dan percobaan retry telah habis/gagal.\nRiwayat: \n- " + attempts.join("\n- "));
};
