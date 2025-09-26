import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Toaster } from './components/ui/sonner';

// Screens
import { SplashScreen } from './components/screens/splash-screen';
import { AuthScreen } from './components/screens/auth-screen';
import { HomeScreen } from './components/screens/home-screen';
import { MenuScreen } from './components/screens/menu-screen';
import { CartScreen } from './components/screens/cart-screen';
import { CheckoutScreen } from './components/screens/checkout-screen';
import { AdminDashboard } from './components/screens/admin-dashboard';

// Components
import { BottomNavigation } from './components/molecules/bottom-navigation';

// Data
import { menuItems, mockOrders } from './lib/data';

export default function App() {
  // App state
  const [currentScreen, setCurrentScreen] = useState<string>('splash');
  const [userRole, setUserRole] = useState<'user' | 'admin' | null>(null);
  const [user, setUser] = useState<any>(null);
  const [cartItems, setCartItems] = useState<{ [key: string]: number }>({});
  const [orders, setOrders] = useState(mockOrders);
  const [checkoutData, setCheckoutData] = useState<any>(null);

  // Initialize with some sample cart items for demo
  useEffect(() => {
    setCartItems({
      'snk-1': 2, // Samosa
      'bev-1': 1, // Half Tea
    });
  }, []);

  // Calculate total cart items
  const totalCartItems = Object.values(cartItems).reduce((sum, quantity) => sum + quantity, 0);

  // Navigation handlers
  const handleRoleSelection = (role: 'user' | 'admin') => {
    setUserRole(role);
    setCurrentScreen('auth');
  };

  const handleAuthentication = (userData: any) => {
    setUser(userData);
    if (userData.role === 'admin') {
      setCurrentScreen('admin');
    } else {
      setCurrentScreen('home');
    }
  };

  const handleQuantityChange = (itemId: string, quantity: number) => {
    setCartItems(prev => ({
      ...prev,
      [itemId]: quantity
    }));
  };

  const handleItemClick = (itemId: string) => {
    // In a real app, this would navigate to item details
    console.log('Item clicked:', itemId);
  };

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen);
  };

  const handleTabChange = (tabId: string) => {
    setCurrentScreen(tabId);
  };

  const handleCheckout = (orderData: any) => {
    setCheckoutData(orderData);
    setCurrentScreen('checkout');
  };

  const handlePaymentComplete = (orderId: string) => {
    // Create new order
    const newOrder = {
      id: orderId,
      items: checkoutData.items,
      totalAmount: checkoutData.total,
      status: 'pending' as const,
      orderTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      estimatedTime: `${checkoutData.estimatedTime} min`,
      paymentMethod: 'UPI',
      canCancel: true
    };

    setOrders(prev => [newOrder, ...prev]);
    
    // Clear cart
    setCartItems({});
    
    // Navigate to orders
    setCurrentScreen('orders');
    setCheckoutData(null);
  };

  const handleBack = () => {
    switch (currentScreen) {
      case 'auth':
        setCurrentScreen('splash');
        setUserRole(null);
        break;
      case 'menu':
      case 'cart':
      case 'orders':
      case 'profile':
        setCurrentScreen('home');
        break;
      case 'checkout':
        setCurrentScreen('cart');
        break;
      default:
        setCurrentScreen('home');
    }
  };

  // Screen components mapping
  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onSelectRole={handleRoleSelection} />;
        
      case 'auth':
        return (
          <AuthScreen
            role={userRole!}
            onBack={handleBack}
            onAuthenticated={handleAuthentication}
          />
        );
        
      case 'home':
        return (
          <HomeScreen
            user={user}
            cartItems={cartItems}
            onQuantityChange={handleQuantityChange}
            onItemClick={handleItemClick}
            onNavigate={handleNavigate}
          />
        );
        
      case 'menu':
        return (
          <MenuScreen
            cartItems={cartItems}
            onQuantityChange={handleQuantityChange}
            onItemClick={handleItemClick}
            onBack={handleBack}
          />
        );
        
      case 'cart':
        return (
          <CartScreen
            cartItems={cartItems}
            onQuantityChange={handleQuantityChange}
            onBack={handleBack}
            onCheckout={handleCheckout}
          />
        );
        
      case 'checkout':
        return (
          <CheckoutScreen
            orderData={checkoutData}
            onBack={handleBack}
            onPaymentComplete={handlePaymentComplete}
          />
        );
        
      case 'orders':
        return (
          <div className="pb-20 px-4 py-4">
            <h1 className="text-xl font-semibold mb-4">My Orders</h1>
            {orders.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-4xl mb-4">📋</div>
                <h2 className="font-semibold mb-2">No orders yet</h2>
                <p className="text-muted-foreground">Your order history will appear here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white p-4 rounded-lg border border-border">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium">Order #{order.id}</h3>
                        <p className="text-sm text-muted-foreground">{order.orderTime}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'preparing' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'ready' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      {order.items.length} items • ₹{order.totalAmount}
                    </div>
                    {order.estimatedTime && (
                      <div className="text-sm text-muted-foreground">
                        Est. {order.estimatedTime}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
        
      case 'admin':
        return (
          <AdminDashboard
            user={user}
            onLogout={() => {
              setUser(null);
              setUserRole(null);
              setCurrentScreen('splash');
            }}
          />
        );
        
      case 'profile':
        return (
          <div className="pb-20 px-4 py-4">
            <div className="text-center mb-6">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-20 h-20 rounded-full mx-auto mb-3"
              />
              <h1 className="text-xl font-semibold">{user?.name}</h1>
              <p className="text-muted-foreground">{user?.email}</p>
              <p className="text-sm text-muted-foreground">{user?.college}</p>
            </div>
            
            <div className="space-y-2">
              <button className="w-full p-3 text-left bg-white rounded-lg border border-border">
                Order History
              </button>
              <button className="w-full p-3 text-left bg-white rounded-lg border border-border">
                Saved Addresses
              </button>
              <button className="w-full p-3 text-left bg-white rounded-lg border border-border">
                Payment Methods
              </button>
              <button className="w-full p-3 text-left bg-white rounded-lg border border-border">
                Preferences
              </button>
              <button className="w-full p-3 text-left bg-white rounded-lg border border-border">
                Help & Support
              </button>
              <button 
                className="w-full p-3 text-left bg-white rounded-lg border border-border text-brand-error"
                onClick={() => {
                  setUser(null);
                  setUserRole(null);
                  setCurrentScreen('splash');
                  setCartItems({});
                }}
              >
                Logout
              </button>
            </div>
          </div>
        );
        
      default:
        return <SplashScreen onSelectRole={handleRoleSelection} />;
    }
  };

  const showBottomNav = user && ['home', 'menu', 'cart', 'orders', 'profile'].includes(currentScreen);

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>

      {showBottomNav && (
        <BottomNavigation
          activeTab={currentScreen}
          onTabChange={handleTabChange}
          cartCount={totalCartItems}
        />
      )}

      <Toaster />
    </div>
  );
}