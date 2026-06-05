import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { API_BASE_URL } from '../config/api';

export function BookingList() {
  const [bookingList, setBookingList] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/getBookings`);
        const data = await res.json();
        if (data.bookings) {
          const mapped = data.bookings.map((booking: any) => {
            const start = booking.checkInDate ? new Date(booking.checkInDate) : new Date();
            const end = booking.checkOutDate ? new Date(booking.checkOutDate) : new Date();
            const nights = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
            
            const opt = { month: 'short', day: 'numeric' } as const;
            const datesStr = `${start.toLocaleDateString('en-US', opt)} - ${end.toLocaleDateString('en-US', opt)}, ${end.getFullYear()}`;

            let displayStatus = 'Pending';
            if (booking.status === 'checked-in') displayStatus = 'Checked-In';
            else if (booking.status === 'reserved') displayStatus = 'Reserved';
            else if (booking.status === 'checked-out') displayStatus = 'Checked-Out';

            return {
              id: `#BKG-${booking._id.substring(booking._id.length - 4).toUpperCase()}`,
              name: booking.guestName,
              roomType: booking.room?.roomType || 'Standard Room',
              roomNo: booking.room?.roomNumber ? String(booking.room.roomNumber) : '101',
              duration: `${nights} Night${nights > 1 ? 's' : ''}`,
              dates: datesStr,
              status: displayStatus
            };
          });
          setBookingList(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const filteredBookings = bookingList.filter((booking) => {
    const matchesSearch = booking.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          booking.roomNo.includes(searchTerm);
    const matchesStatus = statusFilter === 'All Status' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-700 p-8 text-center text-gray-500 font-semibold mb-6 animate-pulse">
        Loading active bookings...
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden mb-6 transition-all duration-300">
      <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="font-semibold text-gray-900 dark:text-white text-lg">Booking List</h3>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search guest, status, etc" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-1.5 bg-gray-50 dark:bg-gray-800 border-none rounded-full text-xs font-medium w-48 outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 dark:text-white transition-colors"
            />
          </div>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs bg-gray-50 dark:bg-gray-800 border-none rounded-full px-4 py-1.5 font-medium outline-none text-gray-700 dark:text-gray-300 transition-colors cursor-pointer"
          >
            <option value="All Status">All Status</option>
            <option value="Checked-In">Checked-In</option>
            <option value="Pending">Pending</option>
            <option value="Reserved">Reserved</option>
            <option value="Checked-Out">Checked-Out</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 dark:bg-gray-800/40 text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700">
              <th className="px-6 py-4 font-semibold">Booking ID & Guest Name ↕</th>
              <th className="px-6 py-4 font-semibold">Room Type ↕</th>
              <th className="px-6 py-4 font-semibold">Room No. ↕</th>
              <th className="px-6 py-4 font-semibold">Duration ↕</th>
              <th className="px-6 py-4 font-semibold">Check-In & Check-Out ↕</th>
              <th className="px-6 py-4 font-semibold">Status ↕</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {filteredBookings.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-500 font-medium">
                  No bookings found
                </td>
              </tr>
            ) : (
              filteredBookings.map((booking) => (
                <tr key={booking.id} className="border-b border-gray-50 dark:border-gray-700 hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors last:border-none">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900 dark:text-white text-xs">{booking.id}</div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs">{booking.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-700 dark:bg-gray-400"></div>
                      <span className="text-gray-700 dark:text-gray-300 text-xs font-medium">{booking.roomType}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300 text-xs">{booking.roomNo}</td>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300 text-xs">{booking.duration}</td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-400 text-xs">{booking.dates}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-semibold flex inline-flex items-center justify-center w-24
                      ${booking.status === 'Checked-In' ? 'bg-[#dcf344] text-gray-900 border border-[#d4ed36] dark:bg-yellow-500/10 dark:text-yellow-400 dark:border-yellow-900/30' : ''}
                      ${booking.status === 'Pending' ? 'bg-[#ffe5e5] text-[#e02424] border border-[#ffb3b3] dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/30' : ''}
                      ${booking.status === 'Reserved' ? 'bg-[#edf5ff] text-[#1c64f2] border border-[#d6e7ff] dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900/30' : ''}
                      ${booking.status === 'Checked-Out' ? 'bg-gray-100 text-gray-700 border border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700' : ''}
                    `}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
