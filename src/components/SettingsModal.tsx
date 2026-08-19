import React, { useState, useEffect } from 'react';
import { Settings, Eye, EyeOff, Save, CheckCircle, ExternalLink, Key } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKeys: string[];
  setApiKeys: (keys: string[]) => void;
}

export default function SettingsModal({ isOpen, onClose, apiKeys, setApiKeys }: SettingsModalProps) {
  const [localKeys, setLocalKeys] = useState<string[]>(['', '', '']);
  const [showKey, setShowKey] = useState<boolean[]>([false, false, false]);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setLocalKeys([apiKeys[0] || '', apiKeys[1] || '', apiKeys[2] || '']);
      setIsSaved(false);
    }
  }, [isOpen, apiKeys]);

  if (!isOpen) return null;

  const handleSave = () => {
    const newKeys = localKeys.map(k => k.trim());
    setApiKeys(newKeys);
    localStorage.setItem('gemini_api_keys', JSON.stringify(newKeys));
    setIsSaved(true);
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  const toggleShow = (idx: number) => {
    const newShow = [...showKey];
    newShow[idx] = !newShow[idx];
    setShowKey(newShow);
  };

  const activeCount = localKeys.filter(k => k.trim() !== '').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Settings className="w-5 h-5 text-slate-600" />
            Pengaturan
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto max-h-[80vh]">
          <p className="text-sm text-slate-500 mb-4">Konfigurasi API untuk generate konten</p>

          <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-3 mb-6 flex items-center gap-2 text-sm font-semibold">
            <CheckCircle className="w-4 h-4" />
            API Key tersimpan ({activeCount} key aktif)
          </div>

          {[0, 1, 2].map((idx) => (
            <div key={idx} className="mb-4">
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                API Key {idx === 0 ? '1 (utama)' : `${idx + 1} (cadangan)`}
              </label>
              <div className="relative">
                <input
                  type={showKey[idx] ? "text" : "password"}
                  value={localKeys[idx]}
                  onChange={(e) => {
                    const newKeys = [...localKeys];
                    newKeys[idx] = e.target.value;
                    setLocalKeys(newKeys);
                  }}
                  className={`w-full pr-10 pl-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-sm ${
                    idx === 0 && !localKeys[idx] ? 'border-red-300' : 'border-slate-300'
                  }`}
                  placeholder={idx === 0 ? "Masukkan Gemini API Key utama..." : "Opsional: API Key cadangan..."}
                />
                <button
                  type="button"
                  onClick={() => toggleShow(idx)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showKey[idx] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          ))}

          <div className="flex gap-3 mt-6">
            <button 
              onClick={handleSave}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {isSaved ? <CheckCircle className="w-4 h-4" /> : null}
              {isSaved ? 'Tersimpan!' : 'Simpan Semua Key'}
            </button>
            <button className="flex-1 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2">
              <Key className="w-4 h-4" />
              Test Koneksi
            </button>
          </div>

          <div className="mt-8 bg-slate-50 rounded-xl p-4 border border-slate-100">
            <h3 className="font-semibold text-sm flex items-center gap-2 mb-3 text-slate-700">
              <Key className="w-4 h-4" /> Cara Mendapatkan API Key (Gratis)
            </h3>
            <ol className="text-xs text-slate-600 space-y-2 list-decimal list-inside">
              <li>Buka <a href="https://aistudio.google.com/apikey" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">aistudio.google.com/apikey</a></li>
              <li>Login dengan akun Google kamu</li>
              <li>Klik tombol <strong>"Create API Key"</strong></li>
              <li>Pilih project (atau buat baru)</li>
              <li>Copy API Key yang muncul</li>
              <li>Paste di kolom API Key di atas, lalu klik <strong>Simpan</strong></li>
            </ol>
            <a href="#" className="mt-4 w-full block text-center border border-slate-300 rounded-lg py-2 text-xs font-semibold text-slate-700 hover:bg-white bg-transparent transition-colors flex items-center justify-center gap-2">
              <ExternalLink className="w-3 h-3" /> Lihat Tutorial Step-by-Step
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
