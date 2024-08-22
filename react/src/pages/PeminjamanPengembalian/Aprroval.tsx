import React, { useState, useEffect } from 'react';

const ApprovePeminjaman: React.FC = () => {
  const [itemsToApprove, setItemsToApprove] = useState<any[]>([]);

  useEffect(() => {
    // Retrieve selected items from localStorage
    const storedItems = localStorage.getItem('selectedPeminjamanItems');
    if (storedItems) {
      setItemsToApprove(JSON.parse(storedItems));
    }
  }, []);

  const handleApproveItem = (itemId: number) => {
    // Handle item approval logic
    setItemsToApprove((prevItems) =>
      prevItems.filter((item) => item.id !== itemId),
    );
  };

  return (
    <div>
      <h1>Approve Peminjaman</h1>
      {itemsToApprove.length === 0 ? (
        <p>No items to approve</p>
      ) : (
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
            {itemsToApprove.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.no_rak}
                </td>
                {/* Add more data fields as needed */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <button
                    onClick={() => handleApproveItem(item.id)}
                    className="text-green-600 hover:text-green-800"
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ApprovePeminjaman;
