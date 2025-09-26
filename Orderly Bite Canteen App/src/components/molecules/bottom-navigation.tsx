import React from 'react';
import { Home, Search, ShoppingBag, User, Receipt } from 'lucide-react';
import { cn } from '../ui/utils';
import { motion } from 'motion/react';

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  cartCount?: number;
  className?: string;
}

export function BottomNavigation({
  activeTab,
  onTabChange,
  cartCount = 0,
  className
}: BottomNavigationProps) {
  const navigationItems: NavigationItem[] = [
    {
      id: 'home',
      label: 'Home',
      icon: <Home className="w-5 h-5" />
    },
    {
      id: 'menu',
      label: 'Menu',
      icon: <Search className="w-5 h-5" />
    },
    {
      id: 'cart',
      label: 'Cart',
      icon: <ShoppingBag className="w-5 h-5" />,
      badge: cartCount
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: <Receipt className="w-5 h-5" />
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: <User className="w-5 h-5" />
    }
  ];

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 bg-white border-t border-border px-4 py-2 safe-area-pb",
      className
    )}>
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navigationItems.map((item) => {
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className="flex flex-col items-center space-y-1 min-h-[60px] px-2 py-1 relative"
            >
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-brand-primary rounded-full"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
              
              {/* Icon container */}
              <div className="relative">
                <div className={cn(
                  "transition-colors duration-200",
                  isActive ? "text-brand-primary" : "text-muted-foreground"
                )}>
                  {item.icon}
                </div>
                
                {/* Badge */}
                {item.badge && item.badge > 0 && (
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-brand-error text-white text-xs rounded-full flex items-center justify-center">
                    {item.badge > 99 ? '99+' : item.badge}
                  </div>
                )}
              </div>
              
              {/* Label */}
              <span className={cn(
                "text-xs transition-colors duration-200",
                isActive ? "text-brand-primary font-medium" : "text-muted-foreground"
              )}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}