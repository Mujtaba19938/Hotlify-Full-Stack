import React, { useState } from 'react';
import { 
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  ChevronDown,
  Search,
  Home
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

const cashflowData = [
  { name: 'Jan', income: 14000, expense: -12000 },
  { name: 'Feb', income: 10000, expense: -15000 },
  { name: 'Mar', income: 9000, expense: -9000 },
  { name: 'Apr', income: 13000, expense: -11000 },
  { name: 'May', income: 11000, expense: -6000 },
  { name: 'Jun', income: 11000, expense: -8000 },
  { name: 'Jul', income: 21500, expense: -15600 },
  { name: 'Aug', income: 16000, expense: -9000 },
  { name: 'Sep', income: 8000, expense: -11000 },
  { name: 'Oct', income: 11000, expense: -12000 },
  { name: 'Nov', income: 10000, expense: -14000 },
  { name: 'Dec', income: 13000, expense: -12000 },
];

const expenseBreakdown = [
  { name: 'Housekeeping Supplies', value: 17570, percentage: 28, color: '#1c64f2' },
  { name: 'Utilities (Water, Power, Internet)', value: 13800, percentage: 22, color: '#dcf344' },
  { name: 'Food & Beverage Procurement', value: 11300, percentage: 18, color: '#b3d4ff' },
  { name: 'Maintenance & Repairs', value: 10040, percentage: 16, color: '#e5e7eb' },
  { name: 'Staff Salaries & Overtime', value: 10040, percentage: 16, color: '#f3f4f6' },
];

const transactionsData = [
  { id: 1, date: 'Mar 14, 2035', time: '09:20 AM', name: 'Online Booking Payment', category: 'Room Revenue', amount: '+ $1,280', note: '3-night stay, Deluxe Suite', status: 'Success' },
  { id: 2, date: 'Mar 14, 2035', time: '08:30 AM', name: 'Utility Bill', category: 'Electricity', amount: '- $1,050', note: 'March power payment', status: 'Pending' },
  { id: 3, date: 'Mar 13, 2035', time: '09:20 AM', name: 'Restaurant Supplies', category: 'F&B', amount: '- $720', note: 'Beverage restock', status: 'Success' },
  { id: 4, date: 'Mar 13, 2035', time: '09:20 AM', name: 'Corporate Event Booking', category: 'Venue Revenue', amount: '+ $2,540', note: 'TechVision Ltd. group booking', status: 'Success' },
  { id: 5, date: 'Mar 12, 2035', time: '09:20 AM', name: 'Maintenance Tools', category: 'Repairs', amount: '- $480', note: 'Tool set replacement', status: 'Pending' },
  { id: 6, date: 'Mar 12, 2035', time: '09:20 AM', name: 'Guest Refund', category: 'Reimbursement', amount: '- $220', note: 'Early checkout refund', status: 'Success' },
  { id: 7, date: 'Mar 12, 2035', time: '09:20 AM', name: 'Walk-In Reservation', category: 'Room Revenue', amount: '+ $640', note: '2-night Superior Room', status: 'Success' },
  { id: 8, date: 'Mar 11, 2035', time: '09:20 AM', name: 'Staff Overtime', category: 'Payroll', amount: '- $1,150', note: 'Extra hours during full occupancy', status: 'Pending' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 border border-gray-100 dark:border-gray-700 shadow-lg rounded-xl text-xs transition-colors duration-300">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">{label} 2035</p>
        <div className="flex justify-between gap-4 mb-1">
          <span className="text-gray-500 dark:text-gray-400">Income</span>
          <span className="font-bold text-gray-900 dark:text-white">${payload[0].value.toLocaleString()}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-gray-500 dark:text-gray-400">Expense</span>
          <span className="font-bold text-gray-900 dark:text-white">${Math.abs(payload[1].value).toLocaleString()}</span>
        </div>
      </div>
    );
  }
  return null;
};

