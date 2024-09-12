import React, { useState } from 'react';
import { uploadFile } from '../../services/arsipApi';

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file first.');
      return;
    }

    try {
      await uploadFile(file);
      setMessage('File imported successfully');
    } catch (error) {
      setMessage('Failed to import file');
    }
  };

  const downloadTemplate = () => {
    const templateUrl = 'templates/template_arsip.xlsx';
    const link = document.createElement('a');
    link.href = templateUrl;
    link.download = 'template.xlsx';
    link.click();
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-lg file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      <button
        onClick={handleUpload}
        disabled={!file}
        className={`mt-4 px-4 py-2 rounded-lg text-white transition ${
          file
            ? 'bg-blue-500 hover:bg-blue-600'
            : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        Upload File
      </button>
      <button
        onClick={downloadTemplate}
        className="mt-4 px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
      >
        Download Template
      </button>
      {message && (
        <p
          className={`mt-2 text-center ${
            message.includes('Failed') ? 'text-red-500' : 'text-green-500'
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default FileUpload;
