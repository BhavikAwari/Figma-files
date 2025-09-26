import React from 'react';
import { Clock, CheckCircle, Truck, AlertCircle } from 'lucide-react';
import { cn } from '../ui/utils';
import { motion } from 'motion/react';

export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface OrderCardProps {
  orderId: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  orderTime: string;
  estimatedTime?: string;
  onViewDetails?: (orderId: string) => void;
  onCancelOrder?: (orderId: string) => void;
  canCancel?: boolean;
  className?: string;
}

export function OrderCard({
  orderId,
  items,
  totalAmount,
  status,
  orderTime,
  estimatedTime,
  onViewDetails,
  onCancelOrder,
  canCancel = false,
  className
}: OrderCardProps) {
  const statusConfig = {
    pending: {
      icon: <Clock className="w-4 h-4" />,
      label: 'Order Placed',
      color: 'text-brand-warning',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-brand-warning/20'
    },
    preparing: {
      icon: <Clock className="w-4 h-4" />,
      label: 'Preparing',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    ready: {
      icon: <CheckCircle className="w-4 h-4" />,
      label: 'Ready for Pickup',
      color: 'text-brand-success',
      bgColor: 'bg-green-50',
      borderColor: 'border-brand-success/20'
    },
    delivered: {
      icon: <Truck className="w-4 h-4" />,
      label: 'Delivered',
      color: 'text-brand-success',
      bgColor: 'bg-green-50',
      borderColor: 'border-brand-success/20'
    },
    cancelled: {
      icon: <AlertCircle className="w-4 h-4" />,
      label: 'Cancelled',
      color: 'text-brand-error',
      bgColor: 'bg-red-50',
      borderColor: 'border-brand-error/20'
    }
  };

  const config = statusConfig[status];
  const displayItems = items.slice(0, 2);
  const remainingCount = items.length - 2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "bg-white rounded-lg border border-border p-4 shadow-sm",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-medium text-foreground">Order #{orderId}</h3>
          <p className="text-sm text-muted-foreground">{orderTime}</p>
        </div>
        
        <div className={cn(
          "flex items-center space-x-2 px-3 py-1.5 rounded-full border",
          config.bgColor,
          config.borderColor
        )}>
          <span className={config.color}>
            {config.icon}
          </span>
          <span className={cn("text-sm font-medium", config.color)}>
            {config.label}
          </span>
        </div>
      </div>

      {/* Items */}
      <div className="mb-3">
        {displayItems.map((item, index) => (
          <div key={index} className="flex justify-between text-sm mb-1">
            <span className="text-muted-foreground">
              {item.quantity}x {item.name}
            </span>
            <span className="text-foreground">₹{item.price * item.quantity}</span>
          </div>
        ))}
        
        {remainingCount > 0 && (
          <p className="text-sm text-muted-foreground">
            +{remainingCount} more item{remainingCount > 1 ? 's' : ''}
          </p>
        )}
      </div>

      {/* Total and Time */}
      <div className="flex items-center justify-between mb-3 pt-2 border-t border-border">
        <span className="font-semibold text-foreground">
          Total: ₹{totalAmount}
        </span>
        
        {estimatedTime && status !== 'delivered' && status !== 'cancelled' && (
          <span className="text-sm text-muted-foreground">
            Est. {estimatedTime}
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex space-x-2">
        <button
          onClick={() => onViewDetails?.(orderId)}
          className="flex-1 py-2 px-4 text-sm font-medium text-brand-primary border border-brand-primary rounded-lg hover:bg-brand-primary/5 transition-colors"
        >
          View Details
        </button>
        
        {canCancel && status === 'pending' && (
          <button
            onClick={() => onCancelOrder?.(orderId)}
            className="py-2 px-4 text-sm font-medium text-brand-error border border-brand-error rounded-lg hover:bg-red-50 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </motion.div>
  );
}