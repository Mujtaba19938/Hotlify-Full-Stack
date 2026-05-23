import React, { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';

const events = [
  {
    id: 1,
    date: 10,
    time: '08:00 AM',
    title: 'Front Desk Morning Shift',
    type: 'staff',
    details: {
      location: 'Main Reception Desk - Lobby',
      description: 'Handoff from night auditor, review guest occupancy list, coordinate early VIP arrivals.'
    }
  },
  {
    id: 2,
    date: 10,
    time: '03:30 PM',
    title: 'Air Conditioning Check',
    type: 'guest',
    details: {
      location: 'Room 104 & 106 - Ground Floor',
      description: 'Routine diagnostic check on HVAC units following guest comfort inquiry.'
    }
  },
  {
    id: 3,
    date: 11,
    time: '10:00 AM',
    title: 'Corporate Meeting:\nTechVision Ltd.',
    type: 'maintenance',
    details: {
      location: 'Grand Ballroom - East Wing',
      description: 'Technical rehearsal and audiovisual setup check for TechVision Tech Summit.'
    }
  },
  {
    id: 4,
    date: 12,
    time: '08:30 AM',
    title: 'Housekeeping\nBriefing',
    type: 'staff',
    details: {
      location: 'Meeting Room B - Ground Floor',
      description: 'Discuss upcoming occupancy surge, deep-cleaning priorities, and restock supply checklist.'
    }
  },
  {
    id: 5,
    date: 12,
    time: '02:00 PM',
    title: 'Room Inspection:\nVIP Guest',
    type: 'maintenance',
    details: {
      location: 'Room 210 - Deluxe Suite',
      description: 'Pre-arrival check for executive guest; ensure welcome amenities are in place and minibar is stocked.'
    }
  },
  {
    id: 6,
    date: 14,
    time: '05:00 PM',
    title: 'Evening Shift Training',
    type: 'guest',
    details: {
      location: 'Training Lab - Basement Floor',
      description: 'Customer service workshop and guest relationship system walkthrough for newly onboarded staff.'
    }
  },
  {
    id: 7,
    date: 15,
    time: '11:30 AM',
    title: 'Restaurant Shift\nChange',
    type: 'guest',
    details: {
      location: 'La Trattoria Kitchen & Dining Area',
      description: 'Shift transition briefing, food safety protocol review, and evening specials inventory.'
    }
  },
  {
    id: 8,
    date: 15,
    time: '06:00 PM',
    title: 'Late Check-Out\nCoordination',
    type: 'maintenance',
    details: {
      location: 'Executive Suite Floor',
      description: 'Cleaning schedule adjustment to accommodate VIP late check-outs.'
    }
  },
  {
    id: 9,
    date: 16,
    time: '09:00 AM',
    title: 'Elevator Inspection',
    type: 'staff',
    details: {
      location: 'Elevator Shaft A & B',
      description: 'Biannual safety certification and weight-load system performance validation.'
    }
  },
  {
    id: 10,
    date: 17,
    time: '02:30 PM',
    title: 'Monthly Staff Meeting',
    type: 'guest',
    details: {
      location: 'Conference Hall - 2nd Floor',
      description: 'Review guest satisfaction scores, target KPIs for Q3, and present Employee of the Month award.'
    }
  },
  {
    id: 11,
    date: 18,
    time: '04:00 PM',
    title: 'Pre-Event Setup\nReview',
    type: 'maintenance',
    details: {
      location: 'Poolside Garden & Terrace',
      description: 'Logistics coordination and layout verification for the upcoming weekend gala dinner.'
    }
  }
];

const getEventStyles = (type: string) => {
  switch(type) {
    case 'staff':
      return 'bg-[#edf5ff] dark:bg-blue-950/40 border-l-2 border-[#1c64f2] dark:border-blue-500 text-[#1c64f2] dark:text-blue-300'; // blue
    case 'guest':
      return 'bg-[#fdfade] dark:bg-purple-950/40 border-l-2 border-[#dcf344] dark:border-purple-500 text-gray-800 dark:text-purple-300'; // yellow (light) / purple (dark)
    case 'maintenance':
      return 'bg-[#ffe5e5] dark:bg-red-950/40 border-l-2 border-[#e02424] dark:border-red-500 text-[#e02424] dark:text-red-300'; // red
    default:
      return 'bg-gray-100 dark:bg-gray-800 border-l-2 border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300';
  }
};

const getEventDetailStyles = (type: string) => {
   switch(type) {
    case 'staff':
      return 'bg-[#edf5ff] dark:bg-blue-950/40 border-l-[#1c64f2] dark:border-l-blue-500 text-[#1c64f2] dark:text-blue-400'; // blue
    case 'guest':
      return 'bg-[#fdfade] dark:bg-purple-950/40 border-l-[#dcf344] dark:border-l-purple-500 text-[#8b9b1e] dark:text-purple-400'; // yellow (light) / purple (dark)
    case 'maintenance':
      return 'bg-[#ffe5e5] dark:bg-red-950/40 border-l-[#e02424] dark:border-l-red-500 text-[#e02424] dark:text-red-400'; // red
    default:
      return 'bg-gray-100 dark:bg-gray-800 border-l-gray-400 dark:border-l-gray-600 text-gray-700 dark:text-gray-400';
  }
}

const getCategoryColor = (type: string) => {
  switch(type) {
    case 'staff': return '#1c64f2';
    case 'guest': return '#dcf344';
    case 'maintenance': return '#e02424';
    default: return '#9ca3af';
  }
}

export function Calendar() {
  const [eventList, setEventList] = useState(events);
  const [selectedDay, setSelectedDay] = useState<number | null>(12);
  const [showDetails, setShowDetails] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form fields state
  const [title, setTitle] = useState('');
  const [type, setType] = useState('staff');
  const [dateVal, setDateVal] = useState(12);
  const [timeVal, setTimeVal] = useState('09:00 AM');
  const [locationVal, setLocationVal] = useState('');
  const [descriptionVal, setDescriptionVal] = useState('');
  const [formError, setFormError] = useState('');

  // Dynamic schedule overview counts
  const totalSchedules = eventList.length;
  const staffSchedules = eventList.filter(e => e.type === 'staff').length;
  const guestSchedules = eventList.filter(e => e.type === 'guest').length;
  const maintenanceSchedules = eventList.filter(e => e.type === 'maintenance').length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setFormError('Please enter a schedule title.');
      return;
    }
    if (!timeVal.trim()) {
      setFormError('Please enter a time.');
      return;
    }

    const newEvent = {
      id: Date.now(),
      date: Number(dateVal),
      time: timeVal.trim(),
      title: title.trim(),
      type: type,
      details: {
        location: locationVal.trim() || 'Not specified',
        description: descriptionVal.trim() || 'No description provided.'
      }
    };

    setEventList(prev => [...prev, newEvent]);
    setSelectedDay(Number(dateVal));
    setShowDetails(true);

    // Reset Form
    setTitle('');
    setType('staff');
    setDateVal(12);
    setTimeVal('09:00 AM');
    setLocationVal('');
    setDescriptionVal('');
    setFormError('');
    setIsModalOpen(false);
  };

  // Generate calendar days for March 2035 visually based on mockup
  const generateDays = () => {
    const days = [];
    const prevMonthDays = [29, 30, 31];
    prevMonthDays.forEach(d => days.push({ date: d, isCurrentMonth: false }));
    
    for (let i = 1; i <= 31; i++) {
      days.push({ date: i, isCurrentMonth: true });
    }
    
    // Add 1 more to complete the 35 day grid (5 weeks) -> 3 + 31 = 34. Add 1.
    days.push({ date: 1, isCurrentMonth: false });
    return days;
  };

  const calendarDays = generateDays();

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-6 flex gap-6 w-full min-h-[700px] h-[calc(100vh-100px)] relative transition-all duration-300">
      
      {/* Left Sidebar */}
      <div className="w-[200px] flex-shrink-0 flex flex-col pr-2 border-r border-gray-100 dark:border-gray-850">
        <h3 className="font-bold text-gray-900 dark:text-white mb-5 transition-colors">Schedule Overview</h3>
        
        <div className="space-y-4 mb-8">
          <div className="flex justify-between items-center text-[13px]">
            <span className="text-gray-500 dark:text-gray-400 font-medium">Total All Schedules</span>
            <span className="font-semibold text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-md text-xs">{totalSchedules}</span>
          </div>
          <div className="flex justify-between items-center text-[13px]">
            <span className="text-gray-500 dark:text-gray-400 font-medium">Staff Schedule</span>
            <span className="font-semibold text-[#1c64f2] dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded-md text-xs">{staffSchedules}</span>
          </div>
          <div className="flex justify-between items-center text-[13px]">
            <span className="text-gray-500 dark:text-gray-400 font-medium">Guest Appointment</span>
            <span className="font-semibold text-[#8b9b1e] dark:text-purple-400 bg-yellow-50 dark:bg-purple-950/40 px-2 py-0.5 rounded-md text-xs">{guestSchedules}</span>
          </div>
          <div className="flex justify-between items-center text-[13px]">
            <span className="text-gray-500 dark:text-gray-400 font-medium">Maintenance Task</span>
            <span className="font-semibold text-[#e02424] dark:text-red-400 bg-red-50 dark:bg-red-950/40 px-2 py-0.5 rounded-md text-xs">{maintenanceSchedules}</span>
          </div>
        </div>

        <h3 className="font-semibold text-gray-500 dark:text-gray-400 text-sm mb-4">Categories</h3>
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <div className="relative flex items-center justify-center">
              <input type="radio" name="category" className="peer sr-only" defaultChecked />
              <div className="w-4 h-4 rounded-full border border-[#1c64f2] dark:border-blue-500 peer-checked:opacity-100"></div>
              <div className="w-2 h-2 rounded-full bg-[#1c64f2] dark:bg-blue-500 absolute opacity-100"></div>
            </div>
            <span className="text-[13px] font-medium text-gray-600 dark:text-gray-300">Staff Schedule</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <div className="relative flex items-center justify-center">
              <input type="radio" name="category" className="peer sr-only" />
              <div className="w-4 h-4 rounded-full border-[#dcf344] dark:border-purple-500 border peer-checked:opacity-100"></div>
              <div className="w-2 h-2 rounded-full bg-[#dcf344] dark:bg-purple-500 absolute opacity-100"></div>
            </div>
            <span className="text-[13px] font-medium text-gray-600 dark:text-gray-300">Guest Appointment</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <div className="relative flex items-center justify-center">
              <input type="radio" name="category" className="peer sr-only" />
              <div className="w-4 h-4 rounded-full border-[#e02424] dark:border-red-500 border peer-checked:opacity-100"></div>
              <div className="w-2 h-2 rounded-full bg-[#e02424] dark:bg-red-500 absolute opacity-100"></div>
            </div>
            <span className="text-[13px] font-medium text-gray-600 dark:text-gray-300">Maintenance Task</span>
          </label>
        </div>
      </div>

      {/* Main Calendar Area */}
      <div className="flex-1 flex flex-col bg-gray-50/30 dark:bg-gray-900/40 rounded-2xl border border-gray-100/50 dark:border-gray-800/50 p-6 relative">
        
        {/* Header Controls */}
        <div className="flex justify-between items-center mb-6">
          <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-full flex gap-1">
            <button className="px-5 py-1.5 rounded-full text-xs font-bold bg-[#dcf344] dark:bg-blue-600 text-gray-900 dark:text-white shadow-sm">Month</button>
            <button className="px-5 py-1.5 rounded-full text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Week</button>
            <button className="px-5 py-1.5 rounded-full text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Day</button>
          </div>

          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-gray-900 dark:text-white cursor-pointer flex items-center gap-1.5 pr-4">
              March, 2035 <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-2 transition-colors">
              All Category <ChevronDown className="h-3.5 w-3.5" />
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-[#dcf344] dark:bg-blue-600 hover:bg-[#d4ed36] dark:hover:bg-blue-700 text-gray-900 dark:text-white text-xs font-bold px-5 py-2 rounded-full transition-colors shadow-sm cursor-pointer"
            >
              Add new
            </button>
          </div>
        </div>

        {/* Days of Week Header */}
        <div className="grid grid-cols-7 border-b border-gray-100 dark:border-gray-800 pb-3 mb-2">
          {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
            <div key={day} className="text-[13px] font-medium text-gray-500 dark:text-gray-400 text-center">{day}</div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 grid-rows-5 flex-1 border-t border-l border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          {calendarDays.map((dayObj, index) => {
            const dayEvents = dayObj.isCurrentMonth ? eventList.filter(e => e.date === dayObj.date) : [];
            const isSelected = dayObj.isCurrentMonth && dayObj.date === selectedDay && showDetails;
            
            const colIndex = index % 7;
            const rowIndex = Math.floor(index / 7);
            const isPopoverOnLeft = colIndex >= 4;
            const isPopoverOnTop = rowIndex >= 3;

            const popoverPositionClass = [
              isPopoverOnLeft ? 'right-[105%] left-auto' : 'left-[105%] right-auto',
              isPopoverOnTop ? 'bottom-0 top-auto' : 'top-0 bottom-auto'
            ].join(' ');
            
            return (
              <div 
                key={index} 
                className={`border-r border-b border-gray-100 dark:border-gray-800 flex flex-col p-2 min-h-[100px] relative transition-all duration-200 ${
                  !dayObj.isCurrentMonth 
                    ? 'bg-gray-50/50 dark:bg-gray-950/20 striped-bg' 
                    : 'cursor-pointer hover:bg-gray-50/50 dark:hover:bg-gray-800/50'
                } ${
                  isSelected 
                    ? 'ring-2 ring-[#1c64f2] dark:ring-blue-500 ring-inset bg-blue-50/10 dark:bg-blue-950/10 z-20 shadow-sm' 
                    : ''
                }`}
                onClick={() => {
                  if (dayObj.isCurrentMonth) {
                    if (selectedDay === dayObj.date) {
                      setShowDetails(!showDetails);
                    } else {
                      setSelectedDay(dayObj.date);
                      setShowDetails(true);
                    }
                  }
                }}
              >
                <div className={`text-[13px] font-medium mb-1.5 transition-colors ${
                  !dayObj.isCurrentMonth 
                    ? 'text-gray-400 dark:text-gray-600' 
                    : isSelected 
                      ? 'text-[#1c64f2] dark:text-blue-400 font-bold' 
                      : 'text-gray-800 dark:text-gray-300'
                }`}>
                  {dayObj.date}
                </div>
                
                <div className="flex flex-col gap-1.5 flex-1 relative z-10">
                  {dayEvents.map(event => (
                    <div 
                      key={event.id}
                      className={`text-[9px] px-2 py-1.5 rounded-sm line-clamp-3 leading-tight font-medium cursor-pointer ${getEventStyles(event.type)}`}
                    >
                      <div className="font-semibold mb-0.5 opacity-80">{event.time}</div>
                      <div className="whitespace-pre-line">{event.title}</div>
                    </div>
                  ))}
                </div>

                {/* Popover detailed events */}
                {isSelected && (
                  <div 
                    onClick={(e) => e.stopPropagation()}
                    className={`absolute z-50 w-72 bg-white dark:bg-gray-900 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col ${popoverPositionClass}`}
                  >
                    <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-white dark:bg-gray-900">
                      <h4 className="font-bold text-gray-900 dark:text-white text-sm">Schedule Details</h4>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setShowDetails(false); }} 
                        className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-full"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="p-4 flex flex-col gap-4 bg-white dark:bg-gray-900 max-h-[350px] overflow-y-auto">
                      {dayEvents.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-8 text-center px-4">
                          <div className="w-12 h-12 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center mb-3">
                            <span className="text-gray-400 dark:text-gray-500 text-lg">📅</span>
                          </div>
                          <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">No Schedules Planned</p>
                          <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1 max-w-[180px]">There are no events or tasks scheduled for this day.</p>
                        </div>
                      ) : (
                        dayEvents.map(event => (
                          <div key={event.id} className={`p-4 rounded-xl border-l-2 ${getEventDetailStyles(event.type)}`}>
                            <span className="text-[10px] font-bold opacity-70 mb-1 block">{event.time}</span>
                            <h5 className="font-bold text-gray-900 dark:text-white text-xs mb-1 whitespace-pre-line">{event.title.replace('\n', ' ')}</h5>
                            <p className="text-[10px] text-gray-600 dark:text-gray-300 font-medium mb-1.5">{event.details?.location}</p>
                            <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-relaxed font-medium">{event.details?.description}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Add New Event Modal */}
      {isModalOpen && (
        <div 
          onClick={() => { setIsModalOpen(false); setFormError(''); }} 
          className="fixed inset-0 bg-black/45 dark:bg-black/60 backdrop-blur-[2px] z-[999] flex items-center justify-center p-4 animate-fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="bg-white dark:bg-gray-900 rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.16)] border border-gray-100 dark:border-gray-800 max-w-md w-full overflow-hidden flex flex-col animate-slide-up"
          >
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-white dark:bg-gray-900">
              <div>
                <h3 className="font-bold text-gray-950 dark:text-white text-base">Add New Schedule</h3>
                <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">Fill in the details to plan a new calendar event.</p>
              </div>
              <button 
                onClick={() => { setIsModalOpen(false); setFormError(''); }} 
                className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1.5 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-full"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4 bg-white dark:bg-gray-900 overflow-y-auto max-h-[500px]">
              {formError && (
                <div className="bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-xs py-2.5 px-3 rounded-xl font-semibold border border-red-100/50 dark:border-red-900/50">
                  {formError}
                </div>
              )}

              {/* Title Field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-600 dark:text-gray-400">Schedule Title *</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Front Desk Morning Shift"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1c64f2] dark:focus:border-blue-500 transition-all font-medium text-gray-800 dark:text-white"
                />
              </div>

              {/* Category selector */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-600 dark:text-gray-400">Category *</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setType('staff')}
                    className={`py-2 px-3 text-xs rounded-xl border font-bold transition-all text-center flex flex-col items-center gap-1.5 ${
                      type === 'staff' 
                        ? 'border-[#1c64f2] bg-[#edf5ff] dark:bg-blue-950/40 text-[#1c64f2] dark:text-blue-400 shadow-sm' 
                        : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1c64f2]"></span>
                    <span>Staff</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setType('guest')}
                    className={`py-2 px-3 text-xs rounded-xl border font-bold transition-all text-center flex flex-col items-center gap-1.5 ${
                      type === 'guest' 
                        ? 'border-purple-500 bg-[#fdfade] dark:bg-purple-950/40 text-gray-850 dark:text-purple-300 shadow-sm' 
                        : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                    <span>Guest</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setType('maintenance')}
                    className={`py-2 px-3 text-xs rounded-xl border font-bold transition-all text-center flex flex-col items-center gap-1.5 ${
                      type === 'maintenance' 
                        ? 'border-[#e02424] bg-[#ffe5e5] dark:bg-red-950/40 text-[#e02424] dark:text-red-400 shadow-sm' 
                        : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-[#e02424]"></span>
                    <span>Maintenance</span>
                  </button>
                </div>
              </div>

              {/* Date (Day Number) and Time Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-600 dark:text-gray-400">Day in March 2035 *</label>
                  <select 
                    value={dateVal}
                    onChange={(e) => setDateVal(Number(e.target.value))}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1c64f2] dark:focus:border-blue-500 transition-all font-medium text-gray-800 dark:text-white"
                  >
                    {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                      <option key={day} value={day}>March {day}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-600 dark:text-gray-400">Time *</label>
                  <input 
                    type="text" 
                    value={timeVal}
                    onChange={(e) => setTimeVal(e.target.value)}
                    placeholder="e.g. 08:30 AM"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1c64f2] dark:focus:border-blue-500 transition-all font-medium text-gray-800 dark:text-white"
                  />
                </div>
              </div>

              {/* Location Field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-600 dark:text-gray-400">Location</label>
                <input 
                  type="text" 
                  value={locationVal}
                  onChange={(e) => setLocationVal(e.target.value)}
                  placeholder="e.g. Room 210 - Deluxe Suite"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1c64f2] dark:focus:border-blue-500 transition-all font-medium text-gray-800 dark:text-white"
                />
              </div>

              {/* Description Field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-600 dark:text-gray-400">Description</label>
                <textarea 
                  value={descriptionVal}
                  onChange={(e) => setDescriptionVal(e.target.value)}
                  placeholder="e.g. Pre-arrival check for executive guest; ensure amenities are ready..."
                  rows={3}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1c64f2] dark:focus:border-blue-500 transition-all font-medium text-gray-800 dark:text-white resize-none"
                />
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
                <button
                  type="button"
                  onClick={() => { setIsModalOpen(false); setFormError(''); }}
                  className="px-5 py-2.5 rounded-full text-xs font-bold bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full text-xs font-bold bg-[#dcf344] dark:bg-blue-600 hover:bg-[#d4ed36] dark:hover:bg-blue-700 text-gray-900 dark:text-white transition-colors shadow-sm cursor-pointer"
                >
                  Save Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      <style dangerouslySetInnerHTML={{__html: `
        .striped-bg {
          background-image: repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 10px,
            #f9fafb 10px,
            #f9fafb 20px
          );
        }
        .dark .striped-bg {
          background-image: repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 10px,
            #0a0f1d 10px,
            #0a0f1d 20px
          );
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(16px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out forwards;
        }
        .animate-slide-up {
          animation: slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />
    </div>
  );
}
