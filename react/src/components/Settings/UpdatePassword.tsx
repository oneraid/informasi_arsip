// src/components/UpdatePassword.tsx

import React, { useState } from 'react';
import axios from 'axios';

interface PasswordFormState {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
}

const UpdatePassword: React.FC = () => {
  const [formData, setFormData] = useState<PasswordFormState>({
    current_password: '',
    new_password: '',
    new_password_confirmation: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const token = localStorage.getItem('userToken'); // Ensure token is available in localStorage
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.post(
        'http://127.0.0.1:8000/api/update-password',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            'Content-Type': 'application/json',
          },
        },
      );
      setSuccess(response.data.message);
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        setError('Unauthorized: Please login again.');
      } else {
        setError(error.response?.data?.message || 'An error occurred');
        console.error(error);
      }
    }
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <h2 className="text-xl font-bold mb-4 text-black">Update Password</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <div className="mb-4">
        <label className="mb-2.5 block text-black dark:text-white">
          Current Password
        </label>
        <input
          type="password"
          name="current_password"
          id="current_password"
          value={formData.current_password}
          onChange={handleChange}
          className="w-full rounded border-[1.5px] border-stone-950 bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
          required
        />
      </div>

      <div className="mb-4">
        <label className="mb-2.5 block text-black dark:text-white">
          New Password
        </label>
        <input
          type="password"
          name="new_password"
          id="new_password"
          value={formData.new_password}
          onChange={handleChange}
          className="w-full rounded border-[1.5px] border-stone-950 bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
          required
        />
      </div>

      <div className="mb-4">
        <label className="mb-2.5 block text-black dark:text-white">
          Confirm New Password
        </label>
        <input
          type="password"
          name="new_password_confirmation"
          id="new_password_confirmation"
          value={formData.new_password_confirmation}
          onChange={handleChange}
          className="w-full rounded border-[1.5px] border-stone-950 bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
          required
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition mt-10"
      >
        Update Password
      </button>
    </div>
  );
};

export default UpdatePassword;
