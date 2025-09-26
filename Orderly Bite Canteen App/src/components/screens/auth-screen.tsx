import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Mail, Phone, Eye, EyeOff } from 'lucide-react';
import { Logo } from '../branding/logo';
import { EnhancedButton } from '../atoms/enhanced-button';
import { Input } from '../ui/input';

interface AuthScreenProps {
  role: 'user' | 'admin';
  onBack: () => void;
  onAuthenticated: (user: any) => void;
}

export function AuthScreen({ role, onBack, onAuthenticated }: AuthScreenProps) {
  const [mode, setMode] = useState<'login' | 'signup' | 'otp'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    name: '',
    college: '',
    otp: ''
  });

  const isAdmin = role === 'admin';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Mock authentication delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (mode === 'signup' && !isAdmin) {
      setMode('otp');
      setLoading(false);
      return;
    }
    
    // Mock user data
    const userData = {
      id: '1',
      name: isAdmin ? 'Admin User' : (formData.name || 'Student User'),
      email: formData.email,
      role,
      college: isAdmin ? 'System Administrator' : (formData.college || 'College Name'),
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    };
    
    setLoading(false);
    onAuthenticated(userData);
  };

  const handleOtpVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const userData = {
      id: '1',
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: 'user',
      college: formData.college,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    };
    
    setLoading(false);
    onAuthenticated(userData);
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    // Mock social login
    const userData = {
      id: '1',
      name: 'Student User',
      email: 'student@college.edu',
      role: 'user' as const,
      college: 'College Name',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    };
    onAuthenticated(userData);
  };

  if (mode === 'otp') {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <button onClick={() => setMode('signup')} className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <Logo variant="wordmark" />
          <div className="w-9" />
        </div>

        <div className="flex-1 flex flex-col justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-sm mx-auto w-full"
          >
            <h1 className="text-2xl font-bold text-center mb-2">Verify OTP</h1>
            <p className="text-muted-foreground text-center mb-6">
              Enter the 6-digit code sent to {formData.phone}
            </p>

            <form onSubmit={handleOtpVerification} className="space-y-4">
              <Input
                type="text"
                placeholder="Enter OTP"
                value={formData.otp}
                onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                className="text-center text-lg tracking-widest"
                maxLength={6}
                required
              />

              <EnhancedButton
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={loading}
              >
                Verify & Continue
              </EnhancedButton>

              <button
                type="button"
                className="w-full text-center text-brand-primary text-sm"
                onClick={() => console.log('Resend OTP')}
              >
                Resend OTP
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <button onClick={onBack} className="p-2">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <Logo variant="wordmark" />
        <div className="w-9" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-sm mx-auto w-full"
        >
          <h1 className="text-2xl font-bold text-center mb-2">
            {isAdmin ? 'Admin Login' : (mode === 'login' ? 'Welcome Back' : 'Create Account')}
          </h1>
          <p className="text-muted-foreground text-center mb-6">
            {isAdmin ? 'Access the admin dashboard' : 
             mode === 'login' ? 'Sign in to your account' : 'Join Orderly Bite today'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && !isAdmin && (
              <>
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <Input
                  type="text"
                  placeholder="College Name"
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  required
                />
              </>
            )}

            <Input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            {mode === 'signup' && !isAdmin && (
              <Input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            )}

            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <EnhancedButton
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
            >
              {isAdmin ? 'Login' : (mode === 'login' ? 'Sign In' : 'Create Account')}
            </EnhancedButton>
          </form>

          {/* Social Login - Only for users */}
          {!isAdmin && (
            <>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-background text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <EnhancedButton
                  variant="secondary"
                  onClick={() => handleSocialLogin('Google')}
                >
                  Google
                </EnhancedButton>
                <EnhancedButton
                  variant="secondary"
                  onClick={() => handleSocialLogin('Facebook')}
                >
                  Facebook
                </EnhancedButton>
              </div>
            </>
          )}

          {/* Toggle Mode */}
          {!isAdmin && (
            <div className="text-center mt-6">
              <button
                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                className="text-brand-primary text-sm"
              >
                {mode === 'login' ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </button>
            </div>
          )}

          {mode === 'login' && (
            <div className="text-center mt-4">
              <button className="text-brand-primary text-sm">
                Forgot Password?
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}