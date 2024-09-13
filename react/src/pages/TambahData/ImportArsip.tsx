import React, { useState } from 'react';
import { uploadFile } from '../../services/arsipApi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    // Validasi ukuran file maksimal 5MB
    if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
      setMessage('File size exceeds 5MB');
      setFile(null);
      return;
    }

    setMessage(''); // Reset message
    setFile(selectedFile || null);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file first.');
      return;
    }

    setLoading(true);
    try {
      await uploadFile(file);
      setMessage('File imported successfully');
    } catch (error) {
      setMessage('Failed to import file');
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

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
      <h1 className="text-xl font-semibold text-center mb-4">
        Upload File Arsip
      </h1>

      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-lg file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />

      {file && <p className="text-gray-500 text-sm mt-2">{file.name}</p>}

      <div className="flex justify-between mt-4">
        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className={`px-4 py-2 rounded-lg text-white transition ${
            file
              ? 'bg-blue-500 hover:bg-blue-600'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin" />
          ) : (
            'Upload File'
          )}
        </button>
        <button
          onClick={downloadTemplate}
          className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
        >
          Download Template
        </button>
      </div>

      {message && (
        <div
          className={`mt-4 p-2 text-center rounded-lg transition-all ${
            message.includes('Failed')
              ? 'bg-red-100 text-red-500'
              : 'bg-green-100 text-green-500'
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
