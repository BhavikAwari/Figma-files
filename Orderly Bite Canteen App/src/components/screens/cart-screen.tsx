import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Trash2, Tag, CreditCard, Clock } from 'lucide-react';
import { QuantitySelector } from '../atoms/quantity-selector';
import { EnhancedButton } from '../atoms/enhanced-button';
import { menuItems } from '../../lib/data';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { toast } from 'sonner';

interface CartScreenProps {
  cartItems: { [key: string]: number };
  onQuantityChange: (itemId: string, quantity: number) => void;
  onBack: () => void;
  onCheckout: (orderData: any) => void;
}

export function CartScreen({ 
  cartItems, 
  onQuantityChange, 
  onBack,
  onCheckout 
}: CartScreenProps) {
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);
  const [showPromoInput, setShowPromoInput] = useState(false);

  const cartItemsArray = Object.entries(cartItems)
    .filter(([_, quantity]) => quantity > 0)
    .map(([itemId, quantity]) => {
      const item = menuItems.find(i => i.id === itemId);
      return item ? { ...item, quantity } : null;
    })
    .filter(Boolean) as Array<typeof menuItems[0] & { quantity: number }>;

  const subtotal = cartItemsArray.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = appliedPromo ? Math.min(appliedPromo.discount, subtotal * 0.3) : 0;
  const deliveryFee = 0; // Free pickup
  const total = subtotal - discount + deliveryFee;
  const estimatedTime = Math.max(...cartItemsArray.map(item => 
    parseInt(item.preparationTime.split('-')[1]) || 10
  )) + 5; // Add 5 minutes buffer

  const handleApplyPromo = () => {
    const validPromoCodes = {
      'SAVE20': { discount: 20, minOrder: 100 },
      'STUDENT10': { discount: 10, minOrder: 50 },
      'FIRST25': { discount: 25, minOrder: 75 }
    };

    const promo = validPromoCodes[promoCode as keyof typeof validPromoCodes];
    
    if (!promo) {
      toast.error('Invalid promo code');
      return;
    }
    
    if (subtotal < promo.minOrder) {
      toast.error(`Minimum order of ₹${promo.minOrder} required`);
      return;
    }

    setAppliedPromo({ code: promoCode, discount: promo.discount });
    setShowPromoInput(false);
    setPromoCode('');
    toast.success(`Promo code applied! ₹${promo.discount} off`);
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    toast.success('Promo code removed');
  };

  const handleCheckout = () => {
    if (cartItemsArray.length === 0) return;

    const orderData = {
      items: cartItemsArray,
      subtotal,
      discount,
      total,
      estimatedTime,
      promoCode: appliedPromo?.code
    };

    onCheckout(orderData);
  };

  if (cartItemsArray.length === 0) {
    return (
      <div className="pb-20">
        <div className="bg-white border-b border-border px-4 py-3">
          <div className="flex items-center space-x-3">
            <button onClick={onBack} className="p-2 -ml-2">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="font-semibold">Your Cart</h1>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center py-16 px-6">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground text-center mb-6">
            Looks like you haven't added any items to your cart yet. 
            Browse our menu and add your favorite items!
          </p>
          <EnhancedButton variant="primary" onClick={onBack}>
            Browse Menu
          </EnhancedButton>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="bg-white border-b border-border px-4 py-3 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button onClick={onBack} className="p-2 -ml-2">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="font-semibold">Your Cart</h1>
          </div>
          <div className="flex items-center space-x-1 text-muted-foreground text-sm">
            <Clock className="w-4 h-4" />
            <span>~{estimatedTime} min</span>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Cart Items */}
        <Card className="p-0">
          <div className="p-4 border-b border-border">
            <h2 className="font-medium">Order Items ({cartItemsArray.length})</h2>
          </div>
          
          <div className="space-y-0">
            {cartItemsArray.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 flex items-center space-x-3 ${
                  index !== cartItemsArray.length - 1 ? 'border-b border-border' : ''
                }`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">₹{item.price} each</p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <QuantitySelector
                    value={item.quantity}
                    onChange={(quantity) => onQuantityChange(item.id, quantity)}
                    size="sm"
                    min={0}
                  />
                  
                  <div className="text-right">
                    <p className="font-medium">₹{item.price * item.quantity}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Promo Code */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium flex items-center">
              <Tag className="w-4 h-4 mr-2 text-brand-primary" />
              Promo Code
            </h3>
            {appliedPromo && (
              <button
                onClick={handleRemovePromo}
                className="text-sm text-brand-error"
              >
                Remove
              </button>
            )}
          </div>

          {appliedPromo ? (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-green-800">
                  {appliedPromo.code} applied
                </span>
                <span className="text-sm font-medium text-green-800">
                  -₹{discount}
                </span>
              </div>
            </div>
          ) : showPromoInput ? (
            <div className="flex space-x-2">
              <Input
                placeholder="Enter promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                className="flex-1"
              />
              <EnhancedButton
                variant="primary"
                size="sm"
                onClick={handleApplyPromo}
                disabled={!promoCode}
              >
                Apply
              </EnhancedButton>
            </div>
          ) : (
            <button
              onClick={() => setShowPromoInput(true)}
              className="w-full p-3 border-2 border-dashed border-border rounded-lg text-center text-brand-primary text-sm"
            >
              + Add Promo Code
            </button>
          )}
        </Card>

        {/* Bill Summary */}
        <Card className="p-4">
          <h3 className="font-medium mb-3">Bill Summary</h3>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-₹{discount}</span>
              </div>
            )}
            
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span className="text-green-600">FREE</span>
            </div>
            
            <div className="border-t border-border pt-2 flex justify-between font-semibold">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>
        </Card>

        {/* Important Notice */}
        <Card className="p-4 bg-amber-50 border-amber-200">
          <div className="flex items-start space-x-2">
            <div className="text-amber-600 mt-0.5">⚠️</div>
            <div>
              <p className="text-sm font-medium text-amber-800 mb-1">
                Important Notice
              </p>
              <p className="text-sm text-amber-700">
                No cancellation allowed after order confirmation. 
                Please review your order carefully before proceeding.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Checkout Button */}
      <div className="fixed bottom-20 left-0 right-0 p-4 bg-white border-t border-border">
        <EnhancedButton
          variant="primary"
          size="lg"
          fullWidth
          onClick={handleCheckout}
          icon={<CreditCard className="w-5 h-5" />}
        >
          Proceed to Payment • ₹{total}
        </EnhancedButton>
      </div>
    </div>
  );
}