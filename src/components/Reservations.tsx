import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, Eye, Edit2, ArrowUpRight, ArrowDownRight, FileText, Clock, BadgeCheck, CalendarX, Home, MoreHorizontal } from 'lucide-react';
import { API_BASE_URL } from '../config/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from 'recharts';

const trendData = [
  { name: 'Jan', confirmed: 75, canceled: 45 },
  { name: 'Feb', confirmed: 97, canceled: 33 },
  { name: 'Mar', confirmed: 50, canceled: 50 },
  { name: 'Apr', confirmed: 50, canceled: 33 },
  { name: 'May', confirmed: 68, canceled: 45 },
  { name: 'Jun', confirmed: 85, canceled: 60 },
];

const bookedData = [
  { name: 'Deluxe Suite', value: 225, fill: 'var(--color-pie-1)' },
  { name: 'Superior Room', value: 182, fill: 'var(--color-pie-2)' },
  { name: 'Executive Suite', value: 156, fill: 'var(--color-pie-3)' },
  { name: 'Standard Room', value: 128, fill: 'var(--color-pie-4)' },
  { name: 'Premium Deluxe', value: 104, fill: 'var(--color-pie-5)' },
  { name: 'Family Suite', value: 70, fill: 'var(--color-pie-6)' },
];

const reservations = [
  { id: '#BKG-1024', name: 'Emily Carter', type: 'Deluxe Suite', room: '208', request: 'Extra Pillows', duration: '4 nights', dates: 'Mar 12 - Mar 15, 2035', status: 'Canceled', source: 'Website', payment: 'Paid' },
  { id: '#BKG-2032', name: 'Daniel Wong', type: 'Superior Room', room: '315', request: 'Late Check-In', duration: '2 nights', dates: 'Mar 13 - Mar 15, 2035', status: 'Pending', source: 'Booking.com', payment: 'Unpaid' },
  { id: '#BKG-2033', name: 'Hannah Lee', type: 'Executive Suite', room: '205', request: 'High Floor', duration: '5 nights', dates: 'Mar 10 - Mar 15, 2035', status: 'Confirmed', source: 'Walk-In', payment: 'Paid' },
  { id: '#BKG-1027', name: 'Liam Johnson', type: 'Executive Suite', room: '410', request: '-', duration: '1 nights', dates: 'Mar 13 - Mar 14, 2035', status: 'Canceled', source: 'Agoda', payment: 'Paid' },
  { id: '#BKG-1028', name: 'Sophia Miles', type: 'Standard Room', room: '108', request: 'Sea View', duration: '4 nights', dates: 'Mar 11 - Mar 15, 2035', status: 'Confirmed', source: 'Website', payment: 'Unpaid' },
  { id: '#BKG-1029', name: 'Robert Miles', type: 'Deluxe Suite', room: '502', request: 'Extra Bed', duration: '3 nights', dates: 'Mar 12 - Mar 15, 2035', status: 'Pending', source: 'Corporate', payment: 'Unpaid' },
  { id: '#BKG-1030', name: 'Isabella Chen', type: 'Superior Room', room: '318', request: 'Connecting Room', duration: '2 nights', dates: 'Mar 14 - Mar 16, 2035', status: 'Confirmed', source: 'Expedia', payment: 'Paid' },
  { id: '#BKG-1031', name: 'Ethan Brown', type: 'Deluxe Suite', room: '212', request: 'Airport', duration: '3 nights', dates: 'Mar 15 - Mar 18, 2035', status: 'Confirmed', source: 'Website', payment: 'Paid' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 border border-gray-100 dark:border-gray-700 shadow-lg rounded-xl text-xs flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#1c64f2] dark:bg-blue-500"></div>
          <span className="font-bold text-gray-900 dark:text-white">{payload[0].value} Rooms</span>
          <span className="text-gray-500 dark:text-gray-400 ml-1">Confirmed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#dcf344] dark:bg-red-500"></div>
          <span className="font-bold text-gray-900 dark:text-white">{payload[1].value} Rooms</span>
          <span className="text-gray-500 dark:text-gray-400 ml-1">Canceled</span>
        </div>
      </div>
    );
  }
  return null;
};

