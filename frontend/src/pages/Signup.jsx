import React, { useState } from 'react';
import { useAppStore } from '../stores/appStore';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const res = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: name, email, password })
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Signup successful! Redirecting to login...');
        setTimeout(() => {
          navigate('/signin');
        }, 1200);
        setName('');
        setEmail('');
        setPassword('');
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  const { theme, setTheme } = useAppStore();
  const isDark = theme === 'dark';
  return (
    <div className={
      `min-h-screen flex flex-col justify-center items-center ` +
      (isDark
        ? 'bg-gradient-to-br from-gray-900 via-slate-800 to-slate-700'
        : 'bg-gradient-to-br from-slate-50 via-slate-100 to-blue-100')
    }>
      <button
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        className={`absolute top-6 right-6 px-4 py-2 rounded-full font-bold shadow-lg transition-all duration-200 ` +
          (isDark ? 'bg-blue-800 text-white hover:bg-blue-600' : 'bg-white text-blue-700 border border-blue-400 hover:bg-blue-100')}
      >
        {isDark ? '🌙 Dark' : '☀️ Light'} Mode
      </button>
      <div className={
        (isDark ? 'bg-slate-900/95 text-slate-100' : 'bg-white/95 text-slate-900') +
        ' rounded-2xl shadow-xl p-10 max-w-md w-full text-center animate-fade-in border border-slate-200'
      }>
        <h2 className={
          'text-2xl font-bold mb-4 animate-slide-down ' +
          (isDark ? 'text-indigo-300' : 'text-indigo-600')
        }>Create your <span className={isDark ? 'text-indigo-300' : 'text-indigo-600'}>Solvit</span> account</h2>
  <p className={isDark ? 'text-slate-300 mb-6' : 'text-slate-700 mb-6'}>Join the community and unlock new opportunities!</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={
              (isDark
                ? 'border border-slate-700 bg-slate-900 text-slate-100'
                : 'border border-slate-300 bg-white text-slate-900') +
              ' rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500 transition'
            }
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={
              (isDark
                ? 'border border-slate-700 bg-slate-900 text-slate-100'
                : 'border border-slate-300 bg-white text-slate-900') +
              ' rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500 transition'
            }
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={
              (isDark
                ? 'border border-slate-700 bg-slate-900 text-slate-100'
                : 'border border-slate-300 bg-white text-slate-900') +
              ' rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500 transition'
            }
            required
          />
          <button type="submit" className={
            (isDark
              ? 'bg-indigo-700 text-white'
              : 'bg-indigo-600 text-white') +
            ' py-3 rounded-lg font-semibold shadow hover:bg-indigo-800 hover:scale-105 transition-all duration-200'}>
            Sign Up
          </button>
        </form>
        {error && <div className="text-red-500 mt-2">{error}</div>}
        {success && <div className="text-green-500 mt-2">{success}</div>}
        <p className="mt-6 text-center text-gray-600">
          Already have an account? <Link to="/signin" className="text-blue-600 font-semibold hover:underline">Sign In</Link>
        </p>
        <div className="mt-8">
          <span className={
            'inline-block px-4 py-2 rounded-full shadow animate-pulse ' +
            (isDark ? 'bg-slate-800 text-indigo-200' : 'bg-indigo-50 text-indigo-700')
          }>Start your journey now!</span>
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

export default Signup;
