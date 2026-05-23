import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const orders = [
  { room: '101', floor: '1st', type: 'Standard Room', status: 'Cleaning in Progress', priority: 'High', reservation: 'Reserved', staff: 'Amelia Reyes', note: 'Urgent prep for new check-in' },
  { room: '102', floor: '1st', type: 'Superior Room', status: 'Completed', priority: 'Normal', reservation: 'Occupied', staff: 'Leo Tan', note: 'Fresh towels and toiletries replaced' },
  { room: '103', floor: '1st', type: 'Deluxe Suite', status: 'Pending', priority: 'High', reservation: 'Reserved', staff: 'Grace Miller', note: 'VIP guest arriving this afternoon' },
  { room: '104', floor: '1st', type: 'Standard Room', status: 'Cleaning in Progress', priority: 'Low', reservation: 'Available', staff: 'Kevin Park', note: 'Regular turnover' },
  { room: '201', floor: '2nd', type: 'Executive Suite', status: 'Completed', priority: 'Normal', reservation: 'Occupied', staff: 'Maria Lopez', note: 'Room sanitized, minibar restocked' },
  { room: '202', floor: '2nd', type: 'Superior Room', status: 'Pending', priority: 'Low', reservation: 'Reserved', staff: 'Daniel Cruz', note: 'Requires maintenance follow-up' },
  { room: '203', floor: '2nd', type: 'Superior Room', status: 'Cleaning in Progress', priority: 'High', reservation: 'Available', staff: 'Hannah Smith', note: 'Deep cleaning required post family checkout' },
  { room: '204', floor: '2nd', type: 'Deluxe Suite', status: 'Completed', priority: 'Low', reservation: 'Available', staff: 'Oliver Green', note: 'Routine daily cleaning done' },
  { room: '301', floor: '3rd', type: 'Executive Suite', status: 'Pending', priority: 'Normal', reservation: 'Occupied', staff: 'Clara Lee', note: 'Awaiting linen delivery' },
  { room: '302', floor: '3rd', type: 'Superior Room', status: 'Completed', priority: 'Normal', reservation: 'Available', staff: 'Jacob Flores', note: 'Inspection scheduled tomorrow' },
  { room: '304', floor: '3rd', type: 'Standard Room', status: 'Cleaning in Progress', priority: 'Low', reservation: 'Reserved', staff: 'Mia Johnson', note: 'Quick clean before evening check-in' },
  { room: '305', floor: '3rd', type: 'Deluxe Suite', status: 'Completed', priority: 'High', reservation: 'Occupied', staff: 'Ethan Wong', note: 'Guest requested additional pillows' },
];