export function Reservations() {
  const [reservationList, setReservationList] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/getReservations`);
        const data = await res.json();
        if (data.reservations) {
          const mapped = data.reservations.map((r: any) => {
            const start = r.checkInDate ? new Date(r.checkInDate) : new Date();
            const end = r.checkOutDate ? new Date(r.checkOutDate) : new Date();
            const nights = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));

            const opt = { month: 'short', day: 'numeric' } as const;
            const datesStr = `${start.toLocaleDateString('en-US', opt)} - ${end.toLocaleDateString('en-US', opt)}, ${end.getFullYear()}`;

            return {
              id: `#RES-${String(r.roomNumber || '101')}`,
              name: r.guestName,
              type: r.roomType,
              room: String(r.roomNumber || '101'),
              request: r.specialRequests || '-',
              duration: `${nights} night${nights > 1 ? 's' : ''}`,
              dates: datesStr,
              status: r.reservationStatus === 'cancelled' ? 'Canceled' : r.reservationStatus.charAt(0).toUpperCase() + r.reservationStatus.slice(1),
              source: 'Website',
              payment: r.paymentStatus === 'paid' ? 'Paid' : 'Unpaid'
            };
          });
          setReservationList(mapped);
        }
      } catch (err) {
        console.error("Failed to load reservations:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
  }, []);

  const filteredReservations = reservationList.filter(res => {
    const matchesSearch = res.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          res.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          res.room.includes(searchTerm);
    const matchesStatus = statusFilter === 'All Status' || res.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'bg-[#edf5ff] dark:bg-blue-500/20 text-[#1c64f2] dark:text-blue-400';
      case 'Pending': return 'bg-[#fdfade] dark:bg-amber-550/20 text-gray-600 dark:text-amber-400 border border-[#fef08a] dark:border-amber-500/30'; // yellow-ish / amber
      case 'Canceled': return 'bg-[#ffe5e5] dark:bg-red-500/20 text-[#e02424] dark:text-red-400';
      default: return 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full min-h-[700px] transition-colors duration-300">
      
      {/* Top Row: KPIs, Trend Chart, Most Booked */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* KPI Grid */}
        <div className="xl:col-span-4 grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 flex flex-col justify-between transition-all duration-300">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">42</h2>
              <div className="w-8 h-8 rounded-full bg-[#edf5ff] dark:bg-gray-800 text-[#1c64f2] dark:text-blue-400 flex items-center justify-center">
                <FileText className="h-4 w-4" />
              </div>
            </div>
            <p className="text-[11px] font-medium text-gray-500 dark:text-gray-400 mb-4">Total Reservations Today</p>
            <div className="flex items-center gap-2">
              <span className="bg-[#dcf344] text-gray-900 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border dark:border-emerald-500/30 text-[10px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-1">
                <ArrowUpRight className="h-3 w-3" /> +9.3%
              </span>
              <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">from last month</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 flex flex-col justify-between transition-all duration-300">
             <div className="flex justify-between items-start mb-2">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">3.6</h2>
              <div className="w-8 h-8 rounded-full bg-[#edf5ff] dark:bg-gray-800 text-[#1c64f2] dark:text-blue-400 flex items-center justify-center">
                <Clock className="h-4 w-4" />
              </div>
            </div>
            <p className="text-[11px] font-medium text-gray-500 dark:text-gray-400 mb-4">Average Stay Duration</p>
            <div className="flex items-center gap-2">
              <span className="bg-[#dcf344] text-gray-900 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border dark:border-emerald-500/30 text-[10px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-1">
                <ArrowUpRight className="h-3 w-3" /> +12.5%
              </span>
              <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">from last month</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 flex flex-col justify-between transition-all duration-300">
             <div className="flex justify-between items-start mb-2">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">80%</h2>
              <div className="w-8 h-8 rounded-full bg-[#edf5ff] dark:bg-gray-800 text-[#1c64f2] dark:text-blue-400 flex items-center justify-center">
                <BadgeCheck className="h-4 w-4" />
              </div>
            </div>
            <p className="text-[11px] font-medium text-gray-500 dark:text-gray-400 mb-4">Confirmed Rate</p>
            <div className="flex items-center gap-2">
              <span className="bg-[#dcf344] text-gray-900 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border dark:border-emerald-500/30 text-[10px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-1">
                <ArrowUpRight className="h-3 w-3" /> +3.3%
              </span>
              <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">from last month</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 flex flex-col justify-between transition-all duration-300">
             <div className="flex justify-between items-start mb-2">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">4.8%</h2>
              <div className="w-8 h-8 rounded-full bg-[#edf5ff] dark:bg-gray-800 text-[#1c64f2] dark:text-blue-400 flex items-center justify-center">
                <CalendarX className="h-4 w-4" />
              </div>
            </div>
            <p className="text-[11px] font-medium text-gray-500 dark:text-gray-400 mb-4">Cancellation Rate</p>
            <div className="flex items-center gap-2">
              <span className="bg-[#dcf344] text-gray-900 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border dark:border-emerald-500/30 text-[10px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-1">
                <ArrowDownRight className="h-3 w-3" /> -2.2%
              </span>
              <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">from last month</span>
            </div>
          </div>
        </div>

        {/* Reservation Trend */}
        <div className="xl:col-span-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 flex flex-col min-w-0 transition-all duration-300">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-gray-900 dark:text-white">Reservation Trend</h3>
            <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 mt-2 min-h-[160px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={trendData}
                margin={{ top: 0, right: 0, left: -25, bottom: 0 }}
                barSize={12}
                barGap={4}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-gray-800, #f3f4f6)" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'var(--color-gray-400, #9ca3af)', fontSize: 10, fontWeight: 500 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'var(--color-gray-400, #9ca3af)', fontSize: 10, fontWeight: 500 }}
                  dx={-10}
                  ticks={[0, 25, 50, 75, 100]}
                />
                <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}} />
                <Bar dataKey="confirmed" fill="var(--color-confirmed)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="canceled" fill="var(--color-canceled)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Most Booked */}
        <div className="xl:col-span-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 flex flex-col transition-all duration-300">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Most Booked</h3>
            <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>
          <div className="flex flex-1 items-center gap-6">
            <div className="relative w-32 h-32 flex-shrink-0">
               <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={bookedData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={60}
                    cornerRadius={8}
                    paddingAngle={4}
                    dataKey="value"
                    stroke="none"
                    startAngle={90}
                    endAngle={-270}
                  >
                    {bookedData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-10 h-10 rounded-full border border-gray-100 dark:border-gray-800 flex items-center justify-center text-[#1c64f2] dark:text-blue-400">
                  <Home className="h-5 w-5" />
                </div>
              </div>
            </div>
            <div className="flex-1 space-y-2.5">
               {bookedData.map((item, index) => (
                 <div key={index} className="flex items-center justify-between">
                   <div className="flex items-center gap-2 text-[10px]">
                     <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: item.fill }}></div>
                     <span className="font-medium text-gray-600 dark:text-gray-300">{item.name}</span>
                   </div>
                   <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">{item.value} Booked</span>
                 </div>
               ))}
            </div>
          </div>
        </div>

      </div>

      {/* Reservation Table */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 flex-1 flex flex-col overflow-hidden transition-all duration-300">
        <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="font-semibold text-gray-900 dark:text-white">Reservation</h3>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
              <input 
                type="text" 
                placeholder="Search guest, status, etc" 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border-none rounded-full text-xs font-medium w-64 outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-gray-700 text-gray-900 dark:text-white transition-all"
              />
            </div>
            <select 
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="text-xs bg-gray-50 hover:bg-gray-100 border border-gray-100 dark:border-gray-800 rounded-full px-4 py-2 font-semibold text-gray-750 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 outline-none cursor-pointer transition-colors"
            >
              <option value="All Status">All Status</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Canceled">Canceled</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-gray-800/40 text-[10px] text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-800">
                <th className="px-5 py-3 font-semibold uppercase tracking-wider">Booking ID & Guest Name ↕</th>
                <th className="px-5 py-3 font-semibold uppercase tracking-wider">Room Type ↕</th>
                <th className="px-5 py-3 font-semibold uppercase tracking-wider">Room ↕</th>
                <th className="px-5 py-3 font-semibold uppercase tracking-wider">Request ↕</th>
                <th className="px-5 py-3 font-semibold uppercase tracking-wider">Duration ↕</th>
                <th className="px-5 py-3 font-semibold uppercase tracking-wider">Check-In & Check-Out ↕</th>
                <th className="px-5 py-3 font-semibold uppercase tracking-wider">Status ↕</th>
                <th className="px-5 py-3 font-semibold uppercase tracking-wider">Source ↕</th>
                <th className="px-5 py-3 font-semibold uppercase tracking-wider">Payment ↕</th>
                <th className="px-5 py-3 font-semibold uppercase tracking-wider text-right">Action ↕</th>
              </tr>
            </thead>
            <tbody className="text-xs text-gray-700 dark:text-gray-300">
              {filteredReservations.map((res, idx) => (
                <tr key={idx} className="border-b border-gray-50 dark:border-gray-850 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                  <td className="px-5 py-4">
                    <div className="font-bold text-gray-800 dark:text-white mb-0.5">{res.id}</div>
                    <div className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">{res.name}</div>
                  </td>
                  <td className="px-5 py-4 font-medium text-gray-700 dark:text-gray-200">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-700 dark:bg-gray-600"></div>
                      {res.type}
                    </div>
                  </td>
                  <td className="px-5 py-4 font-medium text-gray-600 dark:text-gray-400">{res.room}</td>
                  <td className="px-5 py-4 font-medium text-gray-600 dark:text-gray-400">{res.request}</td>
                  <td className="px-5 py-4 font-medium text-gray-600 dark:text-gray-400">{res.duration}</td>
                  <td className="px-5 py-4 font-medium text-gray-600 dark:text-gray-400">{res.dates}</td>
                  <td className="px-5 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${getStatusStyles(res.status)}`}>
                      {res.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-medium text-gray-600 dark:text-gray-400">{res.source}</td>
                  <td className="px-5 py-4 font-medium">
                    <div className="flex items-center gap-2">
                       <div className={`w-1.5 h-1.5 rounded-full ${res.payment === 'Paid' ? 'bg-[#1c64f2] dark:bg-blue-500' : 'bg-[#e02424] dark:bg-red-500'}`}></div>
                       <span className="text-gray-700 dark:text-gray-300">{res.payment}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                       <button className="p-1.5 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-800">
                         <Eye className="h-4 w-4" />
                       </button>
                       <button className="p-1.5 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-800">
                         <Edit2 className="h-4 w-4" />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

