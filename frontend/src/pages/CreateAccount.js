import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { AuthFormLayout } from '../components/AuthFormLayout';

function CreateAccount() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setIsError(false);

    const url = process.env.REACT_APP_SUPABASE_URL;
    const key = process.env.REACT_APP_SUPABASE_ANON_KEY;
    if (!url || !key) {
      setIsError(true);
      setMessage(
        'Supabase is not configured. Add REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY (see frontend/.env.example).'
      );
      return;
    }

    if (password.length < 8) {
      setIsError(true);
      setMessage('Password must be at least 8 characters.');
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: { role: 'client' },
        },
      });

      if (error) {
        setIsError(true);
        setMessage(error.message || 'Registration failed');
        return;
      }

      if (data.session) {
        setMessage('Account created. Redirecting…');
        navigate('/dashboard', { replace: true });
      } else {
        setMessage(
          'If email confirmation is required, check your inbox. Otherwise you can sign in now.'
        );
      }
    } catch (err) {
      console.error('Error creating account:', err);
      setIsError(true);
      setMessage('Error creating account');
    }
  };

  return (
    <AuthFormLayout
      title="Create account"
      subtitle="You’ll use this email and password to sign in. New accounts get the client role by default."
      footer={
        <p>
          Already have an account?{' '}
          <Link to="/login" className="text-blue-300 hover:text-blue-200 underline">
            Sign in
          </Link>
        </p>
      }
    >
      {message && (
        <p
          className={`text-sm mb-4 text-center ${isError ? 'text-red-300' : 'text-gray-200'}`}
          role={isError ? 'alert' : 'status'}
        >
          {message}
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
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="rounded-md bg-black/30 border border-white/20 px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400/60"
          />
        </div>
        <div className="flex flex-col gap-1 text-left">
          <label htmlFor="password" className="text-sm text-gray-200">
            Password (min 8 characters)
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
            minLength={8}
            className="rounded-md bg-black/30 border border-white/20 px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400/60"
          />
        </div>
        <button
          type="submit"
          className="mt-2 py-2.5 rounded-md bg-blue-600 hover:bg-blue-500 font-medium transition"
        >
          Create account
        </button>
      </form>
    </AuthFormLayout>
  );
}

export default CreateAccount;
