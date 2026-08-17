import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DonorsChart = () => {
  const [selectedYear, setSelectedYear] = useState('2026');

  // Dummy data for different years
  const data = {
    '2024': [
      { month: 'Jan', donors: 120 }, { month: 'Feb', donors: 150 }, { month: 'Mar', donors: 180 },
      { month: 'Apr', donors: 200 }, { month: 'May', donors: 250 }, { month: 'Jun', donors: 220 },
    ],
    '2025': [
      { month: 'Jan', donors: 200 }, { month: 'Feb', donors: 230 }, { month: 'Mar', donors: 300 },
      { month: 'Apr', donors: 350 }, { month: 'May', donors: 320 }, { month: 'Jun', donors: 400 },
    ],
    '2026': [
      { month: 'Jan', donors: 350 }, { month: 'Feb', donors: 410 }, { month: 'Mar', donors: 480 },
      { month: 'Apr', donors: 520 }, { month: 'May', donors: 590 }, { month: 'Jun', donors: 650 },
      { month: 'Jul', donors: 700 }, { month: 'Aug', donors: 810 },
    ]
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-6 animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-800">Total Donors Growth</h3>
          <p className="text-sm text-gray-500">Monthly registration statistics</p>
        </div>
        <select 
          value={selectedYear} 
          onChange={(e) => setSelectedYear(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 font-bold cursor-pointer outline-none"
        >
          <option value="2026">Year: 2026</option>
          <option value="2025">Year: 2025</option>
          <option value="2024">Year: 2024</option>
        </select>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data[selectedYear]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorDonors" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
            />
            <Area type="monotone" dataKey="donors" stroke="#22c55e" strokeWidth={3} fillOpacity={1} fill="url(#colorDonors)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DonorsChart;