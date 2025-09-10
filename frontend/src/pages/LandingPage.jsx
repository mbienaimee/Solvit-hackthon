import React from 'react';
import { useAppStore } from '../stores/appStore';
import { Link } from 'react-router-dom';
import '../App.css';

const LandingPage = () => {
  const { theme, setTheme } = useAppStore();
  const isDark = theme === 'dark';
  return (
    <div className={
      `min-h-screen flex flex-col justify-center items-center ` +
      (isDark
        ? 'bg-gradient-to-br from-custom-dark via-teal-800 to-slate-800'
        : 'bg-gradient-to-br from-slate-50 via-slate-100 to-blue-100')
    }>
      <button
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        className={`px-4 py-2 rounded-full font-bold shadow-lg transition-all duration-200 ` +
          (isDark ? 'bg-custom-accent text-white hover:bg-opacity-80' : 'bg-white text-blue-700 border border-blue-400 hover:bg-blue-100')}
      >
        {isDark ? '🌙' : '☀️'} Mode
      </button>
      <div className={
        (isDark ? 'bg-slate-900/95 text-slate-100' : 'bg-white/95 text-slate-900') +
        ' rounded-2xl shadow-xl p-10 max-w-xl w-full text-center animate-fade-in border border-slate-200'
      }>
        <img src="/diament-removebg-preview.png" alt="DIAMENT Logo" className="mx-auto mb-6 w-24 h-24 drop-shadow-lg animate-bounce" />
        <h1 className="text-4xl font-bold mb-4 tracking-tight animate-slide-down">
          Welcome to <span className={isDark ? 'text-indigo-300' : 'text-indigo-600'}>DIAMENT</span>
        </h1>
        <div className="mb-8">
          <div className={
            'inline-block px-6 py-4 rounded-xl shadow font-medium text-base animate-fade-in ' +
            (isDark ? 'bg-slate-800 text-slate-100' : 'bg-slate-100 text-slate-800')
          }>
            DIAMENT helps you find jobs, connect with mentors, and learn new skills—all in one place.
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 justify-center mt-6">
          <Link to="/signin" className={
            (isDark
              ? 'bg-custom-accent text-white'
              : 'bg-indigo-600 text-white') +
            ' py-3 px-8 rounded-lg font-semibold shadow hover:bg-opacity-80 hover:scale-105 transition-all duration-200'}>
            Sign In
          </Link>
          <Link to="/signup" className={
            (isDark
              ? 'bg-slate-800 border border-indigo-700 text-indigo-200'
              : 'bg-white border border-indigo-300 text-indigo-700') +
            ' py-3 px-8 rounded-lg font-semibold shadow hover:bg-indigo-50 hover:scale-105 transition-all duration-200'}>
            Sign Up
          </Link>
        </div>
        <div className="mt-8">
          <span className={
            'inline-block px-4 py-2 rounded-full shadow animate-pulse ' +
            (isDark ? 'bg-slate-800 text-indigo-200' : 'bg-indigo-50 text-indigo-700')
          }>Get started in seconds!</span>
        </div>
      </div>
      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 1s ease; }
        @keyframes slide-down { from { transform: translateY(-30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-slide-down { animation: slide-down 0.8s cubic-bezier(.68,-0.55,.27,1.55); }
      `}</style>
    </div>
  );
};

export default LandingPage;
