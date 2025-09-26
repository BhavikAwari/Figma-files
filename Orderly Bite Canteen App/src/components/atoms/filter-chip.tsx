import React from 'react';
import { cn } from '../ui/utils';
import { X } from 'lucide-react';

interface FilterChipProps {
  label: string;
  active?: boolean;
  removable?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
  variant?: 'default' | 'category' | 'veg' | 'price';
  className?: string;
}

export function FilterChip({
  label,
  active = false,
  removable = false,
  onClick,
  onRemove,
  variant = 'default',
  className
}: FilterChipProps) {
  const baseClasses = "inline-flex items-center px-3 py-1.5 rounded-full text-sm transition-all duration-200 cursor-pointer";
  
  const variantClasses = {
    default: active 
      ? "bg-brand-primary text-white" 
      : "bg-secondary text-secondary-foreground hover:bg-accent",
    category: active 
      ? "bg-brand-primary text-white" 
      : "bg-secondary text-secondary-foreground hover:bg-accent",
    veg: active 
      ? "bg-brand-success text-white" 
      : "bg-green-50 text-brand-success hover:bg-green-100 border border-brand-success/20",
    price: active 
      ? "bg-brand-warning text-warning-foreground" 
      : "bg-yellow-50 text-brand-warning hover:bg-yellow-100 border border-brand-warning/20"
  };

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        className
      )}
      onClick={onClick}
    >
      <span>{label}</span>
      
      {removable && onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-2 p-0.5 rounded-full hover:bg-black/10 transition-colors"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}