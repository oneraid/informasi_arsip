import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory for navigation
import PeminjamanModal from '../PeminjamanModal'; // Adjust path as needed

const Peminjaman: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const history = useNavigate(); // Initialize useHistory

  const handleSelectItems = (items: any[]) => {
    setSelectedItems(items);
    setModalIsOpen(false); // Close the modal after submitting
  };

  const handleRemoveItem = (itemId: number) => {
    setSelectedItems((prevItems) =>
      prevItems.filter((item) => item.id !== itemId),
    );
  };

  const handleSubmit = () => {
    // Save selected items to localStorage
    localStorage.setItem(
      'selectedPeminjamanItems',
      JSON.stringify(selectedItems),
    );

    // Navigate to the approval page
    history('/approve-peminjaman');
  };

  return (
    <div>
      <h1>Peminjaman Page</h1>
      <button
        onClick={() => setModalIsOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Open Modal
      </button>

      <PeminjamanModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        onSelectItems={handleSelectItems}
      />

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Selected Items</h2>
        {selectedItems.length === 0 ? (
          <p>No items selected</p>
        ) : (
          <>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {/* Table headers */}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    No Rak
                  </th>
                  {/* Add more headers as needed */}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {selectedItems.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.no_rak}
                    </td>
                    {/* Add more data fields as needed */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={handleSubmit}
              className="mt-4 bg-green-500 text-black px-4 py-2 rounded-md hover:bg-green-600"
              disabled={selectedItems.length === 0}
            >
              Submit for Approval
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Peminjaman;
