import React, { useState, useEffect } from 'react';
import axios from 'axios';
import pp from '../../assets/pp.png';
import { toast } from 'react-toastify';
import logo from '../../assets/logo.png'

function Dashboard() {
  const [propi, setPropi] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:8080/owner/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPropi(res.data.properties);
        console.log('Fetched Profile Data:', res.data);
      } catch (error) {
        console.error('Error in fetching properties', error);
        toast.error('Error in fetching properties');
      }
    };

    fetchProperties();
  }, []);

  const handleDelete = async (property_id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8080/owner/deleteProperty/${property_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success('Property deleted successfully');
      setPropi((prev) => prev.filter((p) => p._id !== property_id));
    } catch (error) {
      console.error('Error deleting property:', error);
      toast.error('Failed to delete property');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-6 ">
      <div className="flex justify-between items-center px-2 sm:px-6 py-4">
  <div className="flex-shrink-0">
    <img
      src={logo}
      alt="App Logo"
      className="h-10 sm:h-14 md:h-16 w-auto max-w-[150px]"
    />
  </div>
  <a href="/owner/dashboard" className="flex-shrink-0">
    <img
      src={pp}
      alt="Profile"
      className="w-8 sm:w-10 h-8 sm:h-10 rounded-full border-2 border-emerald-500 hover:scale-105 transition-transform duration-300"
    />
  </a>
</div>


      {/* Welcome Text */}
      <h1 className="text-4xl md:text-5xl font-bold text-center text-emerald-400 mb-4">
        Hello! Welcome to PG Pal
      </h1>

      <p className="text-center text-lg text-gray-300 mb-10">
        To add a new listing, click{' '}
        <a href="/owner/addProperty" className="text-emerald-400 hover:underline hover:text-emerald-300 transition-all duration-200">
          Add Property
        </a>
      </p>

      {/* Existing Properties Header */}
      <h2 className="text-2xl font-semibold mb-6 text-gray-200">Your Existing Properties:</h2>

      {/* Property List */}
      <div className="space-y-6">
        {propi.map((property, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-emerald-500/20 transition-all duration-300"
          >
            <div className="text-2xl font-bold text-center text-emerald-300 mb-4">
              {property.title}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-200 text-base">
              <div><strong>Type:</strong> {property.type}</div>
              <div><strong>Gender Preference:</strong> {property.genderPreference}</div>
              <div><strong>Room Type:</strong> {property.roomType}</div>
              <div><strong>Monthly Rent:</strong> ₹{property.monthlyRent}</div>
              <div><strong>Security Deposit:</strong> ₹{property.securityDeposit}</div>
              <div><strong>Available Rooms:</strong> {property.availableRooms}</div>
            </div>

            <div className="mt-4 text-gray-300">
              <p className="font-semibold">Location:</p>
              <p>
                {property.location.address}, {property.location.city}, {property.location.state} - {property.location.pincode}
              </p>
              {property.location.extraInfo && (
                <p className="text-sm text-gray-500 mt-1">({property.location.extraInfo})</p>
              )}
            </div>

            <div className="mt-4 text-gray-300">
              <p className="font-semibold">Amenities:</p>
              <ul className="list-disc ml-6 text-sm mt-1 text-gray-400">
                {property.amenities.food && <li>Food</li>}
                {property.amenities.ac && <li>AC</li>}
                {property.amenities.wifi && <li>Wi-Fi</li>}
                {property.amenities.washingMachine && <li>Washing Machine</li>}
                {property.amenities.attachedWashroom && <li>Attached Washroom</li>}
                {property.amenities.fridge && <li>Fridge</li>}
                {property.amenities.powerBackup && <li>Power Backup</li>}
                {property.amenities.geyser && <li>Geyser</li>}
                {property.amenities.parking && <li>Parking</li>}
                {property.amenities.housekeeping && <li>Housekeeping</li>}
              </ul>
            </div>

            <div className="flex justify-center mt-6">
              <button
                onClick={() => handleDelete(property._id)}
                className="px-6 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold transition-all duration-300"
              >
                Delete Property
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
