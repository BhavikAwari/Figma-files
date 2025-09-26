import React from 'react';

interface LogoProps {
  variant?: 'full' | 'icon' | 'wordmark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Logo({ variant = 'full', size = 'md', className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-12',
    xl: 'h-16'
  };

  const iconSize = {
    sm: 24,
    md: 32,
    lg: 48,
    xl: 64
  };

  const BiteIcon = () => (
    <svg 
      width={iconSize[size]} 
      height={iconSize[size]} 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="text-brand-primary"
    >
      {/* Plate base */}
      <circle 
        cx="16" 
        cy="18" 
        r="12" 
        fill="currentColor" 
        opacity="0.1"
      />
      <circle 
        cx="16" 
        cy="18" 
        r="12" 
        stroke="currentColor" 
        strokeWidth="2"
        fill="none"
      />
      
      {/* Bite mark */}
      <path 
        d="M8 12C8 8 12 4 16 4C20 4 24 8 24 12C24 14 22 16 20 16C18 16 16 14 16 12C16 10 14 8 12 8C10 8 8 10 8 12Z" 
        fill="white"
      />
      <path 
        d="M8 12C8 8 12 4 16 4C20 4 24 8 24 12C24 14 22 16 20 16C18 16 16 14 16 12C16 10 14 8 12 8C10 8 8 10 8 12Z" 
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      
      {/* Food elements on plate */}
      <circle cx="12" cy="20" r="2" fill="currentColor" opacity="0.6" />
      <circle cx="20" cy="22" r="1.5" fill="currentColor" opacity="0.4" />
      <circle cx="16" cy="24" r="1" fill="currentColor" opacity="0.3" />
    </svg>
  );

  const Wordmark = () => (
    <div className={`flex items-center space-x-1 ${sizeClasses[size]}`}>
      <span className="font-bold text-brand-primary">Orderly</span>
      <span className="font-medium text-foreground">Bite</span>
    </div>
  );

  if (variant === 'icon') {
    return (
      <div className={className}>
        <BiteIcon />
      </div>
    );
  }

  if (variant === 'wordmark') {
    return (
      <div className={className}>
        <Wordmark />
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <BiteIcon />
      <Wordmark />
    </div>
  );
}