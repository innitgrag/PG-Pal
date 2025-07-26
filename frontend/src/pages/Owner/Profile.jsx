import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const baseUrl = import.meta.env.VITE_API_BASE_URL;
function Profile() {
  const [info, setInfo] = useState(null);
  const { isLoggedIn, loggedOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    loggedOut();
    navigate('/login');
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${baseUrl}/owner/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setInfo(res.data.info);
        console.log('Fetched Profile Data:', res.data);
      } catch (error) {
        console.error('Error in fetching profile details', error);
        toast.error('Error in fetching profile details');
      }
    };
    fetchProfile();
  }, []);

  if (!info) {
    return <div className="text-center mt-20 text-xl text-white">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-emerald-400 mb-8">Profile Details</h2>

      <div className="max-w-xl mx-auto bg-gray-800 bg-opacity-60 backdrop-blur-md rounded-2xl shadow-lg p-8 space-y-6 border border-gray-700">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Name</label>
          <div className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white">
            {info.name}
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Email</label>
          <div className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white">
            {info.email}
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Mobile Number</label>
          <div className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white">
            {info.phone}
          </div>
        </div>

        {isLoggedIn && (
          <div className="text-center mt-6">
            <button
              onClick={handleLogout}
              className="px-6 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold transition-all duration-300"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
