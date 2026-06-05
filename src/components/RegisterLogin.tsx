import React, { useState } from 'react';
import { Building, LogIn, ArrowLeft, Mail, Lock, User, Phone, Check, ChevronRight } from 'lucide-react';

import loginBg from '../assets/login-bg.jpg';
import { API_BASE_URL } from '../config/api';

interface RegisterLoginProps {
  onLoginSuccess: () => void;
  onGoBack: () => void;
}

export function RegisterLogin({ onLoginSuccess, onGoBack }: RegisterLoginProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleGoBack = () => {
    localStorage.setItem('user', JSON.stringify({ email: 'guest@hotelify.com', customerName: 'Guest User' }));
    onGoBack();
  };

  const handleSocialLogin = () => {
    localStorage.setItem('user', JSON.stringify({ email: 'social.user@hotelify.com', customerName: 'Demo User' }));
    onLoginSuccess();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (!isLogin && !name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!isLogin && !agreed) {
      setError('You must agree to the Terms and Conditions.');
      return;
    }

    try {
      if (isLogin) {
        // API call to log in
        const response = await fetch(`${API_BASE_URL}/authlogin/${encodeURIComponent(email)}/${encodeURIComponent(password)}`);
        const data = await response.json();
        
        if (data.success) {
          // Store user details in localStorage
          const user = data.customer && data.customer[0] ? data.customer[0] : { email, customerName: email };
          localStorage.setItem('user', JSON.stringify(user));
          onLoginSuccess();
        } else {
          setError(data.message || 'Invalid email or password.');
        }
      } else {
        // API call to register/add customer
        const response = await fetch(`${API_BASE_URL}/addcustomer/${encodeURIComponent(name)}/${encodeURIComponent(email)}/${encodeURIComponent(password)}/NotProvided`);
        const data = await response.json();
        
        if (data.success) {
          // Registration successful, switch to login view and show a success message or login automatically
          setError('Registration successful! Please sign in with your credentials.');
          setIsLogin(true);
        } else {
          setError(data.message || 'Registration failed.');
        }
      }
    } catch (err) {
      console.error(err);
      setError('Connection to backend failed. Please make sure the server is running.');
    }
  };

  const IMG = loginBg;

  return (
    <div className="hero w-full h-screen flex items-center justify-center relative font-sans">
      
      {/* Background Image Container */}
      <div 
        className="hero-bg" 
        style={{ backgroundImage: `url(${IMG})` }}
      />

      {/* Glassmorphic Overlay for Darker/Premium feel */}
      <div className="absolute inset-0 bg-black/40 z-[1] transition-all duration-300" />

      {/* Glassmorphic Form Card */}
      <div className="relative z-10 w-full max-w-md mx-4 overflow-hidden rounded-3xl bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.25)] flex flex-col p-8 transition-all duration-300 animate-slide-up">
        
        {/* Top brand header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-white font-bold text-lg cursor-pointer" onClick={handleGoBack}>
            <Building className="h-6 w-6 text-[#dcf344] dark:text-blue-400 fill-[#dcf344]/10 dark:fill-blue-500/10" />
            <span>Hotelify</span>
          </div>
          <button 
            onClick={handleGoBack}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-md border border-white/10 hover:border-white/20 transition-all cursor-pointer active:scale-95"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to App</span>
          </button>
        </div>

        {/* Title */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white leading-tight">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-xs text-gray-200 dark:text-gray-300 mt-1 font-medium">
            {isLogin 
              ? 'Enter your credentials to access the Hotelify admin suite.' 
              : 'Sign up to manage check-ins, inventory, and analytics.'}
          </p>
        </div>

        {/* Form Error Message */}
        {error && (
          <div className="mb-4 bg-red-500/20 backdrop-blur-md border border-red-500/30 text-red-100 text-xs py-2.5 px-4 rounded-xl font-semibold flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0 animate-ping"></span>
            <span>{error}</span>
          </div>
        )}

        {/* Auth form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {/* Name Field (Register only) */}
          {!isLogin && (
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-white/80 tracking-wide uppercase">Full Name</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50">
                  <User className="h-4 w-4" />
                </span>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ethan Brown"
                  className="w-full text-xs pl-10 pr-4 py-3 rounded-xl border border-white/10 bg-black/20 focus:bg-black/35 focus:outline-none focus:ring-2 focus:ring-[#dcf344]/30 dark:focus:ring-blue-500/30 focus:border-[#dcf344] dark:focus:border-blue-500 text-white font-medium placeholder-white/30 transition-all"
                />
              </div>
            </div>
          )}

          {/* Email Field */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-white/80 tracking-wide uppercase">Email Address</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50">
                <Mail className="h-4 w-4" />
              </span>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. ethan.brown@example.com"
                className="w-full text-xs pl-10 pr-4 py-3 rounded-xl border border-white/10 bg-black/20 focus:bg-black/35 focus:outline-none focus:ring-2 focus:ring-[#dcf344]/30 dark:focus:ring-blue-500/30 focus:border-[#dcf344] dark:focus:border-blue-500 text-white font-medium placeholder-white/30 transition-all"
              />
            </div>
          </div>

          {/* Phone Field (Register only) */}
          {!isLogin && (
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-white/80 tracking-wide uppercase">Phone Number</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50">
                  <Phone className="h-4 w-4" />
                </span>
                <input 
                  type="text" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 647-880-2356"
                  className="w-full text-xs pl-10 pr-4 py-3 rounded-xl border border-white/10 bg-black/20 focus:bg-black/35 focus:outline-none focus:ring-2 focus:ring-[#dcf344]/30 dark:focus:ring-blue-500/30 focus:border-[#dcf344] dark:focus:border-blue-500 text-white font-medium placeholder-white/30 transition-all"
                />
              </div>
            </div>
          )}

          {/* Password Field */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-bold text-white/80 tracking-wide uppercase">Password</label>
              {isLogin && (
                <a href="#" className="text-[10px] text-[#dcf344] dark:text-blue-400 hover:underline font-semibold tracking-wide">Forgot?</a>
              )}
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50">
                <Lock className="h-4 w-4" />
              </span>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full text-xs pl-10 pr-4 py-3 rounded-xl border border-white/10 bg-black/20 focus:bg-black/35 focus:outline-none focus:ring-2 focus:ring-[#dcf344]/30 dark:focus:ring-blue-500/30 focus:border-[#dcf344] dark:focus:border-blue-500 text-white font-medium placeholder-white/30 transition-all"
              />
            </div>
          </div>

          {/* Checkbox (Register only) */}
          {!isLogin && (
            <label className="flex items-start gap-2.5 mt-1 cursor-pointer select-none">
              <div className="relative flex items-center justify-center mt-0.5">
                <input 
                  type="checkbox" 
                  checked={agreed}
                  onChange={() => setAgreed(!agreed)}
                  className="peer sr-only" 
                />
                <div className="w-4 h-4 rounded border border-white/20 bg-black/20 peer-checked:bg-[#dcf344] dark:peer-checked:bg-blue-600 peer-checked:border-transparent flex items-center justify-center transition-all">
                  <Check className="h-3 w-3 text-gray-900 dark:text-white stroke-[3]" />
                </div>
              </div>
              <span className="text-[11px] text-gray-200 dark:text-gray-300 font-semibold leading-tight">
                I agree to the <a href="#" className="text-[#dcf344] dark:text-blue-400 hover:underline">Terms of Service</a> & <a href="#" className="text-[#dcf344] dark:text-blue-400 hover:underline">Privacy Policy</a>
              </span>
            </label>
          )}

          {/* Action buttons */}
          <button 
            type="submit" 
            className="w-full mt-2 bg-[#dcf344] dark:bg-gradient-to-r dark:from-blue-600 dark:to-indigo-600 hover:bg-[#d4ed36] dark:hover:from-blue-500 dark:hover:to-indigo-500 text-gray-900 dark:text-white text-sm font-bold py-3.5 rounded-xl shadow-lg shadow-yellow-950/20 dark:shadow-blue-950/20 flex items-center justify-center gap-2 hover:gap-3 transition-all active:scale-[0.98] cursor-pointer"
          >
            <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
            <ChevronRight className="h-4 w-4" />
          </button>

          {/* Social login line */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="flex-shrink mx-4 text-[10px] text-white/50 font-bold uppercase tracking-wider">Or continue with</span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>

          {/* Social buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button 
              type="button" 
              onClick={handleSocialLogin}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <span>Google</span>
            </button>
            <button 
              type="button" 
              onClick={handleSocialLogin}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <span>Microsoft</span>
            </button>
          </div>

          {/* Toggle view */}
          <p className="text-center text-xs text-white/60 font-semibold mt-4">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              type="button"
              onClick={() => { setIsLogin(!isLogin); setError(''); }}
              className="text-[#dcf344] dark:text-blue-400 hover:underline font-bold"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </form>
      </div>
      
      {/* Animations styling */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />
    </div>
  );
}
