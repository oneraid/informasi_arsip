// react\src\components\SignIn.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authApi';
import { Link } from 'react-router-dom';
import LogoDark from '../../images/logo/logo-dark.svg';
import Logo from '../../images/logo/logo.svg';
import { useAuth } from '../../contexts/AuthContext';

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { login: authenticate, setIsAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    try {
      const response = await login({ email, password });
      console.log('User data:', response);
      setIsAuthenticated(true); // Set autentikasi menjadi true

      // Save token to localStorage
      localStorage.setItem('userToken', response.token);

      navigate('/'); // Redirect to dashboard or home page
    } catch (err: any) {
      setError(err.message || 'Something went wrong!');
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex flex-wrap items-center">
        <div className="hidden w-full xl:block xl:w-1/2">
          <div className="py-17.5 px-26 text-center">
            <Link className="mb-5.5 inline-block" to="/">
              <img className="hidden dark:block" src={Logo} alt="Logo" />
              <img className="dark:hidden" src={LogoDark} alt="Logo" />
            </Link>
            <p className="2xl:px-20">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
              suspendisse.
            </p>
          </div>
        </div>
        <div className="w-full xl:w-1/2">
          <div className="p-8 sm:p-12.5">
            <h2 className="mb-9 text-2xl font-bold text-dark dark:text-white sm:text-title-xl2">
              Sign In
            </h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-2 mt-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-2 mt-2 border rounded"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
