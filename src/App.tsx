import React, { useState, useEffect } from 'react';
import Select from 'react-select';

// ============================================================
// INLINE ICONS (Menggantikan lucide-react untuk kemandirian file)
// ============================================================
const BookOpen = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>;
const Wand2 = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z"></path><path d="m14 7 3 3"></path><path d="M5 6v4"></path><path d="M19 14v4"></path><path d="M10 2v2"></path><path d="M7 8H3"></path><path d="M21 16h-4"></path><path d="M11 3H9"></path></svg>;
const Download = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>;
const ChevronRight = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6"></path></svg>;
const Loader2 = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>;
const AlertCircle = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>;
const User = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const GraduationCap = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21.42 10.922a2 2 0 0 1-.019 3.138l-8.5 7.159a2 2 0 0 1-2.434.025l-8.5-6.732a2 2 0 0 1-.06-3.13l8.5-7a2 2 0 0 1 2.545-.022z"></path><path d="M22 10v6"></path><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path></svg>;
const Sparkles = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path><path d="M5 3v4"></path><path d="M19 17v4"></path><path d="M3 5h4"></path><path d="M17 19h4"></path></svg>;
const Upload = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>;

// ============================================================
// MASTER DATA — INSTITUSIONAL
// ============================================================
import { Settings } from 'lucide-react';
import SettingsModal from './components/SettingsModal';
import { callGeminiWithFallback } from './services/geminiApi';
import { lecturers, courses, cplBank, allCplFlat, metodeLegend } from './data/masterData';
import panduanRpsRaw from '../panduan-RPS-template.md?raw';

// ============================================================
// API KEY INJECTION 
// ============================================================
const callGemini = async (prompt: string, schema: any, apiKeys: string[], validate?: (data: any) => string | null) => {
  const result = await callGeminiWithFallback(prompt, apiKeys, "default-user", { schema, validate, maxRetries: 3 });
  return result.data;
};

// ============================================================
// HELPERS
// ============================================================
const getWeekNumber = (value) => {
  const match = String(value ?? '').match(/\d+/);
  return match ? Number.parseInt(match[0], 10) : null;
};

const isExamRow = (row) => [8, 16].includes(getWeekNumber(row.minggu_ke));

const reconcileLearningMatrix = (matriks = [], cpmk = [], subCpmk = []) => {
  const cpmkCodes = new Set(cpmk.map((item) => item.kode));
  const subByCode = new Map(subCpmk.map((item) => [item.kode, item]));
  const subByCpmk = new Map();
  subCpmk.forEach((item) => {
    if (!subByCpmk.has(item.cpmk_ref)) subByCpmk.set(item.cpmk_ref, []);
    subByCpmk.get(item.cpmk_ref).push(item);
  });

  const reconciled = matriks.map((row, index) => {
    const repaired = { ...row };
    const weekNumber = getWeekNumber(repaired.minggu_ke);
    if (weekNumber) repaired.minggu_ke = String(weekNumber);
    if (isExamRow(repaired)) {
      const examSub = subByCode.get(repaired.sub_cpmk_ref);
      if (examSub) repaired.cpmk_ref = examSub.cpmk_ref;
      return repaired;
    }

    let relatedSub = subByCode.get(repaired.sub_cpmk_ref);
    if (!relatedSub && cpmkCodes.has(repaired.cpmk_ref)) {
      const candidates = subByCpmk.get(repaired.cpmk_ref) || [];
      relatedSub = candidates[index % Math.max(candidates.length, 1)];
    }
    if (!relatedSub && subCpmk.length) {
      relatedSub = subCpmk[index % subCpmk.length];
    }

    if (relatedSub) {
      repaired.sub_cpmk_ref = relatedSub.kode;
      repaired.cpmk_ref = relatedSub.cpmk_ref;
    }
    return repaired;
  });

  // Ensure all Sub-CPMKs are covered
  const coveredSub = new Set(reconciled.filter(r => !isExamRow(r)).map(r => r.sub_cpmk_ref));
  const missingSub = subCpmk.filter(sub => !coveredSub.has(sub.kode));
  
  if (missingSub.length > 0) {
    missingSub.forEach((sub) => {
      let templateRow = reconciled.find(r => !isExamRow(r) && r.cpmk_ref === sub.cpmk_ref);
      if (!templateRow) {
         const nonExamRows = reconciled.filter(r => !isExamRow(r));
         templateRow = nonExamRows[nonExamRows.length - 1];
      }
      
      if (templateRow) {
         const newRow = { ...templateRow, sub_cpmk_ref: sub.kode, cpmk_ref: sub.cpmk_ref, bobot_nilai: 0 };
         const insertIdx = reconciled.indexOf(templateRow) + 1;
         reconciled.splice(insertIdx, 0, newRow);
      }
    });
  }

  return reconciled;
};

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

const parsePercent = (value) => {
  const parsed = Number.parseFloat(String(value ?? '').replace(',', '.').replace('%', ''));
  return Number.isFinite(parsed) ? parsed : 0;
};

const chunkArray = (items = [], size = 1) => {
  const chunks = [];
  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }
  return chunks;
};

const normalizeLearningOutcomeCodes = (data = {}) => {
  const cpmkCodeMap = new Map();
  const normalizedCpmk = (data.cpmk || []).map((item, index) => {
    const kode = item.kode || `CPMK-${index + 1}`;
    cpmkCodeMap.set(item.kode, kode);
    return { ...item, kode };
  });
  const normalizedSubCpmk = (data.sub_cpmk || []).map((item, index) => ({
    ...item,
    kode: item.kode || `Sub-CPMK-${index + 1}`,
    cpmk_ref: cpmkCodeMap.get(item.cpmk_ref) || item.cpmk_ref,
  }));
  return { ...data, cpmk: normalizedCpmk, sub_cpmk: normalizedSubCpmk };
};

const rebuildAlignedStudyMaterials = (matrix = []) => Array.from(new Set(
  matrix
    .filter((row) => !isExamRow(row))
    .map((row) => String(row.materi || '').trim())
    .filter(Boolean)
));

const reconcileGeneratedArtifacts = (data3 = {}, matrix = [], cpmk = [], subCpmk = []) => {
  const cpmkByCode = new Map(cpmk.map((item) => [item.kode, item]));
  const subByCode = new Map(subCpmk.map((item) => [item.kode, item]));
  const matrixByTask = new Map(matrix.filter((row) => row.task_code).map((row) => [row.task_code, row]));
  const portfolioByWeek = new Map((data3.portofolio || []).map((row) => [getWeekNumber(row.minggu), row]));

  const portofolio = matrix.map((source) => {
    const week = getWeekNumber(source.minggu_ke);
    const row = portfolioByWeek.get(week) || {};
    const sourceCpmk = cpmkByCode.has(source.cpmk_ref) ? source.cpmk_ref : cpmk[0]?.kode;
    const sub = subByCode.get(source.sub_cpmk_ref)
      || subCpmk.find((item) => item.cpmk_ref === sourceCpmk)
      || subCpmk[0];
    const cpmkRef = sub?.cpmk_ref || sourceCpmk;
    const cpmkItem = cpmkByCode.get(cpmkRef);
    return {
      ...row,
      minggu: String(week || source.minggu_ke || '-'),
      cpl_terkait: (cpmkItem?.cpl_terkait || []).join(', ') || '-',
      cpmk: cpmkRef || '-',
      sub_cpmk_ref: sub?.kode || '-',
      indikator: source?.indikator || row.indikator,
      bentuk_soal: source?.kriteria_bentuk || row.bentuk_soal,
      bobot: source?.bobot_nilai || row.bobot,
    };
  });

  const rencanaTugas = (data3.rencana_tugas || []).map((task) => {
    const source = matrixByTask.get(task.task_code);
    return {
      ...task,
      sub_cpmk_ref: source?.sub_cpmk_ref || task.sub_cpmk_ref,
      jadwal: source ? `Minggu ${source.minggu_ke}` : task.jadwal,
    };
  });

  return { ...data3, portofolio, rencana_tugas: rencanaTugas };
};

const normalizeNumbersTo100 = (values) => {
  if (!values.length) return [];
  let clean = values.map((value) => Math.max(parsePercent(value), 0));
  if (clean.reduce((sum, value) => sum + value, 0) <= 0) {
    clean = clean.map(() => 1);
  }

  const total = clean.reduce((sum, value) => sum + value, 0);
  const raw = clean.map((value) => (value / total) * 100);
  const result = raw.map(Math.floor);
  let remainder = 100 - result.reduce((sum, value) => sum + value, 0);
  const order = raw
    .map((value, index) => ({ index, fraction: value - Math.floor(value) }))
    .sort((a, b) => b.fraction - a.fraction);
  for (let index = 0; remainder > 0; index += 1, remainder -= 1) {
    result[order[index % order.length].index] += 1;
  }
  return result;
};

const completeBlueprintData = (blueprint = {}, cpmk = [], subCpmk = [], matrix = []) => {
  const cpmkCodes = new Set(cpmk.map((item) => item.kode));
  const subCodes = new Set(subCpmk.map((item) => item.kode));

  const activities = (blueprint.aktivitas_penilaian || []).map((row) => ({
    ...row,
    bobot_per_cpmk: (row.bobot_per_cpmk || [])
      .filter((item) => cpmkCodes.has(item.cpmk_ref))
      .map((item) => ({ ...item, bobot: Math.max(parsePercent(item.bobot), 0) })),
  }));
  activities.forEach((row, index) => {
    if (row.bobot_per_cpmk.length || !cpmk.length) return;
    const fallback = cpmk[index % cpmk.length];
    row.bobot_per_cpmk = [{ cpmk_ref: fallback.kode, bobot: 1 }];
  });
  const activityCoverage = new Set(activities.flatMap((row) => row.bobot_per_cpmk.map((item) => item.cpmk_ref)));
  cpmk.forEach((item) => {
    if (!activityCoverage.has(item.kode)) {
      activities.push({
        aktivitas: `Penilaian ${item.kode}`,
        deskripsi: `Penilaian ketercapaian ${item.kode}`,
        metode_evaluasi: 'Penilaian kinerja',
        bobot_per_cpmk: [{ cpmk_ref: item.kode, bobot: 1 }],
        total_bobot: 1,
      });
    }
  });
  const activityEntries = activities.flatMap((row, rowIndex) =>
    row.bobot_per_cpmk.map((item, itemIndex) => ({ rowIndex, itemIndex, value: item.bobot }))
  );
  const normalizedActivityValues = normalizeNumbersTo100(activityEntries.map((item) => item.value));
  activityEntries.forEach((entry, index) => {
    activities[entry.rowIndex].bobot_per_cpmk[entry.itemIndex].bobot = normalizedActivityValues[index];
  });
  activities.forEach((row) => {
    row.total_bobot = row.bobot_per_cpmk.reduce((sum, item) => sum + item.bobot, 0);
  });

  const stages = (blueprint.tahapan_penilaian || [])
    .filter((row) => cpmkCodes.has(row.cpmk_ref) && subCodes.has(row.sub_cpmk_ref))
    .map((row) => {
      const cpmkItem = cpmk.find((item) => item.kode === row.cpmk_ref);
      return { ...row, cpl: (cpmkItem?.cpl_terkait || []).join(', ') || '-' };
    });
  const stageCoverage = new Set(stages.map((row) => row.cpmk_ref));
  cpmk.forEach((item) => {
    if (stageCoverage.has(item.kode)) return;
    const relatedSub = subCpmk.find((sub) => sub.cpmk_ref === item.kode);
    if (!relatedSub) return;
    const relatedMatrix = matrix.find((row) => row.cpmk_ref === item.kode && row.sub_cpmk_ref === relatedSub.kode);
    stages.push({
      tahapan: `Evaluasi ${item.kode}`,
      minggu: relatedMatrix?.minggu_ke || '-',
      cpl: item.cpl_terkait?.[0] || '-',
      cpmk_ref: item.kode,
      sub_cpmk_ref: relatedSub.kode,
      assessment: relatedMatrix?.task_code || relatedMatrix?.kriteria_bentuk || 'Penilaian kinerja',
      bobot: '1%',
      kategori: parseInt(relatedMatrix?.minggu_ke, 10) >= 8 ? 'Sumatif' : 'Formatif',
    });
  });
  const normalizedStageValues = normalizeNumbersTo100(stages.map((row) => row.bobot));
  stages.forEach((row, index) => {
    row.bobot = `${normalizedStageValues[index]}%`;
  });

  let questions = (blueprint.kisi_soal || [])
    .filter((row) => subCodes.has(row.sub_cpmk_ref))
    .map((row) => ({ ...row, jumlah_soal: Math.max(Math.round(Number(row.jumlah_soal) || 0), 0) }));
  if (!questions.length) {
    questions = subCpmk.map((sub) => ({
      sub_cpmk_ref: sub.kode,
      bahan_kajian: matrix.find((row) => row.sub_cpmk_ref === sub.kode)?.materi || sub.teks,
      jumlah_soal: 1,
      persentase: 0,
    }));
  }
  const normalizedQuestionValues = normalizeNumbersTo100(questions.map((row) => row.jumlah_soal));
  questions.forEach((row, index) => {
    row.persentase = normalizedQuestionValues[index];
  });

  const providedRubrics = new Map(
    (blueprint.rubrik_per_cpmk || [])
      .filter((rubric) => cpmkCodes.has(rubric.cpmk_ref))
      .map((rubric) => [rubric.cpmk_ref, rubric])
  );
  const rubrics = cpmk.map((item) => ({
    ...(providedRubrics.get(item.kode) || {
      sangat_baik: `Menunjukkan ${item.kode} secara lengkap, akurat, mandiri, dan konsisten.`,
      baik: `Menunjukkan ${item.kode} dengan baik dan hanya terdapat kekurangan minor.`,
      cukup: `Menunjukkan sebagian ${item.kode}, tetapi masih memerlukan arahan dan perbaikan.`,
      kurang: `Belum menunjukkan capaian minimum terhadap ${item.kode}.`,
    }),
    cpmk_ref: item.kode,
    cpmk_teks: item.teks,
  }));

  return {
    ...blueprint,
    aktivitas_penilaian: activities,
    tahapan_penilaian: stages,
    kisi_soal: questions,
    rubrik_per_cpmk: rubrics,
  };
};

