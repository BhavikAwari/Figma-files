import React from 'react';
import { motion } from 'motion/react';
import { Users, Shield } from 'lucide-react';
import { Logo } from '../branding/logo';
import { EnhancedButton } from '../atoms/enhanced-button';

interface SplashScreenProps {
  onSelectRole: (role: 'user' | 'admin') => void;
}

export function SplashScreen({ onSelectRole }: SplashScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-primary/5 via-white to-brand-secondary/5 flex flex-col">
      {/* Logo Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex-1 flex flex-col items-center justify-center px-6"
      >
        <div className="text-center mb-8">
          <Logo variant="full" size="xl" className="mb-6" />
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl font-bold text-foreground mb-2"
          >
            Welcome to Orderly Bite
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-muted-foreground text-center max-w-sm"
          >
            Skip the queue, order ahead, and enjoy your favorite canteen food without the wait
          </motion.p>
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="grid grid-cols-2 gap-4 mb-8 max-w-sm w-full"
        >
          <div className="text-center p-4 bg-white/50 rounded-lg">
            <div className="w-8 h-8 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-brand-primary text-sm">⚡</span>
            </div>
            <p className="text-xs text-muted-foreground">Fast Ordering</p>
          </div>
          
          <div className="text-center p-4 bg-white/50 rounded-lg">
            <div className="w-8 h-8 bg-brand-success/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-brand-success text-sm">🥗</span>
            </div>
            <p className="text-xs text-muted-foreground">Fresh Food</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Role Selection */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="p-6 bg-white/80 backdrop-blur-sm border-t border-border"
      >
        <h2 className="text-lg font-semibold text-center mb-4">Choose Your Role</h2>
        
        <div className="space-y-3 max-w-sm mx-auto">
          <EnhancedButton
            variant="primary"
            size="lg"
            fullWidth
            icon={<Users className="w-5 h-5" />}
            onClick={() => onSelectRole('user')}
          >
            Continue as Student
          </EnhancedButton>
          
          <EnhancedButton
            variant="secondary"
            size="lg"
            fullWidth
            icon={<Shield className="w-5 h-5" />}
            onClick={() => onSelectRole('admin')}
          >
            Admin Login
          </EnhancedButton>
        </div>
        
        <p className="text-xs text-muted-foreground text-center mt-4">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </motion.div>
    </div>
  );
}