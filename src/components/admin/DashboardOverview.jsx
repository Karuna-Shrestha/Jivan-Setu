import React, { useState } from 'react';
import DonorsChart from '../DonorsChart';
import BloodBanksChart from '../BloodBanksChart';

const DashboardOverview = ({ setActiveTab, pendingCount }) => {
  const [selectedStat, setSelectedStat] = useState('donors'); 

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Donors" value="1,245" gradient="bg-gradient-to-br from-green-400 to-green-600" 
          active={selectedStat === 'donors'} onClick={() => setSelectedStat('donors')}
        />
        <StatCard 
          title="Active Blood Banks" value="10" gradient="bg-gradient-to-br from-blue-500 to-blue-700" 
          active={selectedStat === 'blood-banks'} onClick={() => setSelectedStat('blood-banks')}
        />
        <StatCard 
          title="Pending Requests" value={pendingCount} gradient="bg-gradient-to-br from-amber-400 to-orange-500"
          active={selectedStat === 'pending'} 
          onClick={() => {
            setSelectedStat('pending');
            setActiveTab('pending');
          }} 
        />
      </div>

      <div className="mt-2">
        {selectedStat === 'donors' && <DonorsChart />}
        {selectedStat === 'blood-banks' && <BloodBanksChart />}
      </div>
    </div>
  );
};

const StatCard = ({ title, value, gradient, active, onClick }) => (
  <div onClick={onClick} className={`relative overflow-hidden p-6 rounded-2xl cursor-pointer transition-all duration-500 transform hover:scale-105 shadow-lg group ${active ? 'ring-4 ring-offset-2 ring-blue-400 shadow-2xl' : 'hover:shadow-xl'} ${gradient}`}>
    <div className="absolute -right-6 -top-6 w-24 h-24 bg-white opacity-10 rounded-full group-hover:scale-150 transition-transform duration-700" />
    <div className="relative z-10">
      <p className="text-sm text-white/90 font-medium uppercase tracking-wider mb-1">{title}</p>
      <h3 className="text-4xl font-extrabold text-white">{value}</h3>
    </div>
  </div>
);

export default DashboardOverview;