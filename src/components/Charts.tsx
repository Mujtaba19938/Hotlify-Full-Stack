import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, Cell, PieChart, Pie, Sector } from 'recharts';
import { revenueData, occupancyData, bookingSourceData, ratingData } from '../data';
import { MoreHorizontal, ArrowUpRight, ArrowDownRight, CheckCircle2, ArrowRightCircle, ArrowLeftCircle, BedDouble, Star } from 'lucide-react';

export function KPIs() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {/* Welcome & Earnings */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 flex flex-col justify-between transition-colors duration-300">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white transition-colors">Hi, Polina</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 transition-colors">Saturday, 25 November 2028</p>
        </div>
        
        <div className="bg-[#1c64f2] dark:bg-indigo-650 rounded-xl p-4 mt-4 text-white flex justify-between items-end relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
          <div>
            <p className="text-blue-100 dark:text-indigo-200 text-xs mb-1">Total Earnings</p>
            <p className="text-2xl font-bold">$58,240</p>
          </div>
          <div className="bg-[#dcf344] text-gray-900 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border dark:border-emerald-500/30 text-xs font-semibold px-2 py-1 rounded-md flex items-center gap-1 z-10">
            <ArrowUpRight className="h-3 w-3" />
            +15.6%
          </div>
        </div>
      </div>
      
      {/* New Reservations */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
        <div className="h-10 w-10 bg-[#edf5ff] dark:bg-blue-950/40 text-[#1c64f2] dark:text-blue-400 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="h-5 w-5" />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 transition-colors">New Reservations</p>
        <p className="text-3xl font-bold text-gray-900 dark:text-white transition-colors">128</p>
        <div className="flex items-center gap-2 mt-4">
           <div className="bg-[#dcf344] text-gray-900 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border dark:border-emerald-500/30 text-xs font-semibold px-1.5 py-0.5 rounded flex items-center">
            <ArrowUpRight className="h-3 w-3 mr-0.5" />
            +12.4%
          </div>
          <span className="text-xs text-gray-400 dark:text-gray-500">from last week</span>
        </div>
      </div>

      {/* Guests Checked In */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
        <div className="h-10 w-10 bg-[#edf5ff] dark:bg-blue-950/40 text-[#1c64f2] dark:text-blue-400 rounded-full flex items-center justify-center mb-4">
          <ArrowRightCircle className="h-5 w-5" />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 transition-colors">Guests Checked In</p>
        <p className="text-3xl font-bold text-gray-900 dark:text-white transition-colors">94</p>
        <div className="flex items-center gap-2 mt-4">
           <div className="bg-[#dcf344] text-gray-900 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border dark:border-emerald-500/30 text-xs font-semibold px-1.5 py-0.5 rounded flex items-center">
            <ArrowUpRight className="h-3 w-3 mr-0.5" />
            +8.7%
          </div>
          <span className="text-xs text-gray-400 dark:text-gray-500">week over week</span>
        </div>
      </div>

      {/* Guests Checked Out */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
        <div className="h-10 w-10 bg-[#edf5ff] dark:bg-blue-950/40 text-[#1c64f2] dark:text-blue-400 rounded-full flex items-center justify-center mb-4">
          <ArrowLeftCircle className="h-5 w-5" />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 transition-colors">Guests Checked Out</p>
        <p className="text-3xl font-bold text-gray-900 dark:text-white transition-colors">76</p>
        <div className="flex items-center gap-2 mt-4">
           <div className="bg-[#ffe5e5] text-[#e02424] dark:bg-red-950/20 dark:text-red-400 dark:border dark:border-red-900/30 text-xs font-semibold px-1.5 py-0.5 rounded flex items-center">
            <ArrowDownRight className="h-3 w-3 mr-0.5" />
            -3.2%
          </div>
          <span className="text-xs text-gray-400 dark:text-gray-500">from previous week</span>
        </div>
      </div>
    </div>
  );
}

export function MainCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Revenue Area Chart */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-semibold text-gray-900 dark:text-white transition-colors">Revenue</h3>
          <select className="text-xs border-none bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-1.5 outline-none text-gray-600 dark:text-gray-300 font-medium transition-colors">
            <option>Last 6 Months</option>
            <option>Last Year</option>
          </select>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1c64f2" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#1c64f2" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-gray-700)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-gray-400)' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-gray-400)' }} tickFormatter={(value) => `$${value/1000}k`} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', backgroundColor: 'var(--color-gray-800)', color: 'var(--color-gray-100)', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Total Revenue']}
              />
              <Area type="monotone" dataKey="value" stroke="#1c64f2" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Occupancy Trend Bar Chart */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-semibold text-gray-900 dark:text-white transition-colors">Occupancy Trend</h3>
          <select className="text-xs border-none bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-1.5 outline-none text-gray-600 dark:text-gray-300 font-medium transition-colors">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
          </select>
        </div>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
            <div className="w-2 h-2 rounded-full bg-[#1c64f2]"></div>
            Occupied
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
            <div className="w-2 h-2 rounded-full bg-[#edf5ff] dark:bg-gray-800"></div>
            Available
          </div>
        </div>
        <div className="h-52 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={occupancyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-gray-700)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--color-gray-400)' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--color-gray-400)' }} />
              <Tooltip 
                cursor={{ fill: 'transparent' }}
                contentStyle={{ borderRadius: '8px', border: 'none', backgroundColor: 'var(--color-gray-800)', color: 'var(--color-gray-100)', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="occupied" stackId="a" fill="#1c64f2" radius={[0,0,4,4]} />
              <Bar dataKey="available" stackId="a" fill="var(--color-gray-800)" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
  return null; // hide default label
};

export function SecondaryCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Booking Source */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-900 dark:text-white transition-colors">Booking Source</h3>
          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex items-center h-48">
          <div className="w-1/2 h-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={bookingSourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                  cornerRadius={4}
                >
                  {bookingSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <BedDouble className="h-8 w-8 text-[#1c64f2] dark:text-blue-400" />
            </div>
          </div>
          <div className="w-1/2 space-y-4">
            {bookingSourceData.map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500 dark:text-gray-400 truncate pr-2">{item.name}</span>
                  <span className="font-medium text-gray-900 dark:text-white">{item.value}%</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5">
                  <div 
                    className="h-1.5 rounded-full" 
                    style={{ width: `${item.value}%`, backgroundColor: item.fill }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

       {/* Overall Rating */}
       <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-900 dark:text-white transition-colors">Overall Rating</h3>
          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex items-center h-48">
          <div className="w-1/2 h-full flex flex-col items-center justify-center relative">
            <svg viewBox="0 0 100 50" className="w-40 h-20 overflow-visible">
              {/* Background Arc */}
              <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="var(--color-gray-700)" strokeWidth="12" strokeLinecap="round" />
              {/* Foreground Arc */}
              <path d="M 10 50 A 40 40 0 0 1 80 15" fill="none" stroke="#1c64f2" strokeWidth="12" strokeLinecap="round" />
              {/* Pointer Indicator */}
              <circle cx="75" cy="20" r="5" fill="#1c64f2" stroke="#fff" strokeWidth="2" />
            </svg>
            <div className="text-center mt-2">
              <p className="text-xs text-gray-500 dark:text-gray-400">Total Review</p>
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">4.7 <span className="text-sm font-medium text-gray-400">/ 5.0</span></h4>
              <p className="text-[10px] text-gray-400">1,248 Guests</p>
            </div>
          </div>
          
          <div className="w-1/2 space-y-2.5">
            {ratingData.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs">
                <span className="bg-[#1c64f2] text-white dark:bg-blue-950/40 dark:text-blue-400 px-2 py-0.5 rounded text-[10px] font-medium min-w-[100px] text-center">
                  {item.category}
                </span>
                <div className="flex items-center gap-1 font-semibold text-gray-700 dark:text-gray-300 transition-colors">
                  {item.score} <Star className="h-3 w-3 text-[#1c64f2] fill-[#1c64f2]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
