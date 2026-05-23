import React, { useState } from 'react';
import { 
  Inbox as InboxIcon, 
  Star, 
  Send, 
  FileText, 
  AlertOctagon, 
  Trash2, 
  Plus, 
  Search,
  Mail,
  CornerUpLeft,
  CornerUpRight,
  MoreVertical,
  Paperclip,
  Smile,
  Image as ImageIcon,
  Type,
  Bold,
  Italic,
  Underline,
  List,
  AlignLeft,
  Link2
} from 'lucide-react';

const emails = [
  {
    id: 1,
    name: 'Daniel Wong',
    date: 'Mar 11, 2035',
    time: '03:10 PM',
    title: 'Booking Confirmation Needed',
    tag: 'Reservation Update',
    dotClass: 'bg-[#dcf344]',
    circleClass: 'border-[#dcf344]',
    excerpt: 'Hello, just confirming my booking for the Superior Room on March 13. Please confirm, thank you!',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    isActive: false
  },
  {
    id: 2,
    name: 'Emily Carter',
    date: 'Mar 12, 2035',
    time: '09:45 AM',
    title: 'Room Service Delay',
    tag: 'Guest Inquiry',
    dotClass: 'bg-[#1c64f2]',
    circleClass: 'border-[#1c64f2]',
    excerpt: 'Hi, I ordered dinner at 7 PM but it hasn\'t arrived yet. Could someone check on the status please?',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    isActive: true
  },
  {
    id: 3,
    name: 'Samantha Gray',
    date: 'Mar 11, 2035',
    time: '03:10 PM',
    title: 'Monthly Staff Meeting Reminder',
    tag: 'Internal Notice',
    dotClass: 'bg-[#e02424]',
    circleClass: 'border-[#e02424]',
    excerpt: 'Reminder: The monthly staff coordination meeting will be held tomorrow at 10 AM in the conference room.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    isActive: false
  },
  {
    id: 4,
    name: 'Liam Johnson',
    date: 'Mar 10, 2035',
    time: '04:35 PM',
    title: 'Payment Issue with Online Booking',
    tag: 'Guest Inquiry',
    dotClass: 'bg-[#1c64f2]',
    circleClass: 'border-[#1c64f2]',
    excerpt: 'I tried booking online but my payment didn\'t go through. Can you please assist me with this?',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    isActive: false
  },
  {
    id: 5,
    name: 'Hotelify System',
    date: 'Mar 10, 2035',
    time: '08:00 AM',
    title: 'Daily Performance Report Ready',
    tag: 'Internal Notice',
    dotClass: 'bg-[#e02424]',
    circleClass: 'border-[#e02424]',
    excerpt: 'Your daily performance summary for March 10, 2035 is now available for review in the analytics dashboard.',
    avatar: 'https://ui-avatars.com/api/?name=Hotelify+System&background=dcf344&color=000',
    isActive: false
  },
  {
    id: 6,
    name: 'Hannah Lee',
    date: 'Mar 09, 2035',
    time: '06:20 PM',
    title: 'Late Check-Out Request',
    tag: 'Guest Inquiry',
    dotClass: 'bg-[#1c64f2]',
    circleClass: 'border-[#1c64f2]',
    excerpt: 'Hi, may I request a late check-out for tomorrow around 2 PM? Please let me know if there\'s an extra fee.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    isActive: false
  },
  {
    id: 7,
    name: 'Robert Miles',
    date: 'Mar 09, 2035',
    time: '02:10 PM',
    title: 'Change in Corporate Reservation',
    tag: 'Reservation Update',
    dotClass: 'bg-[#dcf344]',
    circleClass: 'border-[#dcf344]',
    excerpt: 'Hello, we\'d like to modify our existing reservation from March 15-17 to March 16-18. Please confirm.',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    isActive: false
  }
];

