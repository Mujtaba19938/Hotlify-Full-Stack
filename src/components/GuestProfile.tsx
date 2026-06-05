import React, { useState, useEffect } from 'react';
import { MoreHorizontal, Search, Award, Calendar, Tag, Clock, CheckCircle2, ChevronRight, Star, X } from 'lucide-react';
import { API_BASE_URL } from '../config/api';

export function GuestProfile() {
  // Profile state for full interactivity
  const [profile, setProfile] = useState({
    name: 'Ethan Brown',
    gender: 'Male',
    nationality: 'Canadian',
    dob: 'July 19, 1995',
    phone: '+1 647-880-2356',
    email: 'ethan.brown@example.com',
    address: 'Toronto, Canada'
  });

  const [guestNumber, setGuestNumber] = useState<number | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({ ...profile });
  const [formError, setFormError] = useState('');

  // Fetch guest on mount
  useEffect(() => {
    const fetchGuest = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/getGuests`);
        const data = await res.json();
        if (data.guests && data.guests.length > 0) {
          const guest = data.guests[0];
          const formattedDob = guest.dateOfBirth 
            ? new Date(guest.dateOfBirth).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
            : 'July 19, 1995';

          const mapped = {
            name: `${guest.firstName} ${guest.lastName || ''}`.trim(),
            gender: guest.gender || 'Male',
            nationality: guest.nationality || 'Canadian',
            dob: formattedDob,
            phone: guest.phone || '+1 647-880-2356',
            email: guest.email || 'ethan.brown@example.com',
            address: guest.addressLine1 || 'Toronto, Canada'
          };
          setProfile(mapped);
          setFormData(mapped);
          setGuestNumber(guest.guestNumber);
        }
      } catch (err) {
        console.error("Failed to load guests:", err);
      }
    };
    fetchGuest();
  }, []);

  const handleEditClick = () => {
    setFormData({ ...profile });
    setFormError('');
    setIsEditModalOpen(true);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setFormError('Please enter a full name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setFormError('Please enter a valid email address.');
      return;
    }
    if (!formData.phone.trim()) {
      setFormError('Please enter a phone number.');
      return;
    }

    try {
      const names = formData.name.trim().split(/\s+/);
      const firstName = names[0];
      const lastName = names.slice(1).join(' ');

      const payload = {
        guestNumber: guestNumber || 1001,
        firstName,
        lastName,
        email: formData.email,
        phone: formData.phone,
        gender: formData.gender,
        dateOfBirth: new Date(formData.dob),
        addressLine1: formData.address,
        nationality: formData.nationality,
        status: 'active'
      };

      const res = await fetch(`${API_BASE_URL}/updateguest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      
      if (data.success) {
        setProfile({ ...formData });
        setFormError('');
        setIsEditModalOpen(false);
      } else {
        setFormError(data.message || 'Could not save guest updates.');
      }
    } catch (err) {
      console.error(err);
      setFormError('Failed to save guest changes. Server connection failed.');
    }
  };

  return (
    <div className="bg-gray-50/50 dark:bg-gray-900/40 rounded-3xl border border-gray-200 dark:border-gray-800 p-6 flex flex-col xl:flex-row gap-6 w-full min-h-[700px] relative transition-all duration-300">
      
      {/* Left Column (Profile & Booking History) */}
      <div className="flex-1 min-w-0 flex flex-col gap-6">
        
        {/* Top Row: Profile Card & Gold Member/Rewards */}
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Profile Card */}
          <div className="w-full lg:w-[320px] bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 flex-shrink-0 flex flex-col items-center transition-all duration-300">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-[#1c64f2] dark:border-blue-500 p-1">
               <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=256&h=256" alt="Ethan Brown" className="w-full h-full rounded-full object-cover" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1 transition-colors">{profile.name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 transition-colors">{profile.gender} &bull; {profile.nationality}</p>
            
            <div className="w-full space-y-4 text-sm mb-6 border-t border-b border-gray-100 dark:border-gray-800 py-4 transition-all duration-300">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Date of Birth</span>
                <span className="font-medium text-gray-900 dark:text-white transition-colors">{profile.dob}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Phone Number</span>
                <span className="font-medium text-gray-900 dark:text-white transition-colors">{profile.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Email Address</span>
                <span className="font-medium text-gray-900 dark:text-white break-all pl-2 text-right transition-colors">{profile.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Address</span>
                <span className="font-medium text-gray-900 dark:text-white transition-colors">{profile.address}</span>
              </div>
            </div>
            
            <div className="w-full flex justify-between items-center text-xs mt-auto">
              <span className="text-gray-500 dark:text-gray-400">Social Media</span>
              <div className="flex gap-2 text-gray-400">
                <div className="w-6 h-6 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center hover:text-gray-900 dark:hover:text-white cursor-pointer">@</div>
                <div className="w-6 h-6 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center hover:text-gray-900 dark:hover:text-white cursor-pointer">X</div>
                <div className="w-6 h-6 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center hover:text-gray-900 dark:hover:text-white cursor-pointer">in</div>
              </div>
            </div>
          </div>

          {/* Middle Column: Membership & Rewards */}
          <div className="flex-1 min-w-0 flex flex-col gap-6">
            
            {/* Gold Member Card */}
            <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-gray-950 rounded-2xl p-6 text-white border border-indigo-500/20 relative overflow-hidden flex flex-col justify-between h-48 shadow-lg shadow-indigo-950/15">
              <div className="absolute right-0 top-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="flex justify-between items-start relative z-10">
                <div>
                  <h3 className="text-2xl font-bold mb-1">Gold Member</h3>
                  <span className="bg-indigo-500/20 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">4,520 pts</span>
                </div>
                <Award className="h-12 w-12 text-indigo-400" strokeWidth={1.5} />
              </div>
              
              <div className="relative z-10">
               <div className="flex items-center gap-3 mb-2">
                 <div className="flex-1 h-2 bg-indigo-950/60 rounded-full overflow-hidden border border-indigo-500/10">
                   <div className="w-[82%] h-full bg-indigo-500"></div>
                 </div>
                 <CheckCircle2 className="h-4 w-4 text-indigo-400" />
               </div>
               
               <div className="flex justify-between items-center text-[11px] font-medium text-white/90">
                 <p className="max-w-[70%] leading-tight">Earn 827.728 before 04 September 2037 to<br/>be our Platinum Priority</p>
                 <button 
                  onClick={handleEditClick}
                  className="group bg-indigo-600 text-white px-4 py-1.5 rounded-full font-semibold flex items-center gap-1 hover:bg-indigo-500 hover:shadow-md transition-all active:scale-95 shadow-sm cursor-pointer text-xs"
                 >
                   <span>Edit Profile</span>
                   <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={2.5} />
                 </button>
               </div>
              </div>
            </div>

            {/* Rewards */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 flex-1 transition-all duration-300">
              <div className="flex justify-between items-center mb-5">
                <h3 className="font-semibold text-gray-900 dark:text-white transition-colors">Rewards</h3>
                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-3 h-[calc(100%-2.5rem)]">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 flex flex-col justify-center items-center text-center gap-3 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-[#edf5ff] dark:bg-blue-950/40 text-[#1c64f2] dark:text-blue-400 flex items-center justify-center">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 leading-tight">Free<br/>Reschedule</span>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 flex flex-col justify-center items-center text-center gap-3 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-[#edf5ff] dark:bg-blue-950/40 text-[#1c64f2] dark:text-blue-400 flex items-center justify-center">
                    <Tag className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 leading-tight">Up to 10% Off on<br/>Direct Bookings</span>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 flex flex-col justify-center items-center text-center gap-3 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-[#edf5ff] dark:bg-blue-950/40 text-[#1c64f2] dark:text-blue-400 flex items-center justify-center">
                    <Clock className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 leading-tight">Complimentary<br/>Late Check-Out</span>
                </div>
              </div>
            </div>
            
          </div>
        </div>

        {/* Booking History */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden flex-1 flex flex-col transition-all duration-300">
          <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-colors">
            <h3 className="font-semibold text-gray-900 dark:text-white transition-colors">Booking History</h3>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search guest, status, etc" 
                  className="pl-9 pr-4 py-1.5 bg-gray-50 dark:bg-gray-800 border-none rounded-full text-xs font-medium w-48 outline-none dark:text-white focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 transition-colors"
                />
              </div>
              <select className="text-xs bg-gray-50 dark:bg-gray-800 border-none rounded-full px-4 py-1.5 font-medium outline-none text-gray-700 dark:text-gray-300 transition-colors">
                <option>All Status</option>
                <option>Completed</option>
                <option>Canceled</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-white dark:bg-gray-900 text-[11px] text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-800 transition-colors">
                  <th className="px-5 py-3 font-medium">Image ↕</th>
                  <th className="px-5 py-3 font-medium">Booking ID ↕</th>
                  <th className="px-5 py-3 font-medium">Booking Date ↕</th>
                  <th className="px-5 py-3 font-medium">Room Type ↕</th>
                  <th className="px-5 py-3 font-medium">Room ↕</th>
                  <th className="px-5 py-3 font-medium">Check-In/Out ↕</th>
                  <th className="px-5 py-3 font-medium">Duration ↕</th>
                  <th className="px-5 py-3 font-medium">Status ↕</th>
                </tr>
              </thead>
              <tbody className="text-xs">
                <tr className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-800/40 transition-colors">
                  <td className="px-5 py-3">
                    <img src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=120&h=80" alt="Room" className="w-14 h-10 object-cover rounded-md" />
                  </td>
                  <td className="px-5 py-3 font-semibold text-gray-900 dark:text-white transition-colors">#BKG-1975</td>
                  <td className="px-5 py-3 text-gray-500 dark:text-gray-400 transition-colors">
                    <div className="font-medium text-gray-900 dark:text-white transition-colors">Jan 10, 2035</div>
                    <div className="text-[10px]">9:08 AM</div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-gray-600 dark:bg-gray-400"></div>
                       <span className="font-medium text-gray-700 dark:text-gray-300 transition-colors">Deluxe Suite</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-gray-600 dark:text-gray-400 transition-colors">Room 101</td>
                  <td className="px-5 py-3 font-medium text-gray-700 dark:text-gray-300 transition-colors">Jan 12 - Jan 16,<br/>2035</td>
                  <td className="px-5 py-3 text-gray-600 dark:text-gray-400 transition-colors">4 Nights</td>
                  <td className="px-5 py-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#edf5ff] dark:bg-blue-950/40 text-[#1c64f2] dark:text-blue-400 border border-[#d6e7ff] dark:border-blue-900/50">Completed</span>
                  </td>
                </tr>
                
                <tr className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-800/40 transition-colors">
                  <td className="px-5 py-3">
                    <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=120&h=80" alt="Room" className="w-14 h-10 object-cover rounded-md" />
                  </td>
                  <td className="px-5 py-3 font-semibold text-gray-900 dark:text-white transition-colors">#BKG-1892</td>
                  <td className="px-5 py-3 text-gray-500 dark:text-gray-400 transition-colors">
                    <div className="font-medium text-gray-900 dark:text-white transition-colors">Nov 18, 2034</div>
                    <div className="text-[10px]">02:45 PM</div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-gray-600 dark:bg-gray-400"></div>
                       <span className="font-medium text-gray-700 dark:text-gray-300 transition-colors">Superior Room</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-gray-600 dark:text-gray-400 transition-colors">315</td>
                  <td className="px-5 py-3 font-medium text-gray-700 dark:text-gray-300 transition-colors">Nov 20 - Nov<br/>22, 2034</td>
                  <td className="px-5 py-3 text-gray-600 dark:text-gray-400 transition-colors">2 Nights</td>
                  <td className="px-5 py-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#edf5ff] dark:bg-blue-950/40 text-[#1c64f2] dark:text-blue-400 border border-[#d6e7ff] dark:border-blue-900/50">Completed</span>
                  </td>
                </tr>
 
                <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-800/40 transition-colors">
                  <td className="px-5 py-3">
                    <img src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=120&h=80" alt="Room" className="w-14 h-10 object-cover rounded-md" />
                  </td>
                  <td className="px-5 py-3 font-semibold text-gray-900 dark:text-white transition-colors">#BKG-1820</td>
                  <td className="px-5 py-3 text-gray-500 dark:text-gray-400 transition-colors">
                    <div className="font-medium text-gray-900 dark:text-white transition-colors">Sep 03, 2034</div>
                    <div className="text-[10px]">05:30 PM</div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-gray-600 dark:bg-gray-400"></div>
                       <span className="font-medium text-gray-700 dark:text-gray-300 transition-colors">Executive Suite</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-gray-600 dark:text-gray-400 transition-colors">211</td>
                  <td className="px-5 py-3 font-medium text-gray-700 dark:text-gray-300 transition-colors">Sep 05 - Sep 08,<br/>2034</td>
                  <td className="px-5 py-3 text-gray-600 dark:text-gray-400 transition-colors">3 Nights</td>
                  <td className="px-5 py-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#ffe5e5] dark:bg-red-950/40 text-[#e02424] dark:text-red-400 border border-[#ffb3b3] dark:border-red-900/50">Canceled</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Right Column (Stay Info & Reviews) */}
      <div className="w-full xl:w-[320px] flex-shrink-0 flex flex-col gap-6">
        {/* Stay Info Card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 flex flex-col transition-all duration-300">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white transition-colors">Stay Info</h3>
            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="col-span-1 row-span-2">
              <img src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=400&h=400" className="w-full h-full object-cover rounded-xl" alt="Main Room" />
            </div>
            <div className="col-span-1 grid grid-cols-2 gap-2">
               <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=200&h=200" className="w-full h-full aspect-square object-cover rounded-lg" alt="Room Detail 1" />
               <img src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=200&h=200" className="w-full h-full aspect-square object-cover rounded-lg" alt="Room Detail 2" />
               <img src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=200&h=200" className="w-full h-full aspect-square object-cover rounded-lg" alt="Room Detail 3" />
               <img src="https://images.unsplash.com/photo-1618330756778-d15f013d33ce?auto=format&fit=crop&q=80&w=200&h=200" className="w-full h-full aspect-square object-cover rounded-lg" alt="Room Detail 4" />
            </div>
          </div>
          
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-800 pb-4 transition-all duration-300">Deluxe Suite</h2>
          
          <div className="grid grid-cols-2 gap-y-5 gap-x-2 text-xs">
            <div>
              <p className="text-gray-400 dark:text-gray-500 mb-1">Check-in</p>
              <p className="font-semibold text-gray-900 dark:text-white text-sm transition-colors">Mar 15, 2035</p>
            </div>
            <div>
              <p className="text-gray-400 dark:text-gray-500 mb-1">Check-out</p>
              <p className="font-semibold text-gray-900 dark:text-white text-sm transition-colors">Mar 18, 2035</p>
            </div>
            
            <div>
              <p className="text-gray-400 dark:text-gray-500 mb-1">Room Number</p>
              <p className="font-semibold text-gray-900 dark:text-white text-sm transition-colors">212</p>
            </div>
            <div>
              <p className="text-gray-400 dark:text-gray-500 mb-1">Number of Guests</p>
              <p className="font-semibold text-gray-900 dark:text-white text-sm transition-colors">2 Adults, 1 Child</p>
            </div>
            
            <div>
              <p className="text-gray-400 dark:text-gray-500 mb-1">Duration</p>
              <p className="font-semibold text-gray-900 dark:text-white text-sm transition-colors">3 Nights</p>
            </div>
            <div>
              <p className="text-gray-400 dark:text-gray-500 mb-1">Request</p>
              <p className="font-semibold text-gray-900 dark:text-white text-sm transition-colors">Airport Pickup</p>
            </div>
 
            <div>
              <p className="text-[10px] text-gray-400 dark:text-gray-500 mb-1">Current Booking Status</p>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#dcf344] dark:bg-emerald-500/20 text-gray-900 dark:text-emerald-400 border border-[#d4ed36] dark:border-emerald-900/30">Checked-In</span>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 dark:text-gray-500 mb-1">Current Booking Code</p>
               <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#edf5ff] dark:bg-blue-950/40 text-[#1c64f2] dark:text-blue-400 border border-[#d6e7ff] dark:border-blue-900/50">#BKG-2038</span>
            </div>
 
            <div className="col-span-2 mt-2">
              <p className="text-gray-400 dark:text-gray-500 mb-1">Booking Source</p>
              <p className="font-semibold text-gray-900 dark:text-white text-sm transition-colors">Website</p>
            </div>
          </div>
        </div>
 
        {/* Reviews */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 flex-1 transition-all duration-300">
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-semibold text-gray-900 dark:text-white transition-colors">Reviews</h3>
            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>
          
          <div className="space-y-5">
            
            <div className="border-b border-gray-100 dark:border-gray-800 pb-5 transition-colors">
              <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">Executive Suite</h4>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex gap-0.5">
                  <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                  <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                  <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                  <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                  <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                </div>
                <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">&bull; Jan 17, 2035</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed italic">"Exceptional service and attention to detail. The staff made my stay truly relaxing and memorable."</p>
            </div>
            
            <div className="border-b border-gray-100 dark:border-gray-800 pb-5 transition-colors">
              <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">Superior Room</h4>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex gap-0.5">
                  <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                  <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                  <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                  <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                  <Star className="h-3.5 w-3.5 text-gray-200 fill-gray-200 dark:text-gray-700 dark:fill-gray-700" />
                </div>
                <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">&bull; Nov 23, 2034</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed italic">"Cozy and clean. Great location and helpful staff. Slight noise from hallway, but overall a good experience."</p>
            </div>
 
            <div>
              <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">Deluxe Suite</h4>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex gap-0.5">
                  <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                  <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                  <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                  <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                  <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                </div>
                <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">&bull; Sep 09, 2034</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed italic">"Loved the view and the spacious layout. Breakfast could have had more variety."</p>
            </div>
 
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div 
          onClick={() => setIsEditModalOpen(false)} 
          className="fixed inset-0 bg-black/45 backdrop-blur-[2px] z-[999] flex items-center justify-center p-4 animate-fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="bg-white dark:bg-gray-950 rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.16)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.4)] border border-gray-100 dark:border-gray-800 max-w-md w-full overflow-hidden flex flex-col animate-slide-up transition-all duration-300"
          >
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-white dark:bg-gray-950 transition-colors">
              <div>
                <h3 className="font-bold text-gray-950 dark:text-white text-base">Edit Guest Profile</h3>
                <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">Update primary details for this gold membership card.</p>
              </div>
              <button 
                onClick={() => setIsEditModalOpen(false)} 
                className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1.5 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-full"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4 bg-white dark:bg-gray-950 overflow-y-auto max-h-[500px] transition-colors">
              {formError && (
                <div className="bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-xs py-2.5 px-3 rounded-xl font-semibold border border-red-100/50 dark:border-red-900/30">
                  {formError}
                </div>
              )}
 
              {/* Full Name Field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-600 dark:text-gray-400">Full Name *</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="e.g. Ethan Brown"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1c64f2] transition-all font-medium text-gray-800 dark:text-white"
                />
              </div>
 
              {/* Gender and Nationality Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-600 dark:text-gray-400">Gender *</label>
                  <select 
                    value={formData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1c64f2] transition-all font-medium text-gray-800 dark:text-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-600 dark:text-gray-400">Nationality *</label>
                  <input 
                    type="text" 
                    value={formData.nationality}
                    onChange={(e) => handleInputChange('nationality', e.target.value)}
                    placeholder="e.g. Canadian"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1c64f2] transition-all font-medium text-gray-800 dark:text-white"
                  />
                </div>
              </div>
 
              {/* Date of Birth Field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-600 dark:text-gray-400">Date of Birth *</label>
                <input 
                  type="text" 
                  value={formData.dob}
                  onChange={(e) => handleInputChange('dob', e.target.value)}
                  placeholder="e.g. July 19, 1995"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1c64f2] transition-all font-medium text-gray-800 dark:text-white"
                />
              </div>
 
              {/* Phone Field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-600 dark:text-gray-400">Phone Number *</label>
                <input 
                  type="text" 
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="e.g. +1 647-880-2356"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1c64f2] transition-all font-medium text-gray-800 dark:text-white"
                />
              </div>
 
              {/* Email Field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-600 dark:text-gray-400">Email Address *</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="e.g. ethan.brown@example.com"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1c64f2] transition-all font-medium text-gray-800 dark:text-white"
                />
              </div>
 
              {/* Address Field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-600 dark:text-gray-400">Address *</label>
                <input 
                  type="text" 
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="e.g. Toronto, Canada"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1c64f2] transition-all font-medium text-gray-800 dark:text-white"
                />
              </div>
 
              {/* Actions */}
              <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 transition-colors">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-5 py-2.5 rounded-full text-xs font-bold bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full text-xs font-bold bg-[#dcf344] hover:bg-[#d4ed36] dark:bg-emerald-500 dark:hover:bg-emerald-600 text-gray-900 dark:text-white transition-colors shadow-sm cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
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
