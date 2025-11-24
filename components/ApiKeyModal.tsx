import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Input } from './Input';
import { getUserGeminiKey, setUserGeminiKey, clearUserGeminiKey } from '../services/userKeyStore';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onKeySaved?: () => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose, onKeySaved }) => {
  const [apiKey, setApiKey] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const existing = getUserGeminiKey();
      setApiKey(existing || '');
      setSaved(!!existing);
    }
  }, [isOpen]);

  const handleSave = () => {
    if (!apiKey.trim()) {
      alert('Please enter a valid API key');
      return;
    }
    setUserGeminiKey(apiKey.trim());
    setSaved(true);
    if (onKeySaved) onKeySaved();
    setTimeout(() => {
      onClose();
    }, 500);
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear the API key?')) {
      clearUserGeminiKey();
      setApiKey('');
      setSaved(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-ivory-dark">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-crail-500 to-crail-600 p-6 rounded-t-2xl">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-serif font-bold text-white mb-2">
                Gemini API Key
              </h2>
              <p className="text-crail-50 text-sm">
                Configure your personal API key
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors p-1"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status Indicator */}
          {saved && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-semibold text-green-800">API Key Active</span>
            </div>
          )}

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-sm font-bold text-blue-900 mb-2 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              How to get your API key:
            </h3>
            <ol className="text-xs text-blue-800 space-y-2 ml-4 list-decimal">
              <li>Visit <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer" className="underline font-semibold hover:text-blue-600">Google AI Studio</a></li>
              <li>Sign in with your Google account</li>
              <li>Click "Get API Key" or "Create API Key"</li>
              <li>Copy the generated key and paste it below</li>
            </ol>
          </div>

          {/* Input Field */}
          <div>
            <Input
              label="API Key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIza..."
              type="password"
            />
            <p className="text-xs text-slate-400 mt-2">
              Your API key is stored locally in your browser and never sent to our servers.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="ghost"
              onClick={handleClear}
              disabled={!saved}
              className="flex-1"
            >
              Clear Key
            </Button>
            <Button
              onClick={handleSave}
              disabled={!apiKey.trim()}
              className="flex-1"
            >
              Save Key
            </Button>
          </div>

          {/* Security Notice */}
          <div className="border-t border-ivory-dark pt-4">
            <div className="flex gap-2 items-start">
              <svg className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <p className="text-xs text-slate-500">
                <strong className="text-slate-700">Privacy:</strong> Your API key is stored in localStorage and is only accessible by this application on your device.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
