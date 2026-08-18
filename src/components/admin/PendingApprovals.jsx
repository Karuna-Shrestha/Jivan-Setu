import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const PendingApprovals = () => {
  const [approvalTab, setApprovalTab] = useState('blood-banks');
  
  // LocalStorage बाट तानिने स्टेटहरू
  const [pendingBloodBanks, setPendingBloodBanks] = useState([]);
  const [pendingDonors, setPendingDonors] = useState([]);
  const [pendingUpdates, setPendingUpdates] = useState([]); // अहिलेको लागि खाली राख्न सकिन्छ

  // कम्पोनेन्ट लोड हुँदा LocalStorage बाट Pending डाटाहरू तान्ने
  useEffect(() => {
    const fetchedBBs = JSON.parse(localStorage.getItem('pendingBloodBanks')) || [];
    const fetchedDonors = JSON.parse(localStorage.getItem('pendingDonors')) || [];
    
    setPendingBloodBanks(fetchedBBs);
    setPendingDonors(fetchedDonors);
  }, []);

  const handleAction = (id, category, name, actionType) => {
    if (actionType === 'approve') {
      
      if (category === 'blood-bank') {
        // १. Pending बाट खोज्ने
        const itemToApprove = pendingBloodBanks.find(item => item.id === id);
        // २. Public Blood Banks मा थप्ने
        const approvedBBs = JSON.parse(localStorage.getItem('bloodBanks')) || [];
        approvedBBs.push({ ...itemToApprove, status: 'approved' });
        localStorage.setItem('bloodBanks', JSON.stringify(approvedBBs));
        
        // ३. Pending बाट हटाउने
        const newPending = pendingBloodBanks.filter(item => item.id !== id);
        setPendingBloodBanks(newPending);
        localStorage.setItem('pendingBloodBanks', JSON.stringify(newPending));
      } 
      else if (category === 'donor') {
        // १. Pending बाट खोज्ने
        const itemToApprove = pendingDonors.find(item => item.id === id);
        // २. Public Donors मा थप्ने
        const approvedDonors = JSON.parse(localStorage.getItem('donors')) || [];
        approvedDonors.push({ ...itemToApprove, status: 'approved' });
        localStorage.setItem('donors', JSON.stringify(approvedDonors));
        
        // ३. Pending बाट हटाउने
        const newPending = pendingDonors.filter(item => item.id !== id);
        setPendingDonors(newPending);
        localStorage.setItem('pendingDonors', JSON.stringify(newPending));
      }

      toast.success(`${name} has been approved and published!`, { style: { background: '#10b981', color: '#fff', fontWeight: 'bold' } });
    
    } else {
      // Reject गर्दा सिधै Pending बाट डिलिट मात्र गर्ने
      if (category === 'blood-bank') {
        const newPending = pendingBloodBanks.filter(item => item.id !== id);
        setPendingBloodBanks(newPending);
        localStorage.setItem('pendingBloodBanks', JSON.stringify(newPending));
      } else if (category === 'donor') {
        const newPending = pendingDonors.filter(item => item.id !== id);
        setPendingDonors(newPending);
        localStorage.setItem('pendingDonors', JSON.stringify(newPending));
      }
      
      toast.error(`${name}'s request rejected.`, { style: { background: '#ef4444', color: '#fff', fontWeight: 'bold' } });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-fadeIn">
      <div className="flex border-b border-gray-200 bg-gray-50 px-6 pt-4 gap-6">
        <SubTab label={`Blood Banks (${pendingBloodBanks.length})`} active={approvalTab === 'blood-banks'} onClick={() => setApprovalTab('blood-banks')} />
        <SubTab label={`New Donors (${pendingDonors.length})`} active={approvalTab === 'donors'} onClick={() => setApprovalTab('donors')} />
        <SubTab label={`Profile Updates (${pendingUpdates.length})`} active={approvalTab === 'updates'} onClick={() => setApprovalTab('updates')} />
      </div>

      <div className="p-6 bg-white min-h-[400px]">
        {approvalTab === 'blood-banks' && (
          <div className="space-y-4">
            {pendingBloodBanks.length === 0 ? <EmptyState /> : pendingBloodBanks.map(item => (
              <ApprovalCard 
                key={item.id} 
                title={item.name} 
                subtitle={item.location} 
                meta={`Contact: ${item.phone} • Requested By: ${item.requestedBy}`} 
                badge="New Facility" 
                onApprove={() => handleAction(item.id, 'blood-bank', item.name, 'approve')} 
                onReject={() => handleAction(item.id, 'blood-bank', item.name, 'reject')} 
              />
            ))}
          </div>
        )}
        {approvalTab === 'donors' && (
          <div className="space-y-4">
            {pendingDonors.length === 0 ? <EmptyState /> : pendingDonors.map(item => (
              <ApprovalCard 
                key={item.id} 
                title={item.name} 
                subtitle={item.location} 
                meta={`Blood Group: ${item.bloodGroup} • Contact: ${item.phone}`} 
                badge="New Donor" 
                badgeColor="bg-red-100 text-red-700" 
                onApprove={() => handleAction(item.id, 'donor', item.name, 'approve')} 
                onReject={() => handleAction(item.id, 'donor', item.name, 'reject')} 
              />
            ))}
          </div>
        )}
        {approvalTab === 'updates' && (
          <div className="space-y-4">
            {pendingUpdates.length === 0 ? <EmptyState /> : pendingUpdates.map(item => (
              <ApprovalCard key={item.id} title={item.name} subtitle={<span className="flex items-center gap-2 mt-1"><span className="line-through text-red-400">{item.oldData}</span><span className="text-gray-400">➔</span><span className="text-green-600 font-bold">{item.newData}</span></span>} meta={`Type: ${item.type} • Requested: ${item.date}`} badge="Update Request" badgeColor="bg-yellow-100 text-yellow-700" onApprove={() => handleAction(item.id, 'update', item.name, 'approve')} onReject={() => handleAction(item.id, 'update', item.name, 'reject')} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const EmptyState = () => (
  <div className="text-center py-12"><span className="text-4xl block mb-3 opacity-50">✨</span><p className="text-gray-500 font-bold">All caught up! No pending requests here.</p></div>
);

const SubTab = ({ label, active, onClick }) => (
  <button onClick={onClick} className={`pb-3 px-2 font-bold text-sm transition-all duration-200 border-b-4 outline-none cursor-pointer ${active ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-500 hover:text-blue-500'}`}>{label}</button>
);

const ApprovalCard = ({ title, subtitle, meta, badge, badgeColor = "bg-blue-100 text-blue-700", onApprove, onReject }) => (
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-5 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-md transition-all duration-300 gap-4">
    <div className="flex-1">
      <div className="flex items-center gap-3 mb-1"><h4 className="text-lg font-extrabold text-gray-800">{title}</h4><span className={`text-xs font-bold px-2.5 py-1 rounded-full ${badgeColor}`}>{badge}</span></div>
      <div className="text-sm text-gray-700 font-medium">{subtitle}</div><p className="text-xs text-gray-500 mt-2 font-semibold tracking-wide">{meta}</p>
    </div>
    <div className="flex items-center gap-3 w-full md:w-auto">
      <button onClick={onReject} className="px-4 py-2 rounded-lg border-2 border-red-100 text-red-600 font-bold hover:bg-red-50 transition cursor-pointer">Reject</button>
      <button onClick={onApprove} className="px-4 py-2 rounded-lg bg-green-500 text-white font-bold hover:bg-green-600 shadow-sm transition cursor-pointer">Approve</button>
    </div>
  </div>
);

export default PendingApprovals;