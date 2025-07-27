import React, { useState, useEffect } from "react";
import axios from "axios";
import pp from "../../assets/pp.png";
import logo from '../../assets/logo.png'
const baseUrl = import.meta.env.VITE_API_BASE_URL;

function Home() {
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [genderPreference, setGenderPreference] = useState("");
  const [roomType, setRoomType] = useState("");
  const [monthlyRent, setMonthlyRent] = useState("");
  const [amenities, setAmenities] = useState({
    food: false,
    ac: false,
    wifi: false,
    washingMachine: false,
    attachedWashroom: false,
    fridge: false,
    powerBackup: false,
    geyser: false,
    parking: false,
    housekeeping: false,
  });

  const [info, setInfo] = useState(null);
  const [filteredInfo, setFilteredInfo] = useState([]);

  useEffect(() => {
    const fetchAllProperty = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${baseUrl}/seeker/getAll`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setInfo(res.data.properties);
      } catch (error) {
        console.error("Error in fetching Properties");
      }
    };
    fetchAllProperty();
  }, []);

  const handleSearch = () => {
    const result = info?.filter((item) => {
      if (state && !item.state?.toLowerCase().includes(state.toLowerCase()))
        return false;
      if (city && !item.city?.toLowerCase().includes(city.toLowerCase()))
        return false;
      if (type && item.type?.toLowerCase() !== type.toLowerCase()) return false;
      if (
        genderPreference &&
        item.genderPreference?.toLowerCase() !== genderPreference.toLowerCase()
      )
        return false;
      if (
        roomType &&
        item.roomType?.toLowerCase() !== roomType.toLowerCase()
      )
        return false;
      if (monthlyRent && Number(item.monthlyRent) > Number(monthlyRent))
        return false;

      for (const [key, value] of Object.entries(amenities)) {
        if (value && !item.amenities?.[key]) return false;
      }

      return true;
    });

    setFilteredInfo(result || []);
  };

  useEffect(() => {
    if (info) setFilteredInfo(info);
  }, [info]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4 ">
     <div className="flex justify-between items-center px-2 sm:px-6 py-4">
  <div className="flex-shrink-0">
    <img
      src={logo}
      alt="App Logo"
      className="h-10 sm:h-14 md:h-16 w-auto max-w-[150px]"
    />
  </div>
  <a href="/seeker/me" className="flex-shrink-0">
    <img
      src={pp}
      alt="Profile"
      className="w-8 sm:w-10 h-8 sm:h-10 rounded-full border-2 border-emerald-500 hover:scale-105 transition-transform duration-300"
    />
  </a>
</div>


      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-emerald-400">Hello! Looking for a PG/Flat?</h1>
        <p className="text-lg text-gray-300 mt-2">You came to the right place.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters */}
        <div className="lg:col-span-1 bg-gray-800 bg-opacity-70 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-gray-700">
          <h2 className="text-xl font-semibold text-emerald-400 text-center mb-4">Filters</h2>
          <div className="space-y-4">
            {/* Location */}
            <div>
              <label className="font-semibold">State</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="mt-1 w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-600 text-white focus:ring-emerald-500 focus:outline-none transition-all"
              />
              <label className="mt-4 font-semibold">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="mt-1 w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-600 text-white focus:ring-emerald-500 focus:outline-none transition-all"
              />
            </div>

            {/* Type */}
            <div>
              <label className="font-semibold">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="mt-1 w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-600 text-white focus:ring-emerald-500 focus:outline-none"
              >
                <option value="">Select</option>
                <option value="PG">PG</option>
                <option value="Flat">Flat</option>
              </select>
            </div>

            {/* Gender Preference */}
            <div>
              <label className="font-semibold">Gender Preference</label>
              <select
                value={genderPreference}
                onChange={(e) => setGenderPreference(e.target.value)}
                className="mt-1 w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-600 text-white focus:ring-emerald-500 focus:outline-none"
              >
                <option value="">Select</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Both">Both</option>
              </select>
            </div>

            {/* Room Type */}
            <div>
              <label className="font-semibold">Room Type</label>
              <select
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                className="mt-1 w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-600 text-white focus:ring-emerald-500 focus:outline-none"
              >
                <option value="">Select</option>
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Triple">Triple</option>
              </select>
            </div>

            {/* Monthly Rent */}
            <div>
              <label className="font-semibold">Monthly Rent</label>
              <input
                type="number"
                value={monthlyRent}
                onChange={(e) => setMonthlyRent(e.target.value)}
                className="mt-1 w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-600 text-white focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            {/* Amenities */}
            <div>
              <label className="font-semibold">Amenities</label>
              <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                {Object.keys(amenities).map((key) => (
                  <label key={key} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={amenities[key]}
                      onChange={() =>
                        setAmenities((prev) => ({ ...prev, [key]: !prev[key] }))
                      }
                      className="accent-emerald-500"
                    />
                    <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={handleSearch}
              className="w-full py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 transition-all duration-300 font-semibold shadow-md hover:shadow-emerald-400/50"
            >
              Search
            </button>
          </div>
        </div>

        {/* Properties */}
        <div className="lg:col-span-3 space-y-6">
          <h2 className="text-2xl text-center font-semibold text-emerald-400">Properties</h2>
          {filteredInfo.length === 0 && (
            <p className="text-center text-gray-400">No matching properties</p>
          )}

          {filteredInfo.map((property) => (
            <div
              key={property._id}
              className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-emerald-500/30 transition-shadow"
            >
              <h3 className="text-xl font-bold text-white mb-2">{property.title}</h3>
              <p className="text-gray-300">
                Location:{" "}
                {[
                  property.location?.address,
                  property.location?.city,
                  property.location?.state,
                  property.location?.pincode,
                ]
                  .filter(Boolean)
                  .join(", ")}
              </p>
              <p className="text-gray-400 mt-1">
                Type: {property.type} | Gender: {property.genderPreference} | Room:{" "}
                {property.roomType}
              </p>
              <p className="text-emerald-400 font-medium mt-1">
                Rent: ₹{property.monthlyRent}
              </p>
              <p className="text-gray-400 mt-2">
                <span className="font-semibold text-white">Amenities:</span>{" "}
                {Object.entries(property.amenities || {})
                  .filter(([_, value]) => value)
                  .map(([key]) => key)
                  .join(", ")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
