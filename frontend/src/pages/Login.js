import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { AuthFormLayout } from '../components/AuthFormLayout';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const url = process.env.REACT_APP_SUPABASE_URL;
    const key = process.env.REACT_APP_SUPABASE_ANON_KEY;
    if (!url || !key) {
      setError(
        'Supabase is not configured. Add REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY (see frontend/.env.example).'
      );
      return;
    }

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (signInError) {
        setError(signInError.message || 'Login failed');
        return;
      }
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Error during login:', err);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <AuthFormLayout
      title="Sign in"
      subtitle="Use the email and password you registered with."
      footer={
        <p>
          No account?{' '}
          <Link to="/create" className="text-blue-300 hover:text-blue-200 underline">
            Create one
          </Link>
        </p>
      }
    >
      {error && (
        <p className="text-red-300 text-sm mb-4 text-center" role="alert">
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1 text-left">
          <label htmlFor="email" className="text-sm text-gray-200">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="rounded-md bg-black/30 border border-white/20 px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400/60"
          />
        </div>
        <div className="flex flex-col gap-1 text-left">
          <label htmlFor="password" className="text-sm text-gray-200">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className="rounded-md bg-black/30 border border-white/20 px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400/60"
          />
        </div>
        <button
          type="submit"
          className="mt-2 py-2.5 rounded-md bg-blue-600 hover:bg-blue-500 font-medium transition"
        >
          Sign in
        </button>
      </form>
    </AuthFormLayout>
  );
}

export default Login;
