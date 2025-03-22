import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // optional: for navigation after registration

function CreateAccount() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create the data payload. Adjust keys if your backend expects 'email' instead of 'username'
    const payload = { email: username, password };

    try {
        const apiUrl = process.env.REACT_APP_API_URL;
      const response = await fetch(`${apiUrl}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || 'Registration failed');
      } else {
        setMessage('Account created successfully!');
        // Optionally, redirect to the login page or dashboard after successful registration
        navigate('/login');
      }
    } catch (error) {
      console.error('Error creating account:', error);
      setMessage('Error creating account');
    }
  };

  return (
    <div>
      <h1>Create Account</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}

export default CreateAccount;
