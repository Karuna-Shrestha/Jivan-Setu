import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// Importing our separated admin components
import DashboardOverview from '../components/admin/DashboardOverview';
import PendingApprovals from '../components/admin/PendingApprovals';
import ManageBloodBanks from '../components/admin/ManageBloodBanks';
import ManageDonors from '../components/admin/ManageDonors';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  // State for pending data to be fetched from API
  const [pendingBloodBanks, setPendingBloodBanks] = useState([]);
  const [pendingDonors, setPendingDonors] = useState([]);
  const [pendingUpdates, setPendingUpdates] = useState([]);

  // Fetch pending data from API when component mounts
  useEffect(() => {
    // TODO: Backend Developer - Fetch all pending requests from the database
    /* Example using Promise.all to fetch everything concurrently:
       Promise.all([
         axios.get('/api/admin/pending/blood-banks'),
         axios.get('/api/admin/pending/donors'),
         axios.get('/api/admin/pending/updates')
       ])
       .then(([bbRes, donorsRes, updatesRes]) => {
         setPendingBloodBanks(bbRes.data);
         setPendingDonors(donorsRes.data);
         setPendingUpdates(updatesRes.data);
       })
       .catch(err => {
         toast.error("Failed to fetch pending requests");
         console.error(err);
       });
    */

    // Temporary Frontend Mock (Remove this block once API is integrated)
    setPendingBloodBanks([]);
    setPendingDonors([]);
    setPendingUpdates([]);
  }, []);

  // Calculate total pending requests dynamically
  const totalPending = pendingBloodBanks.length + pendingDonors.length + pendingUpdates.length;

  const handleLogout = () => {
    // TODO: Backend Developer - Send POST request to admin logout API endpoint
    /* Example:
       axios.post('/api/admin/logout')
         .then(() => {
           toast.success('Logged out successfully');
           navigate('/admin-login');
         })
         .catch(err => toast.error('Logout failed'));
    */

    // Temporary Frontend Update (Remove this once API is integrated)
    toast.success('Logout simulation (API Pending). Add backend logic to proceed!');
    navigate('/admin-login');
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white flex flex-col shadow-xl z-10">
        <div className="p-6 text-center border-b border-blue-800">
          <h2 className="text-2xl font-extrabold flex items-center justify-center gap-2">🩸 Jivan Setu</h2>
          <p className="text-xs text-blue-300 mt-1 uppercase tracking-wider">Admin Panel</p>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          <SidebarItem active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} label="Dashboard" />
          <SidebarItem active={activeTab === 'pending'} onClick={() => setActiveTab('pending')} label="Pending Approvals" badge={totalPending > 0 ? totalPending : null} />
          <SidebarItem active={activeTab === 'blood-banks'} onClick={() => setActiveTab('blood-banks')} label="Manage Blood Banks" />
          <SidebarItem active={activeTab === 'donors'} onClick={() => setActiveTab('donors')} label="Manage Donors" />
        </nav>

        <div className="p-4 border-t border-blue-800">
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 rounded-md font-bold transition cursor-pointer">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Topbar */}
        <header className="bg-white shadow-sm py-4 px-8 flex justify-between items-center border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800 capitalize">{activeTab.replace('-', ' ')}</h1>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold border border-blue-200">A</div>
            <div>
              <p className="text-sm font-bold text-gray-700">Super Admin</p>
              <p className="text-xs text-green-600 font-medium">● Online</p>
            </div>
          </div>
        </header>

        {/* Dynamic Content Loading */}
        <div className="flex-1 overflow-y-auto p-8">
          
          {activeTab === 'dashboard' && (
            <DashboardOverview setActiveTab={setActiveTab} pendingCount={totalPending} />
          )}

          {activeTab === 'pending' && (
            <PendingApprovals 
              pendingBloodBanks={pendingBloodBanks} setPendingBloodBanks={setPendingBloodBanks}
              pendingDonors={pendingDonors} setPendingDonors={setPendingDonors}
              pendingUpdates={pendingUpdates} setPendingUpdates={setPendingUpdates}
            />
          )}

          {activeTab === 'blood-banks' && <ManageBloodBanks />}

          {activeTab === 'donors' && <ManageDonors />}

        </div>
      </main>
    </div>
  );
};

// Reusable Sidebar Item Component
const SidebarItem = ({ active, label, onClick, badge }) => (
  <div onClick={onClick} className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 ${active ? 'bg-blue-800 text-white font-bold border-l-4 border-blue-400' : 'text-blue-200 hover:bg-blue-800 hover:text-white'}`}>
    <span>{label}</span>
    {badge && <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{badge}</span>}
  </div>
);

export default AdminDashboard;