export function Inbox() {
  const [activeEmail, setActiveEmail] = useState(emails[1]);

  return (
    <div className="bg-gray-50/50 dark:bg-gray-950/20 rounded-3xl border border-gray-200 dark:border-gray-800 flex flex-col lg:flex-row h-[calc(100vh-160px)] min-h-[700px] overflow-hidden w-full transition-colors duration-300">
      {/* Inbox Sidebar */}
      <div className="w-full lg:w-64 bg-white/50 dark:bg-gray-900/50 border-r border-gray-200 dark:border-gray-800 p-6 flex-shrink-0 flex flex-col hidden md:flex">
        <button className="bg-[#1c64f2] hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white w-full rounded-lg py-3 px-4 flex items-center justify-between font-medium text-sm transition-colors mb-8 shadow-sm dark:shadow-none">
          New Message
          <Plus className="h-4 w-4" />
        </button>

        <div className="space-y-1 mb-10">
          <a href="#" className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-[#1c64f2] bg-[#edf5ff] dark:text-blue-400 dark:bg-blue-950/40">
            <div className="flex items-center gap-3">
              <InboxIcon className="h-4 w-4" /> Inbox
            </div>
            <span className="bg-[#1c64f2] dark:bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">20</span>
          </a>
          <a href="#" className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800/50 transition-colors">
            <div className="flex items-center gap-3">
              <Star className="h-4 w-4" /> Starred
            </div>
            <span className="bg-blue-50 dark:bg-gray-800 text-blue-600 dark:text-gray-400 text-[10px] font-bold px-2 py-0.5 rounded-full">15</span>
          </a>
          <a href="#" className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800/50 transition-colors">
            <div className="flex items-center gap-3">
              <Send className="h-4 w-4" /> Sent
            </div>
            <span className="bg-blue-50 dark:bg-gray-800 text-blue-600 dark:text-gray-400 text-[10px] font-bold px-2 py-0.5 rounded-full">31</span>
          </a>
          <a href="#" className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800/50 transition-colors">
            <div className="flex items-center gap-3">
              <FileText className="h-4 w-4" /> Drafts
            </div>
            <span className="bg-blue-50 dark:bg-gray-800 text-blue-600 dark:text-gray-400 text-[10px] font-bold px-2 py-0.5 rounded-full">2</span>
          </a>
          <a href="#" className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800/50 transition-colors">
            <div className="flex items-center gap-3">
              <AlertOctagon className="h-4 w-4" /> Spam
            </div>
            <span className="bg-blue-50 dark:bg-gray-800 text-blue-600 dark:text-gray-400 text-[10px] font-bold px-2 py-0.5 rounded-full">1</span>
          </a>
          <a href="#" className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800/50 transition-colors">
            <div className="flex items-center gap-3">
              <Trash2 className="h-4 w-4" /> Trash
            </div>
            <span className="bg-blue-50 dark:bg-gray-800 text-blue-600 dark:text-gray-400 text-[10px] font-bold px-2 py-0.5 rounded-full">5</span>
          </a>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3 px-1">Other</h4>
          <div className="space-y-3 px-1">
            <label className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300 cursor-pointer">
              <div className="w-3.5 h-3.5 rounded-full border-2 border-[#1c64f2] dark:border-blue-500 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-[#1c64f2] dark:bg-blue-500 rounded-full"></div>
              </div>
              Guest Inquiry
            </label>
            <label className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300 cursor-pointer">
              <div className="w-3.5 h-3.5 rounded-full border-2 border-[#dcf344] dark:border-purple-500 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-[#dcf344] dark:bg-purple-500 rounded-full"></div>
              </div>
              Reservation Update
            </label>
            <label className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300 cursor-pointer">
              <div className="w-3.5 h-3.5 rounded-full border-2 border-[#e02424] dark:border-red-500 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-[#e02424] dark:bg-red-500 rounded-full"></div>
              </div>
              Internal Notice
            </label>
          </div>
        </div>
      </div>

      {/* Message List */}
      <div className="w-full lg:w-[400px] bg-white dark:bg-gray-900 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 flex flex-col h-full">
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
            <input 
              type="text" 
              placeholder="Search placeholder" 
              className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border-none rounded-full text-xs outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-gray-700 text-gray-900 dark:text-white transition-all font-medium"
            />
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap">
            <Mail className="h-4 w-4" /> 1,500 Total Messages
          </div>
        </div>

        <div className="overflow-y-auto flex-1">
          {emails.map((email) => (
            <div 
              key={email.id} 
              onClick={() => setActiveEmail(email)}
              className={`p-5 border-b border-gray-50 dark:border-gray-850 cursor-pointer transition-colors flex gap-4 ${
                activeEmail.id === email.id ? 'bg-gray-50 dark:bg-gray-800/60' : 'hover:bg-gray-50/50 dark:hover:bg-gray-800/30'
              }`}
            >
              <img src={email.avatar} alt={email.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-0.5">
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white truncate pr-2">{email.name}</h4>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 whitespace-nowrap font-medium flex-shrink-0 mt-0.5">
                    {email.date} - {email.time}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <h5 className="text-xs font-semibold text-gray-700 dark:text-gray-300 truncate pr-2">{email.title}</h5>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <div className={`w-2.5 h-2.5 rounded-full border-2 flex items-center justify-center bg-white dark:bg-gray-900 ${
                      email.circleClass === 'border-[#dcf344]' ? 'border-[#dcf344] dark:border-purple-500' :
                      email.circleClass === 'border-[#1c64f2]' ? 'border-[#1c64f2] dark:border-blue-500' :
                      'border-[#e02424] dark:border-red-500'
                    }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          email.dotClass === 'bg-[#dcf344]' ? 'bg-[#dcf344] dark:bg-purple-500' :
                          email.dotClass === 'bg-[#1c64f2]' ? 'bg-[#1c64f2] dark:bg-blue-500' :
                          'bg-[#e02424] dark:bg-red-500'
                        }`}></div>
                    </div>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">{email.tag}</span>
                  </div>
                </div>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                  {email.excerpt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Detail */}
      <div className="flex-1 bg-white/50 dark:bg-gray-950/20 flex flex-col h-full overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="flex justify-between items-start">
            <div className="flex gap-4">
              <img src={activeEmail.avatar} alt={activeEmail.name} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <h2 className="text-base font-bold text-gray-900 dark:text-white">{activeEmail.name}</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{activeEmail.name.toLowerCase().replace(' ', '.')}@hotelify.com</p>
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-3">
              <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                {activeEmail.date} - {activeEmail.time}
              </span>
              <div className="flex items-center gap-4">
                 <div className="flex items-center gap-1.5 flex-shrink-0">
                    <div className={`w-3 h-3 rounded-full border-2 flex items-center justify-center bg-white dark:bg-gray-900 ${
                      activeEmail.circleClass === 'border-[#dcf344]' ? 'border-[#dcf344] dark:border-purple-500' :
                      activeEmail.circleClass === 'border-[#1c64f2]' ? 'border-[#1c64f2] dark:border-blue-500' :
                      'border-[#e02424] dark:border-red-500'
                    }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          activeEmail.dotClass === 'bg-[#dcf344]' ? 'bg-[#dcf344] dark:bg-purple-500' :
                          activeEmail.dotClass === 'bg-[#1c64f2]' ? 'bg-[#1c64f2] dark:bg-blue-500' :
                          'bg-[#e02424] dark:bg-red-500'
                        }`}></div>
                    </div>
                    <span className="text-[11px] font-medium text-gray-600 dark:text-gray-300">{activeEmail.tag}</span>
                  </div>
                
                <div className="w-px h-3 bg-gray-200 dark:bg-gray-800"></div>
                
                <button className="flex items-center gap-1 text-[11px] font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  <CornerUpLeft className="h-3 w-3" /> Reply
                </button>
                <button className="flex items-center gap-1 text-[11px] font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  <CornerUpRight className="h-3 w-3" /> Forward
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-8 shrink-0">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">{activeEmail.title}</h3>
          
          <div className="text-sm text-gray-600 dark:text-gray-300 space-y-4 leading-relaxed max-w-3xl">
            <p>
              Hello, I ordered dinner at around 7 PM through the in-room service but haven't received it yet. Could you please check with the kitchen or room service team about the delay? I'd appreciate a quick update as I have an early meeting tomorrow.
            </p>
            <p>
              Thank you,<br/>
              <span className="font-bold text-gray-900 dark:text-white">{activeEmail.name}</span><br/>
              Room 210 - Deluxe Suite
            </p>
          </div>
        </div>

        <div className="p-6 md:p-8 bg-white/50 dark:bg-gray-900/40 border-t border-gray-100 dark:border-gray-800 flex-shrink-0">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden flex flex-col">
            <div className="flex items-center px-4 py-2.5 border-b border-gray-100 dark:border-gray-800 gap-2">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 w-6">To</span>
              <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded text-xs font-medium text-gray-700 dark:text-gray-300">
                {activeEmail.name}
                <button className="text-gray-400 hover:text-gray-600 dark:text-gray-500">×</button>
              </div>
              <div className="flex-1 text-right gap-3 flex justify-end">
                  <button className="text-[11px] font-semibold text-gray-400 hover:text-gray-600 dark:text-gray-500">Cc</button>
                  <button className="text-[11px] font-semibold text-gray-400 hover:text-gray-600 dark:text-gray-500">Bcc</button>
              </div>
            </div>
            
            <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800 flex items-center gap-4 text-gray-400 dark:text-gray-500">
              <div className="flex items-center gap-1">
                <button className="p-1.5 hover:bg-gray-50 dark:hover:bg-gray-800 rounded text-gray-500 dark:text-gray-400">
                  <Type className="h-3.5 w-3.5" />
                </button>
                <button className="p-1.5 hover:bg-gray-50 dark:hover:bg-gray-800 rounded text-gray-500 dark:text-gray-400">
                  <span className="font-serif italic text-sm">I</span>
                </button>
                <button className="p-1.5 hover:bg-gray-50 dark:hover:bg-gray-800 rounded text-gray-500 dark:text-gray-400">
                  <span className="font-bold text-sm">B</span>
                </button>
                <button className="p-1.5 hover:bg-gray-50 dark:hover:bg-gray-800 rounded text-gray-500 dark:text-gray-400">
                  <span className="underline text-sm">U</span>
                </button>
              </div>
              <div className="w-px h-4 bg-gray-200 dark:bg-gray-800"></div>
              <div className="flex items-center gap-1">
                 <button className="p-1.5 hover:bg-gray-50 dark:hover:bg-gray-800 rounded text-gray-500 dark:text-gray-400">
                  <AlignLeft className="h-3.5 w-3.5" />
                </button>
                <button className="p-1.5 hover:bg-gray-50 dark:hover:bg-gray-800 rounded text-gray-500 dark:text-gray-400">
                  <List className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="w-px h-4 bg-gray-200 dark:bg-gray-800"></div>
              <div className="flex items-center gap-1">
                <button className="p-1.5 hover:bg-gray-50 dark:hover:bg-gray-800 rounded text-gray-500 dark:text-gray-400">
                  <Paperclip className="h-3.5 w-3.5" />
                </button>
                <button className="p-1.5 hover:bg-gray-50 dark:hover:bg-gray-800 rounded text-gray-500 dark:text-gray-400">
                  <Link2 className="h-3.5 w-3.5" />
                </button>
                <button className="p-1.5 hover:bg-gray-50 dark:hover:bg-gray-800 rounded text-gray-500 dark:text-gray-400">
                  <ImageIcon className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <textarea 
              rows={4} 
              className="w-full p-4 text-sm resize-none outline-none text-gray-700 dark:text-white dark:bg-gray-900 font-medium placeholder:text-gray-400 dark:placeholder:text-gray-600"
              placeholder="Type something"
            ></textarea>
            
            
          </div>
          <div className="mt-4">
             <button className="bg-[#1c64f2] hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg text-sm transition-colors">
                Send Message
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}
