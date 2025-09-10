import React, { useState } from 'react';
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
    } catch {
      setError('Network error');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-custom-dark via-teal-800 to-slate-800">
      <div className="bg-custom-card text-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center animate-fade-in border border-custom-accent">
        <img src="/diament-removebg-preview.png" alt="DIAMENT Logo" className="mx-auto mb-6 w-16 h-16 drop-shadow-lg" />
        <h2 className="text-2xl font-bold mb-4 animate-slide-down text-custom-accent">
          Create your <span className="text-custom-accent">DIAMENT</span> account
        </h2>
        <p className="text-gray-300 mb-6">Join the community and unlock new opportunities!</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-600 bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-custom-accent transition"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-600 bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-custom-accent transition"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-600 bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-custom-accent transition"
            required
          />
          <button type="submit" className="bg-custom-accent text-white py-3 rounded-lg font-semibold shadow hover:bg-opacity-80 hover:scale-105 transition-all duration-200">
            Sign Up
          </button>
        </form>
        {error && <div className="text-red-400 mt-2">{error}</div>}
        {success && <div className="text-green-400 mt-2">{success}</div>}
        <p className="mt-6 text-center text-gray-400">
          Already have an account? <Link to="/signin" className="text-custom-accent font-semibold hover:underline">Sign In</Link>
        </p>
        <div className="mt-8">
          <span className="inline-block px-4 py-2 rounded-full shadow animate-pulse bg-custom-secondary text-white">
            Start your journey now!
          </span>
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
