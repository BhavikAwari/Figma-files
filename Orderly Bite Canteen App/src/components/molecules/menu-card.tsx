import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Star, Leaf } from 'lucide-react';
import { cn } from '../ui/utils';
import { QuantitySelector } from '../atoms/quantity-selector';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface MenuItemProps {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  rating?: number;
  reviewCount?: number;
  isVeg?: boolean;
  isAvailable?: boolean;
  quantity?: number;
  onQuantityChange?: (id: string, quantity: number) => void;
  onItemClick?: (id: string) => void;
  className?: string;
}

export function MenuCard({
  id,
  name,
  price,
  image,
  description,
  rating,
  reviewCount,
  isVeg = true,
  isAvailable = true,
  quantity = 0,
  onQuantityChange,
  onItemClick,
  className
}: MenuItemProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleQuantityChange = (newQuantity: number) => {
    onQuantityChange?.(id, newQuantity);
  };

  const handleCardClick = () => {
    onItemClick?.(id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "bg-white rounded-lg border border-border shadow-sm overflow-hidden",
        !isAvailable && "opacity-60",
        className
      )}
    >
      {/* Image Section */}
      <div 
        className="relative h-32 bg-muted cursor-pointer"
        onClick={handleCardClick}
      >
        <ImageWithFallback
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Veg/Non-veg indicator */}
        <div className="absolute top-2 left-2">
          <div className={cn(
            "w-4 h-4 border-2 flex items-center justify-center",
            isVeg ? "border-brand-success" : "border-red-500"
          )}>
            <div className={cn(
              "w-2 h-2 rounded-full",
              isVeg ? "bg-brand-success" : "bg-red-500"
            )} />
          </div>
        </div>

        {/* Availability overlay */}
        {!isAvailable && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white text-sm font-medium">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-3">
        <div className="flex items-start justify-between mb-2">
          <div 
            className="flex-1 cursor-pointer"
            onClick={handleCardClick}
          >
            <h3 className="font-medium text-foreground line-clamp-1">{name}</h3>
            
            {description && (
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                {description}
              </p>
            )}
            
            {rating && (
              <div className="flex items-center mt-1 space-x-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-muted-foreground">
                  {rating} {reviewCount && `(${reviewCount})`}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-brand-primary">₹{price}</span>
            {isVeg && (
              <Leaf className="w-4 h-4 text-brand-success" />
            )}
          </div>

          {isAvailable && (
            <div>
              {quantity === 0 ? (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleQuantityChange(1)}
                  className="flex items-center justify-center w-8 h-8 bg-brand-primary text-white rounded-lg hover:bg-brand-primary-dark transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </motion.button>
              ) : (
                <QuantitySelector
                  value={quantity}
                  onChange={handleQuantityChange}
                  size="sm"
                  variant="compact"
                  min={0}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}