const assertRpsConsistency = (data) => {
  const cplCodes = new Set(allCplFlat.map((item) => item.kode));
  const cpmkCodes = new Set((data.cpmk || []).map((item) => item.kode));
  const subCpmkCodes = new Set((data.sub_cpmk || []).map((item) => item.kode));

  (data.cpmk || []).forEach((cpmk) => {
    (cpmk.cpl_terkait || []).forEach((code) => {
      if (!cplCodes.has(code)) {
        throw new Error(`CPL tidak dikenal pada ${cpmk.kode}: ${code}`);
      }
    });
  });

  (data.sub_cpmk || []).forEach((sub) => {
    if (!cpmkCodes.has(sub.cpmk_ref)) {
      throw new Error(`CPMK induk tidak valid pada ${sub.kode}: ${sub.cpmk_ref}`);
    }
  });

  const nonOperationalOpening = /^\s*(?:mahasiswa\s+mampu\s+)?(?:menguasai|memahami|mengetahui)\b/i;
  [...(data.cpmk || []), ...(data.sub_cpmk || [])].forEach((outcome) => {
    if (nonOperationalOpening.test(outcome.teks || '')) {
      throw new Error(`${outcome.kode} harus diawali KKO yang dapat diamati/diukur, bukan "menguasai/memahami/mengetahui".`);
    }
  });

  (data.matriks_pembelajaran || []).forEach((row) => {
    if (!isExamRow(row) && !subCpmkCodes.has(row.sub_cpmk_ref)) {
      throw new Error(`Sub-CPMK tidak valid pada minggu ${row.minggu_ke}: ${row.sub_cpmk_ref}`);
    }
    if (!isExamRow(row) && !cpmkCodes.has(row.cpmk_ref)) {
      throw new Error(`CPMK tidak valid pada minggu ${row.minggu_ke}: ${row.cpmk_ref}`);
    }
    if (
      !isExamRow(row) &&
      data.sub_cpmk.find((sub) => sub.kode === row.sub_cpmk_ref)?.cpmk_ref !== row.cpmk_ref
    ) {
      throw new Error(
        `Relasi CPMK/Sub-CPMK tidak konsisten pada minggu ${row.minggu_ke}.`
      );
    }
  });

  const coveredSubCpmk = new Set(
    (data.matriks_pembelajaran || [])
      .filter((row) => !isExamRow(row))
      .map((row) => row.sub_cpmk_ref)
  );
  const uncoveredSubCpmk = [...subCpmkCodes].filter((code) => !coveredSubCpmk.has(code));
  if (uncoveredSubCpmk.length) {
    throw new Error(`Sub-CPMK belum memiliki bahan kajian/aktivitas pada matriks: ${uncoveredSubCpmk.join(', ')}.`);
  }
  if ((data.matriks_pembelajaran || []).some((row) => !isExamRow(row) && !String(row.materi || '').trim())) {
    throw new Error('Setiap minggu non-ujian wajib memiliki bahan kajian yang selaras dengan Sub-CPMK.');
  }

  const matrixTotal = (data.matriks_pembelajaran || []).reduce(
    (sum, row) => sum + parsePercent(row.bobot_nilai),
    0
  );
  if (Math.abs(matrixTotal - 100) > 0.01) {
    throw new Error(`Total bobot matriks harus 100%, saat ini ${matrixTotal}%.`);
  }

  const blueprint = data.blueprint_penilaian || {};
  const activityTotal = (blueprint.aktivitas_penilaian || []).reduce((sum, row) => sum + parsePercent(row.total_bobot), 0);
  const stageTotal = (blueprint.tahapan_penilaian || []).reduce((sum, row) => sum + parsePercent(row.bobot), 0);
  const questionTotal = (blueprint.kisi_soal || []).reduce((sum, row) => sum + parsePercent(row.persentase), 0);
  if (activityTotal !== 100 || stageTotal !== 100 || questionTotal !== 100) {
    throw new Error(`Total Blueprint tidak konsisten (aktivitas ${activityTotal}%, tahapan ${stageTotal}%, kisi ${questionTotal}%).`);
  }
  const rubricCodes = new Set((blueprint.rubrik_per_cpmk || []).map((rubric) => rubric.cpmk_ref));
  if ([...cpmkCodes].some((code) => !rubricCodes.has(code))) {
    throw new Error('Rubrik Blueprint belum tersedia untuk seluruh CPMK.');
  }
  (blueprint.rubrik_per_cpmk || []).forEach((rubric) => {
    const expected = data.cpmk.find((item) => item.kode === rubric.cpmk_ref)?.teks;
    if (!expected || rubric.cpmk_teks !== expected) {
      throw new Error(`Rubrik ${rubric.cpmk_ref} tidak selaras dengan rumusan CPMK.`);
    }
  });

  (data.portofolio || []).forEach((row) => {
    if (!cpmkCodes.has(row.cpmk) || !subCpmkCodes.has(row.sub_cpmk_ref)) {
      throw new Error(`Kode portofolio minggu ${row.minggu} tidak valid (${row.cpmk}/${row.sub_cpmk_ref}).`);
    }
    if (data.sub_cpmk.find((sub) => sub.kode === row.sub_cpmk_ref)?.cpmk_ref !== row.cpmk) {
      throw new Error(`Relasi CPMK/Sub-CPMK portofolio minggu ${row.minggu} tidak konsisten.`);
    }
  });
  const taskCodes = new Set((data.matriks_pembelajaran || []).filter((row) => row.task_required).map((row) => row.task_code));
  (data.rencana_tugas || []).forEach((task) => {
    if (!taskCodes.has(task.task_code) || !subCpmkCodes.has(task.sub_cpmk_ref)) {
      throw new Error(`Rencana tugas ${task.task_code} tidak terhubung ke matriks/Sub-CPMK yang valid.`);
    }
  });

  // Pustaka validation has been moved to auto-retry phase 1
};

