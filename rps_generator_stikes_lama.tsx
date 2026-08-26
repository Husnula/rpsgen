import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  FileText,
  Wand2,
  Download,
  ChevronRight,
  Loader2,
  AlertCircle,
  User,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Upload // Added Upload icon
} from 'lucide-react';

// ============================================================
// MASTER DATA — INSTITUSIONAL (tidak digenerate AI)
// ============================================================

const lecturers = [
  { id: '1', nama: 'Merry Suzana, Dipl.Rad, S.Si, M.Tr.ID', nidn: '8850753654230102', email: 'merrysuzana@gmail.com' },
  { id: '2', nama: 'Eva Maulidiana Hikmah, AMd.Rad.,STr.Kes., MTr. Kes (ID)', nidn: '0709088902', email: 'eva.hikmah99@gmail.com' },
  { id: '3', nama: 'Taufiqurrahman, S.Tr Kes, M.Tr.ID', nidn: '5845776677130172', email: 'taufiqurrahmen@gmail.com' },
  { id: '4', nama: 'Aprilia Dwi Ardianti, S.Kep, M.KM', nidn: '8757767668230372', email: 'apriliadwiardianti@gmail.com' },
  { id: '5', nama: 'Prapti Indriyani, Dipl.Rad, S.AB, M.Tr.ID', nidn: '6438753654230112', email: 'indrimenik61@gmail.com' },
  { id: '6', nama: 'Mochamad Bayu Andika, S.Si, M.Tr.Id', nidn: '4961766667130282', email: 'andika.ardi@yahoo.com' }
];

const courses = [
  // Semester 1
  { nama: 'PANCASILA', kode: '401012K', sks: 2, sks_teori: 2, sks_praktik: 0, semester: 1 },
  { nama: 'PENDIDIKAN AGAMA', kode: '401022K', sks: 2, sks_teori: 2, sks_praktik: 0, semester: 1 },
  { nama: 'BAHASA INDONESIA', kode: '401032K', sks: 2, sks_teori: 2, sks_praktik: 0, semester: 1 },
  { nama: 'FISIKA RADIASI', kode: '401042K', sks: 2, sks_teori: 1, sks_praktik: 1, semester: 1 },
  { nama: 'ANATOMI FISIOLOGI', kode: '401052K', sks: 2, sks_teori: 1, sks_praktik: 1, semester: 1 },
  { nama: 'MATEMATIKA', kode: '401062K', sks: 2, sks_teori: 2, sks_praktik: 0, semester: 1 },
  { nama: 'TEKNIK RADIOGRAFI 1', kode: '401074K', sks: 4, sks_teori: 2, sks_praktik: 2, semester: 1 },
  { nama: 'RADIOFOTOGRAFI', kode: '401082K', sks: 2, sks_teori: 1, sks_praktik: 1, semester: 1 },
  { nama: 'PENGEMBANGAN KEPRIBADIAN', kode: '401092K', sks: 2, sks_teori: 1, sks_praktik: 1, semester: 1 },

  // Semester 2
  { nama: 'PENDIDIKAN KEWARGANEGARAAN', kode: '402012K', sks: 2, sks_teori: 2, sks_praktik: 0, semester: 2 },
  { nama: 'ANATOMI RADIOLOGI', kode: '402022K', sks: 2, sks_teori: 1, sks_praktik: 1, semester: 2 },
  { nama: 'PATOFISIOLOGI', kode: '402032K', sks: 2, sks_teori: 1, sks_praktik: 1, semester: 2 },
  { nama: 'KEPERAWATAN RADIOLOGI', kode: '402042K', sks: 2, sks_teori: 1, sks_praktik: 1, semester: 2 },
  { nama: 'PROTEKSI RADIASI', kode: '402052K', sks: 2, sks_teori: 1, sks_praktik: 1, semester: 2 },
  { nama: 'TEKNIK RADIOGRAFI 2', kode: '402066K', sks: 6, sks_teori: 2, sks_praktik: 4, semester: 2 },
  { nama: 'ETIKA PROFESI DAN HUKUM PELAYANAN KESEHATAN', kode: '402072K', sks: 2, sks_teori: 1, sks_praktik: 1, semester: 2 },
  { nama: 'KESELAMATAN PASIEN', kode: '402082K', sks: 2, sks_teori: 1, sks_praktik: 1, semester: 2 },

  // Semester 3
  { nama: 'PENDIDIKAN BUDAYA ANTI KORUPSI', kode: '403012K', sks: 2, sks_teori: 1, sks_praktik: 1, semester: 3 },
  { nama: 'BAHASA INGGRIS', kode: '403022K', sks: 2, sks_teori: 1, sks_praktik: 1, semester: 3 },
  { nama: 'KOMPUTER RADIOLOGI', kode: '403032K', sks: 2, sks_teori: 1, sks_praktik: 1, semester: 3 },
  { nama: 'TEKNIK RADIOGRAFI 3', kode: '403044K', sks: 4, sks_teori: 1, sks_praktik: 3, semester: 3 },
  { nama: 'PRAKTIK KERJA LAPANGAN 1', kode: '403054K', sks: 4, sks_teori: 0, sks_praktik: 4, semester: 3 },
  { nama: 'TEKNIK PESAWAT RADIOLOGI PENCITRAAN', kode: '403062K', sks: 3, sks_teori: 1, sks_praktik: 2, semester: 3 },
  { nama: 'TEKNIK USG', kode: '403072K', sks: 2, sks_teori: 1, sks_praktik: 1, semester: 3 },
  { nama: 'TEKNIK RADIOTERAPI DASAR', kode: '403082K', sks: 2, sks_teori: 1, sks_praktik: 1, semester: 3 },

  // Semester 4
  { nama: 'TEKNIK RADIOGRAFI 4', kode: '404012K', sks: 4, sks_teori: 1, sks_praktik: 3, semester: 4 },
  { nama: 'FISIKA RADIODIAGNOSTIK', kode: '404022K', sks: 3, sks_teori: 1, sks_praktik: 2, semester: 4 },
  { nama: 'PRAKTIK KERJA LAPANGAN 2', kode: '404032K', sks: 4, sks_teori: 0, sks_praktik: 4, semester: 4 },
  { nama: 'TEKNIK KEDOKTERAN NUKLIR', kode: '404042K', sks: 2, sks_teori: 1, sks_praktik: 1, semester: 4 },
  { nama: 'JAMINAN DAN KENDALI MUTU RADIOLOGI', kode: '404052K', sks: 2, sks_teori: 1, sks_praktik: 1, semester: 4 },
  { nama: 'KESELAMATAN DAN KESEHATAN KERJA RADIOLOGI', kode: '404062K', sks: 2, sks_teori: 1, sks_praktik: 1, semester: 4 },
  { nama: 'KEWIRAUSAHAAN BIDANG RADIOLOGI', kode: '404072K', sks: 3, sks_teori: 1, sks_praktik: 2, semester: 4 },

  // Semester 5
  { nama: 'TEKNIK RADIOGRAFI 5', kode: '405012K', sks: 2, sks_teori: 1, sks_praktik: 1, semester: 5 },
  { nama: 'PRAKTIK KERJA LAPANGAN 3', kode: '405024K', sks: 4, sks_teori: 0, sks_praktik: 4, semester: 5 },
  { nama: 'TEKNIK CT SCAN 1', kode: '405032K', sks: 2, sks_teori: 1, sks_praktik: 1, semester: 5 },
  { nama: 'EPIDEMIOLOGI KESEHATAN', kode: '405042K', sks: 2, sks_teori: 1, sks_praktik: 1, semester: 5 },
  { nama: 'PENDIDIKAN DAN PROMOSI KESEHATAN', kode: '405052K', sks: 2, sks_teori: 1, sks_praktik: 1, semester: 5 },
  { nama: 'KRITISI DAN EVALUASI RADIOGRAFI', kode: '405062K', sks: 3, sks_teori: 2, sks_praktik: 1, semester: 5 },
  { nama: 'SISTEM PENCATATAN MEDIK RADIOLOGI', kode: '405072K', sks: 3, sks_teori: 2, sks_praktik: 1, semester: 5 },

  // Semester 6
  { nama: 'PRAKTIK KERJA LAPANGAN 4', kode: '406012K', sks: 4, sks_teori: 0, sks_praktik: 4, semester: 6 },
  { nama: 'METODE PENELITIAN', kode: '406022K', sks: 2, sks_teori: 1, sks_praktik: 1, semester: 6 },
  { nama: 'STATISTIKA', kode: '406032K', sks: 2, sks_teori: 1, sks_praktik: 1, semester: 6 },
  { nama: 'FISIKA PENCITRAAN', kode: '406042K', sks: 2, sks_teori: 1, sks_praktik: 1, semester: 6 },
  { nama: 'MANAJEMEN RADIOLOGI', kode: '406052K', sks: 2, sks_teori: 1, sks_praktik: 1, semester: 6 },
  { nama: 'TEKNIK MRI 1', kode: '406062K', sks: 3, sks_teori: 2, sks_praktik: 1, semester: 6 },
  { nama: 'PENGOLAHAN CITRA DIGITAL', kode: '406072K', sks: 3, sks_teori: 1, sks_praktik: 2, semester: 6 },

  // Semester 7
  { nama: 'PRAKTIK KERJA LAPANGAN 5', kode: '407014K', sks: 4, sks_teori: 0, sks_praktik: 4, semester: 7 },
  { nama: 'ANATOMICROSECTIONAL', kode: '407022K', sks: 2, sks_teori: 1, sks_praktik: 1, semester: 7 },
  { nama: 'FARMASETIKA', kode: '407032K', sks: 2, sks_teori: 1, sks_praktik: 1, semester: 7 },
  { nama: 'TEKNIK CT SCAN 2', kode: '407043K', sks: 3, sks_teori: 1, sks_praktik: 2, semester: 7 },
  { nama: 'TEKNIK MRI 2', kode: '407053K', sks: 3, sks_teori: 1, sks_praktik: 2, semester: 7 },
  { nama: 'TEKNIK PENCITRAAN', kode: '407063K', sks: 3, sks_teori: 2, sks_praktik: 1, semester: 7 },

  // Semester 8
  { nama: 'PRAKTIK KERJA LAPANGAN 6', kode: '408016K', sks: 6, sks_teori: 0, sks_praktik: 6, semester: 8 },
  { nama: 'TUGAS AKHIR', kode: '408024K', sks: 4, sks_teori: 0, sks_praktik: 4, semester: 8 },
];

