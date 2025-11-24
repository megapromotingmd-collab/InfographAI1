import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  elevated?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', elevated = false }) => {
  return (
    <div className={`
      bg-white rounded-xl border border-ivory-dark
      ${elevated ? 'shadow-elevated border-none p-8' : 'shadow-card p-6'}
      transition-all duration-300 hover:border-crail-200
      ${className}
    `}>
      {children}
    </div>
  );
};