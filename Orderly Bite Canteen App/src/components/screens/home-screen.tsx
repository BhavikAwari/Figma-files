import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Bell, MapPin, ChevronRight } from 'lucide-react';
import { SearchBar } from '../atoms/search-bar';
import { FilterChip } from '../atoms/filter-chip';
import { MenuCard } from '../molecules/menu-card';
import { menuItems, categories } from '../../lib/data';
import { Avatar } from '../ui/avatar';
import { Card } from '../ui/card';

interface HomeScreenProps {
  user: any;
  cartItems: { [key: string]: number };
  onQuantityChange: (itemId: string, quantity: number) => void;
  onItemClick: (itemId: string) => void;
  onNavigate: (screen: string) => void;
}

export function HomeScreen({ 
  user, 
  cartItems, 
  onQuantityChange, 
  onItemClick,
  onNavigate 
}: HomeScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Quick order suggestions (most popular items)
  const quickOrderItems = menuItems
    .filter(item => item.reviewCount && item.reviewCount > 70)
    .slice(0, 4);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // In real app, this would trigger search and navigate to menu screen
    onNavigate('menu');
  };



  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-white border-b border-border px-4 py-3">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <img src={user.avatar} alt={user.name} />
            </Avatar>
            <div>
              <p className="text-sm text-muted-foreground">Good morning,</p>
              <p className="font-medium">{user.name}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{user.college}</span>
            </div>
            <button className="p-2">
              <Bell className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <SearchBar
          placeholder="Search for samosa, tea, snacks..."
          value={searchQuery}
          onChange={setSearchQuery}
          onSearch={handleSearch}
        />
      </div>

      <div className="px-4 py-4 space-y-6">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center py-4"
        >
          <h1 className="text-2xl font-bold text-brand-primary mb-2 text-[32px]">
            Welcome to Orderly Bites
          </h1>
          <p className="text-muted-foreground text-[15px]">
            Order your favorite canteen food and skip the queue!
          </p>
        </motion.div>

        {/* Categories */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold">Categories</h2>
            <button 
              onClick={() => onNavigate('menu')}
              className="flex items-center text-sm text-brand-primary"
            >
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <FilterChip
                key={category.id}
                label={`${category.name} (${category.count})`}
                active={selectedCategory === category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant="category"
                className="whitespace-nowrap"
              />
            ))}
          </div>
        </div>

        {/* Quick Order */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold">Quick Order</h2>
            <p className="text-sm text-muted-foreground">Most Popular</p>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {quickOrderItems.map((item) => (
              <MenuCard
                key={item.id}
                {...item}
                quantity={cartItems[item.id] || 0}
                onQuantityChange={onQuantityChange}
                onItemClick={onItemClick}
              />
            ))}
          </div>
        </div>

        {/* Recently Ordered */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold">Order Again</h2>
            <button 
              onClick={() => onNavigate('orders')}
              className="flex items-center text-sm text-brand-primary"
            >
              View Orders <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {menuItems.slice(10, 12).map((item) => (
              <MenuCard
                key={item.id}
                {...item}
                quantity={cartItems[item.id] || 0}
                onQuantityChange={onQuantityChange}
                onItemClick={onItemClick}
              />
            ))}
          </div>
        </div>

        {/* Today's Special */}
        <div>
          <h2 className="font-semibold mb-3">Today's Special</h2>
          <Card className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-amber-900">Combo Offer</h3>
                <p className="text-sm text-amber-700 mb-2">Any Snack + Tea = ₹35</p>
                <p className="text-xs text-amber-600">Save ₹5-10 on combos</p>
              </div>
              <div className="text-2xl">🍵</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}