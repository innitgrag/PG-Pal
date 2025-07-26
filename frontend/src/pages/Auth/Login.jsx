import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from '../../assets/logo.png'
const baseUrl = import.meta.env.VITE_API_BASE_URL;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${baseUrl}/login`, {
        email,
        password,
      });

      const { user, token } = res.data;
      login(user, token);
      if (user.role === 'owner') navigate('/owner/dashboard');
      else if (user.role === 'seeker') navigate('/seeker/home');
    } catch (error) {
      console.log('Login Failed', error);
      toast.error('Error during Login');
    }
  };

  return (
  <div className="flex min-h-screen text-white">
    {/* Left: Logo and Info */}
  <div className="hidden md:flex flex-col justify-center items-center w-1/3 bg-gradient-to-br from-emerald-600 via-emerald-800 to-gray-900 p-10">
        <img
          src={logo}
          alt="App Logo"
          className="w-auto h-50 "
        />
        <h1 className="text-2xl font-bold mb-2">List. Discover. Move In.</h1>
        <p className="text-lg text-center text-gray-200 max-w-sm">
          Find or list your perfect PG/Flat with ease. Secure, fast, and reliable!
        </p>
      </div>

    {/* Right: Form */}
    <div className="flex items-center justify-center w-full md:w-2/3 bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-800 bg-opacity-60 backdrop-blur-sm rounded-2xl shadow-lg p-8 space-y-6 border border-gray-700"
      >
        <h2 className="text-2xl font-bold text-center text-emerald-400">
          Login to Your Account
        </h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              required
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition-all duration-300 shadow-md hover:shadow-emerald-500/40"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <a
            href="/register"
            className="text-emerald-400 hover:underline hover:text-emerald-300 transition-all duration-200"
          >
            Sign Up
          </a>
        </p>
      </form>
    </div>
  </div>
);

}

export default Login;