const cplBank = {
  TRS: [
    { kode: 'TRS-1', teks: 'Bertakwa kepada Tuhan Yang Maha Esa, menjunjung tinggi nilai kemanusiaan, etika profesi, dan moral dalam penyelenggaraan pelayanan radiologi pencitraan.' },
    { kode: 'TRS-2', teks: 'Menunjukkan sikap profesional, disiplin, bertanggung jawab, dan mengutamakan keselamatan pasien, keselamatan kerja, serta proteksi radiasi dalam setiap pelayanan radiologi.' },
    { kode: 'TRS-3', teks: 'Menginternalisasi semangat kepemimpinan, kolaborasi, pembelajaran sepanjang hayat, inovasi, dan jiwa entrepreneur di bidang radiologi pencitraan.' },
  ],
  TRP: [
    { kode: 'TRP-4', teks: 'Menguasai konsep ilmiah anatomi, fisiologi, patologi, fisika radiasi, radiobiologi, proteksi radiasi, teknologi radiologi pencitraan, serta perkembangan teknologi digital dalam pelayanan radiologi diagnostik.' },
    { kode: 'TRP-5', teks: 'Menguasai konsep Quality Control (QC), Quality Assurance (QA), optimisasi dosis radiasi, evaluasi kualitas citra, dan Patient Safety sebagai dasar peningkatan mutu pelayanan radiologi.' },
    { kode: 'TRP-6', teks: 'Menguasai prinsip manajemen pelayanan radiologi, regulasi nasional dan internasional, keselamatan kerja, etika profesi, serta evidence-based practice dalam pengambilan keputusan klinis.' },
  ],
  TRKS: [
    { kode: 'TRKS-7', teks: 'Mampu melaksanakan seluruh prosedur pemeriksaan radiologi diagnostik sesuai standar operasional dengan menghasilkan citra diagnostik yang optimal.' },
    { kode: 'TRKS-8', teks: 'Mampu menerapkan program Quality Control, Quality Assurance, optimisasi dosis radiasi, serta evaluasi kualitas citra pada seluruh modalitas radiologi pencitraan untuk menjamin mutu pelayanan.' },
    { kode: 'TRKS-9', teks: 'Mampu menerapkan prinsip Patient Safety, proteksi radiasi, komunikasi efektif, dan manajemen risiko dalam pelayanan radiologi sesuai standar profesi.' },
    { kode: 'TRKS-10', teks: 'Mampu memanfaatkan teknologi digital, PACS, RIS, Artificial Intelligence, dan perkembangan teknologi radiologi dalam meningkatkan mutu pelayanan diagnostik.' },
    { kode: 'TRKS-11', teks: 'Mampu berkomunikasi menggunakan Bahasa Indonesia dan Bahasa Inggris profesional dalam pelayanan, pendidikan, penelitian, dan pengembangan radiologi pencitraan.' },
  ],
  TRKU: [
    { kode: 'TRKU-12', teks: 'Mampu berpikir kritis, logis, sistematis, inovatif, dan berbasis bukti ilmiah dalam menyelesaikan permasalahan radiologi pencitraan.' },
    { kode: 'TRKU-13', teks: 'Mampu bekerja secara mandiri maupun kolaboratif dalam tim interprofesional dengan menjunjung tinggi etika profesi.' },
    { kode: 'TRKU-14', teks: 'Mampu melakukan penelitian terapan, publikasi ilmiah, serta pengabdian kepada masyarakat untuk meningkatkan mutu pelayanan radiologi.' },
    { kode: 'TRKU-15', teks: 'Mampu mengembangkan usaha dan inovasi di bidang teknologi radiologi pencitraan berdasarkan prinsip kewirausahaan.' },
  ],
};
const allCplFlat = [...cplBank.TRS, ...cplBank.TRP, ...cplBank.TRKS, ...cplBank.TRKU];

const metodeLegend = [
  { kode: 'SGD', nama: 'Small Group Discussion' },
  { kode: 'RPS', nama: 'Role-Play & Simulation' },
  { kode: 'DL', nama: 'Discovery Learning' },
  { kode: 'SDL', nama: 'Self-Directed Learning' },
  { kode: 'CoL', nama: 'Cooperative Learning' },
  { kode: 'CbL', nama: 'Collaborative Learning' },
  { kode: 'CtL', nama: 'Contextual Learning' },
  { kode: 'CBL', nama: 'Case Based Learning' },
  { kode: 'PjBL', nama: 'Project Based Learning' },
  { kode: 'PBL', nama: 'Problem Based Learning' },
];

const fetchWithRetry = async (url, options, maxRetries = 5) => {
  const delays = [1000, 2000, 4000, 8000, 16000];
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`API Error: ${response.status}`);
      return await response.json();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, delays[i]));
    }
  }
};

const isExamRow = (row) => String(row.minggu_ke).trim() === '8' || String(row.minggu_ke).trim() === '16';

const normalizeBobot = (matriks) => {
  const parsePct = (s) => {
    const m = String(s ?? '').match(/(\d+(\.\d+)?)/);
    return m ? parseFloat(m[1]) : 0;
  };
  const rows = matriks.map((r) => ({ ...r, _isExam: isExamRow(r), _val: parsePct(r.bobot_nilai) }));
  const examSum = rows.filter((r) => r._isExam).reduce((a, r) => a + r._val, 0);
  const regRows = rows.filter((r) => !r._isExam);
  const regSum = regRows.reduce((a, r) => a + r._val, 0);
  const targetReg = Math.max(100 - examSum, 0);

  if (regRows.length > 0) {
    const scale = regSum > 0 ? targetReg / regSum : 0;
    const raw = regRows.map((r) => r._val * scale);
    const floors = raw.map((v) => Math.floor(v));
    let remainingPoints = Math.round(targetReg) - floors.reduce((a, v) => a + v, 0);
    const order = raw
      .map((v, i) => ({ i, frac: v - floors[i] }))
      .sort((a, b) => b.frac - a.frac);
    const bump = new Array(regRows.length).fill(0);
    for (let k = 0; k < order.length && remainingPoints !== 0; k++) {
      const idx = order[k].i;
      bump[idx] += remainingPoints > 0 ? 1 : -1;
      remainingPoints += remainingPoints > 0 ? -1 : 1;
    }
    regRows.forEach((r, i) => {
      r._newVal = Math.max(floors[i] + bump[i], 0);
    });
  }

  return rows.map((r) => ({
    ...r,
    bobot_nilai: r._isExam ? `${Math.round(r._val)}%` : `${Math.max(r._newVal, 0)}%`,
  }));
};

const GEMINI_MODEL = 'gemini-2.5-flash-preview-09-2025';
const geminiUrl = () => `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=`;

const callGemini = async (prompt, schema) => {
  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: schema
      ? { responseMimeType: 'application/json', responseSchema: schema }
      : undefined,
  };
  const result = await fetchWithRetry(geminiUrl(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!result.candidates || result.candidates.length === 0) {
    throw new Error('Format respons tidak valid atau kosong.');
  }
  const text = result.candidates[0].content.parts[0].text;
  return schema ? JSON.parse(text) : text.trim();
};

