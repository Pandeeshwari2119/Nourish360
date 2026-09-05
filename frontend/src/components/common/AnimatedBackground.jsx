// AnimatedBackground.jsx
import React from 'react';
import { useAuth } from '../../context/AuthContext';

export const AnimatedBackground = () => {
  const { user } = useAuth();
  const isReduced = user?.settings?.reducedMotion;

  if (isReduced) {
    return (
      <div className="fixed inset-0 pointer-events-none -z-10 bg-[#FAF8F5] overflow-hidden" />
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#FAF8F5]">
      {/* Soft organic radiant gradients */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-sage-200/40 blur-3xl animate-pulse-subtle" />
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-cream-300/50 blur-3xl animate-pulse-subtle" style={{ animationDelay: '3s' }} />
      <div className="absolute -bottom-40 left-1/4 w-[450px] h-[450px] rounded-full bg-sage-100/60 blur-3xl animate-pulse-subtle" style={{ animationDelay: '6s' }} />

      {/* Floating subtle wellness leaves */}
      <svg className="absolute top-24 left-[12%] w-10 h-10 text-sage-400/25 animate-float-slow" viewBox="0 0 100 100" fill="currentColor">
        <path d="M50 15 C70 25 85 50 75 75 C60 90 30 80 25 60 C20 40 35 25 50 15 Z" />
      </svg>
      <svg className="absolute top-1/2 right-[8%] w-12 h-12 text-sage-300/30 animate-float-reverse" viewBox="0 0 100 100" fill="currentColor">
        <path d="M50 15 C70 25 85 50 75 75 C60 90 30 80 25 60 C20 40 35 25 50 15 Z" />
      </svg>
      <svg className="absolute bottom-32 left-[18%] w-8 h-8 text-forest-500/15 animate-float-slow" style={{ animationDelay: '2s' }} viewBox="0 0 100 100" fill="currentColor">
        <path d="M50 15 C70 25 85 50 75 75 C60 90 30 80 25 60 C20 40 35 25 50 15 Z" />
      </svg>
    </div>
  );
};