export default function App() {
  const [apiKeys, setApiKeys] = useState<string[]>([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('gemini_api_keys');
      if (stored) {
        setApiKeys(JSON.parse(stored));
      }
    } catch (e) {
      console.warn("Could not read API keys from local storage.");
    }
  }, []);

  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [genPhase, setGenPhase] = useState('');
  const [exportingKey, setExportingKey] = useState('');
  const [activePreview, setActivePreview] = useState('rps');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [error, setError] = useState(null);
  const [logoBase64, setLogoBase64] = useState(null);

  const [formData, setFormData] = useState({
    dosenId: '',
    dosenCustomName: '',
    dosenCustomNidn: '',
    koorId: '',
    koorCustomName: '',
    koorCustomNidn: '',
    kaprodiId: '',
    kaprodiCustomName: '',
    kaprodiCustomNidn: '',
    fasilitatorId: '',
    fasilitatorCustomName: '',
    fasilitatorCustomNidn: '',
    wakaId: '',
    wakaCustomName: '',
    wakaCustomNidn: '',
    mkName: '',
    mkCode: '',
    sks: '',
    sksTeori: '',
    sksPraktik: '',
    semester: '',
    description: '',
  });

  const [rpsData, setRpsData] = useState(null);

  const loadExternalScript = (src, globalName) => new Promise((resolve, reject) => {
    if (window[globalName]) {
      resolve(window[globalName]);
      return;
    }

    const existing = document.querySelector(`script[data-radedu-library="${globalName}"]`);
    if (existing) {
      existing.addEventListener('load', () => resolve(window[globalName]), { once: true });
      existing.addEventListener('error', () => reject(new Error(`Gagal memuat ${globalName}.`)), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.dataset.radeduLibrary = globalName;
    script.onload = () => resolve(window[globalName]);
    script.onerror = () => reject(new Error(`Gagal memuat ${globalName}. Periksa koneksi internet.`));
    document.body.appendChild(script);
  });

  useEffect(() => {
    loadExternalScript(
      'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js',
      'html2pdf'
    ).catch(() => {});
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
      const enhancedText = await callGemini(prompt, null, apiKeys);
      setFormData((prev) => ({ ...prev, description: enhancedText }));
    } catch (err) {
      setError(err.message || 'Gagal melakukan Enhance AI pada deskripsi. Pastikan koneksi internet Anda stabil.');
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
`;

    try {
      setGenPhase('Menyusun Capaian Pembelajaran & Bahan Kajian...');
      const schema1 = {
        type: 'OBJECT',
        properties: {
          kode_dokumen: { type: 'STRING' },
          cpmk: {
            type: 'ARRAY',
            items: {
              type: 'OBJECT',
              properties: {
                kode: { type: 'STRING' },
                teks: { type: 'STRING' },
                cpl_terkait: { type: 'ARRAY', items: { type: 'STRING' } },
              },
              required: ['kode', 'teks', 'cpl_terkait'],
            },
          },
          sub_cpmk: {
            type: 'ARRAY',
            items: {
              type: 'OBJECT',
              properties: {
                kode: { type: 'STRING' },
                teks: { type: 'STRING' },
                cpmk_ref: { type: 'STRING' },
              },
              required: ['kode', 'teks', 'cpmk_ref'],
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
        required: ['kode_dokumen', 'cpmk', 'sub_cpmk', 'bahan_kajian', 'pustaka'],
      };
      
      const prompt1 = `Sebagai penyusun RPS SN-Dikti di STIKES Dian Husada Prodi Teknik Radiologi Pencitraan, susun bagian identitas untuk:
MK: ${formData.mkName} (${formData.sks} SKS [T:${formData.sksTeori}, P:${formData.sksPraktik}], Sem ${formData.semester})
Deskripsi: ${formData.description}
Konteks Visi-Misi Prodi: ${visiMisiContext}
Daftar CPL-PRODI yang tersedia: ${cplList}

TUGAS:
1. Pilih HANYA CPL-PRODI yang relevan (misal TRS-1).
2. Buat 4-6 CPMK terkait CPL. Setiap rumusan wajib berbentuk "Mahasiswa mampu + SATU KKO terukur + objek kemampuan + konteks/kriteria".
3. DILARANG membuka rumusan CPMK/Sub-CPMK dengan kata menguasai, memahami, atau mengetahui. Gunakan KKO terukur seperti menjelaskan, menerapkan, menganalisis, mengevaluasi, mendemonstrasikan, merancang, atau menunjukkan.
4. Jika memilih CPL sikap (TRS), minimal satu CPMK/Sub-CPMK wajib memakai KKO afektif yang teramati (misalnya menunjukkan, mematuhi, mempertahankan, mengintegrasikan) dan indikatornya nanti dapat dinilai.
5. Buat 5-12 Sub-CPMK unik terkait tepat satu CPMK. Semua teks harus diawali "Mahasiswa mampu ".
6. Bahan kajian harus spesifik untuk setiap Sub-CPMK, bukan daftar umum.
7. Pustaka minimal 5 sumber: mayoritas terbit 2016-2026 dan minimal 2 sumber terbit 2021-2026. Prioritaskan buku standar, pedoman profesi/regulator, atau artikel ilmiah yang benar-benar dapat diidentifikasi; jangan mengarang DOI.`;
      
      const validateData1 = (data: any) => {
        const references = [...(data.pustaka?.utama || []), ...(data.pustaka?.pendukung || [])];
        const referenceYears = references
          .map((reference) => [...String(reference).matchAll(/\b(19|20)\d{2}\b/g)].map((match) => Number(match[0])).pop())
          .filter(Number.isFinite);
        const recentCount = referenceYears.filter((year) => year >= 2016 && year <= 2026).length;
        const veryRecentCount = referenceYears.filter((year) => year >= 2021 && year <= 2026).length;
        if (references.length < 5 || recentCount < Math.ceil(references.length / 2) || veryRecentCount < 2) {
          return 'Pustaka wajib minimal 5 sumber, mayoritas terbit 2016-2026, dan minimal 2 sumber terbit 2021-2026.';
        }
        return null;
      };

      const data1 = normalizeLearningOutcomeCodes(await callGemini(prompt1, schema1, apiKeys, validateData1));

      setGenPhase('Menyusun matriks pembelajaran landscape 16 minggu...');
      const cpmkListText = data1.cpmk.map((c) => `${c.kode}: ${c.teks}`).join('\n');
      const subCpmkListText = data1.sub_cpmk.map((sub) => `${sub.kode} [${sub.cpmk_ref}]: ${sub.teks}`).join('\n');
      const schema2 = {
        type: 'OBJECT',
        properties: {
          matriks_pembelajaran: {
            type: 'ARRAY',
            items: {
              type: 'OBJECT',
              properties: {
                minggu_ke: { type: 'STRING' },
                cpmk_ref: { type: 'STRING' },
                sub_cpmk_ref: { type: 'STRING' },
                indikator: { type: 'STRING' },
                kriteria_bentuk: { type: 'STRING' },
                metode_luring: { 
                  type: 'OBJECT',
                  properties: {
                    bentuk: { type: 'STRING' },
                    metode: { type: 'STRING' },
                    penugasan: { type: 'STRING' },
                    alokasi: { type: 'STRING' }
                  }
                },
                metode_daring: { 
                  type: 'OBJECT',
                  properties: {
                    bentuk: { type: 'STRING' },
                    metode: { type: 'STRING' },
                    penugasan: { type: 'STRING' }
                  }
                },
                materi: { type: 'STRING' },
                bobot_nilai: { type: 'STRING' },
                task_required: { type: 'BOOLEAN' },
                task_code: { type: 'STRING' },
              },
              required: ['minggu_ke', 'cpmk_ref', 'sub_cpmk_ref', 'indikator', 'kriteria_bentuk', 'materi', 'bobot_nilai', 'task_required', 'task_code'],
            },
          },
        },
        required: ['matriks_pembelajaran'],
      };
      
      const prompt2 = `Buat matriks pembelajaran 16 minggu (Mg 8=UTS, Mg 16=UAS) untuk MK ${formData.mkName}. Teori: ${formData.sksTeori} SKS, Praktik: ${formData.sksPraktik} SKS.
CPMK: ${cpmkListText}
Sub-CPMK: ${subCpmkListText}

PANDUAN INSTITUSI STIKES:
${panduanRpsRaw}

ATURAN:
1. Alokasi wajib: Waktu/Alokasi harus ditulis dengan format persis seperti PDF, contoh: "TM 1 (2 x 50 mnt)", "PT 1 (2 x 60 mnt)", "BM 1 (2 x 60 mnt)" atau "Praktik 1 (2 x 170 mnt)". Sesuaikan angka '1' dengan minggu ke berapa.
2. Isi Sub-CPMK menggunakan kode yang tersedia. PENTING: cpmk_ref dan sub_cpmk_ref HANYA BOLEH diisi dengan TEPAT SATU KODE (misal: "Sub-CPMK-1"). JANGAN menggunakan koma atau multi-kode.
3. Setiap Sub-CPMK wajib muncul minimal satu kali pada minggu non-ujian.
4. Materi/bahan kajian setiap minggu harus langsung mendukung Sub-CPMK pada baris yang sama; sertakan nomor atau bullet point jika perlu.
5. Indikator harus memakai perilaku yang dapat diamati. JIKA ADA BEBERAPA INDIKATOR, tuliskan sebagai poin-poin (bullet) terpisah menggunakan simbol '•' (misal: "• Ketepatan menjelaskan... \n• Ketepatan mengidentifikasi...").
6. Kriteria & Bentuk Penilaian WAJIB dipisah dengan struktur persis seperti berikut (jangan digabung): 
Kriteria:
1. (isi kriteria)
2. (isi kriteria)

Bentuk:
(isi bentuk, misal non-test, Resume)
7. Total bobot nilai = 100%. Pastikan merujuk pada "Rumus Evaluasi & Bobot Nilai Akhir" di panduan untuk menentukan bobot harian (non-ujian).
8. PENTING: Anda WAJIB mengisi objek 'metode_luring' (dengan field 'bentuk', 'metode', 'penugasan', 'alokasi') dan 'metode_daring' (dengan field 'bentuk', 'metode', 'penugasan') untuk setiap pertemuan minggu (selain ujian).`;

      const data2raw = await callGemini(prompt2, schema2, apiKeys);
      
      const sanitizeRef = (str, prefix) => {
        if (!str) return str;
        return str.trim();
      };

      if (data2raw.matriks_pembelajaran) {
        data2raw.matriks_pembelajaran = data2raw.matriks_pembelajaran.map(row => {
          if (!isExamRow(row)) {
            row.sub_cpmk_ref = sanitizeRef(row.sub_cpmk_ref, 'Sub-CPMK');
            row.cpmk_ref = sanitizeRef(row.cpmk_ref, 'CPMK');
          }
          return row;
        });
      }

      const reconciledMatrix = reconcileLearningMatrix(
        data2raw.matriks_pembelajaran,
        data1.cpmk,
        data1.sub_cpmk
      );
      const data2 = { matriks_pembelajaran: normalizeBobot(reconciledMatrix) };
      data1.bahan_kajian = rebuildAlignedStudyMaterials(data2.matriks_pembelajaran);
      const uniqueTaskRows = Array.from(new Map(data2.matriks_pembelajaran.filter((row) => row.task_required && row.task_code).map((row) => [row.task_code, row])).values());
      const taskListText = uniqueTaskRows.map((row) => {
        const subText = data1.sub_cpmk.find((sub) => sub.kode === row.sub_cpmk_ref)?.teks || '-';
        return `${row.task_code}; minggu=${row.minggu_ke}; sub_cpmk=${row.sub_cpmk_ref}; rumusan=${subText}; indikator=${row.indikator}; materi=${row.materi}; bentuk_penilaian=${row.kriteria_bentuk}`;
      }).join('\n');

      setGenPhase('Menyusun Rencana Tugas dan Blueprint Penilaian...');
      const schema3a = {
        type: 'OBJECT',
        properties: {
          portofolio: {
            type: 'ARRAY',
            items: {
              type: 'OBJECT',
              properties: { minggu: { type: 'STRING' }, cpl: { type: 'STRING' }, cpmk: { type: 'STRING' }, sub_cpmk_ref: { type: 'STRING' }, indikator: { type: 'STRING' }, materi: { type: 'STRING' }, bentuk_penilaian: { type: 'STRING' }, bobot: { type: 'STRING' } },
              required: ['minggu', 'cpl', 'cpmk', 'sub_cpmk_ref', 'indikator', 'materi', 'bentuk_penilaian', 'bobot'],
            }
          },
          rencana_tugas: {
            type: 'ARRAY',
            items: {
              type: 'OBJECT',
              properties: {
                task_code: { type: 'STRING' },
                judul: { type: 'STRING' },
                bentuk_tugas: { type: 'STRING' },
                waktu_pengerjaan: { type: 'STRING' },
                sub_cpmk_ref: { type: 'STRING' },
                deskripsi: {
                  type: 'OBJECT',
                  properties: { objek_garapan: { type: 'STRING' }, batasan: { type: 'STRING' }, manfaat: { type: 'STRING' } },
                  required: ['objek_garapan', 'batasan', 'manfaat'],
                },
                metode_pengerjaan: { type: 'ARRAY', items: { type: 'STRING' } },
                luaran: { type: 'STRING' },
                indikator_kriteria_bobot: {
                  type: 'ARRAY',
                  items: { type: 'OBJECT', properties: { indikator: { type: 'STRING' }, kriteria: { type: 'STRING' }, bobot: { type: 'STRING' } }, required: ['indikator', 'kriteria', 'bobot'] }
                },
                jadwal: { type: 'STRING' },
                pustaka: { type: 'ARRAY', items: { type: 'STRING' } },
              },
              required: ['task_code', 'judul', 'bentuk_tugas', 'waktu_pengerjaan', 'sub_cpmk_ref', 'deskripsi', 'metode_pengerjaan', 'luaran', 'indikator_kriteria_bobot', 'jadwal', 'pustaka'],
            }
          }
        },
        required: ['portofolio', 'rencana_tugas'],
      };

      const prompt3a = `Susun Portofolio Ketercapaian dan Rencana Tugas untuk MK ${formData.mkName}.
CPMK resmi:
${cpmkListText}

Sub-CPMK resmi:
${subCpmkListText}

Tugas Wajib: ${taskListText || 'Tidak ada tugas'}

PANDUAN INSTITUSI STIKES (RTM & RUBRIK):
${panduanRpsRaw}

ATURAN:
1. Buat Rencana Tugas hanya untuk task_code yang ada, sesuaikan dengan TEMPLATE STANDAR RTM (Tipe A atau Tipe B) yang ada di Panduan.
2. Setiap rencana tugas wajib mengukur Sub-CPMK, indikator, materi, dan bentuk penilaian pada baris tugas yang sama.
3. Kolom CPL wajib memakai kode CPL resmi (TRS/TRP/TRKS/TRKU), bukan kode generik seperti CPL-1.
4. PENTING: Semua kolom referensi kode (cpmk_ref, sub_cpmk_ref, dll) HANYA BOLEH berisi TEPAT SATU KODE valid.
5. Gunakan indikator, kriteria, dan bobot sesuai "Database Instrumen dan Rubrik Penilaian Standar" di Panduan.`;

      const data3a = await callGemini(prompt3a, schema3a, apiKeys);

      setGenPhase('Menyusun blueprint & rubrik penilaian (Tahap akhir)...');
      
      const schema3b = {
        type: 'OBJECT',
        properties: {
          blueprint_penilaian: {
            type: 'OBJECT',
            properties: {
              aktivitas_penilaian: {
                type: 'ARRAY',
                items: {
                  type: 'OBJECT',
                  properties: {
                    aktivitas: { type: 'STRING' },
                    deskripsi: { type: 'STRING' },
                    metode_evaluasi: { type: 'STRING' },
                    bobot_per_cpmk: { type: 'ARRAY', items: { type: 'OBJECT', properties: { cpmk_ref: { type: 'STRING' }, bobot: { type: 'NUMBER' } }, required: ['cpmk_ref', 'bobot'] } },
                    total_bobot: { type: 'NUMBER' },
                  },
                  required: ['aktivitas', 'deskripsi', 'metode_evaluasi', 'bobot_per_cpmk', 'total_bobot'],
                },
              },
              tahapan_penilaian: {
                type: 'ARRAY',
                items: {
                  type: 'OBJECT',
                  properties: { tahapan: { type: 'STRING' }, minggu: { type: 'STRING' }, cpl: { type: 'STRING' }, cpmk_ref: { type: 'STRING' }, sub_cpmk_ref: { type: 'STRING' }, assessment: { type: 'STRING' }, bobot: { type: 'STRING' }, kategori: { type: 'STRING' } },
                  required: ['tahapan', 'minggu', 'cpl', 'cpmk_ref', 'sub_cpmk_ref', 'assessment', 'bobot', 'kategori'],
                },
              },
              kisi_soal: {
                type: 'ARRAY',
                items: {
                  type: 'OBJECT',
                  properties: { sub_cpmk_ref: { type: 'STRING' }, bahan_kajian: { type: 'STRING' }, jumlah_soal: { type: 'NUMBER' }, persentase: { type: 'NUMBER' } },
                  required: ['sub_cpmk_ref', 'bahan_kajian', 'jumlah_soal', 'persentase'],
                },
              },
              rubrik_per_cpmk: {
                type: 'ARRAY',
                items: {
                  type: 'OBJECT',
                  properties: { cpmk_ref: { type: 'STRING' }, cpmk_teks: { type: 'STRING' }, sangat_baik: { type: 'STRING' }, baik: { type: 'STRING' }, cukup: { type: 'STRING' }, kurang: { type: 'STRING' } },
                  required: ['cpmk_ref', 'cpmk_teks', 'sangat_baik', 'baik', 'cukup', 'kurang'],
                },
              },
            },
            required: ['aktivitas_penilaian', 'tahapan_penilaian', 'kisi_soal', 'rubrik_per_cpmk'],
          },
        },
        required: ['blueprint_penilaian'],
      };

      const prompt3b = `Susun Blueprint Penilaian (Aktivitas, Tahapan, Kisi Soal, Rubrik) untuk MK ${formData.mkName}.
CPMK resmi:
${cpmkListText}

Sub-CPMK resmi:
${subCpmkListText}

PANDUAN INSTITUSI STIKES (RTM & RUBRIK):
${panduanRpsRaw}

ATURAN:
1. Total aktivitas penilaian = 100, total tahapan penilaian = 100, dan total persentase kisi soal = 100.
2. Setiap CPMK wajib muncul minimal sekali pada aktivitas dan tahapan penilaian.
3. Buat tepat satu rubrik untuk SETIAP CPMK yang tersedia; tidak boleh ada CPMK tanpa rubrik. Selaraskan dengan "Database Instrumen dan Rubrik Penilaian Standar" di Panduan jika sesuai.
4. Kisi soal harus menggunakan Sub-CPMK valid dan jumlah soal harus lebih dari nol.
5. Setiap deskriptor rubrik wajib mengukur KKO dan objek kemampuan pada CPMK yang bersangkutan. cpmk_teks harus sama persis dengan rumusan CPMK resmi.
6. UTS dan UAS harus memiliki bobot lebih dari nol dan dipetakan ke CPMK yang benar.
7. PENTING: Semua kolom referensi kode (cpmk_ref, sub_cpmk_ref, dll) HANYA BOLEH berisi TEPAT SATU KODE valid.`;

      const data3b = await callGemini(prompt3b, schema3b, apiKeys);
      
      const data3 = { ...data3a, ...data3b };

      if (data3.portofolio) {
        data3.portofolio = data3.portofolio.map(row => {
          row.sub_cpmk_ref = sanitizeRef(row.sub_cpmk_ref, 'Sub-CPMK');
          row.cpmk = sanitizeRef(row.cpmk, 'CPMK');
          return row;
        });
      }
      if (data3.rencana_tugas) {
        data3.rencana_tugas = data3.rencana_tugas.map(row => {
          row.sub_cpmk_ref = sanitizeRef(row.sub_cpmk_ref, 'Sub-CPMK');
          return row;
        });
      }
      if (data3.blueprint_penilaian?.tahapan_penilaian) {
        data3.blueprint_penilaian.tahapan_penilaian = data3.blueprint_penilaian.tahapan_penilaian.map(row => {
          row.sub_cpmk_ref = sanitizeRef(row.sub_cpmk_ref, 'Sub-CPMK');
          row.cpmk_ref = sanitizeRef(row.cpmk_ref, 'CPMK');
          return row;
        });
      }
      if (data3.blueprint_penilaian?.kisi_soal) {
        data3.blueprint_penilaian.kisi_soal = data3.blueprint_penilaian.kisi_soal.map(row => {
          row.sub_cpmk_ref = sanitizeRef(row.sub_cpmk_ref, 'Sub-CPMK');
          return row;
        });
      }
      if (data3.blueprint_penilaian?.aktivitas_penilaian) {
        data3.blueprint_penilaian.aktivitas_penilaian = data3.blueprint_penilaian.aktivitas_penilaian.map((row) => ({
          ...row,
          bobot_per_cpmk: (row.bobot_per_cpmk || []).map((item) => ({
            ...item,
            cpmk_ref: sanitizeRef(item.cpmk_ref, 'CPMK'),
          })),
        }));
      }
      if (data3.blueprint_penilaian?.rubrik_per_cpmk) {
        data3.blueprint_penilaian.rubrik_per_cpmk = data3.blueprint_penilaian.rubrik_per_cpmk.map((rubric) => ({
          ...rubric,
          cpmk_ref: sanitizeRef(rubric.cpmk_ref, 'CPMK'),
        }));
      }

      const reconciledData3 = reconcileGeneratedArtifacts(
        data3,
        data2.matriks_pembelajaran,
        data1.cpmk,
        data1.sub_cpmk
      );

      reconciledData3.blueprint_penilaian = completeBlueprintData(
        data3.blueprint_penilaian,
        data1.cpmk,
        data1.sub_cpmk,
        data2.matriks_pembelajaran
      );

      const completeData = { ...data1, ...data2, ...reconciledData3 };
      assertRpsConsistency(completeData);
      setRpsData(completeData);
      setStep(3);
    } catch (err) {
      console.error(err);
      setError(`Gagal menghasilkan RPS: ${err.message || 'respons AI tidak valid'}`);
      setStep(1);
    } finally {
      setIsGenerating(false);
      setGenPhase('');
    }
  };

  const safeFilePart = (value) => (value || 'Dokumen')
    .trim()
    .replace(/[^a-zA-Z0-9\u00C0-\u024F_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const getDocumentConfig = (documentType) => {
    const isBlueprint = documentType === 'blueprint';
    const prefix = isBlueprint ? 'Blueprint' : 'RPS';
    return {
      elementId: isBlueprint ? 'blueprint-document' : 'rps-document',
      label: isBlueprint ? 'Blueprint Penilaian' : 'RPS',
      filename: `${prefix}_${safeFilePart(formData.mkName)}_${safeFilePart(formData.mkCode)}`,
      orientation: isBlueprint ? 'portrait' : 'landscape',
      exportWidth: isBlueprint ? 794 : 1122,
    };
  };

  const handleExportPdf = (documentType) => {
    const config = getDocumentConfig(documentType);
    const originalElement = document.getElementById(config.elementId);
    if (!originalElement) return;

    const key = `${documentType}-pdf`;
    setExportingKey(key);
    setError(null);

    // Create a clone to sanitize unsupported CSS functions like oklch for html2canvas
    const clone = originalElement.cloneNode(true);
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.top = '0';
    container.appendChild(clone);
    document.body.appendChild(container);

    // html2canvas throws errors on Tailwind v4's oklch/oklab colors
    const elements = [clone, ...clone.querySelectorAll('*')];
    elements.forEach((el) => {
      const computed = window.getComputedStyle(el);
      const colorProps = ['color', 'backgroundColor', 'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor'];
      colorProps.forEach((prop) => {
        const val = computed[prop];
        if (val && (val.includes('oklch') || val.includes('oklab') || val.includes('color('))) {
          if (prop === 'backgroundColor') el.style[prop] = el.tagName.toLowerCase() === 'th' ? '#f3f4f6' : '#ffffff';
          else if (prop === 'color') el.style[prop] = '#1e293b';
          else el.style[prop] = '#000000';
        }
      });
    });

    const opt = {
      margin: [10, 10, 10, 10], // margin in mm
      filename: `${config.filename}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: config.orientation },
      pagebreak: {
        mode: ['avoid-all', 'css', 'legacy'],
        before: '.page-break',
        avoid: ['.break-inside-avoid', 'tr', 'table', 'thead']
      }
    };

    if (window.html2pdf) {
      window.html2pdf().set(opt).from(clone).save().then(() => {
        setExportingKey('');
        document.body.removeChild(container);
      }).catch((err) => {
        console.error('PDF export failed:', err);
        setError(`Ekspor PDF ${config.label} gagal: ${err.message}`);
        setExportingKey('');
        document.body.removeChild(container);
      });
    } else {
      setError('Library PDF belum siap. Coba lagi dalam beberapa detik.');
      setExportingKey('');
      document.body.removeChild(container);
    }
  };

  const copyComputedStyles = (source, target) => {
    const properties = [
      'background-color', 'border', 'border-collapse', 'border-color', 'border-style',
      'border-width', 'color', 'display', 'font-family', 'font-size', 'font-style',
      'font-weight', 'height', 'line-height', 'margin', 'padding', 'text-align',
      'text-decoration', 'vertical-align', 'white-space', 'width',
    ];
    const computed = window.getComputedStyle(source);
    target.style.cssText = properties
      .map((property) => `${property}:${computed.getPropertyValue(property)}`)
      .join(';');

    Array.from(source.children).forEach((child, index) => {
      if (target.children[index]) copyComputedStyles(child, target.children[index]);
    });
  };

  const downloadBlob = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const patchDocxPageLayout = async (blob, orientation) => {
    const JSZip = await loadExternalScript(
      'https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js',
      'JSZip'
    );
    const zip = await JSZip.loadAsync(blob);
    const documentPart = zip.file('word/document.xml');
    if (!documentPart) return blob;

    let xml = await documentPart.async('string');
    const pageSize = orientation === 'portrait'
      ? '<w:pgSz w:w="11906" w:h="16838"/>'
      : '<w:pgSz w:w="16838" w:h="11906" w:orient="landscape"/>';
    xml = xml.replace(/<w:pgSz\b[^>]*\/>/, pageSize);
    xml = xml.replace(
      /<w:pgMar\b[^>]*\/>/,
      '<w:pgMar w:top="567" w:right="567" w:bottom="567" w:left="567" w:header="284" w:footer="284" w:gutter="0"/>'
    );
    zip.file('word/document.xml', xml);
    return zip.generateAsync({
      type: 'blob',
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      compression: 'DEFLATE',
    });
  };

  const handleExportWord = async (documentType) => {
    const config = getDocumentConfig(documentType);
    const element = document.getElementById(config.elementId);
    if (!element) return;

    const key = `${documentType}-word`;
    setExportingKey(key);
    setError(null);
    try {
      const htmlDocx = await loadExternalScript(
        'https://cdn.jsdelivr.net/npm/html-docx-js@0.3.1/dist/html-docx.js',
        'htmlDocx'
      );
      const clone = element.cloneNode(true);
      copyComputedStyles(element, clone);
      clone.removeAttribute('id');
      clone.classList.remove('hidden');
      Object.assign(clone.style, {
        display: 'block',
        width: '100%',
        maxWidth: '100%',
        minHeight: '0',
        margin: '0',
        padding: '0',
        border: '0',
        boxShadow: 'none',
        boxSizing: 'border-box',
      });
      Array.from(clone.children).forEach((page) => {
        page.style.width = '100%';
        page.style.maxWidth = '100%';
        page.style.marginLeft = '0';
        page.style.marginRight = '0';
        page.style.boxSizing = 'border-box';
      });
      clone.querySelectorAll('table').forEach((table) => {
        table.style.width = '100%';
        table.style.maxWidth = '100%';
        table.style.tableLayout = 'fixed';
      });
      clone.querySelectorAll('th, td').forEach((cell) => {
        let width = 'auto';
        const wMatch = (cell.getAttribute('class') || '').match(/w-\[(\d+(?:\.\d+)?)%\]/);
        if (wMatch) {
          width = `${wMatch[1]}%`;
        }
        cell.style.setProperty('width', width, 'important');
        cell.style.maxWidth = 'none';
        cell.style.whiteSpace = 'normal';
        cell.style.wordBreak = 'break-word';
      });
      clone.querySelectorAll('.page-break').forEach((page) => {
        page.style.pageBreakBefore = 'always';
      });
      clone.querySelectorAll('thead').forEach((head) => {
        head.style.display = 'table-header-group';
      });
      clone.querySelectorAll('tr, .break-inside-avoid, .signature-block').forEach((node) => {
        node.style.pageBreakInside = 'avoid';
      });

      const wordPageSize = config.orientation === 'portrait' ? '595.3pt 841.9pt' : '841.9pt 595.3pt';
      const wordOrientation = config.orientation === 'landscape' ? 'mso-page-orientation: landscape;' : '';
      const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
        @page WordSection1 { size: ${wordPageSize}; margin: 28.35pt; ${wordOrientation} }
        div.WordSection1 { page: WordSection1; }
        html, body, div.WordSection1 { width: 100%; margin: 0; padding: 0; }
        table { border-collapse: collapse; width: 100%; max-width: 100%; table-layout: fixed; }
        th, td { white-space: normal; word-wrap: break-word; }
        thead { display: table-header-group; }
        tr { page-break-inside: avoid; }
      </style></head><body><div class="WordSection1">${clone.outerHTML}</div></body></html>`;
      const rawBlob = htmlDocx.asBlob(html, {
        orientation: config.orientation,
        margins: { top: 567, right: 567, bottom: 567, left: 567 },
      });
      const blob = await patchDocxPageLayout(rawBlob, config.orientation);
      downloadBlob(blob, `${config.filename}.docx`);
    } catch (exportError) {
      console.error('Word export failed:', exportError);
      setError(`Ekspor Word ${config.label} gagal: ${exportError.message}`);
    } finally {
      setExportingKey('');
    }
  };

  const resolvePerson = (idKey, nameKey, nidnKey) => {
    const customName = formData[nameKey]?.trim();
    if (customName) {
      return { nama: customName, nidn: formData[nidnKey]?.trim() || '' };
    }
    return lecturers.find((lecturer) => lecturer.id === formData[idKey]) || null;
  };

  const selectedLecturer = resolvePerson('dosenId', 'dosenCustomName', 'dosenCustomNidn');
  const selectedKoor = resolvePerson('koorId', 'koorCustomName', 'koorCustomNidn');
  const selectedKaprodi = resolvePerson('kaprodiId', 'kaprodiCustomName', 'kaprodiCustomNidn');
  const selectedFasilitator = resolvePerson('fasilitatorId', 'fasilitatorCustomName', 'fasilitatorCustomNidn');
  const selectedWaka = resolvePerson('wakaId', 'wakaCustomName', 'wakaCustomNidn');
  const dateFormatted = new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });

  const teoriSks = parseInt(formData.sksTeori, 10) || 0;
  const praktikumSks = parseInt(formData.sksPraktik, 10) || 0;
  const usedCplCodes = new Set((rpsData?.cpmk || []).flatMap((c) => c.cpl_terkait || []));
  const subCpmkByCode = Object.fromEntries(
    (rpsData?.sub_cpmk || []).map((sub) => [sub.kode, sub])
  );

  const personRoles = [
    { label: 'Dosen Pengembang', idKey: 'dosenId', nameKey: 'dosenCustomName', nidnKey: 'dosenCustomNidn' },
    { label: 'Koordinator RMK', idKey: 'koorId', nameKey: 'koorCustomName', nidnKey: 'koorCustomNidn' },
    { label: 'Ketua PRODI', idKey: 'kaprodiId', nameKey: 'kaprodiCustomName', nidnKey: 'kaprodiCustomNidn' },
    { label: 'Fasilitator', idKey: 'fasilitatorId', nameKey: 'fasilitatorCustomName', nidnKey: 'fasilitatorCustomNidn' },
    { label: 'WAKA / Wakil Ketua 1', idKey: 'wakaId', nameKey: 'wakaCustomName', nidnKey: 'wakaCustomNidn' },
  ];

  const renderStep1 = () => (
    <div className="max-w-5xl mx-auto bg-white p-5 sm:p-8 rounded-2xl shadow-sm border border-slate-200 print:hidden">
      <div className="mb-8 border-b border-slate-100 pb-6 flex flex-col md:flex-row md:justify-between md:items-start gap-5">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <BookOpen className="text-teal-600 w-6 h-6" /> Profil RPS
          </h2>
          <p className="text-slate-500 mt-1">Lengkapi parameter untuk mengatur Rencana Pembelajaran Semester.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl font-semibold transition-colors"
          >
            <Settings className="w-4 h-4" />
            Pengaturan API
          </button>
          
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
    </div>

      <div className="space-y-6">
        <div className="bg-slate-50 p-5 sm:p-6 rounded-xl border border-slate-200 mb-6">
          <div className="mb-5">
            <h3 className="font-bold text-slate-800">Dosen dan Pejabat Penandatangan</h3>
            <p className="text-sm text-slate-500 mt-1">Pilih dari daftar atau tulis nama sendiri. Nama manual akan dipakai jika kedua pilihan terisi.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {personRoles.map((role) => (
              <div key={role.idKey} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-800 mb-3">
                  <User className="w-4 h-4 text-teal-600 shrink-0" /> {role.label}
                </label>
                <select
                  name={role.idKey}
                  value={formData[role.idKey]}
                  onChange={handleInputChange}
                  className="w-full min-h-11 px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none bg-white text-sm"
                >
                  <option value="">-- Pilih dari daftar dosen --</option>
                  {lecturers.map((lecturer) => (
                    <option key={lecturer.id} value={lecturer.id}>{lecturer.nama}</option>
                  ))}
                </select>
                <div className="flex items-center gap-3 my-3" aria-hidden="true">
                  <span className="h-px bg-slate-200 flex-1" />
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">atau tulis sendiri</span>
                  <span className="h-px bg-slate-200 flex-1" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_140px] gap-2">
                  <input
                    type="text"
                    name={role.nameKey}
                    value={formData[role.nameKey]}
                    onChange={handleInputChange}
                    placeholder="Nama lengkap dan gelar"
                    aria-label={`Nama manual ${role.label}`}
                    className="w-full min-h-11 px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-sm"
                  />
                  <input
                    type="text"
                    name={role.nidnKey}
                    value={formData[role.nidnKey]}
                    onChange={handleInputChange}
                    placeholder="NIDN/NUPTK"
                    aria-label={`NIDN atau NUPTK ${role.label}`}
                    className="w-full min-h-11 px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
            <GraduationCap className="w-4 h-4 text-teal-600" /> Pilih Mata Kuliah (Ketik untuk mencari)
          </label>
          <Select
            options={courses.map((c) => ({ value: c.nama, label: `Semester ${c.semester} - ${c.nama}` }))}
            value={formData.mkName ? { value: formData.mkName, label: courses.find(c => c.nama === formData.mkName) ? `Semester ${courses.find(c => c.nama === formData.mkName).semester} - ${formData.mkName}` : formData.mkName } : null}
            onChange={(option) => handleCourseChange({ target: { name: 'mkName', value: option ? option.value : '' } })}
            placeholder="-- Cari Mata Kuliah Kurikulum --"
            isClearable
            className="mb-6 text-sm"
            styles={{
              control: (base) => ({
                ...base,
                minHeight: '48px',
                borderRadius: '0.5rem',
                borderColor: '#cbd5e1',
                boxShadow: 'none',
                '&:hover': {
                  borderColor: '#0f766e'
                }
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isSelected ? '#0f766e' : state.isFocused ? '#ccfbf1' : 'transparent',
                color: state.isSelected ? 'white' : '#334155',
                cursor: 'pointer'
              })
            }}
          />
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
            disabled={!formData.mkName || !selectedLecturer || !selectedFasilitator || !selectedWaka || !formData.description || isGenerating}
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
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 p-3 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex-1 ml-4">
          <div className="inline-flex self-start rounded-lg bg-slate-100 p-1" role="tablist" aria-label="Preview dokumen">
            {[
              { type: 'rps', title: 'Preview RPS' },
              { type: 'blueprint', title: 'Preview Blueprint' },
            ].map((tab) => (
              <button
                key={tab.type}
                type="button"
                role="tab"
                aria-selected={activePreview === tab.type}
                onClick={() => {
                  setActivePreview(tab.type);
                  setError(null);
                }}
                className={`px-4 py-2.5 rounded-md text-sm font-semibold transition ${activePreview === tab.type ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              >
                {tab.title}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wide text-slate-400 mr-1">
              Download {activePreview === 'rps' ? 'RPS' : 'Blueprint'}:
            </span>
            <button
              onClick={() => handleExportPdf(activePreview)}
              disabled={Boolean(exportingKey)}
              className="bg-slate-800 hover:bg-slate-900 disabled:bg-slate-400 text-white px-4 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition text-sm"
            >
              {exportingKey === `${activePreview}-pdf` ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              {exportingKey === `${activePreview}-pdf` ? 'Mengekspor...' : 'PDF'}
            </button>
            <button
              onClick={() => handleExportWord(activePreview)}
              disabled={Boolean(exportingKey)}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-4 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition text-sm"
            >
              {exportingKey === `${activePreview}-word` ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              {exportingKey === `${activePreview}-word` ? 'Mengekspor...' : 'Word'}
            </button>
          </div>
        </div>
      </div>
      
      {error && (
        <div className="max-w-[297mm] mx-auto mb-4 px-4">
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-start gap-2">
            <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}

      <style>
        {`
          @media print {
            @page {
              size: A4 ${activePreview === 'blueprint' ? 'portrait' : 'landscape'};
              margin: 10mm;
            }
          }
        `}
      </style>

      {/* RPS DOCUMENT */}
      <div id="rps-document" className={`export-document mx-auto bg-white p-10 print:border-none print:shadow-none print:p-0 font-[Arial,Helvetica,sans-serif] text-black w-full max-w-[297mm] min-h-[210mm] box-border relative ${activePreview === 'rps' ? '' : 'hidden'}`}>

        {/* HALAMAN 1: RPS HEADER & IDENTITAS - mengikuti format Word acuan */}
        <div className="document-first-page pt-4">
          <table className="w-full border-collapse border border-black mb-0">
            <tbody>
              <tr>
                <td rowSpan={2} style={{ width: '15%', verticalAlign: 'middle', textAlign: 'center' }} className="border border-black p-2">
                  <div className="w-20 h-20 mx-auto flex flex-col items-center justify-center text-center">
                    {logoBase64 ? (
                      <img src={logoBase64} alt="Logo Kecil" className="max-w-full max-h-full object-contain" style={{ maxHeight: '75px', maxWidth: '75px' }} />
                    ) : (
                      <div className="w-full h-full border-2 border-slate-300 rounded-full flex items-center justify-center text-slate-400 font-semibold text-[8px]">
                        [LOGO]
                      </div>
                    )}
                  </div>
                </td>
                <td colSpan={4} style={{ width: '70%', verticalAlign: 'middle', textAlign: 'center' }} className="border border-black p-2">
                  <h1 className="text-base font-bold uppercase mb-1" style={{ textAlign: 'center', margin: 0 }}>ILMU KEPERAWATAN, STIKES DIAN HUSADA MOJOKERTO</h1>
                </td>
                <td style={{ width: '15%', verticalAlign: 'middle', textAlign: 'center' }} className="border border-black p-2 font-bold text-[9pt]">
                  Kode<br />Dokumen<br /><span className="font-normal">{rpsData?.kode_dokumen || ''}</span>
                </td>
              </tr>
              <tr>
                <td colSpan={5} className="text-center font-bold text-[11pt] p-2 border border-black uppercase">
                  RENCANA PEMBELAJARAN SEMESTER
                </td>
              </tr>
              <tr className="bg-white">
                <td className={`${td} font-bold w-[15%] text-left`}>MATA KULIAH (MK)</td>
                <td className={`${td} font-bold w-[15%] text-left`}>KODE</td>
                <td className={`${td} font-bold w-[20%] text-left`}>Rumpun MK</td>
                <td className={`${td} font-bold w-[15%] text-left`}>BOBOT (sks)</td>
                <td className={`${td} font-bold w-[10%] text-left`}>SMT</td>
                <td className={`${td} font-bold w-[25%] text-left`}>Tgl Penyusunan</td>
              </tr>
              <tr>
                <td className={`${td} text-left`}>{formData.mkName}</td>
                <td className={`${td} text-left`}>{formData.mkCode}</td>
                <td className={`${td} text-left`}>Mata Kuliah Inti / Pencitraan</td>
                <td className={`${td} text-left`}>
                  T = {formData.sksTeori} <span className="ml-3">P = {formData.sksPraktik || '-'}</span>
                </td>
                <td className={`${td} text-left text-center`}>{formData.semester}</td>
                <td className={`${td} text-left`}>{dateFormatted}</td>
              </tr>
            </tbody>
          </table>

          <table className="w-full border-collapse border border-black border-t-0 text-center mb-4">
            <tbody>
              <tr>
                <td rowSpan={2} className={`${td} font-bold w-[15%] text-left align-top border-t-0`}>OTORISASI</td>
                <td className={`${td} font-bold bg-white border-t-0 w-[21.25%]`}>Pengembang RPS</td>
                <td className={`${td} font-bold bg-white border-t-0 w-[21.25%]`}>Koordinator RMK</td>
                <td className={`${td} font-bold bg-white border-t-0 w-[21.25%]`}>Ketua PRODI</td>
                <td className={`${td} font-bold bg-white border-t-0 w-[21.25%]`}>Waka</td>
              </tr>
              <tr>
                <td className="p-2 border border-black h-20 align-bottom text-[9pt]">{selectedLecturer ? selectedLecturer.nama : ''}</td>
                <td className="p-2 border border-black h-20 align-bottom text-[9pt]">{selectedKoor ? selectedKoor.nama : ''}</td>
                <td className="p-2 border border-black h-20 align-bottom text-[9pt]">{selectedKaprodi ? selectedKaprodi.nama : ''}</td>
                <td className="p-2 border border-black h-20 align-bottom text-[9pt]">{selectedWaka ? selectedWaka.nama : ''}</td>
              </tr>
            </tbody>
          </table>

          <table className="pt-4 w-full border-collapse border border-black mb-4 export-page">
            <tbody>
              {(() => {
                const relevantCpls = allCplFlat.filter((c) => usedCplCodes.has(c.kode));
                const cpmkCount = rpsData?.cpmk?.length || 0;
                const subCpmkCount = rpsData?.sub_cpmk?.length || 0;
                const totalRowSpan = 1 + relevantCpls.length + 1 + cpmkCount + 1 + subCpmkCount;
                return (
                  <tr>
                    <td rowSpan={totalRowSpan} className={`${td} w-[15%] font-bold align-top bg-white`}>Capaian Pembelajaran (CP)</td>
                    <td className={`${th} text-left bg-white`} colSpan={2}>CPL-PRODI yang dibebankan pada MK</td>
                  </tr>
                );
              })()}
              {allCplFlat.filter((c) => usedCplCodes.has(c.kode)).map((c) => (
                <tr key={c.kode}>
                  <td className={`${td} w-[15%] font-bold bg-white text-left whitespace-nowrap`}>{c.kode}</td>
                  <td className={`${td} bg-white text-left`}>{c.teks}</td>
                </tr>
              ))}
              <tr><td className={`${th} text-left bg-white`} colSpan={2}>Capaian Pembelajaran Mata Kuliah (CPMK)</td></tr>
              {rpsData?.cpmk?.map((item, idx) => (
                <tr key={idx}>
                  <td className={`${td} w-[15%] font-bold bg-white text-left whitespace-nowrap`}>{item.kode}</td>
                  <td className={`${td} bg-white text-left`}>{item.teks}</td>
                </tr>
              ))}
              <tr><td className={`${th} text-left bg-white`} colSpan={2}>Sub Capaian Pembelajaran Mata Kuliah (Sub-CPMK)</td></tr>
              {rpsData?.sub_cpmk?.map((item) => (
                <tr key={item.kode}>
                  <td className={`${td} w-[15%] font-bold bg-white text-left whitespace-nowrap`}>{item.kode}</td>
                  <td className={`${td} bg-white text-left`}>
                    {item.teks}
                    <span className="block text-[7pt] text-slate-500 font-bold mt-1">Induk: {item.cpmk_ref}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mb-4 break-inside-avoid">
            <h3 className="font-bold text-[9pt] mb-1">Korelasi CPMK terhadap CPL</h3>
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

          <div className="mb-4 break-inside-avoid">
            <h3 className="font-bold text-[9pt] mb-1">Korelasi CPMK terhadap Sub-CPMK</h3>
            <table className="w-full border-collapse border border-black text-center text-[9pt]">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-black p-1 w-[10%] font-bold">CPMK</th>
                  {rpsData?.sub_cpmk?.map((sub) => (
                    <th key={sub.kode} className="border border-black p-1 font-bold">{sub.kode}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rpsData?.cpmk?.map((cpmk) => (
                  <tr key={cpmk.kode}>
                    <td className="border border-black p-1 font-bold bg-gray-50">{cpmk.kode}</td>
                    {rpsData?.sub_cpmk?.map((sub) => (
                      <td key={sub.kode} className="border border-black p-1 font-bold text-[10pt]">
                        {sub.cpmk_ref === cpmk.kode ? '√' : ''}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <table className="page-break pt-4 w-full border-collapse border border-black mb-6 export-page">
            <tbody>
              <tr className="break-inside-avoid">
                <td className={`${td} font-bold w-[15%] bg-gray-50`}>Deskripsi Singkat MK</td>
                <td className={`${td} text-justify`}>{formData.description}</td>
              </tr>
              <tr className="break-inside-avoid">
                <td className={`${td} font-bold bg-gray-50`}>Bahan Kajian / Materi Pembelajaran</td>
                <td className={`${td} align-top`}>
                  <div className="space-y-1">
                    {rpsData?.bahan_kajian?.map((item, idx) => <div key={idx} className="whitespace-pre-wrap text-left">{item}</div>)}
                  </div>
                </td>
              </tr>
              <tr className="break-inside-avoid">
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
              <tr className="break-inside-avoid">
                <td className={`${td} font-bold bg-gray-50`}>Dosen Pengampu</td>
                <td className={td}>{selectedLecturer?.nama || '-'}</td>
              </tr>
              <tr className="break-inside-avoid">
                <td className={`${td} font-bold bg-gray-50`}>Mata Kuliah Syarat</td>
                <td className={td}>-</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* HALAMAN 3: MATRIKS 16 PERTEMUAN */}
        <div className="page-break pt-4 export-page">
          <h3 className="font-bold text-[10.5pt] mb-2 uppercase text-center">
            Rincian Rencana Pembelajaran (Matriks 16 Pertemuan)
          </h3>
          <table className="w-full border-collapse border border-black text-[8.5pt]">
            <thead className="bg-gray-100 text-center font-bold">
              <tr>
                <th rowSpan={2} className="border border-black p-1 w-[3%]">Mg Ke-</th>
                <th rowSpan={2} className="border border-black p-1 w-[15%]">Sub-CPMK<br/>(Kemampuan akhir tiap tahapan belajar)</th>
                <th colSpan={2} className="border border-black p-1">Penilaian</th>
                <th colSpan={2} className="border border-black p-1">Bentuk Pembelajaran,<br/>Metode Pembelajaran,<br/>Penugasan Mahasiswa,</th>
                <th rowSpan={2} className="border border-black p-1 w-[8%]">Waktu</th>
                <th rowSpan={2} className="border border-black p-1 w-[8%]">Fasilitator</th>
                <th rowSpan={2} className="border border-black p-1 w-[15%]">Materi Pembelajaran<br/>[ Pustaka ]</th>
                <th rowSpan={2} className="border border-black p-1 w-[5%]">Bobot Penilaian (%)</th>
              </tr>
              <tr>
                <th className="border border-black p-1 w-[12%]">Indikator</th>
                <th className="border border-black p-1 w-[10%]">Kriteria & Bentuk</th>
                <th className="border border-black p-1 w-[12%]">Luring (offline)</th>
                <th className="border border-black p-1 w-[12%]">Daring (online)</th>
              </tr>
              <tr>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                  <th key={num} className="border border-black p-1 font-normal">-{num}</th>
                ))}
              </tr>
            </thead>
            <tbody className="align-top leading-snug">
              {(rpsData?.matriks_pembelajaran || []).map((row, idx) => {
                if (isExamRow(row)) {
                  return (
                    <tr key={idx} className="bg-gray-200 font-bold text-center break-inside-avoid">
                      <td className="border border-black p-2">{row.minggu_ke}</td>
                      <td className="border border-black p-2 tracking-widest" colSpan={8}>
                        {String(row.minggu_ke).trim() === '8' ? 'UJIAN TENGAH SEMESTER' : 'UJIAN AKHIR SEMESTER'}
                      </td>
                      <td className="border border-black p-2">{row.bobot_nilai}</td>
                    </tr>
                  );
                }
                return (
                  <tr key={idx} className="break-inside-avoid">
                    <td className={tdCenter}>{row.minggu_ke}</td>
                    <td className={`${td} align-top text-left`}>
                      <span>{subCpmkByCode[row.sub_cpmk_ref]?.teks || '-'}</span>
                    </td>
                    <td className={`${td} whitespace-pre-wrap align-top text-left leading-relaxed`}>{row.indikator}</td>
                    <td className={`${td} whitespace-pre-wrap align-top text-left leading-relaxed`}>{row.kriteria_bentuk}</td>
                    <td className={`${td} align-top text-left leading-relaxed`}>
                      {row.metode_luring?.bentuk && <div>&gt; {row.metode_luring?.bentuk}</div>}
                      {row.metode_luring?.metode && <div>&gt; {row.metode_luring?.metode}</div>}
                      {row.metode_luring?.penugasan && <div>&gt; {row.metode_luring?.penugasan}</div>}
                    </td>
                    <td className={`${td} align-top text-left leading-relaxed`}>
                      {typeof row.metode_daring === 'string' ? (
                        <div className="whitespace-pre-wrap">{row.metode_daring}</div>
                      ) : (
                        <>
                          {row.metode_daring?.bentuk && <div>&gt; {row.metode_daring?.bentuk}</div>}
                          {row.metode_daring?.metode && <div>&gt; {row.metode_daring?.metode}</div>}
                          {row.metode_daring?.penugasan && <div>&gt; {row.metode_daring?.penugasan}</div>}
                        </>
                      )}
                    </td>
                    <td className={`${tdCenter} whitespace-pre-wrap align-top`}>{row.metode_luring?.alokasi || '-'}</td>
                    <td className={`${tdCenter} align-top`}>{selectedFasilitator?.nama || '-'}</td>
                    <td className={`${td} whitespace-pre-wrap align-top text-left`}>{row.materi}</td>
                    <td className={tdCenter}>{row.bobot_nilai}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* CATATAN LEGEND BARU */}
        <div className="pt-4 pb-6 text-[8.5pt] text-left break-inside-avoid px-2">
          <div className="font-bold underline mb-1">Catatan:</div>
          <ol className="list-decimal list-outside ml-4 mb-4 space-y-1 text-justify">
            <li>Capaian Pembelajaran Lulusan PRODI (CPL-PRODI) adalah kemampuan yang dimiliki oleh setiap lulusan PRODI yang merupakan internalisasi dari sikap, penguasaan pengetahuan dan ketrampilan sesuai dengan jenjang prodinya yang diperoleh melalui proses pembelajaran.</li>
            <li>CPL yang dibebankan pada mata kuliah adalah beberapa capaian pembelajaran lulusan program studi (CPL-PRODI) yang digunakan untuk pembentukan/pengembangan sebuah mata kuliah yang terdiri dari aspek sikap, ketrampulan umum, ketrampilan khusus dan pengetahuan.</li>
            <li>CP Mata kuliah (CPMK) adalah kemampuan yang dijabarkan secara spesifik dari CPL yang dibebankan pada mata kuliah, dan bersifat spesifik terhadap bahan kajian atau materi pembelajaran mata kuliah tersebut.</li>
            <li>Sub-CP Mata kuliah (Sub-CPMK) adalah kemampuan yang dijabarkan secara spesifik dari CPMK yang dapat diukur atau diamati dan merupakan kemampuan akhir yang direncanakan pada tiap tahap pembelajaran, dan bersifat spesifik terhadap materi pembelajaran mata kuliah tersebut.</li>
            <li>Kriteria Penilaian adalah patokan yang digunakan sebagai ukuran atau tolok ukur ketercapaian pembelajaran dalam penilaian berdasarkan indikator-indikator yang telah ditetapkan. Kriteria penilaian merupakan pedoman bagi penilai agar penilaian konsisten dan tidak bias. Kriteria dapat berupa kuantitatif ataupun kualitatif.</li>
            <li>Indikator penilaian kemampuan dalam proses maupun hasil belajar mahasiswa adalah pernyataan spesifik dan terukur yang mengidentifikasi kemampuan atau kinerja hasil belajar mahasiswa yang disertai bukti-bukti.</li>
          </ol>
          <div className="font-bold mb-1">Penilaian</div>
          <div className="pl-4">
            <div>a. Aspek Penilaian</div>
            <div className="pl-4">
              <div>1) Sikap : cara menyampaikan pendapat dalam diskusi, tanggungjawab dalam menyelesaikan tugas</div>
              <div>2) Pengetahuan: penguasaan materi yang ditunjukkan dalam diskusi, ujian tengah semester dan ujian akhir semester</div>
              <div>3) Keterampilan: ketepatan melakukan tindakan/prosedur, kreatifitas membuat ppt, menggunakan program, membuat diagram prosedur/ proses</div>
            </div>
            <div className="mt-2">b. Bobot Penilaian</div>
            <div className="pl-4">
              <table className="border-none w-auto text-[8.5pt]">
                <tbody>
                  <tr><td className="pr-2 border-none">Bobot Nilai Harian (NH) nilai tugas terstruktur</td><td className="border-none">= 60 %</td></tr>
                  <tr><td className="pr-2 border-none">Bobot Nilai Ujian Tengah Semester (UTS)</td><td className="border-none">= 20 %</td></tr>
                  <tr><td className="pr-2 border-none">Bobot Nilai Ujian Akhir Semester (UAS)</td><td className="border-none">= 20 %</td></tr>
                </tbody>
              </table>
              <div className="mt-2">Nilai Akhir</div>
              <div className="mt-4">Nilai Akhir = 60 % NH + 20 % UTS + 20 % UAS</div>
            </div>
          </div>
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
                  <div className="space-y-1">
                    {rpsData?.bahan_kajian?.map((m, i) => <div key={i} className="whitespace-pre-wrap text-left ml-2">{m}</div>)}
                  </div>
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
          <div className="export-page">
          <h3 className="font-bold text-[10.5pt] mb-2 text-center uppercase">
            Portofolio Penilaian dan Evaluasi Ketercapaian CPL Mahasiswa
          </h3>
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
              {(rpsData?.portofolio || []).map((row, idx) => (
                <tr key={idx} className="break-inside-avoid">
                  <td className="border border-black p-1.5">{row.minggu}</td>
                  <td className="border border-black p-1.5 font-bold">{row.cpl_terkait}</td>
                  <td className="border border-black p-1.5 font-bold">{row.cpmk}</td>
                  <td className="border border-black p-1.5 text-left font-bold">{row.sub_cpmk_ref}</td>
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
          </div>

          {rpsData?.rencana_tugas?.map((tugas, idx) => (
            <div key={idx} className="pt-4 mb-6 break-inside-avoid export-page">
              <h3 className="font-bold text-[10.5pt] mb-2 uppercase text-center border-t-2 border-black pt-3">Rencana Tugas Mahasiswa</h3>
              <table className="w-full border-collapse border border-black text-[9.5pt]">
                <tbody>
                  <tr><td className={`${td} font-bold w-[20%] bg-gray-50`}>Mata Kuliah</td><td className={td} colSpan={3}>{formData.mkName} ({formData.mkCode}) — {formData.sks} SKS (T:{formData.sksTeori}, P:{formData.sksPraktik})</td></tr>
                  <tr><td className={`${td} font-bold bg-gray-50`}>Kode/Judul Tugas</td><td className={td} colSpan={3}>{tugas.task_code} — {tugas.judul}</td></tr>
                  <tr>
                    <td className={`${td} font-bold bg-gray-50`}>Bentuk Tugas</td><td className={td}>{tugas.bentuk_tugas}</td>
                    <td className={`${td} font-bold bg-gray-50`}>Waktu Pengerjaan</td><td className={td}>{tugas.waktu_pengerjaan}</td>
                  </tr>
                  <tr>
                    <td className={`${td} font-bold bg-gray-50`}>Sub-CPMK Terkait</td>
                    <td className={td} colSpan={3}>
                      <span className="font-bold">{tugas.sub_cpmk_ref}</span> — {subCpmkByCode[tugas.sub_cpmk_ref]?.teks || '-'}
                    </td>
                  </tr>
                  <tr>
                    <td className={`${td} font-bold bg-gray-50`}>Deskripsi Tugas</td>
                    <td className={td} colSpan={3}>
                      <div><span className="font-bold">Objek Garapan:</span> {tugas.deskripsi?.objek_garapan}</div>
                      <div><span className="font-bold">Batasan:</span> {tugas.deskripsi?.batasan}</div>
                      <div><span className="font-bold">Manfaat:</span> {tugas.deskripsi?.manfaat}</div>
                    </td>
                  </tr>
                  <tr>
                    <td className={`${td} font-bold bg-gray-50`}>Metode Pengerjaan</td>
                    <td className={td} colSpan={3}>
                      <ol className="list-decimal list-outside ml-4 space-y-0.5">
                        {tugas.metode_pengerjaan?.map((m, i) => <li key={i}>{m}</li>)}
                      </ol>
                    </td>
                  </tr>
                  <tr><td className={`${td} font-bold bg-gray-50`}>Bentuk Luaran</td><td className={td} colSpan={3}>{tugas.luaran}</td></tr>
                  <tr>
                    <td className={`${td} font-bold bg-gray-50`}>Indikator, Kriteria & Bobot</td>
                    <td className={td} colSpan={3}>
                      <ul className="list-disc list-outside ml-4 space-y-0.5">
                        {tugas.indikator_kriteria_bobot?.map((ib, i) => (
                          <li key={i}>{ib.indikator} — {ib.kriteria} ({ib.bobot})</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                  <tr><td className={`${td} font-bold bg-gray-50`}>Jadwal Pelaksanaan</td><td className={td} colSpan={3}>{tugas.jadwal}</td></tr>
                  <tr>
                    <td className={`${td} font-bold bg-gray-50`}>Pustaka</td>
                    <td className={td} colSpan={3}>
                      <ol className="list-decimal list-outside ml-4">
                        {tugas.pustaka?.map((item, i) => <li key={i}>{item}</li>)}
                      </ol>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}

          {rpsData?.blueprint_penilaian?.rubrik_per_cpmk?.map((rubrik, rubrikIndex) => (
            <div key={rubrik.cpmk_ref} className="pt-4 mb-6 break-inside-avoid export-page">
              <h3 className="font-bold text-[10.5pt] mb-2 uppercase">Rubrik Penilaian {rubrik.cpmk_ref}</h3>
              <table className="w-full border-collapse border border-black text-[8.5pt]">
                <thead className="bg-gray-100 text-center font-bold">
                  <tr>
                    <th className="border border-black p-1 w-[20%]">{rubrik.cpmk_ref}</th>
                    <th className="border border-black p-1 w-[20%]">Sangat Baik<br/>75–100</th>
                    <th className="border border-black p-1 w-[20%]">Baik<br/>69–74</th>
                    <th className="border border-black p-1 w-[20%]">Cukup<br/>56–68</th>
                    <th className="border border-black p-1 w-[20%]">Kurang<br/>≤55</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-black p-2 font-semibold">{rubrik.cpmk_teks}</td>
                    <td className="border border-black p-2">{rubrik.sangat_baik}</td>
                    <td className="border border-black p-2">{rubrik.baik}</td>
                    <td className="border border-black p-2">{rubrik.cukup}</td>
                    <td className="border border-black p-2">{rubrik.kurang}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}

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
                <td style={{ border: 'none', width: '33.33%', textAlign: 'left', verticalAlign: 'top' }}>
                  {`Mojokerto, ${dateFormatted}`}<br />Dosen Pengampu/Penanggungjawab MK<br /><br /><br /><br />
                  <span className="font-bold underline">( {selectedLecturer ? selectedLecturer.nama : '.........................................'} )</span><br/>
                  NIDN/NUPTK: {selectedLecturer?.nidn || '..................'}
                </td>
                <td style={{ border: 'none', width: '33.33%', textAlign: 'center', verticalAlign: 'top' }}>
                  Mengetahui,<br />Ketua Program Studi<br /><br /><br /><br />
                  <span className="font-bold underline">( {selectedKaprodi ? selectedKaprodi.nama : '.........................................'} )</span><br/>
                  NIDN/NUPTK: {selectedKaprodi?.nidn || '..................'}
                </td>
                <td style={{ border: 'none', width: '33.33%', textAlign: 'right', verticalAlign: 'top' }}>
                  Menyetujui,<br />WAKA / Wakil Ketua 1<br /><br /><br /><br />
                  <span className="font-bold underline">( {selectedWaka ? selectedWaka.nama : '.........................................'} )</span><br/>
                  NIDN/NUPTK: {selectedWaka?.nidn || '..................'}
                </td>
              </tr>
            </tbody>
          </table>

          {/* CATATAN LAMA DIHAPUS DARI SINI */}
        </div>
      </div>

      {/* BLUEPRINT DOCUMENT */}
      <div id="blueprint-document" className={`export-document blueprint-document mx-auto bg-white p-8 print:border-none print:shadow-none print:p-0 font-[Arial,Helvetica,sans-serif] text-black w-full max-w-[210mm] min-h-[297mm] box-border relative ${activePreview === 'blueprint' ? '' : 'hidden'}`}>
        <section className="document-first-page pt-4">
          <h2 className="text-center font-bold text-lg mb-5 uppercase">Blue Print Penilaian Mata Kuliah</h2>
          <table className="w-full border-collapse text-[9pt] mb-5 blueprint-meta-table">
            <tbody>
              <tr><td className="font-bold w-[20%] py-1">Nama Mata Kuliah</td><td className="py-1">: {formData.mkName || '-'}</td></tr>
              <tr><td className="font-bold py-1">Kode Mata Kuliah</td><td className="py-1">: {formData.mkCode || '-'}</td></tr>
              <tr><td className="font-bold py-1">Koordinator</td><td className="py-1">: {selectedKoor?.nama || '-'}</td></tr>
            </tbody>
          </table>

          <h3 className="font-bold text-[9pt] mb-1">CPL prodi yg dibebankan pada MK:</h3>
          <ul className="list-disc list-outside ml-5 text-[8.5pt] mb-4 space-y-1">
            {allCplFlat.filter((cpl) => usedCplCodes.has(cpl.kode)).map((cpl) => (
              <li key={`blueprint-cpl-${cpl.kode}`}><span className="font-bold">{cpl.kode}</span> {cpl.teks}</li>
            ))}
          </ul>

          <h3 className="font-bold text-[9pt] mb-1">CP Mata Kuliah (CPMK):</h3>
          <ol className="list-decimal list-outside ml-5 text-[8.5pt] mb-4 space-y-1">
            {rpsData?.cpmk?.map((cpmk) => (
              <li key={`blueprint-cpmk-${cpmk.kode}`}><span className="font-bold">{cpmk.kode}</span> {cpmk.teks}</li>
            ))}
          </ol>

          <h3 className="page-break pt-3 font-bold text-[9pt] mb-1">SUB CPMK:</h3>
          <ul className="list-disc list-outside ml-5 text-[8.5pt] space-y-1">
            {rpsData?.sub_cpmk?.map((sub) => (
              <li key={`blueprint-sub-${sub.kode}`}>
                <span className="font-bold">{sub.kode}</span> {sub.teks} <span className="font-semibold">({sub.cpmk_ref})</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="page-break pt-3">
          <h3 className="font-bold text-[10pt] mb-2 uppercase">Korelasi CPMK terhadap CPL</h3>
          <table className="w-full border-collapse border border-black text-center text-[8.5pt] mb-5">
            <thead className="bg-gray-100 font-bold">
              <tr>
                <th className="border border-black p-1">CPMK</th>
                {allCplFlat.filter((cpl) => usedCplCodes.has(cpl.kode)).map((cpl) => <th key={cpl.kode} className="border border-black p-1">{cpl.kode}</th>)}
              </tr>
            </thead>
            <tbody>
              {rpsData?.cpmk?.map((cpmk) => (
                <tr key={cpmk.kode}>
                  <td className="border border-black p-1 font-bold">{cpmk.kode}</td>
                  {allCplFlat.filter((cpl) => usedCplCodes.has(cpl.kode)).map((cpl) => <td key={cpl.kode} className="border border-black p-1">{cpmk.cpl_terkait?.includes(cpl.kode) ? '√' : ''}</td>)}
                </tr>
              ))}
            </tbody>
          </table>

          <h3 className="font-bold text-[10pt] mb-2 uppercase">Korelasi CPMK terhadap Sub-CPMK</h3>
          <table className="w-full border-collapse border border-black text-center text-[8pt]">
            <thead className="bg-gray-100 font-bold">
              <tr>
                <th className="border border-black p-1">CPMK</th>
                {rpsData?.sub_cpmk?.map((sub) => <th key={sub.kode} className="border border-black p-1">{sub.kode}</th>)}
              </tr>
            </thead>
            <tbody>
              {rpsData?.cpmk?.map((cpmk) => (
                <tr key={cpmk.kode}>
                  <td className="border border-black p-1 font-bold">{cpmk.kode}</td>
                  {rpsData?.sub_cpmk?.map((sub) => <td key={sub.kode} className="border border-black p-1">{sub.cpmk_ref === cpmk.kode ? '√' : ''}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="export-page pt-3">
          <h3 className="font-bold text-[10pt] mb-2 uppercase">
            Program Pembelajaran
          </h3>
          <table className="w-full border-collapse border border-black text-[7.5pt]">
            <thead className="bg-gray-100 font-bold text-center">
              <tr>
                <th rowSpan={2} className="border border-black p-1 w-[4%]">Mg</th>
                <th rowSpan={2} className="border border-black p-1 w-[18%]">LO / Kemampuan Akhir</th>
                <th colSpan={2} className="border border-black p-1">penilaian</th>
                <th rowSpan={2} className="border border-black p-1 w-[15%]">Metode<br/>pembelajaran</th>
                <th rowSpan={2} className="border border-black p-1 w-[10%]">waktu</th>
                <th rowSpan={2} className="border border-black p-1 w-[18%]">Bahan kajian</th>
                <th rowSpan={2} className="border border-black p-1 w-[5%]">Bobot<br/>penilaian</th>
              </tr>
              <tr>
                <th className="border border-black p-1 w-[15%]">indikator</th>
                <th className="border border-black p-1 w-[15%]">bentuk</th>
              </tr>
            </thead>
            <tbody>
              {(rpsData?.matriks_pembelajaran || []).map((row, index) => (
                <tr key={`blueprint-program-${index}`} className="align-top leading-snug break-inside-avoid">
                  <td className={tdCenter}>{row.minggu_ke}</td>
                  <td className={td}>{subCpmkByCode[row.sub_cpmk_ref]?.teks || row.cpmk_ref || '-'}</td>
                  <td className={`${td} whitespace-pre-wrap align-top text-left`}>{row.indikator}</td>
                  <td className={`${td} whitespace-pre-wrap align-top text-left`}>{row.kriteria_bentuk}</td>
                  <td className={`${td} align-top text-left`}>
                    {[
                      row.metode_luring?.bentuk,
                      row.metode_luring?.metode,
                      row.metode_luring?.penugasan,
                      typeof row.metode_daring === 'string' ? row.metode_daring : row.metode_daring?.bentuk
                    ].filter(Boolean).join(' - ')}
                  </td>
                  <td className={`${tdCenter} whitespace-pre-wrap align-top`}>{row.metode_luring?.alokasi || '-'}</td>
                  <td className={`${td} whitespace-pre-wrap align-top text-left`}>{row.materi}</td>
                  <td className={tdCenter}>{row.bobot_nilai}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="font-bold bg-gray-100">
                <td className="border border-black p-2 text-right" colSpan={7}>TOTAL</td>
                <td className="border border-black p-2 text-center">100%</td>
              </tr>
            </tfoot>
          </table>
        </section>

        <section className="pt-3">
          <h3 className="font-bold text-[10pt] mb-2 uppercase">Rencana Evaluasi Ketercapaian Bobot CPMK</h3>
          <table className="w-full border-collapse border border-black text-[8pt]">
            <thead className="bg-gray-100 font-bold text-center">
              <tr>
                <th className="border border-black p-1">No.</th><th className="border border-black p-1">Aktivitas Penilaian</th><th className="border border-black p-1">Deskripsi</th><th className="border border-black p-1">Metode Evaluasi</th>
                {rpsData?.cpmk?.map((cpmk) => <th key={cpmk.kode} className="border border-black p-1">{cpmk.kode}</th>)}
                <th className="border border-black p-1">Total (%)</th>
              </tr>
            </thead>
            <tbody>
              {rpsData?.blueprint_penilaian?.aktivitas_penilaian?.map((row, idx) => (
                <tr key={`${row.aktivitas}-${idx}`}>
                  <td className={tdCenter}>{idx + 1}</td><td className={td}>{row.aktivitas}</td><td className={td}>{row.deskripsi}</td><td className={td}>{row.metode_evaluasi}</td>
                  {rpsData?.cpmk?.map((cpmk) => <td key={cpmk.kode} className={tdCenter}>{row.bobot_per_cpmk?.find((item) => item.cpmk_ref === cpmk.kode)?.bobot || ''}</td>)}
                  <td className={`${tdCenter} font-bold`}>{row.total_bobot}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="font-bold bg-gray-100"><td className="border border-black p-2 text-right" colSpan={4 + (rpsData?.cpmk?.length || 0)}>TOTAL</td><td className="border border-black p-2 text-center">100</td></tr>
            </tfoot>
          </table>
        </section>

        <section className="pt-3">
          <h3 className="font-bold text-[10pt] mb-2 uppercase">Penilaian dan Evaluasi Ketercapaian CPL Mahasiswa</h3>
          <table className="w-full border-collapse border border-black text-[8.5pt] mb-5">
            <thead className="bg-gray-100 font-bold text-center"><tr>{['Tahapan', 'Minggu', 'CPL', 'CPMK', 'Sub-CPMK', 'Assessment', 'Bobot (%)', 'Kategori'].map((label) => <th key={label} className="border border-black p-1">{label}</th>)}</tr></thead>
            <tbody>
              {rpsData?.blueprint_penilaian?.tahapan_penilaian?.map((row, idx) => (
                <tr key={`${row.tahapan}-${idx}`}><td className={tdCenter}>{row.tahapan}</td><td className={tdCenter}>{row.minggu}</td><td className={tdCenter}>{row.cpl}</td><td className={tdCenter}>{row.cpmk_ref}</td><td className={tdCenter}>{row.sub_cpmk_ref}</td><td className={td}>{row.assessment}</td><td className={tdCenter}>{row.bobot}</td><td className={td}>{row.kategori}</td></tr>
              ))}
            </tbody>
            <tfoot><tr className="font-bold bg-gray-100"><td className="border border-black p-2 text-right" colSpan={6}>TOTAL</td><td className="border border-black p-2 text-center">100%</td><td className="border border-black p-2"></td></tr></tfoot>
          </table>

          <h3 className="font-bold text-[10pt] mb-2 uppercase">Kisi-kisi Tes Soal Objektif</h3>
          <table className="w-full border-collapse border border-black text-[8.5pt]">
            <thead className="bg-gray-100 font-bold text-center"><tr><th className="border border-black p-1">No.</th><th className="border border-black p-1">Sub-CPMK</th><th className="border border-black p-1">Bahan Kajian</th><th className="border border-black p-1">Jumlah Soal</th><th className="border border-black p-1">%</th></tr></thead>
            <tbody>
              {rpsData?.blueprint_penilaian?.kisi_soal?.map((row, idx) => <tr key={`${row.sub_cpmk_ref}-${idx}`}><td className={tdCenter}>{idx + 1}</td><td className={tdCenter}>{row.sub_cpmk_ref}</td><td className={td}>{row.bahan_kajian}</td><td className={tdCenter}>{row.jumlah_soal}</td><td className={tdCenter}>{row.persentase}%</td></tr>)}
            </tbody>
            <tfoot><tr className="font-bold bg-gray-100"><td className="border border-black p-2 text-right" colSpan={3}>JUMLAH AKHIR</td><td className="border border-black p-2 text-center">{rpsData?.blueprint_penilaian?.kisi_soal?.reduce((sum, row) => sum + (Number(row.jumlah_soal) || 0), 0) || 0}</td><td className="border border-black p-2 text-center">100%</td></tr></tfoot>
          </table>
        </section>

        <section className="pt-3">
          <h3 className="font-bold text-[10pt] mb-3 uppercase">Rubrik Penilaian CPMK</h3>
          {rpsData?.blueprint_penilaian?.rubrik_per_cpmk?.map((rubrik, rubrikIndex) => (
            <div key={`blueprint-${rubrik.cpmk_ref}`} className="mb-5 break-inside-avoid export-page">
              <h4 className="font-bold text-[9pt] mb-1">Rubrik {rubrik.cpmk_ref}</h4>
              <table className="w-full border-collapse border border-black text-[8pt]">
                <thead className="bg-gray-100 font-bold text-center"><tr><th className="border border-black p-1">{rubrik.cpmk_ref}</th><th className="border border-black p-1">Sangat Baik (75-100)</th><th className="border border-black p-1">Baik (69-74)</th><th className="border border-black p-1">Cukup (56-68)</th><th className="border border-black p-1">Kurang (&lt;=55)</th></tr></thead>
                <tbody><tr><td className={td}>{rubrik.cpmk_teks}</td><td className={td}>{rubrik.sangat_baik}</td><td className={td}>{rubrik.baik}</td><td className={td}>{rubrik.cukup}</td><td className={td}>{rubrik.kurang}</td></tr></tbody>
              </table>
            </div>
          ))}

          <div className="signature-block mt-12 ml-auto w-[40%] text-center text-[9pt]">
            <p>Mojokerto, {dateFormatted}</p><p>Koordinator Mata Kuliah</p><div className="h-16"></div>
            <p className="font-bold underline">( {selectedKoor?.nama || '.........................................'} )</p>
            <p>NIDN/NUPTK: {selectedKoor?.nidn || '..................'}</p>
          </div>
        </section>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 font-sans p-4 sm:p-8">
      <style dangerouslySetInnerHTML={{
        __html: `
        @media print {
          body { background-color: white; margin: 0; padding: 0; -webkit-print-color-adjust: exact; }
          .export-document { max-width: none !important; margin: 0 !important; border: none !important; box-shadow: none !important; padding: 0 !important; }
          #rps-document { width: 297mm !important; }
          #blueprint-document { width: 210mm !important; }
          .page-break { page-break-before: always; }
          .page-break:first-child { page-break-before: avoid; }
          .break-inside-avoid { page-break-inside: avoid; }
          
          /* Dynamic @page based on activePreview */
          @page { size: A4 landscape; margin: 10mm; }
        }
      `}} />
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        apiKeys={apiKeys} 
        setApiKeys={setApiKeys} 
      />
    </div>
  );
}