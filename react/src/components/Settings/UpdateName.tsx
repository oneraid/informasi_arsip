import React, { useState } from 'react';
import axios from 'axios';

interface NameFormState {
  name: string;
}

const UpdateName: React.FC = () => {
  const [formData, setFormData] = useState<NameFormState>({
    name: '',
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
      const token = localStorage.getItem('userToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.post(
        'http://127.0.0.1:8000/api/update-name',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      // Simpan nama baru ke localStorage
      localStorage.setItem('userName', formData.name);

      setSuccess(response.data.message);
    } catch (error: any) {
      setError(error.response?.data?.message || 'An error occurred');
      console.error(error);
    }
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <h2 className="text-xl font-bold mb-4 text-black">Update Name</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <div className="mb-4">
        <label className="mb-2.5 block text-black dark:text-white">
          New Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full rounded border-[1.5px] border-stone-950 bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
          required
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition mt-60"
      >
        Update Name
      </button>
    </div>
  );
};

export default UpdateName;