export function Finance() {
  return (
    <div className="w-full flex gap-6 flex-col xl:flex-row">
      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-6 min-w-0">
        
        {/* Top KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-850 flex flex-col transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors">$82,450</h2>
              <div className="w-10 h-10 rounded-full bg-[#1c64f2] text-white flex items-center justify-center">
                <Wallet className="h-5 w-5" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 transition-colors mb-4">Balance</p>
            <div className="flex items-center gap-2 mt-auto">
              <span className="bg-[#dcf344] text-gray-900 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border dark:border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 transition-colors">
                <ArrowUpRight className="h-3 w-3" /> +6.4%
              </span>
              <span className="text-[10px] text-gray-400 dark:text-gray-500 transition-colors">from last month</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-850 flex flex-col transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors">$145,200</h2>
              <div className="w-10 h-10 rounded-full bg-[#edf5ff] dark:bg-blue-950/40 text-[#1c64f2] dark:text-blue-400 flex items-center justify-center transition-colors">
                <ArrowUpRight className="h-5 w-5" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 transition-colors mb-4">Total Income</p>
            <div className="flex items-center gap-2 mt-auto">
              <span className="bg-[#dcf344] text-gray-900 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border dark:border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 transition-colors">
                <ArrowUpRight className="h-3 w-3" /> +10.8%
              </span>
              <span className="text-[10px] text-gray-400 dark:text-gray-500 transition-colors">from last month</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-850 flex flex-col transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors">$62,750</h2>
              <div className="w-10 h-10 rounded-full bg-[#edf5ff] dark:bg-blue-950/40 text-[#1c64f2] dark:text-blue-400 flex items-center justify-center transition-colors">
                <ArrowDownRight className="h-5 w-5" />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 transition-colors mb-4">Total Expenses</p>
            <div className="flex items-center gap-2 mt-auto">
              <span className="bg-[#dcf344] text-gray-900 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border dark:border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 transition-colors">
                <ArrowUpRight className="h-3 w-3" /> +8.3%
              </span>
              <span className="text-[10px] text-gray-400 dark:text-gray-500 transition-colors">from last month</span>
            </div>
          </div>
        </div>

        {/* Cashflow Chart */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-850 p-6 transition-all duration-300">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white transition-colors mb-4">Cashflow</h3>
              <div className="flex gap-4 text-[11px] font-medium text-gray-500 dark:text-gray-400 transition-colors">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#dcf344] dark:bg-blue-500 transition-colors"></div> Income
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#1c64f2] dark:bg-gray-800 transition-colors"></div> Expense
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-colors">
                2025 <ChevronDown className="h-3.5 w-3.5" />
              </button>
              <button className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white transition-colors p-1.5 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={cashflowData}
                margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                barSize={20}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-gray-700)" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'var(--color-gray-400)', fontSize: 10, fontWeight: 500 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'var(--color-gray-400)', fontSize: 10, fontWeight: 500 }}
                  dx={-10}
                  ticks={[-16000, -8000, 0, 8000, 16000]}
                  tickFormatter={(val) => {
                    if (val === 0) return '0K';
                    return val > 0 ? `${val/1000}K` : `${val/1000}K`;
                  }}
                />
                <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}} />
                <Bar dataKey="income" stackId="a" fill="var(--color-income)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="expense" stackId="a" fill="var(--color-expense)" radius={[0, 0, 6, 6]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-850 overflow-hidden flex-1 flex flex-col transition-all duration-300">
          <div className="p-5 border-b border-gray-100 dark:border-gray-850 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h3 className="font-semibold text-gray-900 dark:text-white transition-colors">Recent Transactions</h3>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                <input 
                  type="text" 
                  placeholder="Search guest, status, etc" 
                  className="pl-9 pr-4 py-1.5 bg-gray-50 dark:bg-gray-800 border-none rounded-full text-xs font-medium w-48 outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 text-gray-800 dark:text-white transition-colors"
                />
              </div>
              <button className="text-xs bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full px-4 py-1.5 font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1.5 transition-colors">
                All Status <ChevronDown className="h-3 w-3" />
              </button>
              <button className="text-xs bg-[#dcf344] hover:bg-[#d4ed36] dark:bg-blue-600 dark:hover:bg-blue-700 rounded-full px-4 py-1.5 font-semibold text-gray-900 dark:text-white flex items-center gap-1.5 transition-colors">
                This Month <ChevronDown className="h-3 w-3" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-gray-50/50 dark:bg-gray-950/20 text-[10px] text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-850">
                  <th className="px-5 py-3 font-semibold uppercase tracking-wider">Date & Time ↕</th>
                  <th className="px-5 py-3 font-semibold uppercase tracking-wider">Transaction Name ↕</th>
                  <th className="px-5 py-3 font-semibold uppercase tracking-wider">Category ↕</th>
                  <th className="px-5 py-3 font-semibold uppercase tracking-wider">Amount ↕</th>
                  <th className="px-5 py-3 font-semibold uppercase tracking-wider">Note ↕</th>
                  <th className="px-5 py-3 font-semibold uppercase tracking-wider text-right">Status ↕</th>
                </tr>
              </thead>
              <tbody className="text-xs">
                {transactionsData.map((trx) => (
                  <tr key={trx.id} className="border-b border-gray-50 dark:border-gray-850 hover:bg-gray-50/50 dark:hover:bg-gray-800/40 transition-colors">
                    <td className="px-5 py-3.5 text-gray-500 dark:text-gray-450">
                      <div className="font-medium text-gray-900 dark:text-white">{trx.date}</div>
                      <div className="text-[10px]">{trx.time}</div>
                    </td>
                    <td className="px-5 py-3.5 font-medium text-gray-800 dark:text-gray-200">{trx.name}</td>
                    <td className="px-5 py-3.5 text-gray-500 dark:text-gray-400 font-medium">{trx.category}</td>
                    <td className={`px-5 py-3.5 font-medium ${trx.amount.startsWith('+') ? 'text-[#1c64f2] dark:text-blue-400' : 'text-[#e02424] dark:text-red-400'}`}>
                      {trx.amount}
                    </td>
                    <td className="px-5 py-3.5 text-gray-500 dark:text-gray-450">{trx.note}</td>
                    <td className="px-5 py-3.5 text-right">
                      {trx.status === 'Success' ? (
                        <span className="px-3 py-1 rounded-full text-[10px] font-semibold bg-[#edf5ff] dark:bg-blue-950/40 text-[#1c64f2] dark:text-blue-400 inline-block">Success</span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-[10px] font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-400 border border-amber-250 dark:border-amber-900/50 inline-block">Pending</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Right Column (Money Tracker) */}
      <div className="w-full xl:w-[320px] bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-850 flex-shrink-0 flex flex-col p-6 transition-all duration-300">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-semibold text-gray-900 dark:text-white transition-colors">Money Tracker</h3>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-full flex p-0.5 transition-colors">
            <button className="px-3 py-1 rounded-full text-[11px] font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Income</button>
            <button className="px-3 py-1 rounded-full text-[11px] font-semibold bg-[#dcf344] dark:bg-blue-600 text-gray-900 dark:text-white shadow-sm transition-colors">Expenses</button>
          </div>
        </div>

        <div className="relative w-full aspect-square flex items-center justify-center mb-6">
          <ResponsiveContainer width={192} height={192}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Housekeeping', value: 28, fill: 'var(--color-pie-housekeeping)' },
                  { name: 'Utilities', value: 22, fill: 'var(--color-pie-utilities)' },
                  { name: 'Food & Bev', value: 18, fill: 'var(--color-pie-foodbev)' },
                  { name: 'Remaining', value: 32, fill: 'transparent' }
                ]}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={85}
                cornerRadius={10}
                paddingAngle={4}
                dataKey="value"
                stroke="none"
                startAngle={90}
                endAngle={-270}
              >
                {[
                  { fill: 'var(--color-pie-housekeeping)' },
                  { fill: 'var(--color-pie-utilities)' },
                  { fill: 'var(--color-pie-foodbev)' },
                  { fill: 'var(--color-pie-remaining)' }
                ].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-16 h-16 rounded-full bg-[#edf5ff] dark:bg-blue-950/40 text-[#1c64f2] dark:text-blue-400 flex items-center justify-center transition-colors">
              <Home className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-end mb-8 pt-4 border-t border-gray-100 dark:border-gray-850 transition-colors">
          <div>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 transition-colors">Total Expense</p>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">$62,750</h2>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="bg-[#dcf344] text-gray-900 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border dark:border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 transition-colors">
              <ArrowUpRight className="h-3 w-3" /> +8.3%
            </span>
            <span className="text-[10px] text-gray-400 dark:text-gray-500 transition-colors">from last month</span>
          </div>
        </div>

        <div className="space-y-4">
          {expenseBreakdown.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div 
                  className="w-2.5 h-2.5 rounded-sm transition-colors duration-300" 
                  style={{ 
                    backgroundColor: item.color === '#dcf344' 
                      ? 'var(--color-pie-utilities)' 
                      : item.color === '#1c64f2'
                      ? 'var(--color-pie-housekeeping)'
                      : item.color === '#b3d4ff'
                      ? 'var(--color-pie-foodbev)'
                      : item.color === '#f3f4f6'
                      ? 'var(--color-pie-remaining)'
                      : item.color 
                  }}
                ></div>
                <span className="font-semibold text-gray-600 dark:text-gray-300 max-w-[140px] truncate transition-colors">{item.name}</span>
              </div>
              <div className="flex items-center gap-4">
                 <span className="font-bold text-gray-900 dark:text-white transition-colors">${item.value.toLocaleString()}</span>
                 <span className="text-[10px] font-medium text-gray-400 dark:text-gray-500 w-8 text-right transition-colors">• {item.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
