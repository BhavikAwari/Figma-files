import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { cn } from '../ui/utils';

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'compact';
  disabled?: boolean;
  className?: string;
}

export function QuantitySelector({
  value,
  onChange,
  min = 0,
  max = 99,
  size = 'md',
  variant = 'default',
  disabled = false,
  className
}: QuantitySelectorProps) {
  const sizeClasses = {
    sm: {
      button: "h-7 w-7",
      container: "h-7",
      icon: "w-3 h-3",
      text: "text-sm min-w-[24px]"
    },
    md: {
      button: "h-9 w-9",
      container: "h-9",
      icon: "w-4 h-4",
      text: "text-base min-w-[32px]"
    },
    lg: {
      button: "h-11 w-11",
      container: "h-11",
      icon: "w-5 h-5",
      text: "text-lg min-w-[40px]"
    }
  };

  const handleDecrement = () => {
    if (value > min && !disabled) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max && !disabled) {
      onChange(value + 1);
    }
  };

  const currentSize = sizeClasses[size];
  const isDecrementDisabled = disabled || value <= min;
  const isIncrementDisabled = disabled || value >= max;

  if (variant === 'compact' && value === 0) {
    return (
      <button
        onClick={handleIncrement}
        disabled={isIncrementDisabled}
        className={cn(
          "flex items-center justify-center rounded-lg bg-brand-primary text-white hover:bg-brand-primary-dark transition-colors disabled:opacity-50",
          currentSize.button,
          className
        )}
      >
        <Plus className={currentSize.icon} />
      </button>
    );
  }

  return (
    <div className={cn("flex items-center space-x-1", className)}>
      <button
        onClick={handleDecrement}
        disabled={isDecrementDisabled}
        className={cn(
          "flex items-center justify-center rounded-lg border border-border bg-background hover:bg-accent transition-colors disabled:opacity-50",
          currentSize.button
        )}
      >
        <Minus className={currentSize.icon} />
      </button>
      
      <div className={cn(
        "flex items-center justify-center font-medium",
        currentSize.text
      )}>
        {value}
      </div>
      
      <button
        onClick={handleIncrement}
        disabled={isIncrementDisabled}
        className={cn(
          "flex items-center justify-center rounded-lg bg-brand-primary text-white hover:bg-brand-primary-dark transition-colors disabled:opacity-50",
          currentSize.button
        )}
      >
        <Plus className={currentSize.icon} />
      </button>
    </div>
  );
}