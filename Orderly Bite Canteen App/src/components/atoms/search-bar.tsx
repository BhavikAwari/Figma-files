import React, { useState } from 'react';
import { Search, Mic, X } from 'lucide-react';
import { cn } from '../ui/utils';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  showVoiceSearch?: boolean;
  showClearButton?: boolean;
  className?: string;
}

export function SearchBar({
  placeholder = "Search for food items...",
  value: controlledValue,
  onChange,
  onSearch,
  showVoiceSearch = true,
  showClearButton = true,
  className
}: SearchBarProps) {
  const [internalValue, setInternalValue] = useState('');
  const value = controlledValue ?? internalValue;
  const setValue = onChange ?? setInternalValue;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(value);
  };

  const handleClear = () => {
    setValue('');
    onSearch?.('');
  };

  const handleVoiceSearch = () => {
    // Mock voice search - in real app would integrate with Web Speech API
    console.log('Voice search triggered');
  };

  return (
    <form onSubmit={handleSubmit} className={cn("relative", className)}>
      <div className="relative flex items-center">
        <Search className="absolute left-4 w-5 h-5 text-muted-foreground" />
        
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="w-full h-12 pl-12 pr-20 bg-input-background border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-200"
        />
        
        <div className="absolute right-2 flex items-center space-x-1">
          {showClearButton && value && (
            <button
              type="button"
              onClick={handleClear}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          
          {showVoiceSearch && (
            <button
              type="button"
              onClick={handleVoiceSearch}
              className="p-2 text-muted-foreground hover:text-brand-primary transition-colors"
            >
              <Mic className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </form>
  );
}