// Mock data for the Orderly Bite application

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: 'appetizers' | 'beverages' | 'snacks';
  image: string;
  description: string;
  isVeg: boolean;
  rating?: number;
  reviewCount?: number;
  isAvailable: boolean;
  preparationTime: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  orderTime: string;
  estimatedTime?: string;
  paymentMethod: string;
  canCancel: boolean;
}

export const menuItems: MenuItem[] = [
  // Appetizers
  {
    id: 'app-1',
    name: 'Mixed Snacks',
    price: 60,
    category: 'appetizers',
    image: 'https://images.unsplash.com/photo-1697155836252-d7f969108b5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzbmFja3MlMjBzYW1vc2F8ZW58MXx8fHwxNzU4ODg3NDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Assorted crispy Indian snacks perfect for sharing',
    isVeg: true,
    rating: 4.2,
    reviewCount: 45,
    isAvailable: true,
    preparationTime: '10-15 min'
  },
  {
    id: 'app-2',
    name: 'Veg Burger',
    price: 60,
    category: 'appetizers',
    image: 'https://images.unsplash.com/photo-1750767396956-da1796f33ad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2YWRhJTIwcGF2JTIwaW5kaWFuJTIwc3RyZWV0JTIwZm9vZHxlbnwxfHx8fDE3NTg4ODc0NTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Fresh vegetarian burger with crispy patty and veggies',
    isVeg: true,
    rating: 4.5,
    reviewCount: 67,
    isAvailable: true,
    preparationTime: '12-18 min'
  },
  {
    id: 'app-3',
    name: 'Veg Sandwich',
    price: 30,
    category: 'appetizers',
    image: 'https://images.unsplash.com/photo-1697155836252-d7f969108b5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzbmFja3MlMjBzYW1vc2F8ZW58MXx8fHwxNzU4ODg3NDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Classic vegetable sandwich with mint chutney',
    isVeg: true,
    rating: 4.0,
    reviewCount: 32,
    isAvailable: true,
    preparationTime: '8-12 min'
  },
  {
    id: 'app-4',
    name: 'Maggie',
    price: 30,
    category: 'appetizers',
    image: 'https://images.unsplash.com/photo-1697155836252-d7f969108b5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzbmFja3MlMjBzYW1vc2F8ZW58MXx8fHwxNzU4ODg3NDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Spicy instant noodles cooked to perfection',
    isVeg: true,
    rating: 4.3,
    reviewCount: 89,
    isAvailable: true,
    preparationTime: '6-10 min'
  },
  {
    id: 'app-5',
    name: 'Masala Corns',
    price: 30,
    category: 'appetizers',
    image: 'https://images.unsplash.com/photo-1697155836252-d7f969108b5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzbmFja3MlMjBzYW1vc2F8ZW58MXx8fHwxNzU4ODg3NDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Buttered sweet corn with Indian spices',
    isVeg: true,
    rating: 4.1,
    reviewCount: 56,
    isAvailable: true,
    preparationTime: '5-8 min'
  },

  // Beverages
  {
    id: 'bev-1',
    name: 'Half Tea',
    price: 7,
    category: 'beverages',
    image: 'https://images.unsplash.com/photo-1609670438772-9cf3afc5052b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0ZWElMjBjaGFpfGVufDF8fHx8MTc1ODg4MDA0NXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Fresh brewed Indian chai - half cup serving',
    isVeg: true,
    rating: 4.4,
    reviewCount: 123,
    isAvailable: true,
    preparationTime: '3-5 min'
  },
  {
    id: 'bev-2',
    name: 'Full Tea',
    price: 10,
    category: 'beverages',
    image: 'https://images.unsplash.com/photo-1609670438772-9cf3afc5052b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0ZWElMjBjaGFpfGVufDF8fHx8MTc1ODg4MDA0NXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Fresh brewed Indian chai - full cup serving',
    isVeg: true,
    rating: 4.4,
    reviewCount: 98,
    isAvailable: true,
    preparationTime: '3-5 min'
  },
  {
    id: 'bev-3',
    name: 'Coffee',
    price: 15,
    category: 'beverages',
    image: 'https://images.unsplash.com/photo-1609670438772-9cf3afc5052b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0ZWElMjBjaGFpfGVufDF8fHx8MTc1ODg4MDA0NXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Rich and aromatic filter coffee',
    isVeg: true,
    rating: 4.2,
    reviewCount: 76,
    isAvailable: true,
    preparationTime: '4-6 min'
  },
  {
    id: 'bev-4',
    name: 'Lemon Tea',
    price: 12,
    category: 'beverages',
    image: 'https://images.unsplash.com/photo-1609670438772-9cf3afc5052b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0ZWElMjBjaGFpfGVufDF8fHx8MTc1ODg4MDA0NXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Refreshing black tea with fresh lemon',
    isVeg: true,
    rating: 4.0,
    reviewCount: 43,
    isAvailable: true,
    preparationTime: '3-5 min'
  },

  // Snacks
  {
    id: 'snk-1',
    name: 'Samosa',
    price: 30,
    category: 'snacks',
    image: 'https://images.unsplash.com/photo-1697155836252-d7f969108b5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzbmFja3MlMjBzYW1vc2F8ZW58MXx8fHwxNzU4ODg3NDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Crispy fried pastry with spiced potato filling',
    isVeg: true,
    rating: 4.6,
    reviewCount: 134,
    isAvailable: true,
    preparationTime: '8-12 min'
  },
  {
    id: 'snk-2',
    name: 'Kachori',
    price: 30,
    category: 'snacks',
    image: 'https://images.unsplash.com/photo-1697155836252-d7f969108b5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzbmFja3MlMjBzYW1vc2F8ZW58MXx8fHwxNzU4ODg3NDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Flaky pastry filled with spiced lentils',
    isVeg: true,
    rating: 4.3,
    reviewCount: 87,
    isAvailable: true,
    preparationTime: '10-15 min'
  },
  {
    id: 'snk-3',
    name: 'Palak Wada',
    price: 30,
    category: 'snacks',
    image: 'https://images.unsplash.com/photo-1697155836252-d7f969108b5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzbmFja3MlMjBzYW1vc2F8ZW58MXx8fHwxNzU4ODg3NDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Deep fried spinach fritters with gram flour',
    isVeg: true,
    rating: 4.1,
    reviewCount: 65,
    isAvailable: true,
    preparationTime: '8-12 min'
  },
  {
    id: 'snk-4',
    name: 'Aloo Bonda',
    price: 30,
    category: 'snacks',
    image: 'https://images.unsplash.com/photo-1697155836252-d7f969108b5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzbmFja3MlMjBzYW1vc2F8ZW58MXx8fHwxNzU4ODg3NDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Potato dumplings coated in chickpea batter',
    isVeg: true,
    rating: 4.2,
    reviewCount: 72,
    isAvailable: true,
    preparationTime: '10-15 min'
  },
  {
    id: 'snk-5',
    name: 'Vada Pav',
    price: 30,
    category: 'snacks',
    image: 'https://images.unsplash.com/photo-1750767396956-da1796f33ad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2YWRhJTIwcGF2JTIwaW5kaWFuJTIwc3RyZWV0JTIwZm9vZHxlbnwxfHx8fDE3NTg4ODc0NTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Mumbai street food - vada served in pav bread',
    isVeg: true,
    rating: 4.5,
    reviewCount: 156,
    isAvailable: true,
    preparationTime: '8-12 min'
  },
  {
    id: 'snk-6',
    name: 'Bhel Puri',
    price: 30,
    category: 'snacks',
    image: 'https://images.unsplash.com/photo-1697155836252-d7f969108b5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzbmFja3MlMjBzYW1vc2F8ZW58MXx8fHwxNzU4ODg3NDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Crispy puffed rice with tangy chutneys',
    isVeg: true,
    rating: 4.4,
    reviewCount: 98,
    isAvailable: true,
    preparationTime: '5-8 min'
  },
  {
    id: 'snk-7',
    name: 'Pakode',
    price: 30,
    category: 'snacks',
    image: 'https://images.unsplash.com/photo-1697155836252-d7f969108b5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzbmFja3MlMjBzYW1vc2F8ZW58MXx8fHwxNzU4ODg3NDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Mixed vegetable fritters with spicy batter',
    isVeg: true,
    rating: 4.3,
    reviewCount: 81,
    isAvailable: true,
    preparationTime: '10-15 min'
  },
  {
    id: 'snk-8',
    name: 'Sabudana Usal',
    price: 30,
    category: 'snacks',
    image: 'https://images.unsplash.com/photo-1697155836252-d7f969108b5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzbmFja3MlMjBzYW1vc2F8ZW58MXx8fHwxNzU4ODg3NDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Tapioca pearl curry with peanuts and spices',
    isVeg: true,
    rating: 4.0,
    reviewCount: 54,
    isAvailable: true,
    preparationTime: '12-18 min'
  },
  {
    id: 'snk-9',
    name: 'Poha Half',
    price: 15,
    category: 'snacks',
    image: 'https://images.unsplash.com/photo-1644289450169-bc58aa16bacb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2hhJTIwaW5kaWFuJTIwYnJlYWtmYXN0fGVufDF8fHx8MTc1ODg4NzQ1OHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Flattened rice with curry leaves and turmeric - small portion',
    isVeg: true,
    rating: 4.2,
    reviewCount: 67,
    isAvailable: true,
    preparationTime: '8-12 min'
  },
  {
    id: 'snk-10',
    name: 'Poha Full',
    price: 25,
    category: 'snacks',
    image: 'https://images.unsplash.com/photo-1644289450169-bc58aa16bacb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2hhJTIwaW5kaWFuJTIwYnJlYWtmYXN0fGVufDF8fHx8MTc1ODg4NzQ1OHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Flattened rice with curry leaves and turmeric - full portion',
    isVeg: true,
    rating: 4.2,
    reviewCount: 89,
    isAvailable: true,
    preparationTime: '8-12 min'
  }
];

export const categories = [
  { id: 'all', name: 'All Items', count: menuItems.length },
  { id: 'appetizers', name: 'Appetizers', count: menuItems.filter(item => item.category === 'appetizers').length },
  { id: 'beverages', name: 'Beverages', count: menuItems.filter(item => item.category === 'beverages').length },
  { id: 'snacks', name: 'Snacks', count: menuItems.filter(item => item.category === 'snacks').length }
];

export const mockOrders: Order[] = [
  {
    id: 'ORD001',
    items: [
      { ...menuItems[0], quantity: 2 },
      { ...menuItems[10], quantity: 1 }
    ],
    totalAmount: 130,
    status: 'preparing',
    orderTime: '10:30 AM',
    estimatedTime: '15 min',
    paymentMethod: 'UPI',
    canCancel: false
  },
  {
    id: 'ORD002',
    items: [
      { ...menuItems[5], quantity: 1 },
      { ...menuItems[15], quantity: 2 }
    ],
    totalAmount: 67,
    status: 'delivered',
    orderTime: 'Yesterday 2:45 PM',
    paymentMethod: 'Cash',
    canCancel: false
  }
];