export function Housekeeping() {
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [floorFilter, setFloorFilter] = useState('All');

  const [statusOpen, setStatusOpen] = useState(false);
  const [priorityOpen, setPriorityOpen] = useState(false);
  const [floorOpen, setFloorOpen] = useState(false);

  const statusRef = useRef<HTMLDivElement>(null);
  const priorityRef = useRef<HTMLDivElement>(null);
  const floorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (statusRef.current && !statusRef.current.contains(event.target as Node)) {
        setStatusOpen(false);
      }
      if (priorityRef.current && !priorityRef.current.contains(event.target as Node)) {
        setPriorityOpen(false);
      }
      if (floorRef.current && !floorRef.current.contains(event.target as Node)) {
        setFloorOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Cleaning in Progress':
        return 'bg-white text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700';
      case 'Completed':
        return 'bg-[#f7fae1] text-gray-800 border-[#f2f8cd] dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30';
      case 'Pending':
        return 'bg-[#ffe5e5] text-gray-800 border-[#ffd6d6] dark:bg-red-500/20 dark:text-red-400 dark:border-red-500/30';
      default:
        return 'bg-white text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700';
    }
  };

  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case 'High':
        return { bg: 'bg-[#ffe5e5] dark:bg-red-500/20 text-[#e02424] dark:text-red-400', dot: 'bg-[#e02424] dark:bg-red-400' };
      case 'Normal':
        return { bg: 'bg-[#f7fae1] dark:bg-blue-500/20 text-[#b4c91a] dark:text-blue-400', dot: 'bg-[#b4c91a] dark:bg-blue-400' };
      case 'Low':
        return { bg: 'bg-[#edf5ff] dark:bg-gray-800 text-[#1c64f2] dark:text-gray-400', dot: 'bg-[#1c64f2] dark:bg-gray-500' };
      default:
        return { bg: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400', dot: 'bg-gray-400' };
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    const matchesPriority = priorityFilter === 'All' || order.priority === priorityFilter;
    const matchesFloor = floorFilter === 'All' || order.floor === floorFilter;
    return matchesStatus && matchesPriority && matchesFloor;
  });

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-888 dark:border-gray-800 p-6 xl:p-8 flex flex-col w-full min-h-[700px] transition-colors duration-300">
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">List Orders</h2>
        
        <div className="flex items-center gap-3">
          
          {/* Status Dropdown */}
          <div className="relative" ref={statusRef}>
            <button 
              onClick={() => setStatusOpen(!statusOpen)}
              className="bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-2 border border-gray-100 dark:border-gray-850 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 transition-colors cursor-pointer select-none"
            >
              <span>{statusFilter === 'All' ? 'All Status' : statusFilter}</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {statusOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-lg z-50 py-1 overflow-hidden transition-all animate-slide-down">
                {['All', 'Cleaning in Progress', 'Completed', 'Pending'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setStatusFilter(opt);
                      setStatusOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs font-semibold transition-colors cursor-pointer block ${
                      statusFilter === opt 
                        ? 'bg-blue-50/60 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400' 
                        : 'text-gray-700 dark:text-gray-250 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    {opt === 'All' ? 'All Status' : opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Priority Dropdown */}
          <div className="relative" ref={priorityRef}>
            <button 
              onClick={() => setPriorityOpen(!priorityOpen)}
              className="bg-[#dcf344] hover:bg-[#d4ed36] dark:bg-blue-600 dark:hover:bg-blue-700 text-gray-900 dark:text-white text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-2 transition-colors cursor-pointer select-none"
            >
              <span>{priorityFilter === 'All' ? 'Priority' : `${priorityFilter} Priority`}</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {priorityOpen && (
              <div className="absolute right-0 mt-2 w-40 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-lg z-50 py-1 overflow-hidden transition-all animate-slide-down">
                {['All', 'High', 'Normal', 'Low'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setPriorityFilter(opt);
                      setPriorityOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs font-semibold transition-colors cursor-pointer block ${
                      priorityFilter === opt 
                        ? 'bg-blue-50/60 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400' 
                        : 'text-gray-700 dark:text-gray-250 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    {opt === 'All' ? 'All Priority' : opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Floor Dropdown */}
          <div className="relative" ref={floorRef}>
            <button 
              onClick={() => setFloorOpen(!floorOpen)}
              className="bg-[#dcf344] hover:bg-[#d4ed36] dark:bg-blue-600 dark:hover:bg-blue-700 text-gray-900 dark:text-white text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-2 transition-colors cursor-pointer select-none"
            >
              <span>{floorFilter === 'All' ? 'Floor' : `${floorFilter} Floor`}</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {floorOpen && (
              <div className="absolute right-0 mt-2 w-36 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-lg z-50 py-1 overflow-hidden transition-all animate-slide-down">
                {['All', '1st', '2nd', '3rd'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setFloorFilter(opt);
                      setFloorOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs font-semibold transition-colors cursor-pointer block ${
                      floorFilter === opt 
                        ? 'bg-blue-50/60 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400' 
                        : 'text-gray-700 dark:text-gray-250 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    {opt === 'All' ? 'All Floors' : `${opt} Floor`}
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead>
            <tr className="bg-gray-50/80 dark:bg-gray-800/40 text-xs text-gray-500 dark:text-gray-400 rounded-2xl">
              <th className="px-5 py-4 font-medium first:rounded-l-xl">Room ↕</th>
              <th className="px-5 py-4 font-medium">Floor ↕</th>
              <th className="px-5 py-4 font-medium">Room Type ↕</th>
              <th className="px-5 py-4 font-medium">Housekeeping Status ↕</th>
              <th className="px-5 py-4 font-medium">Priority ↕</th>
              <th className="px-5 py-4 font-medium">Reservation Status ↕</th>
              <th className="px-5 py-4 font-medium">Assigned Staff ↕</th>
              <th className="px-5 py-4 font-medium last:rounded-r-xl">Notes ↕</th>
            </tr>
          </thead>
          <tbody className="text-[13px] text-gray-700 dark:text-gray-300">
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-8 text-gray-400 dark:text-gray-500 font-semibold">
                  No orders found matching the selected filters.
                </td>
              </tr>
            ) : (
              filteredOrders.map((order, index) => {
                const priorityStyles = getPriorityStyles(order.priority);
                
                return (
                  <tr key={index} className="border-b border-gray-100 dark:border-gray-800/60 hover:bg-gray-50/30 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="px-5 py-3.5 font-semibold text-gray-900 dark:text-white">{order.room}</td>
                    <td className="px-5 py-3.5 font-medium">{order.floor}</td>
                    <td className="px-5 py-3.5 font-medium whitespace-nowrap">
                      <div className="flex items-center gap-2">
                         <div className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-gray-600"></div>
                         {order.type}
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <button className={`px-3 py-1.5 rounded-full text-[11px] font-semibold border flex items-center gap-1.5 whitespace-nowrap ${getStatusStyles(order.status)}`}>
                        {order.status} <ChevronDown className="h-3 w-3 text-gray-400 dark:text-gray-500" />
                      </button>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className={`px-3 py-1.5 rounded-full text-[11px] font-semibold inline-flex items-center gap-1.5 w-fit ${priorityStyles.bg}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${priorityStyles.dot}`}></div>
                        {order.priority} <ChevronDown className="h-3 w-3 opacity-50" />
                      </div>
                    </td>
                    <td className="px-5 py-3.5 font-medium">{order.reservation}</td>
                    <td className="px-5 py-3.5 font-medium whitespace-nowrap">{order.staff}</td>
                    <td className="px-5 py-3.5 text-gray-500 dark:text-gray-400 min-w-[200px]">{order.note}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-down {
          animation: slideDown 0.15s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />
    </div>
  );
}
