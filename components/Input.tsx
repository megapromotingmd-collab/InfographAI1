import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block font-sans text-sm font-medium text-slate-dark mb-2">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-4 py-3.5 font-sans text-base bg-white border-2 rounded-lg transition-all duration-200
          placeholder-cloud-medium text-slate-dark
          focus:outline-none focus:border-crail-500 focus:ring-4 focus:ring-crail-500/10
          disabled:bg-pampas disabled:text-cloud-medium
          ${error ? 'border-error focus:border-error focus:ring-error/10' : 'border-ivory-dark hover:border-kraft'}
          ${className}
        `}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-error flex items-center gap-1"><span>!</span>{error}</p>}
    </div>
  );
};

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block font-sans text-sm font-medium text-slate-dark mb-2">
          {label}
        </label>
      )}
      <textarea
        className={`
          w-full px-4 py-3.5 font-sans text-base bg-white border-2 rounded-lg transition-all duration-200 min-h-[120px] resize-y
          placeholder-cloud-medium text-slate-dark
          focus:outline-none focus:border-crail-500 focus:ring-4 focus:ring-crail-500/10
          disabled:bg-pampas disabled:text-cloud-medium
          ${error ? 'border-error focus:border-error focus:ring-error/10' : 'border-ivory-dark hover:border-kraft'}
          ${className}
        `}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-error">{error}</p>}
    </div>
  );
};