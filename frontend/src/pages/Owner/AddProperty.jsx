import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function AddProperty() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    type: "PG",
    genderPreference: "female",
    roomType: "single",
    monthlyRent: "",
    securityDeposit: "",
    availableRooms: "",
    location: {
      address: "",
      pincode: "",
      city: "",
      state: "",
    },
    amenities: {
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
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name in formData.location) {
      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [name]: value,
        },
      }));
    } else if (name in formData.amenities) {
      setFormData((prev) => ({
        ...prev,
        amenities: {
          ...prev.amenities,
          [name]: checked,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedData = {
      ...formData,
      monthlyRent: Number(formData.monthlyRent),
      securityDeposit: Number(formData.securityDeposit),
      availableRooms: Number(formData.availableRooms),
      location: {
        ...formData.location,
        pincode: Number(formData.location.pincode),
      },
    };

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        'http://localhost:8080/owner/addProperty',
        formattedData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Property added successfully!");
      setFormData({
        title: "",
        type: "PG",
        genderPreference: "female",
        roomType: "single",
        monthlyRent: "",
        securityDeposit: "",
        availableRooms: "",
        location: {
          address: "",
          city: "",
          state: "",
          pincode: "",
        },
        amenities: {
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
        },
      });
      navigate("/owner/dashboard");
    } catch (error) {
      console.error("Failed to add property", error);
      toast.error("Failed to add property");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-start justify-center py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-700 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-emerald-400 mb-4">Add New Property</h2>

        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Property Title"
          className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700"
          >
            <option value="PG">PG</option>
            <option value="Flat">Flat</option>
          </select>

          <select
            name="genderPreference"
            value={formData.genderPreference}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700"
          >
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="both">Both</option>
          </select>

          <select
            name="roomType"
            value={formData.roomType}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700"
          >
            <option value="single">Single</option>
            <option value="double">Double</option>
            <option value="triple">Triple</option>
          </select>

          <input
            type="number"
            name="monthlyRent"
            value={formData.monthlyRent}
            onChange={handleChange}
            placeholder="Monthly Rent"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="securityDeposit"
            value={formData.securityDeposit}
            onChange={handleChange}
            placeholder="Security Deposit"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700"
            required
          />

          <input
            type="number"
            name="availableRooms"
            value={formData.availableRooms}
            onChange={handleChange}
            placeholder="Available Rooms"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700"
            required
          />
        </div>

        <h3 className="text-xl font-semibold text-emerald-300">Location</h3>
        {["address", "pincode", "city", "state"].map((field) => (
          <input
            key={field}
            name={field}
            value={formData.location[field]}
            onChange={handleChange}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700"
          />
        ))}

        <h3 className="text-xl font-semibold text-emerald-300">Amenities</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {Object.keys(formData.amenities).map((key) => (
            <label key={key} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name={key}
                checked={formData.amenities[key]}
                onChange={handleChange}
                className="accent-emerald-400"
              />
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
          ))}
        </div>

        <button
          type="submit"
          className="w-full mt-4 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 transition-all duration-300 text-white font-bold text-lg"
        >
          Add Property
        </button>
      </form>
    </div>
  );
}

export default AddProperty;
