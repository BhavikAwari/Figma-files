import React from 'react';
import { Button } from '../ui/button';
import { cn } from '../ui/utils';
import { Loader2 } from 'lucide-react';

interface EnhancedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'success' | 'warning' | 'destructive';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export function EnhancedButton({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className,
  disabled,
  children,
  ...props
}: EnhancedButtonProps) {
  const baseClasses = "inline-flex items-center justify-center rounded-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantClasses = {
    primary: "bg-brand-primary hover:bg-brand-primary-dark text-white focus:ring-brand-primary",
    secondary: "bg-secondary hover:bg-secondary/80 text-secondary-foreground focus:ring-ring",
    ghost: "hover:bg-accent hover:text-accent-foreground focus:ring-ring",
    success: "bg-brand-success hover:bg-brand-success/90 text-white focus:ring-brand-success",
    warning: "bg-brand-warning hover:bg-brand-warning/90 text-warning-foreground focus:ring-brand-warning",
    destructive: "bg-brand-error hover:bg-brand-error/90 text-white focus:ring-brand-error"
  };

  const sizeClasses = {
    sm: "h-9 px-3 text-sm",
    md: "h-12 px-6",
    lg: "h-14 px-8 text-lg",
    xl: "h-16 px-10 text-xl"
  };

  const iconSizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-7 h-7"
  };

  const isDisabled = disabled || loading;

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && "w-full",
        isDisabled && "opacity-50 cursor-not-allowed",
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {loading && (
        <Loader2 className={cn(iconSizeClasses[size], "animate-spin mr-2")} />
      )}
      
      {!loading && icon && iconPosition === 'left' && (
        <span className={cn(iconSizeClasses[size], "mr-2")}>
          {icon}
        </span>
      )}
      
      <span>{children}</span>
      
      {!loading && icon && iconPosition === 'right' && (
        <span className={cn(iconSizeClasses[size], "ml-2")}>
          {icon}
        </span>
      )}
    </button>
  );
}