export default function App() {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [genPhase, setGenPhase] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [error, setError] = useState(null);
  
  // New state for custom logo
  const [logoBase64, setLogoBase64] = useState(null);

  const [formData, setFormData] = useState({
    dosenId: '',
    koorId: '',
    kaprodiId: '',
    mkName: '',
    mkCode: '',
    sks: '',
    sksTeori: '',
    sksPraktik: '',
    semester: '',
    description: '',
  });

  const [rpsData, setRpsData] = useState(null);

  useEffect(() => {
    if (!window.html2pdf) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCourseChange = (e) => {
    const selectedCourseName = e.target.value;
    const course = courses.find((c) => c.nama === selectedCourseName);
    if (course) {
      setFormData((prev) => ({
        ...prev,
        mkName: course.nama,
        mkCode: course.kode,
        sks: course.sks.toString(),
        sksTeori: course.sks_teori.toString(),
        sksPraktik: course.sks_praktik.toString(),
        semester: course.semester.toString(),
      }));
    } else {
      setFormData((prev) => ({ ...prev, mkName: '', mkCode: '', sks: '', sksTeori: '', sksPraktik: '', semester: '' }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const enhanceDescription = async () => {
    if (!formData.mkName) {
      setError('Pilih mata kuliah terlebih dahulu sebelum menggunakan fitur Enhance AI.');
      return;
    }
    setIsEnhancing(true);
    setError(null);
    try {
      const prompt = `Sebagai pakar akademik, perbaiki deskripsi mata kuliah berikut agar lebih profesional, akademis, dan komprehensif untuk RPS (Rencana Pembelajaran Semester) Program Studi Teknik Radiologi Pencitraan.
Nama MK: ${formData.mkName}
Deskripsi awal: ${formData.description || 'Buatkan deskripsi umum yang relevan dengan mata kuliah ini sesuai standar keilmuan radiologi.'}
Berikan HANYA teks deskripsinya saja dalam 1-2 paragraf, gaya bahasa formal akademik SN-Dikti.`;
      const enhancedText = await callGemini(prompt, null);
      setFormData((prev) => ({ ...prev, description: enhancedText }));
    } catch (err) {
      setError('Gagal melakukan Enhance AI pada deskripsi. Silakan coba lagi.');
    } finally {
      setIsEnhancing(false);
    }
  };

  const generateRPS = async () => {
    setIsGenerating(true);
    setError(null);
    setStep(2);

    const cplList = allCplFlat.map((c) => `${c.kode}: ${c.teks}`).join('\n');
    const visiMisiContext = `
VISI PRODI TEKNOLOGI RADIOLOGI PENCITRAAN:
Menjadikan Teknologi Radiologi Pencitraan Yang Unggul dalam Optimalisasi Teknik Radiologi Imejing Diagnostic Berfokus Pada Quality Control Dan Keselamatan Pasien (Patient Safety) Dipelayanan Kesehatan Serta Berjiwa Entrepreneur Tahun 2030

MISI PRODI TEKNOLOGI RADIOLOGI PENCITRAAN:
1. Menyelenggarakan pendidikan Teknik Radiologi Pencitraan Berfokus Pada Quality Control Dan Keselamatan Pasien (Patient Safety) Dipelayanan Kesehatan;
2. Menghasilkan penelitian yang berbasis Quality Control Dan Keselamatan Pasien (Patient Safety) Dipelayanan Kesehatan;
3. Mengimplementasikan pengabdian kepada masyarakat secara berkesinambungan yang berbasis pada Quality Control Dan Keselamatan Pasien (Patient Safety) Dipelayanan Kesehatan;
4. Terwujudnya jiwa Entrepreneur di bidang radiologi pencitraan.
`;

    try {
      // --- CALL 1: Identitas, CPMK, Bahan Kajian, Pustaka ---
      setGenPhase('Menyusun Capaian Pembelajaran & Bahan Kajian...');
      const schema1 = {
        type: 'OBJECT',
        properties: {
          kode_dokumen: { type: 'STRING', description: 'Format: RPS-TRP-XXX (3 digit angka)' },
          cpmk: {
            type: 'ARRAY',
            description: '4-6 CPMK',
            items: {
              type: 'OBJECT',
              properties: {
                kode: { type: 'STRING', description: 'Contoh: CPMK-1' },
                teks: { type: 'STRING' },
                cpl_terkait: {
                  type: 'ARRAY',
                  description: 'Daftar kode CPL-Prodi yang relevan dari daftar yang diberikan (misal TRS-1, TRP-4)',
                  items: { type: 'STRING' },
                },
              },
              required: ['kode', 'teks', 'cpl_terkait'],
            },
          },
          bahan_kajian: { type: 'ARRAY', items: { type: 'STRING' } },
          pustaka: {
            type: 'OBJECT',
            properties: {
              utama: { type: 'ARRAY', items: { type: 'STRING' } },
              pendukung: { type: 'ARRAY', items: { type: 'STRING' } },
            },
          },
        },
        required: ['kode_dokumen', 'cpmk', 'bahan_kajian', 'pustaka'],
      };
      
      const prompt1 = `Sebagai penyusun RPS SN-Dikti di STIKES Dian Husada Prodi Teknik Radiologi Pencitraan, susun bagian identitas untuk:
MK: ${formData.mkName} (${formData.sks} SKS [T:${formData.sksTeori}, P:${formData.sksPraktik}], Sem ${formData.semester})
Deskripsi: ${formData.description}

Konteks Visi-Misi Prodi (Jadikan landasan penyusunan materi/CPMK agar selaras):
${visiMisiContext}

Daftar CPL-PRODI yang tersedia:
${cplList}

TUGAS:
1. Pilih HANYA CPL-PRODI yang paling relevan dengan mata kuliah ini. Tidak perlu memunculkan semua.
2. Buat 4-6 CPMK. Petakan setiap CPMK ke CPL-PRODI yang relevan (gunakan kode seperti TRS-1, TRP-4).
3. PENTING: Teks untuk setiap CPMK WAJIB diawali persis dengan frasa "Mahasiswa mampu ". (Contoh: "Mahasiswa mampu menjelaskan terminologi...")
4. Hasilkan juga bahan kajian dan pustaka yang sesuai.`;
      
      const data1 = await callGemini(prompt1, schema1);

      // --- CALL 2: Matriks 16 Pertemuan ---
      setGenPhase('Menyusun matriks pembelajaran landscape 16 minggu...');
      const cpmkListText = data1.cpmk.map((c) => `${c.kode}: ${c.teks}`).join('\n');
      const schema2 = {
        type: 'OBJECT',
        properties: {
          matriks_pembelajaran: {
            type: 'ARRAY',
            description: 'Tepat 16 baris (minggu 1-16). Minggu 8 = UTS, Minggu 16 = UAS.',
            items: {
              type: 'OBJECT',
              properties: {
                minggu_ke: { type: 'STRING' },
                cpmk_ref: { type: 'STRING', description: 'Contoh: CPMK-1. Kosong untuk UTS/UAS.' },
                sub_cpmk: { type: 'STRING' },
                indikator: { type: 'STRING' },
                kriteria_bentuk: { type: 'STRING', description: 'Kriteria dan Bentuk Penilaian' },
                metode_luring: { 
                  type: 'OBJECT',
                  properties: {
                    bentuk: { type: 'STRING', description: 'Contoh: Kuliah Luring / Praktikum' },
                    metode: { type: 'STRING', description: 'Contoh: Case Based Learning' },
                    alokasi: { type: 'STRING', description: 'Contoh: TM 2x50; PT 2x60; BM 2x60' }
                  }
                },
                metode_daring: { type: 'STRING', description: 'Kegiatan daring/LMS, misal: Unduh materi di e-learning' },
                materi: { type: 'STRING', description: 'Materi beserta rujukan pustaka singkat' },
                bobot_nilai: { type: 'STRING', description: 'Persentase, misal 5%' },
              },
              required: ['minggu_ke', 'sub_cpmk', 'indikator', 'kriteria_bentuk', 'materi', 'bobot_nilai'],
            },
          },
        },
        required: ['matriks_pembelajaran'],
      };
      
      const prompt2 = `Buat matriks pembelajaran 16 minggu (Mg 8=UTS, Mg 16=UAS) untuk MK ${formData.mkName} dengan beban Teori: ${formData.sksTeori} SKS dan Praktik: ${formData.sksPraktik} SKS.
Gunakan CPMK berikut:
${cpmkListText}

ATURAN SANGAT PENTING (DILARANG MELANGGAR):
1. DILARANG KERAS mengosongkan kolom untuk minggu reguler (Minggu 1-7 dan 9-15).
2. PENERAPAN TAKSONOMI BLOOM BERTINGKAT: Penggunaan Kata Kerja Operasional (KKO) WAJIB bertahap PER TOPIK MATERI. Mahasiswa TIDAK BOLEH dituntut untuk "mendemonstrasikan/mempraktikkan" (Ranah Psikomotorik/C3+) suatu prosedur jika belum ada tahap kognitif untuk "menjelaskan/menguraikan" (Ranah Kognitif/C1-C2) dasar teori anatomi/prosedur tersebut. Anda wajib meletakkan tahap pemahaman teori mendahului tahap praktik, baik dipecah dalam dua minggu berurutan, atau digabungkan dalam indikator di minggu yang sama.
3. ALOKASI WAKTU LURING WAJIB AKURAT: Sesuaikan beban kegiatan dengan nilai SKS. 
   - Jika minggu tersebut berfokus pada Teori, alokasinya wajib ditulis: "TM ${formData.sksTeori}x50; PT ${formData.sksTeori}x60; BM ${formData.sksTeori}x60"
   - Jika minggu tersebut berfokus pada Praktikum, alokasinya wajib ditulis: "Praktik Lab ${formData.sksPraktik}x170"
   - Jika satu minggu memuat keduanya, gabungkan rumusnya.
4. PENTING: Teks untuk setiap sub_cpmk WAJIB diawali persis dengan frasa "Mahasiswa mampu ". (Kecuali baris UTS dan UAS).
5. Pecah informasi Luring menjadi "Bentuk" (misal: Kuliah/Praktikum), "Metode" (misal: Case Based Learning/Demonstrasi), dan "Alokasi" (sesuai aturan nomor 3). Pastikan total bobot nilai keseluruhan = 100%.`;

      const data2raw = await callGemini(prompt2, schema2);
      const data2 = { matriks_pembelajaran: normalizeBobot(data2raw.matriks_pembelajaran) };

      // --- CALL 3: Portofolio, Tugas, dan Rubrik ---
      setGenPhase('Menyusun Portofolio CPL dan Rubrik Evaluasi...');
      const schema3 = {
        type: 'OBJECT',
        properties: {
          portofolio: {
            type: 'ARRAY',
            description: 'Tabel pemetaan evaluasi per minggu untuk CPL',
            items: {
              type: 'OBJECT',
              properties: {
                minggu: { type: 'STRING' },
                cpl_terkait: { type: 'STRING', description: 'Contoh: TRS-1, TRKU-12, TRP-4' },
                cpmk: { type: 'STRING' },
                sub_cpmk: { type: 'STRING', description: 'Kode Sub-CPMK, misal Sub-CPMK1' },
                indikator: { type: 'STRING' },
                bentuk_soal: { type: 'STRING', description: 'Contoh: Tugas-1/Post-test' },
                bobot: { type: 'STRING' }
              },
              required: ['minggu', 'cpl_terkait', 'cpmk', 'sub_cpmk', 'indikator', 'bentuk_soal', 'bobot']
            }
          },
          rencana_tugas: {
            type: 'ARRAY',
            items: {
              type: 'OBJECT',
              properties: {
                judul: { type: 'STRING' },
                sub_cpmk_terkait: { type: 'STRING' },
                deskripsi_tugas: { type: 'STRING' },
                metode_pengerjaan: { type: 'ARRAY', items: { type: 'STRING' } },
                bentuk_luaran: { type: 'STRING' },
                indikator_bobot: {
                  type: 'ARRAY',
                  items: {
                    type: 'OBJECT',
                    properties: { indikator: { type: 'STRING' }, bobot: { type: 'STRING' } }
                  }
                },
                jadwal: { type: 'STRING' },
                waktu_pengerjaan: { type: 'STRING' },
              }
            }
          },
          rubrik_penilaian: {
            type: 'ARRAY',
            items: {
              type: 'OBJECT',
              properties: {
                materi: { type: 'STRING' },
                bobot: { type: 'STRING' },
                kurang_55: { type: 'STRING' },
                skor_55_65: { type: 'STRING' },
                skor_65_75: { type: 'STRING' },
                skor_75_100: { type: 'STRING' },
              }
            }
          },
        }
      };
      
      const prompt3 = `Buatkan Tabel Portofolio Ketercapaian CPL (evaluasi tiap minggu), 2 Rencana Tugas, dan Rubrik Penilaian untuk MK ${formData.mkName}.
Gunakan struktur evaluasi yang berkelanjutan. Pada portofolio, petakan minggu 1-14 (kecuali UTS/UAS) ke CPL, CPMK, indikator tes, dan bobot.`;
      
      const data3 = await callGemini(prompt3, schema3);

      setRpsData({ ...data1, ...data2, ...data3 });
      setStep(3);
    } catch (err) {
      console.error(err);
      setError('Gagal menghasilkan RPS. Silakan coba lagi.');
      setStep(1);
    } finally {
      setIsGenerating(false);
      setGenPhase('');
    }
  };

  const handlePrint = async () => {
    const element = document.getElementById('rps-document');
    if (window.html2pdf && element) {
      setIsExporting(true);
      const originalMargin = element.style.margin;
      element.style.margin = '0';
      
      const opt = {
        margin: [10, 10, 10, 10], // Margins in mm
        filename: `RPS_${formData.mkName}_${formData.mkCode}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true }, 
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
        pagebreak: { mode: ['css', 'legacy'] },
      };
      
      try {
        await window.html2pdf().set(opt).from(element).save();
      } catch (error) {
        console.error('PDF Export failed:', error);
        window.focus();
        window.print();
      } finally {
        element.style.margin = originalMargin;
        setIsExporting(false);
      }
    } else {
      window.focus();
      window.print();
    }
  };

  const handleExportDocx = () => {
    const element = document.getElementById('rps-document');
    if (!element) return;
    const clone = element.cloneNode(true);
    const pageBreaks = clone.querySelectorAll('.page-break');
    pageBreaks.forEach(pb => {
      const br = document.createElement('br');
      br.setAttribute('clear', 'all');
      br.setAttribute('style', 'page-break-before:always; mso-special-character:line-break;');
      pb.insertBefore(br, pb.firstChild);
    });

    const svgs = clone.querySelectorAll('svg');
    svgs.forEach(svg => svg.remove());

    const css = `
      <style>
        body { font-family: Arial, Helvetica, sans-serif; font-size: 10pt; color: #000; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 12px; }
        th, td { border: 1px solid black; padding: 6px; text-align: left; vertical-align: top; font-size: 9pt; }
        th { background-color: #f3f4f6; font-weight: bold; }
        .no-border, .no-border td, .no-border th { border: none !important; }
        .text-center { text-align: center; }
        .text-right { text-align: right; }
        .font-bold { font-weight: bold; }
        .font-semibold { font-weight: bold; }
        .bg-gray-50 { background-color: #f9fafb; }
        .bg-gray-100 { background-color: #f3f4f6; }
        .bg-gray-200 { background-color: #e5e7eb; }
        .text-lg { font-size: 14pt; font-weight: bold; }
        .text-xl { font-size: 16pt; font-weight: bold; }
        .text-2xl { font-size: 18pt; font-weight: bold; }
        .uppercase { text-transform: uppercase; }
        .underline { text-decoration: underline; }
        .mb-1 { margin-bottom: 4px; }
        .mb-2 { margin-bottom: 8px; }
        .mb-4 { margin-bottom: 16px; }
        .mb-6 { margin-bottom: 24px; }
        .mb-12 { margin-bottom: 48px; }
        .p-2 { padding: 8px; }
        .w-full { width: 100%; }
        h1, h2, h3, h4, p { margin: 0 0 8px 0; padding: 0; }
        ul, ol { margin-top: 0; margin-bottom: 0; padding-left: 20px; }
      </style>
    `;

    const htmlContent = clone.innerHTML;
    const documentHTML = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>RPS ${formData.mkName}</title>
        ${css}
      </head>
      <body>
        ${htmlContent}
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', documentHTML], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `RPS_${formData.mkName}_${formData.mkCode}.doc`; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const selectedLecturer = lecturers.find((l) => l.id === formData.dosenId);
  const selectedKoor = lecturers.find((l) => l.id === formData.koorId);
  const selectedKaprodi = lecturers.find((l) => l.id === formData.kaprodiId);
  const dateFormatted = new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });

  const sksNum = parseInt(formData.sks, 10) || 0;
  const teoriSks = parseInt(formData.sksTeori, 10) || 0;
  const praktikumSks = parseInt(formData.sksPraktik, 10) || 0;
  const usedCplCodes = new Set((rpsData?.cpmk || []).flatMap((c) => c.cpl_terkait || []));

  const renderStep1 = () => (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-200 print:hidden">
      <div className="mb-8 border-b border-slate-100 pb-6 flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <BookOpen className="text-teal-600" /> Profil RPS
          </h2>
          <p className="text-slate-500 mt-1">Lengkapi parameter untuk mengatur Rencana Pembelajaran Semester.</p>
        </div>
        
        {/* Logo Upload Section */}
        <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1">
              <Upload className="w-3 h-3" /> Logo Institusi (Opsional)
            </label>
            <input 
              type="file" 
              accept="image/png, image/jpeg" 
              onChange={handleLogoUpload}
              className="text-xs text-slate-500 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
            />
          </div>
          {logoBase64 && (
            <div className="w-12 h-12 bg-white rounded-lg border border-slate-200 flex items-center justify-center p-1 shadow-sm shrink-0">
              <img src={logoBase64} alt="Preview Logo" className="max-w-full max-h-full object-contain" />
            </div>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
              <User className="w-4 h-4 text-teal-600" /> Dosen Pengembang
            </label>
            <select name="dosenId" value={formData.dosenId} onChange={handleInputChange}
              className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none bg-white text-sm">
              <option value="">-- Pilih --</option>
              {lecturers.map((d) => <option key={d.id} value={d.id}>{d.nama}</option>)}
            </select>
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
              <User className="w-4 h-4 text-teal-600" /> Koordinator RMK
            </label>
            <select name="koorId" value={formData.koorId} onChange={handleInputChange}
              className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none bg-white text-sm">
              <option value="">-- Pilih --</option>
              {lecturers.map((d) => <option key={d.id} value={d.id}>{d.nama}</option>)}
            </select>
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
              <User className="w-4 h-4 text-teal-600" /> Ketua PRODI
            </label>
            <select name="kaprodiId" value={formData.kaprodiId} onChange={handleInputChange}
              className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none bg-white text-sm">
              <option value="">-- Pilih --</option>
              {lecturers.map((d) => <option key={d.id} value={d.id}>{d.nama}</option>)}
            </select>
          </div>
        </div>

        <div className="bg-white">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
            <GraduationCap className="w-4 h-4 text-teal-600" /> Pilih Mata Kuliah
          </label>
          <select name="mkName" value={formData.mkName} onChange={handleCourseChange}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none mb-6">
            <option value="">-- Cari Mata Kuliah Kurikulum --</option>
            {courses.map((c, idx) => (
              <option key={idx} value={c.nama}>Semester {c.semester} - {c.nama}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Kode MK</label>
            <input type="text" value={formData.mkCode} readOnly className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 text-slate-600 font-medium rounded-lg cursor-not-allowed" placeholder="Otomatis" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Total SKS</label>
            <input type="number" value={formData.sks} readOnly className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 text-slate-600 font-medium rounded-lg cursor-not-allowed" placeholder="Otomatis" />
          </div>
          <div className="flex gap-2">
             <div className="w-1/2">
               <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Teori</label>
               <input type="number" value={formData.sksTeori} readOnly className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 text-slate-600 font-medium rounded-lg cursor-not-allowed" placeholder="0" />
             </div>
             <div className="w-1/2">
               <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Praktik</label>
               <input type="number" value={formData.sksPraktik} readOnly className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 text-slate-600 font-medium rounded-lg cursor-not-allowed" placeholder="0" />
             </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Semester</label>
            <input type="number" value={formData.semester} readOnly className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 text-slate-600 font-medium rounded-lg cursor-not-allowed" placeholder="Otomatis" />
          </div>
        </div>

        <div className="pt-2">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-semibold text-slate-700">Deskripsi Singkat MK</label>
            <button onClick={enhanceDescription} disabled={isEnhancing || !formData.mkName}
              className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-full transition-all disabled:opacity-50">
              {isEnhancing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
              {isEnhancing ? 'Enhancing...' : 'Enhance with AI'}
            </button>
          </div>
          <textarea name="description" rows="4" value={formData.description} onChange={handleInputChange}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none resize-none"
            placeholder="Tuliskan deskripsi ringkas agar AI lebih terarah..."></textarea>
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-700 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <div className="pt-6 flex justify-end">
          <button onClick={generateRPS}
            disabled={!formData.mkName || !formData.dosenId || !formData.description || isGenerating}
            className="bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-6 py-3.5 rounded-xl font-semibold flex items-center gap-2 transition-all active:scale-95">
            <Wand2 className="w-5 h-5" />
            {isGenerating ? 'Menyusun Dokumen Resmi...' : 'Generate RPS Sekarang'}
          </button>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="max-w-2xl mx-auto py-20 flex flex-col items-center justify-center text-center print:hidden">
      <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mb-6 relative">
        <Loader2 className="w-10 h-10 text-teal-600 animate-spin absolute" />
        <Wand2 className="w-5 h-5 text-teal-600 animate-pulse" />
      </div>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Menyusun RPS Standar SN-Dikti</h2>
      <p className="text-slate-500 max-w-md">{genPhase || 'Menganalisis matriks pembelajaran, rubrik penilaian, dan pemetaan CPMK...'}</p>
      <div className="w-full mt-12 space-y-4 opacity-50">
        <div className="h-10 bg-slate-200 rounded animate-pulse w-full"></div>
        <div className="h-24 bg-slate-200 rounded animate-pulse w-full"></div>
        <div className="h-24 bg-slate-200 rounded animate-pulse w-full"></div>
      </div>
    </div>
  );

  const th = 'border border-black p-2 font-bold bg-gray-100 text-left align-top text-[9pt]';
  const td = 'border border-black p-2 align-top text-[9pt]';
  const tdCenter = 'border border-black p-2 align-top text-center text-[9pt]';

  const renderStep3 = () => (
    <div className="w-full pb-20 overflow-x-auto">
      <div className="max-w-[297mm] mx-auto mb-6 flex justify-between items-center print:hidden px-4">
        <button onClick={() => setStep(1)} className="text-slate-500 hover:text-slate-800 font-medium px-4 py-2 rounded-lg hover:bg-slate-100 transition flex items-center gap-2">
          <ChevronRight className="w-4 h-4 rotate-180" /> Edit Parameter
        </button>
        <div className="flex items-center gap-3">
          <button onClick={handleExportDocx}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition shadow-sm">
            <FileText className="w-4 h-4" />
            Ekspor DOCX
          </button>
          <button onClick={handlePrint} disabled={isExporting}
            className="bg-slate-800 hover:bg-slate-900 disabled:bg-slate-500 text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition shadow-sm">
            {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            {isExporting ? 'Mengekspor PDF...' : 'Ekspor PDF'}
          </button>
        </div>
      </div>

      <div id="rps-document" className="mx-auto bg-white p-10 border border-slate-300 shadow-sm print:border-none print:shadow-none print:p-0 font-[Arial,Helvetica,sans-serif] text-black w-full max-w-[297mm] min-h-[210mm] box-border relative">

        {/* HALAMAN 1: COVER DEPAN */}
        <div className="page-break flex flex-col items-center justify-center text-center h-[180mm]" style={{ textAlign: 'center' }}>
          <h1 className="text-xl font-bold mb-12" style={{ textAlign: 'center' }}>
            LEMBAGA PENELITIAN DAN PENGEMBANGAN SUMBER DAYA UNGGUL<br/>
            STIKES DIAN HUSADA
          </h1>
          
          <h2 className="text-2xl font-bold mb-12 underline" style={{ textAlign: 'center' }}>TUGAS DESAIN RENCANA PEMBELAJARAN SEMESTER</h2>
          
          {/* Logo Rendering */}
          <div className="w-48 h-48 rounded-full mb-12 flex flex-col items-center justify-center relative bg-white mx-auto overflow-hidden" style={{ margin: '0 auto', marginBottom: '3rem' }}>
            {logoBase64 ? (
               <img src={logoBase64} alt="Logo Institusi" className="max-w-full max-h-full object-contain" />
            ) : (
               <div className="w-full h-full border-4 border-slate-300 rounded-full flex items-center justify-center text-slate-400 font-semibold text-sm">
                 [LOGO]
               </div>
            )}
          </div>

          <div className="mb-12" style={{ textAlign: 'center' }}>
            <h3 className="text-lg font-bold" style={{ textAlign: 'center' }}>{selectedLecturer?.nama || 'NAMA DOSEN'}</h3>
            <p className="text-md" style={{ textAlign: 'center' }}>NIDN/NUPTK: {selectedLecturer?.nidn || '----------------'}</p>
          </div>

          <div className="mt-auto" style={{ textAlign: 'center', marginTop: '3rem' }}>
            <h3 className="text-lg font-bold" style={{ textAlign: 'center' }}>STIKES DIAN HUSADA</h3>
            <h4 className="text-md font-bold" style={{ textAlign: 'center' }}>TAHUN 2026</h4>
          </div>
        </div>

        {/* HALAMAN 2: RPS HEADER & IDENTITAS */}
        <div className="page-break pt-4">
          <table className="w-full mb-4 no-border" style={{ border: 'none' }}>
            <tbody>
              <tr>
                <td style={{ border: 'none', width: '20%', verticalAlign: 'middle', textAlign: 'center' }}>
                  {/* Smaller Logo Rendering */}
                  <div className="w-24 h-24 mx-auto flex flex-col items-center justify-center text-center">
                    {logoBase64 ? (
                      <img src={logoBase64} alt="Logo Kecil" className="max-w-full max-h-full object-contain" style={{ maxHeight: '80px', maxWidth: '80px' }} />
                    ) : (
                      <div className="w-full h-full border-2 border-slate-300 rounded-full flex items-center justify-center text-slate-400 font-semibold text-[8px]">
                        [LOGO]
                      </div>
                    )}
                  </div>
                </td>
                <td style={{ border: 'none', width: '60%', verticalAlign: 'middle', textAlign: 'center' }}>
                  <h1 className="text-lg font-bold uppercase mb-1" style={{ textAlign: 'center', margin: 0 }}>STIKES DIAN HUSADA</h1>
                  <h2 className="text-base font-bold uppercase mb-1" style={{ textAlign: 'center', margin: 0 }}>PROGRAM STUDI TEKNIK RADIOLOGI PENCITRAAN</h2>
                </td>
                <td style={{ border: 'none', width: '20%', verticalAlign: 'middle', textAlign: 'right' }}>
                  <div className="text-[9pt] border border-black px-3 py-1 bg-white font-bold inline-block" style={{ textAlign: 'center' }}>
                    Kode Dokumen<br />{rpsData?.kode_dokumen || '-'}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <table className="w-full border-collapse border border-black mb-0">
            <tbody>
              <tr>
                <td colSpan={6} className="text-center font-bold text-base p-2 border border-black bg-gray-100 uppercase">
                  RENCANA PEMBELAJARAN SEMESTER (RPS)
                </td>
              </tr>
              <tr>
                <td className={`${td} font-bold w-[15%]`}>MATA KULIAH (MK)</td>
                <td className={`${td} w-[25%] font-bold`}>{formData.mkName}</td>
                <td className={`${td} font-bold w-[10%]`}>KODE</td>
                <td className={`${td} w-[15%]`}>{formData.mkCode}</td>
                <td className={`${td} font-bold w-[15%]`}>BOBOT (sks)</td>
                <td className={`${td} w-[20%]`}>
                  {formData.sks} SKS<br/>
                  <span className="font-normal text-[8pt]">(Teori: {formData.sksTeori}, Praktik: {formData.sksPraktik})</span>
                </td>
              </tr>
              <tr>
                <td className={`${td} font-bold`}>Rumpun MK</td>
                <td className={td}>Mata Kuliah Inti / Pencitraan</td>
                <td className={`${td} font-bold`}>SEMESTER</td>
                <td className={td}>{formData.semester}</td>
                <td className={`${td} font-bold`}>Tgl Penyusunan</td>
                <td className={td}>{dateFormatted}</td>
              </tr>
            </tbody>
          </table>

          <table className="w-full border-collapse border border-black border-t-0 text-center mb-4">
            <tbody>
              <tr>
                <td rowSpan={2} className={`${td} font-bold w-[15%] text-left align-middle border-t-0`}>OTORISASI</td>
                <td className={`${td} font-bold bg-gray-50 border-t-0 w-[28.3%]`}>Dosen Pengembang RPS</td>
                <td className={`${td} font-bold bg-gray-50 border-t-0 w-[28.3%]`}>Koordinator RMK</td>
                <td className={`${td} font-bold bg-gray-50 border-t-0 w-[28.3%]`}>Ketua PRODI</td>
              </tr>
              <tr>
                <td className="p-2 border border-black h-20 align-bottom">( {selectedLecturer ? selectedLecturer.nama : '.........................................'} )</td>
                <td className="p-2 border border-black h-20 align-bottom">( {selectedKoor ? selectedKoor.nama : '.........................................'} )</td>
                <td className="p-2 border border-black h-20 align-bottom">( {selectedKaprodi ? selectedKaprodi.nama : '.........................................'} )</td>
              </tr>
            </tbody>
          </table>

          <table className="w-full border-collapse border border-black mb-4">
            <tbody>
              <tr>
                <td rowSpan={99} className={`${td} w-[15%] bg-gray-50 font-bold`}>Capaian Pembelajaran (CP)</td>
                <td className={th} colSpan={2}>CPL-PRODI yang dibebankan pada MK</td>
              </tr>
              {['TRS', 'TRP', 'TRKS', 'TRKU'].map((grp) => {
                const relevant = cplBank[grp].filter((c) => usedCplCodes.has(c.kode));
                if (relevant.length === 0) return null;
                const label = { TRS: 'Sikap (TRS)', TRP: 'Pengetahuan (TRP)', TRKS: 'Ketrampilan Khusus (TRKS)', TRKU: 'Ketrampilan Umum (TRKU)' }[grp];
                return (
                  <tr key={grp}>
                    <td className={`${td} w-[15%] font-semibold`}>{label}</td>
                    <td className={td}>
                      {relevant.map((c) => (<div key={c.kode} className="mb-1"><span className="font-bold">{c.kode}</span> {c.teks}</div>))}
                    </td>
                  </tr>
                );
              })}
              <tr><td className={th} colSpan={2}>Capaian Pembelajaran Mata Kuliah (CPMK)</td></tr>
              {rpsData?.cpmk?.map((item, idx) => (
                <tr key={idx}>
                  <td className={`${td} font-bold text-center w-[15%]`}>{item.kode}</td>
                  <td className={td}>{item.teks}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mb-4 break-inside-avoid">
            <h3 className="font-bold text-[9pt] mb-1">Korelasi CPL terhadap CPMK</h3>
            <table className="w-full border-collapse border border-black text-center text-[9pt]">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-black p-1 w-[8%] font-bold">CPMK</th>
                  {allCplFlat.filter((c) => usedCplCodes.has(c.kode)).map((c) => (
                    <th key={c.kode} className="border border-black p-1 font-bold whitespace-nowrap">{c.kode}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rpsData?.cpmk?.map((item, idx) => (
                  <tr key={idx}>
                    <td className="border border-black p-1 font-bold bg-gray-50">{item.kode}</td>
                    {allCplFlat.filter((c) => usedCplCodes.has(c.kode)).map((c) => (
                      <td key={c.kode} className="border border-black p-1 font-bold text-[10pt]">
                        {(item.cpl_terkait || []).includes(c.kode) ? '√' : ''}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <table className="w-full border-collapse border border-black mb-6 break-inside-avoid">
            <tbody>
              <tr>
                <td className={`${td} font-bold w-[15%] bg-gray-50`}>Deskripsi Singkat MK</td>
                <td className={`${td} text-justify`}>{formData.description}</td>
              </tr>
              <tr>
                <td className={`${td} font-bold bg-gray-50`}>Bahan Kajian / Materi Pembelajaran</td>
                <td className={td}>
                  <ol className="list-decimal list-outside ml-4 m-0 space-y-1">
                    {rpsData?.bahan_kajian?.map((item, idx) => <li key={idx}>{item}</li>)}
                  </ol>
                </td>
              </tr>
              <tr>
                <td className={`${td} font-bold bg-gray-50`}>Pustaka</td>
                <td className={td}>
                  <div className="font-bold underline mb-1">Utama:</div>
                  <ol className="list-decimal list-outside ml-4 mb-3 space-y-1">
                    {rpsData?.pustaka?.utama?.map((item, idx) => <li key={idx}>{item}</li>)}
                  </ol>
                  <div className="font-bold underline mb-1">Pendukung:</div>
                  <ul className="list-disc list-outside ml-4 space-y-1">
                    {rpsData?.pustaka?.pendukung?.map((item, idx) => <li key={idx}>{item}</li>)}
                  </ul>
                </td>
              </tr>
              <tr>
                <td className={`${td} font-bold bg-gray-50`}>Dosen Pengampu</td>
                <td className={td}>{selectedLecturer?.nama || '-'}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* HALAMAN 3: MATRIKS 16 PERTEMUAN */}
        <div className="page-break pt-4">
          <h3 className="font-bold text-[10.5pt] mb-2 uppercase text-center">Rincian Rencana Pembelajaran (Matriks 16 Pertemuan)</h3>
          <table className="w-full border-collapse border border-black text-[8.5pt]">
            <thead className="bg-gray-100 text-center font-bold">
              <tr>
                <th rowSpan={2} className="border border-black p-1 w-[3%]">Mg Ke- (1)</th>
                <th rowSpan={2} className="border border-black p-1 w-[15%]">Sub-CPMK<br/>(Kemampuan akhir tiap tahapan belajar) (2)</th>
                <th colSpan={2} className="border border-black p-1">Penilaian</th>
                <th colSpan={2} className="border border-black p-1">Metode Pembelajaran, Penugasan Mahasiswa, [Estimasi Waktu]</th>
                <th rowSpan={2} className="border border-black p-1 w-[16%]">Materi Pembelajaran [Pustaka] (7)</th>
                <th rowSpan={2} className="border border-black p-1 w-[5%]">Bobot (%) (8)</th>
              </tr>
              <tr>
                <th className="border border-black p-1 w-[13%]">Indikator (3)</th>
                <th className="border border-black p-1 w-[11%]">Kriteria & Bentuk (4)</th>
                <th className="border border-black p-1 w-[18%]">Luring (offline) (5)</th>
                <th className="border border-black p-1 w-[12%]">Daring (online) (6)</th>
              </tr>
            </thead>
            <tbody className="align-top leading-snug">
              {rpsData?.matriks_pembelajaran?.map((row, idx) => {
                if (isExamRow(row)) {
                  return (
                    <tr key={idx} className="bg-gray-200 font-bold text-center break-inside-avoid">
                      <td className="border border-black p-2">{row.minggu_ke}</td>
                      <td className="border border-black p-2 tracking-widest" colSpan={6}>{row.sub_cpmk.toUpperCase()}</td>
                      <td className="border border-black p-2">{row.bobot_nilai}</td>
                    </tr>
                  );
                }
                return (
                  <tr key={idx} className="break-inside-avoid">
                    <td className={tdCenter}>{row.minggu_ke}</td>
                    <td className={td}>
                      <span className="font-bold text-slate-700">{row.sub_cpmk}</span><br/>
                      <span className="text-[7pt] text-slate-500 font-bold">Ref: {row.cpmk_ref}</span>
                    </td>
                    <td className={td}>{row.indikator}</td>
                    <td className={td}>{row.kriteria_bentuk}</td>
                    <td className={td}>
                      <span className="font-semibold block">Bentuk:</span> {row.metode_luring?.bentuk || '-'}
                      <span className="font-semibold block mt-1">Metode:</span> {row.metode_luring?.metode || '-'}
                      <span className="font-semibold block mt-1">Alokasi:</span> {row.metode_luring?.alokasi || '-'}
                    </td>
                    <td className={td}>{row.metode_daring}</td>
                    <td className={td}>{row.materi}</td>
                    <td className={tdCenter}>{row.bobot_nilai}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* HALAMAN 4: SILABUS SINGKAT */}
        <div className="page-break pt-4">
          <h2 className="text-center font-bold text-lg mb-4">SILABUS SINGKAT</h2>
          <table className="w-full border-collapse border border-black text-[9.5pt] mb-6">
            <tbody>
              <tr><td className={`${td} font-bold bg-gray-50 w-[20%]`}>Nama MK</td><td className={td} colSpan={3}>{formData.mkName}</td></tr>
              <tr><td className={`${td} font-bold bg-gray-50`}>Kode MK</td><td className={`${td} w-[30%]`}>{formData.mkCode}</td><td className={`${td} font-bold bg-gray-50 w-[20%]`}>Kredit</td><td className={`${td} w-[30%]`}>{formData.sks} SKS (T:{formData.sksTeori}, P:{formData.sksPraktik})</td></tr>
              <tr><td className={`${td} font-bold bg-gray-50`}>Semester</td><td className={td} colSpan={3}>{formData.semester}</td></tr>
              <tr><td className={`${td} font-bold bg-gray-50`} colSpan={4}>DESKRIPSI MATA KULIAH</td></tr>
              <tr><td className={`${td} text-justify`} colSpan={4}>{formData.description}</td></tr>
              <tr><td className={`${td} font-bold bg-gray-50`} colSpan={4}>CAPAIAN PEMBELAJARAN MATA KULIAH (CPMK)</td></tr>
              <tr>
                <td className={`${td}`} colSpan={4}>
                  <ol className="list-decimal list-outside ml-4 m-0 space-y-1">
                    {rpsData?.cpmk?.map((c, i) => <li key={i}><span className="font-bold">{c.kode}:</span> {c.teks}</li>)}
                  </ol>
                </td>
              </tr>
              <tr><td className={`${td} font-bold bg-gray-50`} colSpan={4}>MATERI PEMBELAJARAN</td></tr>
              <tr>
                <td className={`${td}`} colSpan={4}>
                  <ol className="list-decimal list-outside ml-4 m-0 space-y-1">
                    {rpsData?.bahan_kajian?.map((m, i) => <li key={i}>{m}</li>)}
                  </ol>
                </td>
              </tr>
              <tr><td className={`${td} font-bold bg-gray-50`} colSpan={4}>PUSTAKA</td></tr>
              <tr>
                <td className={`${td}`} colSpan={4}>
                  <div className="font-bold mb-1">Utama:</div>
                  <ol className="list-decimal list-outside ml-4 mb-2 space-y-1">
                    {rpsData?.pustaka?.utama?.map((item, idx) => <li key={idx}>{item}</li>)}
                  </ol>
                  <div className="font-bold mb-1">Pendukung:</div>
                  <ul className="list-disc list-outside ml-4 space-y-1">
                    {rpsData?.pustaka?.pendukung?.map((item, idx) => <li key={idx}>{item}</li>)}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* HALAMAN 5: PORTOFOLIO PENILAIAN */}
        <div className="page-break pt-4">
          <h3 className="font-bold text-[10.5pt] mb-2 text-center uppercase">Portofolio Penilaian dan Evaluasi Ketercapaian CPL Mahasiswa</h3>
          <table className="w-full border-collapse border border-black text-[8.5pt] text-center mb-6">
            <thead className="bg-gray-100 font-bold">
              <tr>
                <th className="border border-black p-1 w-[4%]">Mg</th>
                <th className="border border-black p-1 w-[12%]">CPL</th>
                <th className="border border-black p-1 w-[9%]">CPMK</th>
                <th className="border border-black p-1 w-[10%]">Sub-CPMK</th>
                <th className="border border-black p-1 w-[15%]">Indikator</th>
                <th className="border border-black p-1 w-[15%]">Bentuk Soal</th>
                <th className="border border-black p-1 w-[7%]">Bobot (%)</th>
                <th className="border border-black p-1 w-[8%]">Nilai Mhs (0-100)</th>
                <th className="border border-black p-1 w-[10%]">Σ (Nilai x Bobot)</th>
                <th className="border border-black p-1 w-[10%]">Ketercapaian CPL</th>
              </tr>
            </thead>
            <tbody>
              {rpsData?.portofolio?.map((row, idx) => (
                <tr key={idx} className="break-inside-avoid">
                  <td className="border border-black p-1.5">{row.minggu}</td>
                  <td className="border border-black p-1.5 font-bold">{row.cpl_terkait}</td>
                  <td className="border border-black p-1.5 font-bold">{row.cpmk}</td>
                  <td className="border border-black p-1.5 text-left font-bold">{row.sub_cpmk}</td>
                  <td className="border border-black p-1.5 text-left">{row.indikator}</td>
                  <td className="border border-black p-1.5 text-left">{row.bentuk_soal}</td>
                  <td className="border border-black p-1.5 font-bold">{row.bobot}</td>
                  <td className="border border-black p-1.5"></td>
                  <td className="border border-black p-1.5"></td>
                  <td className="border border-black p-1.5"></td>
                </tr>
              ))}
              <tr className="font-bold bg-gray-50">
                <td colSpan={6} className="border border-black p-2 text-right">Total Bobot (%)</td>
                <td className="border border-black p-2">100</td>
                <td colSpan={3} className="border border-black p-2 bg-white"></td>
              </tr>
            </tbody>
          </table>

          {/* TUGAS MAHASISWA & RUBRIK */}
          {rpsData?.rencana_tugas?.map((tugas, idx) => (
            <div key={idx} className="mb-6 break-inside-avoid">
              <h3 className="font-bold text-[10.5pt] mb-2 uppercase text-center border-t-2 border-black pt-3">Rencana Tugas Mahasiswa</h3>
              <table className="w-full border-collapse border border-black text-[9.5pt]">
                <tbody>
                  <tr><td className={`${td} font-bold w-[20%] bg-gray-50`}>Mata Kuliah</td><td className={td} colSpan={3}>{formData.mkName} ({formData.mkCode}) — {formData.sks} SKS (T:{formData.sksTeori}, P:{formData.sksPraktik})</td></tr>
                  <tr><td className={`${td} font-bold bg-gray-50`}>Judul Tugas</td><td className={td} colSpan={3}>Tugas {idx + 1}: {tugas.judul}</td></tr>
                  <tr>
                    <td className={`${td} font-bold bg-gray-50`}>Bentuk Tugas</td><td className={td}>{tugas.bentuk_luaran}</td>
                    <td className={`${td} font-bold bg-gray-50`}>Waktu Pengerjaan</td><td className={td}>{tugas.waktu_pengerjaan}</td>
                  </tr>
                  <tr><td className={`${td} font-bold bg-gray-50`}>Sub-CPMK Terkait</td><td className={td} colSpan={3}>{tugas.sub_cpmk_terkait}</td></tr>
                  <tr><td className={`${td} font-bold bg-gray-50`}>Deskripsi Tugas</td><td className={td} colSpan={3}>{tugas.deskripsi_tugas}</td></tr>
                  <tr>
                    <td className={`${td} font-bold bg-gray-50`}>Metode Pengerjaan</td>
                    <td className={td} colSpan={3}>
                      <ol className="list-decimal list-outside ml-4 space-y-0.5">
                        {tugas.metode_pengerjaan?.map((m, i) => <li key={i}>{m}</li>)}
                      </ol>
                    </td>
                  </tr>
                  <tr>
                    <td className={`${td} font-bold bg-gray-50`}>Indikator & Bobot</td>
                    <td className={td} colSpan={3}>
                      <ul className="list-disc list-outside ml-4 space-y-0.5">
                        {tugas.indikator_bobot?.map((ib, i) => <li key={i}>{ib.indikator} ({ib.bobot})</li>)}
                      </ul>
                    </td>
                  </tr>
                  <tr><td className={`${td} font-bold bg-gray-50`}>Jadwal Pelaksanaan</td><td className={td} colSpan={3}>{tugas.jadwal}</td></tr>
                </tbody>
              </table>
            </div>
          ))}

          {rpsData?.rubrik_penilaian && (
            <div className="mb-6 break-inside-avoid">
              <h3 className="font-bold text-[10.5pt] mb-2 uppercase">Rubrik Penilaian</h3>
              <table className="w-full border-collapse border border-black text-[8.5pt]">
                <thead className="bg-gray-100 text-center font-bold">
                  <tr>
                    <th className="border border-black p-1 w-[18%]">Materi Soal/Tugas</th>
                    <th className="border border-black p-1 w-[6%]">Bobot</th>
                    <th className="border border-black p-1 w-[19%]">&lt; 55</th>
                    <th className="border border-black p-1 w-[19%]">55 - &lt;65</th>
                    <th className="border border-black p-1 w-[19%]">65 - &lt;75</th>
                    <th className="border border-black p-1 w-[19%]">75 - 100</th>
                  </tr>
                </thead>
                <tbody className="align-top">
                  {rpsData.rubrik_penilaian.map((r, idx) => (
                    <tr key={idx}>
                      <td className="border border-black p-1 font-semibold">{r.materi}</td>
                      <td className="border border-black p-1 text-center">{r.bobot}</td>
                      <td className="border border-black p-1">{r.kurang_55}</td>
                      <td className="border border-black p-1">{r.skor_55_65}</td>
                      <td className="border border-black p-1">{r.skor_65_75}</td>
                      <td className="border border-black p-1">{r.skor_75_100}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ATURAN SKS & TANDA TANGAN */}
          <div className="grid grid-cols-2 gap-4 mb-8 break-inside-avoid">
            <div>
              <h3 className="font-bold text-[10.5pt] mb-2 uppercase">Pengertian {formData.sks || '-'} SKS dalam Pembelajaran</h3>
              <table className="w-full border-collapse border border-black text-[8.5pt]">
                <thead className="bg-gray-100 text-left font-bold">
                  <tr>
                    <th className="border border-black p-1">Kegiatan</th>
                    <th className="border border-black p-1 w-[35%]">Alokasi Waktu (Menit/Mg)</th>
                  </tr>
                </thead>
                <tbody>
                  {teoriSks > 0 && (
                  <>
                  <tr className="bg-gray-50"><td className="border border-black p-1 font-bold" colSpan={2}>Kuliah/Tutorial/Responsi ({teoriSks} sks)</td></tr>
                  <tr><td className="border border-black p-1">Tatap Muka ({teoriSks} x 50')</td><td className="border border-black p-1 text-center">{teoriSks * 50}</td></tr>
                  <tr><td className="border border-black p-1">Penugasan Terstruktur ({teoriSks} x 60')</td><td className="border border-black p-1 text-center">{teoriSks * 60}</td></tr>
                  <tr><td className="border border-black p-1">Belajar Mandiri ({teoriSks} x 60')</td><td className="border border-black p-1 text-center">{teoriSks * 60}</td></tr>
                  </>
                  )}
                  {praktikumSks > 0 && (
                  <>
                    <tr className="bg-gray-50"><td className="border border-black p-1 font-bold" colSpan={2}>Praktikum ({praktikumSks} sks)</td></tr>
                    <tr><td className="border border-black p-1">Praktik Laboratorium ({praktikumSks} x 170')</td><td className="border border-black p-1 text-center">{praktikumSks * 170}</td></tr>
                    <tr><td className="border border-black p-1">Tugas Mandiri/Laporan ({praktikumSks} x 60')</td><td className="border border-black p-1 text-center">{praktikumSks * 60}</td></tr>
                  </>
                  )}
                  <tr className="font-bold bg-gray-100">
                    <td className="border border-black p-1 text-right">Total Beban Pembelajaran</td>
                    <td className="border border-black p-1 text-center">{ (teoriSks * 170) + (praktikumSks * 230) || 0 }</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div>
              <h3 className="font-bold text-[10.5pt] mb-2 uppercase">Legenda Metode Pembelajaran</h3>
              <table className="w-full border-collapse border border-black text-[8.5pt]">
                <tbody>
                  {Array.from({ length: Math.ceil(metodeLegend.length / 2) }).map((_, r) => (
                    <tr key={r}>
                      {[0, 1].map((c) => {
                        const item = metodeLegend[r * 2 + c];
                        return item ? (
                          <React.Fragment key={c}>
                            <td className="border border-black p-1 font-bold w-[12%] text-center">{item.kode}</td>
                            <td className="border border-black p-1 w-[38%]">{item.nama}</td>
                          </React.Fragment>
                        ) : <td key={c} colSpan={2} className="border border-black p-1"></td>;
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <table className="w-full mt-12 text-[10pt] break-inside-avoid no-border" style={{ border: 'none' }}>
            <tbody>
              <tr>
                <td style={{ border: 'none', width: '50%', textAlign: 'left', verticalAlign: 'top' }}>
                  Mengetahui,<br />Ketua Program Studi<br /><br /><br /><br />
                  <span className="font-bold underline">( {selectedKaprodi ? selectedKaprodi.nama : '.........................................'} )</span><br/>
                  NIDN/NUPTK: {selectedKaprodi?.nidn || '..................'}
                </td>
                <td style={{ border: 'none', width: '50%', textAlign: 'right', verticalAlign: 'top' }}>
                  {`Mojokerto, ${dateFormatted}`}<br />Dosen Pengampu/Penanggungjawab MK<br /><br /><br /><br />
                  <span className="font-bold underline">( {selectedLecturer ? selectedLecturer.nama : '.........................................'} )</span><br/>
                  NIDN/NUPTK: {selectedLecturer?.nidn || '..................'}
                </td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-teal-200">
      <style dangerouslySetInnerHTML={{
        __html: `
        @media print {
          body { background-color: white; margin: 0; padding: 0; -webkit-print-color-adjust: exact; }
          #rps-document { max-width: none !important; width: 297mm !important; margin: 0 !important; border: none !important; box-shadow: none !important; }
          .page-break { page-break-before: always; }
          .page-break:first-child { page-break-before: avoid; }
          .break-inside-avoid { page-break-inside: avoid; }
          @page { size: A4 landscape; margin: 10mm; }
        }
      `}} />

      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 print:hidden shadow-sm">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-teal-600 text-white p-1.5 rounded-lg shadow-sm"><FileText className="w-5 h-5" /></div>
            <h1 className="font-bold text-xl tracking-tight text-slate-800">Rad<span className="text-teal-600">Edu</span> RPS Gen</h1>
          </div>
          <div className="hidden md:flex items-center gap-2 text-sm font-medium">
            <span className={step >= 1 ? 'text-teal-600 font-bold' : 'text-slate-400'}>1. Input Profil</span>
            <ChevronRight className="w-4 h-4 text-slate-300" />
            <span className={step >= 2 ? 'text-teal-600 font-bold' : 'text-slate-400'}>2. AI Generasi</span>
            <ChevronRight className="w-4 h-4 text-slate-300" />
            <span className={step === 3 ? 'text-teal-600 font-bold' : 'text-slate-400'}>3. Review & Cetak</span>
          </div>
        </div>
      </header>

      <main className="max-w-full mx-auto px-4 sm:px-6 py-8 md:py-12">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </main>
    </div>
  );
}