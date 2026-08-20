import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const ManageDonors = () => {
  const [donors, setDonors] = useState([]);

  // TODO: Backend Developer - Fetch donors from the database when component mounts
  useEffect(() => {
    // Example: 
    // axios.get('/api/donors').then(res => setDonors(res.data));
  }, []);

  const handleDelete = (id, name) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="text-red-500 text-xl">⚠️</span>
          <p className="text-sm font-bold text-gray-800">
            Remove donor <span className="text-red-600">{name}</span>?
          </p>
        </div>
        <p className="text-xs text-gray-500">This action cannot be undone.</p>
        <div className="flex gap-2 justify-end mt-2">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-md transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              confirmDeletion(id, name);
            }}
            className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-md transition shadow-sm cursor-pointer"
          >
            Yes, Remove
          </button>
        </div>
      </div>
    ), {
      duration: Infinity,
      position: 'top-center',
      style: { border: '1px solid #fee2e2', padding: '16px', borderRadius: '12px' }
    });
  };

  const confirmDeletion = (id, name) => {
    // TODO: Backend Developer - Send DELETE request to the API
    /* Example:
       axios.delete(`/api/donors/${id}`).then(() => {
         setDonors(donors.filter(item => item.id !== id));
         toast.success(`Donor ${name} removed successfully.`);
       });
    */

    // Temporary Frontend Update (Remove this once API is integrated)
    setDonors(donors.filter(item => item.id !== id));
    toast.success(`Donor ${name} removed locally (API pending).`, {
      style: { background: '#fee2e2', color: '#b91c1c', fontWeight: 'bold', border: '1px solid #f87171' },
      iconTheme: { primary: '#dc2626', secondary: '#fff' },
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-extrabold text-gray-800">Manage Registered Donors</h3>
          <p className="text-sm text-gray-500">View and manage all verified blood donors.</p>
        </div>
        <div className="bg-green-50 text-green-700 font-bold px-4 py-2 rounded-xl text-sm border border-green-200">
          Total Donors: {donors.length}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider border-b border-gray-200">
              <th className="py-3 px-4">Donor Name</th>
              <th className="py-3 px-4">Blood Group</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4">Contact</th>
              <th className="py-3 px-4">Last Donated</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {donors.length === 0 ? (
              <tr><td colSpan="6" className="text-center py-8 text-gray-500 font-medium">No donors found.</td></tr>
            ) : (
              donors.map(donor => (
                <tr key={donor.id} className="hover:bg-gray-50 transition">
                  <td className="py-4 px-4 font-bold text-gray-800 flex items-center gap-2"><span>👤</span> {donor.name}</td>
                  <td className="py-4 px-4"><span className="bg-red-100 text-red-700 font-extrabold text-xs px-2.5 py-1 rounded-full">{donor.bloodGroup}</span></td>
                  <td className="py-4 px-4 text-gray-600">{donor.location || donor.address}</td>
                  <td className="py-4 px-4 text-gray-600 font-medium">{donor.contact || donor.phone}</td>
                  <td className="py-4 px-4 text-gray-500 text-xs font-semibold">{donor.lastDonated || 'N/A'}</td>
                  <td className="py-4 px-4 text-center">
                    <button onClick={() => handleDelete(donor.id, donor.name)} className="bg-red-50 hover:bg-red-100 text-red-600 font-bold px-3 py-1.5 rounded-lg transition cursor-pointer text-xs">Remove</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageDonors;