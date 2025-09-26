import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, 
  Package, 
  Users, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Plus,
  Search,
  Filter,
  LogOut
} from 'lucide-react';
import { Card } from '../ui/card';
import { EnhancedButton } from '../atoms/enhanced-button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { mockOrders, menuItems } from '../../lib/data';

interface AdminDashboardProps {
  user: any;
  onLogout: () => void;
}

export function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'menu' | 'reports'>('dashboard');
  const [orders, setOrders] = useState(mockOrders);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock admin stats
  const stats = {
    todayOrders: 45,
    todayRevenue: 2850,
    pendingOrders: 8,
    avgOrderValue: 63
  };

  const updateOrderStatus = (orderId: string, newStatus: any) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Today's Orders</p>
              <p className="text-2xl font-bold">{stats.todayOrders}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Today's Revenue</p>
              <p className="text-2xl font-bold">₹{stats.todayRevenue}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending Orders</p>
              <p className="text-2xl font-bold">{stats.pendingOrders}</p>
            </div>
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Order Value</p>
              <p className="text-2xl font-bold">₹{stats.avgOrderValue}</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card className="p-0">
        <div className="p-4 border-b border-border">
          <h2 className="font-semibold">Recent Orders</h2>
        </div>
        <div className="space-y-0">
          {orders.slice(0, 5).map((order, index) => (
            <div
              key={order.id}
              className={`p-4 flex items-center justify-between ${
                index !== 4 ? 'border-b border-border' : ''
              }`}
            >
              <div>
                <p className="font-medium">#{order.id}</p>
                <p className="text-sm text-muted-foreground">
                  {order.items.length} items • ₹{order.totalAmount}
                </p>
              </div>
              <Badge
                variant={
                  order.status === 'pending' ? 'secondary' :
                  order.status === 'preparing' ? 'default' :
                  order.status === 'ready' ? 'default' : 'secondary'
                }
              >
                {order.status}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-4">
      {/* Search and Filter */}
      <div className="flex space-x-2">
        <Input
          placeholder="Search orders..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <EnhancedButton variant="secondary" size="sm" icon={<Filter className="w-4 h-4" />}>
          Filter
        </EnhancedButton>
      </div>

      {/* Orders List */}
      <div className="space-y-3">
        {orders.map((order) => (
          <Card key={order.id} className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-medium">Order #{order.id}</h3>
                <p className="text-sm text-muted-foreground">{order.orderTime}</p>
              </div>
              <Badge
                variant={
                  order.status === 'pending' ? 'secondary' :
                  order.status === 'preparing' ? 'default' :
                  order.status === 'ready' ? 'default' : 'secondary'
                }
              >
                {order.status}
              </Badge>
            </div>

            <div className="space-y-2 mb-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span>{item.quantity}x {item.name}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border">
              <span className="font-medium">Total: ₹{order.totalAmount}</span>
              
              {order.status === 'pending' && (
                <EnhancedButton
                  size="sm"
                  onClick={() => updateOrderStatus(order.id, 'preparing')}
                >
                  Start Preparing
                </EnhancedButton>
              )}
              
              {order.status === 'preparing' && (
                <EnhancedButton
                  size="sm"
                  variant="success"
                  onClick={() => updateOrderStatus(order.id, 'ready')}
                >
                  Mark Ready
                </EnhancedButton>
              )}
              
              {order.status === 'ready' && (
                <EnhancedButton
                  size="sm"
                  variant="secondary"
                  onClick={() => updateOrderStatus(order.id, 'delivered')}
                >
                  Mark Delivered
                </EnhancedButton>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderMenu = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold">Menu Management</h2>
        <EnhancedButton size="sm" icon={<Plus className="w-4 h-4" />}>
          Add Item
        </EnhancedButton>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {menuItems.slice(0, 8).map((item) => (
          <Card key={item.id} className="p-4">
            <div className="flex items-center space-x-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-muted-foreground">₹{item.price}</p>
                <p className="text-xs text-muted-foreground capitalize">{item.category}</p>
              </div>
              <div className="flex flex-col space-y-1">
                <Badge variant={item.isAvailable ? 'default' : 'secondary'}>
                  {item.isAvailable ? 'Available' : 'Out of Stock'}
                </Badge>
                <EnhancedButton size="sm" variant="ghost">
                  Edit
                </EnhancedButton>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      <h2 className="font-semibold">Sales Reports</h2>
      
      <Card className="p-6">
        <h3 className="font-medium mb-4">Today's Performance</h3>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span>Orders Completed</span>
            <span className="font-medium">37</span>
          </div>
          <div className="flex justify-between">
            <span>Revenue Generated</span>
            <span className="font-medium">₹2,340</span>
          </div>
          <div className="flex justify-between">
            <span>Most Popular Item</span>
            <span className="font-medium">Samosa</span>
          </div>
          <div className="flex justify-between">
            <span>Peak Hours</span>
            <span className="font-medium">11:30 AM - 1:00 PM</span>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-medium mb-4">Category Performance</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span>Snacks</span>
            <div className="flex items-center space-x-2">
              <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                <div className="w-3/4 h-full bg-brand-primary rounded-full" />
              </div>
              <span className="text-sm font-medium">75%</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span>Beverages</span>
            <div className="flex items-center space-x-2">
              <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                <div className="w-1/2 h-full bg-brand-success rounded-full" />
              </div>
              <span className="text-sm font-medium">50%</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span>Appetizers</span>
            <div className="flex items-center space-x-2">
              <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                <div className="w-1/3 h-full bg-brand-warning rounded-full" />
              </div>
              <span className="text-sm font-medium">33%</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'orders', label: 'Orders', icon: <Package className="w-4 h-4" /> },
    { id: 'menu', label: 'Menu', icon: <Users className="w-4 h-4" /> },
    { id: 'reports', label: 'Reports', icon: <TrendingUp className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border px-4 py-3 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-semibold">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Welcome back, {user?.name}</p>
          </div>
          <EnhancedButton
            variant="ghost"
            size="sm"
            icon={<LogOut className="w-4 h-4" />}
            onClick={onLogout}
          >
            Logout
          </EnhancedButton>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-border px-4 py-2">
        <div className="flex space-x-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-brand-primary text-white'
                  : 'text-muted-foreground hover:bg-accent'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'orders' && renderOrders()}
            {activeTab === 'menu' && renderMenu()}
            {activeTab === 'reports' && renderReports()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}