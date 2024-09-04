// src/components/UpdateEmailAndPassword.tsx

import React, { useState } from 'react';
import axios from 'axios';

const UpdateEmailAndPassword: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [message, setMessage] = useState('');

  // Retrieve the token from localStorage
  const token = localStorage.getItem('userToken');

  const handleUpdatePassword = async () => {
    if (!token) {
      setMessage('Authentication token is missing');
      return;
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/update-password',
        {
          current_password: currentPassword,
          new_password: newPassword,
          new_password_confirmation: newPasswordConfirm,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error updating password');
    }
  };

  const handleUpdateEmail = async () => {
    if (!token) {
      setMessage('Authentication token is missing');
      return;
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/update-email',
        {
          password: currentPassword,
          new_email: newEmail,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error updating email');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Update Email and Password</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Current Password
        </label>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Current Password"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          New Password
        </label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="New Password"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Confirm New Password
        </label>
        <input
          type="password"
          value={newPasswordConfirm}
          onChange={(e) => setNewPasswordConfirm(e.target.value)}
          className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Confirm New Password"
        />
      </div>

      <button
        onClick={handleUpdatePassword}
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
      >
        Update Password
      </button>

      <div className="mt-6 mb-4">
        <label className="block text-sm font-medium text-gray-700">
          New Email
        </label>
        <input
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="New Email"
        />
      </div>

      <button
        onClick={handleUpdateEmail}
        className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
      >
        Update Email
      </button>

      {message && (
        <div className="mt-4 p-2 bg-gray-100 border border-gray-300 rounded-md">
          {message}
        </div>
      )}
    </div>
  );
};

export default UpdateEmailAndPassword;
