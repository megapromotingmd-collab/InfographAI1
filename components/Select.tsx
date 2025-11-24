
import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: string[];
}

export const Select: React.FC<SelectProps> = ({ label, options, className = '', ...props }) => {
  return (
    <div className="w-full relative group">
      {label && (
        <label className="block font-serif text-sm font-bold text-slate-dark mb-2 tracking-wide opacity-80 uppercase">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          className={`
            w-full pl-4 pr-10 py-3 font-sans text-sm bg-white border-2 rounded-xl transition-all duration-300 appearance-none cursor-pointer
            text-slate-dark shadow-subtle
            border-ivory-dark hover:border-crail-300 hover:shadow-md
            focus:outline-none focus:border-crail-500 focus:ring-4 focus:ring-crail-500/10
            disabled:bg-pampas disabled:text-cloud-medium disabled:cursor-not-allowed
            ${className}
          `}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-crail-400 group-hover:text-crail-600 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 9l4 4 4-4" />
          </svg>
        </div>
      </div>
    </div>
  );
};
