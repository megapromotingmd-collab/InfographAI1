import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading,
  icon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = "font-sans font-semibold transition-all duration-200 rounded-full inline-flex items-center justify-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2";
  
  const variants = {
    primary: "bg-crail-500 text-white hover:bg-crail-600 shadow-subtle hover:shadow-crail disabled:bg-ivory-dark disabled:text-cloud-medium disabled:shadow-none",
    secondary: "bg-transparent border-2 border-slate-dark text-slate-dark hover:bg-slate-dark hover:text-white disabled:border-ivory-dark disabled:text-cloud-medium",
    ghost: "bg-transparent text-crail-500 hover:bg-crail-50 disabled:text-cloud-medium"
  };

  const sizes = {
    sm: "text-sm px-4 py-2",
    md: "text-base px-6 py-3.5",
    lg: "text-lg px-8 py-4"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className} ${isLoading ? 'opacity-80 cursor-wait' : ''}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : icon ? (
        <span className="mr-2">{icon}</span>
      ) : null}
      {children}
    </button>
  );
};