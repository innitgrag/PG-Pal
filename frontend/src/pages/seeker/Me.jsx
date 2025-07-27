import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../../Context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Me() {
  const [info, setInfo] = useState(null)
  const { isLoggedIn, loggedOut } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    loggedOut()
    navigate('/login')
  }

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get('http://localhost:8080/seeker/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setInfo(res.data.info)
        console.log('Fetched Profile Data:', res.data)
      } catch (error) {
        console.error('Error in fetching profile details', error)
        toast.error('Error in fetching profile details')
      }
    }
    fetchProfile()
  }, [])

  if (!info) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white text-xl">
        Loading profile...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-6 py-10">
      <h2 className="text-4xl font-bold text-center mb-10 text-emerald-400">
        Profile Details
      </h2>

      <div className="max-w-xl mx-auto bg-gray-800 bg-opacity-60 backdrop-blur-md rounded-2xl p-8 shadow-2xl space-y-6 border border-gray-700">
        <div>
          <label className="text-gray-300 font-semibold">Name:</label>
          <div className="mt-1 px-4 py-2 bg-gray-900 border border-gray-600 rounded-md">
            {info.name}
          </div>
        </div>

        <div>
          <label className="text-gray-300 font-semibold">Email:</label>
          <div className="mt-1 px-4 py-2 bg-gray-900 border border-gray-600 rounded-md">
            {info.email}
          </div>
        </div>

        <div>
          <label className="text-gray-300 font-semibold">Mobile Number:</label>
          <div className="mt-1 px-4 py-2 bg-gray-900 border border-gray-600 rounded-md">
            {info.phone}
          </div>
        </div>

        {isLoggedIn && (
          <div className="text-center pt-4">
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-emerald-400/50"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Me
