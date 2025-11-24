import React, { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { clearUserGeminiKey, getUserGeminiKey, setUserGeminiKey } from '../../services/userKeyStore';

interface ApiKeyPanelProps {
  compact?: boolean;
}

export const ApiKeyPanel: React.FC<ApiKeyPanelProps> = ({ compact }) => {
  const [key, setKey] = useState('');
  const [saved, setSaved] = useState<string | null>(null);

  useEffect(() => {
    const existing = getUserGeminiKey();
    setSaved(existing);
    setKey(existing || '');
  }, []);

  const handleSave = () => {
    if (!key.trim()) return;
    setUserGeminiKey(key.trim());
    setSaved(key.trim());
  };

  const handleClear = () => {
    clearUserGeminiKey();
    setSaved(null);
    setKey('');
  };

  return (
    <div className={`rounded-2xl border border-white/10 bg-white/5 p-4 ${compact ? 'space-y-2' : 'space-y-3'}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-crail-300">Gemini API</p>
          <p className="text-sm text-text-secondary">Cheie per utilizator, salvată local.</p>
        </div>
        {saved && <span className="text-[10px] px-2 py-1 rounded-full bg-green-500/20 text-green-200 border border-green-500/40">activă</span>}
      </div>
      <Input label="Cheie Gemini" value={key} onChange={(e) => setKey(e.target.value)} placeholder="AIza..." />
      <div className="flex gap-2 justify-end">
        <Button variant="ghost" onClick={handleClear}>Șterge</Button>
        <Button onClick={handleSave}>Salvează</Button>
      </div>
    </div>
  );
};
