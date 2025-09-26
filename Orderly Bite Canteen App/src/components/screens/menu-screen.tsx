import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Filter, SlidersHorizontal } from 'lucide-react';
import { SearchBar } from '../atoms/search-bar';
import { FilterChip } from '../atoms/filter-chip';
import { MenuCard } from '../molecules/menu-card';
import { menuItems, categories } from '../../lib/data';
import { Skeleton } from '../ui/skeleton';

interface MenuScreenProps {
  cartItems: { [key: string]: number };
  onQuantityChange: (itemId: string, quantity: number) => void;
  onItemClick: (itemId: string) => void;
  onBack: () => void;
}

export function MenuScreen({ 
  cartItems, 
  onQuantityChange, 
  onItemClick,
  onBack 
}: MenuScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating'>('name');
  const [priceFilter, setPriceFilter] = useState<'all' | 'under-20' | '20-40' | 'above-40'>('all');
  const [vegOnly, setVegOnly] = useState(false);
  const [loading, setLoading] = useState(false);

  // Filter and search logic
  const filteredItems = useMemo(() => {
    let items = [...menuItems];

    // Category filter
    if (selectedCategory !== 'all') {
      items = items.filter(item => item.category === selectedCategory);
    }

    // Search filter
    if (searchQuery) {
      items = items.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Price filter
    if (priceFilter !== 'all') {
      switch (priceFilter) {
        case 'under-20':
          items = items.filter(item => item.price < 20);
          break;
        case '20-40':
          items = items.filter(item => item.price >= 20 && item.price <= 40);
          break;
        case 'above-40':
          items = items.filter(item => item.price > 40);
          break;
      }
    }

    // Veg filter
    if (vegOnly) {
      items = items.filter(item => item.isVeg);
    }

    // Sort
    items.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return items;
  }, [searchQuery, selectedCategory, sortBy, priceFilter, vegOnly]);

  const handleSearch = (query: string) => {
    setLoading(true);
    setSearchQuery(query);
    // Simulate search delay
    setTimeout(() => setLoading(false), 300);
  };

  const activeFilters = [
    selectedCategory !== 'all' && { 
      key: 'category', 
      label: categories.find(c => c.id === selectedCategory)?.name || '',
      remove: () => setSelectedCategory('all')
    },
    priceFilter !== 'all' && { 
      key: 'price', 
      label: priceFilter.replace('-', '-₹'),
      remove: () => setPriceFilter('all')
    },
    vegOnly && { 
      key: 'veg', 
      label: 'Veg Only',
      remove: () => setVegOnly(false)
    }
  ].filter(Boolean) as Array<{ key: string; label: string; remove: () => void }>;

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-white border-b border-border px-4 py-3 sticky top-0 z-10">
        <div className="flex items-center space-x-3 mb-4">
          <button onClick={onBack} className="p-2 -ml-2">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-semibold flex-1">Menu</h1>
          <button className="p-2">
            <SlidersHorizontal className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <SearchBar
          placeholder="Search menu items..."
          value={searchQuery}
          onChange={setSearchQuery}
          onSearch={handleSearch}
        />
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Categories */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <FilterChip
              key={category.id}
              label={category.name}
              active={selectedCategory === category.id}
              onClick={() => setSelectedCategory(category.id)}
              variant="category"
              className="whitespace-nowrap"
            />
          ))}
        </div>

        {/* Filters Row */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          <FilterChip
            label="Veg Only"
            active={vegOnly}
            onClick={() => setVegOnly(!vegOnly)}
            variant="veg"
            className="whitespace-nowrap"
          />
          
          <FilterChip
            label="Under ₹20"
            active={priceFilter === 'under-20'}
            onClick={() => setPriceFilter(priceFilter === 'under-20' ? 'all' : 'under-20')}
            variant="price"
            className="whitespace-nowrap"
          />
          
          <FilterChip
            label="₹20-40"
            active={priceFilter === '20-40'}
            onClick={() => setPriceFilter(priceFilter === '20-40' ? 'all' : '20-40')}
            variant="price"
            className="whitespace-nowrap"
          />
          
          <FilterChip
            label="Above ₹40"
            active={priceFilter === 'above-40'}
            onClick={() => setPriceFilter(priceFilter === 'above-40' ? 'all' : 'above-40')}
            variant="price"
            className="whitespace-nowrap"
          />
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            <span className="text-sm text-muted-foreground whitespace-nowrap">Active:</span>
            {activeFilters.map((filter) => (
              <FilterChip
                key={filter.key}
                label={filter.label}
                active={true}
                removable={true}
                onRemove={filter.remove}
                className="whitespace-nowrap"
              />
            ))}
          </div>
        )}

        {/* Sort Options */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {filteredItems.length} items found
          </p>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-sm border border-border rounded px-2 py-1 bg-background"
            >
              <option value="name">Name</option>
              <option value="price">Price</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {/* Menu Items Grid */}
        {loading ? (
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg border border-border overflow-hidden">
                <Skeleton className="h-32 w-full" />
                <div className="p-3 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-full" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-8 w-8 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="font-medium mb-2">No items found</h3>
            <p className="text-muted-foreground text-sm">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 gap-3"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <MenuCard
                  {...item}
                  quantity={cartItems[item.id] || 0}
                  onQuantityChange={onQuantityChange}
                  onItemClick={onItemClick}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}