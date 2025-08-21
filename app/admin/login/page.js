'use client';

import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({ username: '', password: '' });

  const validateField = (name, value) => {
    if (name === 'username') {
      if (!value.trim()) return 'Username is required';
      if (value.trim().length < 3) return 'Username must be at least 3 characters';
    }
    if (name === 'password') {
      if (!value) return 'Password is required';
      if (value.length < 8) return 'Password must be at least 8 characters';
    }
    return '';
  };

  const validateForm = () => {
    const usernameErr = validateField('username', username);
    const passwordErr = validateField('password', password);
    const nextErrors = { username: usernameErr, password: passwordErr };
    setFieldErrors(nextErrors);
    return !usernameErr && !passwordErr;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      // Client-side validation first
      const ok = validateForm();
      if (!ok) {
        toast.error('Please fix the errors');
        return;
      }
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const message = data.error || 'Invalid credentials';
        toast.error(message);
        setError(message);
        return;
      }
      toast.success('Signed in');
      const params = new URLSearchParams(window.location.search);
      const next = params.get('next') || '/admin';
      setTimeout(() => {
        window.location.href = next;
      }, 400);
    } catch (err) {
      const message = err?.message || 'Login failed';
      if (!error) toast.error(message);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white flex items-center justify-center px-4">
      <Toaster position="top-center" />
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h1 className="font-display text-xl text-gray-900 mb-4 text-center">Admin Login</h1>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (fieldErrors.username) {
                  const msg = validateField('username', e.target.value);
                  setFieldErrors((prev) => ({ ...prev, username: msg }));
                }
              }}
              onBlur={(e) => {
                const msg = validateField('username', e.target.value);
                setFieldErrors((prev) => ({ ...prev, username: msg }));
              }}
              autoComplete="username"
              aria-invalid={!!fieldErrors.username}
              aria-describedby={fieldErrors.username ? 'username-error' : undefined}
              className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:border-transparent bg-white text-gray-900 text-sm ${fieldErrors.username ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-black'}`}
              placeholder="admin"
            />
            {fieldErrors.username && (
              <p id="username-error" className="mt-1 text-xs text-red-600">{fieldErrors.username}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (fieldErrors.password) {
                  const msg = validateField('password', e.target.value);
                  setFieldErrors((prev) => ({ ...prev, password: msg }));
                }
              }}
              onBlur={(e) => {
                const msg = validateField('password', e.target.value);
                setFieldErrors((prev) => ({ ...prev, password: msg }));
              }}
              autoComplete="current-password"
              aria-invalid={!!fieldErrors.password}
              aria-describedby={fieldErrors.password ? 'password-error' : undefined}
              className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:border-transparent bg-white text-gray-900 text-sm ${fieldErrors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-black'}`}
              placeholder="********"
            />
            {fieldErrors.password && (
              <p id="password-error" className="mt-1 text-xs text-red-600">{fieldErrors.password}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading || !username || !password || !!fieldErrors.username || !!fieldErrors.password}
            className="w-full bg-black text-white py-2.5 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 text-sm"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}


