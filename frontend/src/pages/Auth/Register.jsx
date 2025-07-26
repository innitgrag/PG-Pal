import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from '../../assets/logo.png'
const baseUrl = import.meta.env.VITE_API_BASE_URL;
function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${baseUrl}/register`, {
        name,
        email,
        phone,
        password,
        role,
      });
      toast.success('Registered Successfully! Please login');
      navigate('/login');
    } catch (error) {
      console.log('Registration Failed', error);
      toast.error('Error during registration');
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

    <div className="flex items-center justify-center w-full md:w-2/3 bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-800 bg-opacity-60 backdrop-blur-sm rounded-2xl shadow-lg p-8 space-y-6 border border-gray-700"
      >
        <h2 className="text-2xl font-bold text-center text-emerald-400">
          Create an Account
        </h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              required
              autoFocus
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-semibold mb-1">
              Mobile No.
            </label>
            <input
              type="tel"
              value={phone}
              required
              onChange={(e) => setPhone(e.target.value)}
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

          <div>
            <label htmlFor="role" className="block text-sm font-semibold mb-1">
              Role
            </label>
            <select
              value={role}
              required
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200"
            >
              <option value="">Select Role</option>
              <option value="owner">Owner of Property</option>
              <option value="seeker">Looking for a Flat/PG</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition-all duration-300 shadow-md hover:shadow-emerald-500/40"
        >
          Sign Up
        </button>

        <p className="text-center text-sm text-gray-400">
          Already have an account?{' '}
          <a
            href="/login"
            className="text-emerald-400 hover:underline hover:text-emerald-300 transition-all duration-200"
          >
            Login
          </a>
        </p>
      </form>
    </div>
     </div>
  );
}

export default Register;
