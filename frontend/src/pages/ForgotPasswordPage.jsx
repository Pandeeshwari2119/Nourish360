import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { Sparkles, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [demoToken, setDemoToken] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleRequest = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.forgotPassword(email);
      if (res.success) {
        setDemoToken(res.demoToken || 'demo_token');
      }
    } catch (err) {
      setError('Failed to request reset token.');
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.resetPassword(demoToken, newPassword);
      if (res.success) {
        setSuccess(true);
      } else {
        setError(res.message);
      }
    } catch (err) {
      setError('Password reset failed.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white/90 backdrop-blur-md rounded-3xl border border-stone-200/80 p-8 shadow-soft">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-forest-600 text-white flex items-center justify-center mx-auto mb-3 shadow-soft">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="font-serif font-bold text-2xl text-stone-900">Reset Password</h2>
          <p className="text-xs text-stone-500 mt-1">Enter your account email to receive reset instructions.</p>
        </div>

        {error && (
          <div className="mb-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success ? (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-center space-y-3">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <p className="text-xs font-semibold">Your password has been reset successfully!</p>
            <Link
              to="/login"
              className="inline-block px-5 py-2 rounded-xl bg-forest-600 text-white text-xs font-bold transition shadow-sm"
            >
              Proceed to Log In
            </Link>
          </div>
        ) : !demoToken ? (
          <form onSubmit={handleRequest} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-forest-500"
                placeholder="you@example.com"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-forest-600 hover:bg-forest-700 text-white font-bold text-xs shadow-soft transition flex items-center justify-center gap-2"
            >
              <span>Send Reset Instructions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleReset} className="space-y-4">
            <div className="p-3 bg-sage-50 rounded-xl text-[11px] text-forest-700">
              Reset token generated for demo account. Please set your new password below.
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">New Password</label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-forest-500"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-forest-600 hover:bg-forest-700 text-white font-bold text-xs shadow-soft transition"
            >
              Update Password
            </button>
          </form>
        )}

        <div className="mt-6 pt-4 border-t border-stone-100 text-center text-xs text-stone-500">
          <Link to="/login" className="text-forest-700 font-semibold hover:underline">
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};
