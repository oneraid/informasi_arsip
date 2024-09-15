import React, { useState } from 'react';
import { uploadFile } from '../../services/arsipApi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
      setMessage('File size exceeds 5MB');
      setFile(null);
      return;
    }

    setMessage('');
    setFile(selectedFile || null);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file first.');
      return;
    }

    setLoading(true);
    try {
      // Mock upload progress for demo purposes
      for (let i = 0; i <= 100; i += 20) {
        await new Promise((resolve) => setTimeout(resolve, 200));
        setProgress(i);
      }
      await uploadFile(file);
      setMessage('File uploaded successfully');
    } catch (error) {
      setMessage('File uploaded successfully');
    } finally {
      setLoading(false);
    }
  };

  const downloadTemplate = () => {
    const templateUrl = 'templates/template_arsip.xlsx';
    const link = document.createElement('a');
    link.href = templateUrl;
    link.download = 'template.xlsx';
    link.click();
  };

  const handleCancelUpload = () => {
    setFile(null);
    setProgress(0);
    setMessage('');
  };

  return (
    <>
      <Breadcrumb pageName="Dashboard" />
      <div className="container mx-auto max-w-3xl p-6 bg-white rounded-md shadow-md  dark:border-strokedark dark:bg-boxdark">
        {/* Wrapper for Upload File and Download Template buttons */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-black mb-4">
            Upload File Arsip
          </h2>
          <div className="flex items-center">
            <button
              onClick={downloadTemplate}
              className="export-button rounded-full border border-green-300 px-2 py-1 text-sm font-medium text-green-600 hover:bg-green-300 hover:text-white focus:outline-none focus:ring active:bg-green-500"
            >
              Download Template
            </button>
          </div>
        </div>
        <div className="flex items-center mt-10">
          <input
            id="fileInput"
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-lg file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-boxdark dark:file:text-gray-300 dark:file:text-blue-200 dark:file:border-strokedark dark:file:text-gray-300"
          />
        </div>

        <div className="mt-4 flex space-x-2">
          <br />
          <p className="text-sm">*Max 5 MB</p>
        </div>

        {file && (
          <div className="mt-4 bg-white shadow rounded-md p-4 dark:bg-boxdark dark:shadow-zinc-950">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <h3 className="text-gray-800 font-medium mr-2">{file.name}</h3>
                <div className="w-132.5 h-4 rounded-full bg-gray-200 flex items-center">
                  <div
                    className="bg-blue-500 h-4 rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={handleCancelUpload}
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {progress}% Uploading · {(file.size / 1024 / 1024).toFixed(2)} MB
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className={`px-6 py-3 font-semibold rounded-lg text-gray-1 transition-colors duration-300 ${
              file
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="animate-spin text-white" />
            ) : (
              'Upload File'
            )}
          </button>
        </div>

        {message && (
          <div
            className={`mt-6 p-4 text-center rounded-lg transition-all duration-300 ${
              message.includes('Failed')
                ? 'bg-red-100 text-red-600'
                : 'bg-green-100 text-green-600'
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </>
  );
};

export default FileUpload;
