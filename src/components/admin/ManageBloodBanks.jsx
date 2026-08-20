import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const ManageBloodBanks = () => {
  // Default/Initial State
  const [bloodBanks, setBloodBanks] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newBank, setNewBank] = useState({ name: '', location: '', contact: '', image: null });
  const [imagePreview, setImagePreview] = useState(null);

  // TODO: Backend Developer - Fetch blood banks from the database when component mounts
  useEffect(() => {
    // Example: 
    // axios.get('/api/bloodbanks').then(res => setBloodBanks(res.data));
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewBank({ ...newBank, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAddBank = (e) => {
    e.preventDefault();
    if (!newBank.name || !newBank.location || !newBank.contact) {
      toast.error('Please fill all required fields!');
      return;
    }

    // TODO: Backend Developer - Create FormData here to handle image upload and send POST request to the API
    /* Example:
       const formData = new FormData();
       formData.append('name', newBank.name);
       formData.append('location', newBank.location);
       formData.append('contact', newBank.contact);
       if(newBank.image) formData.append('image', newBank.image);
       
       axios.post('/api/bloodbanks', formData).then(res => {
         setBloodBanks([res.data, ...bloodBanks]);
         toast.success('Blood Bank added successfully!');
       });
    */

    // Temporary Frontend Update (Remove this once API is integrated)
    const bankToAdd = {
      id: Date.now(),
      name: newBank.name,
      location: newBank.location,
      contact: newBank.contact,
      image: imagePreview || 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=400',
      status: 'Active'
    };
    setBloodBanks([bankToAdd, ...bloodBanks]);
    toast.success('Blood Bank added locally (API pending)!', { style: { background: '#10b981', color: '#fff', fontWeight: 'bold' } });

    // Reset Form
    setNewBank({ name: '', location: '', contact: '', image: null });
    setImagePreview(null);
    setShowAddModal(false);
  };

  const handleDelete = (id, name) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="text-red-500 text-xl">⚠️</span>
          <p className="text-sm font-bold text-gray-800">
            Delete <span className="text-red-600">{name}</span>?
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
            Yes, Delete
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
       axios.delete(`/api/bloodbanks/${id}`).then(() => {
         setBloodBanks(bloodBanks.filter(item => item.id !== id));
         toast.error(`${name} has been deleted.`);
       });
    */

    // Temporary Frontend Update (Remove this once API is integrated)
    setBloodBanks(bloodBanks.filter(item => item.id !== id));
    toast.error(`${name} removed locally (API pending).`, {
      style: { background: '#fee2e2', color: '#b91c1c', fontWeight: 'bold', border: '1px solid #f87171' },
      iconTheme: { primary: '#dc2626', secondary: '#fff' },
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-extrabold text-gray-800">Manage Blood Bank Centers</h3>
          <p className="text-sm text-gray-500">Add, view, or remove active blood bank facilities.</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-4 py-2.5 rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer">
          <span>➕</span> Add New Blood Bank
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider border-b border-gray-200">
              <th className="py-3 px-4">Facility Name</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4">Contact</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {bloodBanks.length === 0 ? (
              <tr><td colSpan="5" className="text-center py-8 text-gray-500 font-medium">No blood banks available.</td></tr>
            ) : (
              bloodBanks.map(bank => (
                <tr key={bank.id} className="hover:bg-gray-50 transition">
                  <td className="py-4 px-4 font-bold text-gray-800 flex items-center gap-3">
                    <img src={bank.image || "https://via.placeholder.com/150"} alt={bank.name} className="w-10 h-10 rounded-lg object-cover border border-gray-200 shadow-sm" />
                    <span>{bank.name}</span>
                  </td>
                  <td className="py-4 px-4 text-gray-600">{bank.location}</td>
                  <td className="py-4 px-4 text-gray-600 font-medium">{bank.contact}</td>
                  <td className="py-4 px-4"><span className="bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full">{bank.status || 'Active'}</span></td>
                  <td className="py-4 px-4 text-center">
                    <button onClick={() => handleDelete(bank.id, bank.name)} className="bg-red-50 hover:bg-red-100 text-red-600 font-bold px-3 py-1.5 rounded-lg transition cursor-pointer text-xs">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl animate-scaleUp">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Add New Blood Bank</h3>
            <form onSubmit={handleAddBank} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Center Name</label>
                <input type="text" value={newBank.name} onChange={(e) => setNewBank({...newBank, name: e.target.value})} className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Location</label>
                <input type="text" value={newBank.location} onChange={(e) => setNewBank({...newBank, location: e.target.value})} className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Contact Number</label>
                <input type="text" value={newBank.contact} onChange={(e) => setNewBank({...newBank, contact: e.target.value})} className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Upload Facility Photo</label>
                <input type="file" accept="image/*" onChange={handleImageChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-150 cursor-pointer" />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => { setShowAddModal(false); setImagePreview(null); }} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-lg cursor-pointer text-sm">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-lg shadow cursor-pointer text-sm">Save Bank</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBloodBanks;