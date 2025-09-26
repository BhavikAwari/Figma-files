import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, CreditCard, Smartphone, Wallet, CheckCircle } from 'lucide-react';
import { EnhancedButton } from '../atoms/enhanced-button';
import { Card } from '../ui/card';
import { toast } from 'sonner';

interface CheckoutScreenProps {
  orderData: any;
  onBack: () => void;
  onPaymentComplete: (orderId: string) => void;
}

export function CheckoutScreen({ orderData, onBack, onPaymentComplete }: CheckoutScreenProps) {
  const [selectedPayment, setSelectedPayment] = useState<string>('upi');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'payment' | 'processing' | 'success'>('payment');
  const [orderId, setOrderId] = useState('');

  const paymentMethods = [
    {
      id: 'upi',
      name: 'UPI Payment',
      icon: <Smartphone className="w-5 h-5" />,
      description: 'Google Pay, PhonePe, Paytm',
      popular: true
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: <CreditCard className="w-5 h-5" />,
      description: 'Visa, Mastercard, RuPay'
    },
    {
      id: 'wallet',
      name: 'Digital Wallet',
      icon: <Wallet className="w-5 h-5" />,
      description: 'Paytm, PhonePe Wallet'
    },
    {
      id: 'cash',
      name: 'Cash on Pickup',
      icon: <span className="text-lg">💰</span>,
      description: 'Pay when you collect'
    }
  ];

  const handlePayment = async () => {
    setLoading(true);
    setStep('processing');
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const newOrderId = `ORD${Date.now().toString().slice(-6)}`;
    setOrderId(newOrderId);
    setStep('success');
    setLoading(false);
    
    toast.success('Payment successful!');
    
    // Auto redirect after success
    setTimeout(() => {
      onPaymentComplete(newOrderId);
    }, 2000);
  };

  if (step === 'processing') {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-2 border-brand-primary border-t-transparent rounded-full"
            />
          </div>
          <h2 className="text-xl font-semibold mb-2">Processing Payment</h2>
          <p className="text-muted-foreground">Please wait while we process your payment...</p>
        </motion.div>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-green-600" />
          </motion.div>
          
          <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
          <p className="text-muted-foreground mb-4">Your order has been placed successfully</p>
          
          <Card className="p-4 mb-6 bg-green-50 border-green-200">
            <div className="text-center">
              <p className="text-sm text-green-700 mb-1">Order ID</p>
              <p className="font-mono text-lg font-semibold text-green-800">#{orderId}</p>
            </div>
          </Card>
          
          <p className="text-sm text-muted-foreground">
            Redirecting to order tracking...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="bg-white border-b border-border px-4 py-3 sticky top-0 z-10">
        <div className="flex items-center space-x-3">
          <button onClick={onBack} className="p-2 -ml-2">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-semibold">Checkout</h1>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Order Summary */}
        <Card className="p-4">
          <h2 className="font-medium mb-3">Order Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>{orderData.items.length} items</span>
              <span>₹{orderData.subtotal}</span>
            </div>
            {orderData.discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-₹{orderData.discount}</span>
              </div>
            )}
            <div className="border-t border-border pt-2 flex justify-between font-semibold">
              <span>Total Amount</span>
              <span>₹{orderData.total}</span>
            </div>
          </div>
        </Card>

        {/* Estimated Time */}
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-center space-x-2">
            <div className="text-blue-600">⏱️</div>
            <div>
              <p className="font-medium text-blue-800">Estimated Preparation Time</p>
              <p className="text-sm text-blue-700">~{orderData.estimatedTime} minutes</p>
            </div>
          </div>
        </Card>

        {/* Payment Methods */}
        <Card className="p-0">
          <div className="p-4 border-b border-border">
            <h2 className="font-medium">Select Payment Method</h2>
          </div>
          
          <div className="space-y-0">
            {paymentMethods.map((method, index) => (
              <motion.div
                key={method.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 flex items-center space-x-3 cursor-pointer hover:bg-accent transition-colors ${
                  index !== paymentMethods.length - 1 ? 'border-b border-border' : ''
                }`}
                onClick={() => setSelectedPayment(method.id)}
              >
                <div className="flex-shrink-0">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedPayment === method.id 
                      ? 'border-brand-primary bg-brand-primary' 
                      : 'border-border'
                  }`}>
                    {selectedPayment === method.id && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    {method.icon}
                    <span className="font-medium">{method.name}</span>
                    {method.popular && (
                      <span className="px-2 py-0.5 bg-brand-primary text-white text-xs rounded-full">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* UPI Apps - Show when UPI is selected */}
        {selectedPayment === 'upi' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
          >
            <Card className="p-4">
              <h3 className="font-medium mb-3">Choose UPI App</h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { name: 'Google Pay', icon: '📱', color: 'bg-blue-50' },
                  { name: 'PhonePe', icon: '💜', color: 'bg-purple-50' },
                  { name: 'Paytm', icon: '💙', color: 'bg-blue-50' }
                ].map((app) => (
                  <button
                    key={app.name}
                    className={`p-3 ${app.color} rounded-lg text-center hover:scale-105 transition-transform`}
                  >
                    <div className="text-2xl mb-1">{app.icon}</div>
                    <div className="text-xs font-medium">{app.name}</div>
                  </button>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Terms */}
        <Card className="p-4 bg-amber-50 border-amber-200">
          <div className="flex items-start space-x-2">
            <div className="text-amber-600 mt-0.5">⚠️</div>
            <div>
              <p className="text-sm font-medium text-amber-800 mb-1">
                Payment Terms
              </p>
              <ul className="text-sm text-amber-700 space-y-1">
                <li>• No cancellation allowed after payment confirmation</li>
                <li>• Order will be prepared immediately after payment</li>
                <li>• Pickup from canteen counter within estimated time</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      {/* Payment Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-border">
        <EnhancedButton
          variant="primary"
          size="lg"
          fullWidth
          loading={loading}
          onClick={handlePayment}
          icon={<CreditCard className="w-5 h-5" />}
        >
          Pay ₹{orderData.total}
        </EnhancedButton>
      </div>
    </div>
  );
}