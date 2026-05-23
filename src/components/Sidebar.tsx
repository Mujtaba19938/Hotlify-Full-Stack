import React, { useState } from 'react';
import {
  LayoutDashboard,
  MessageSquare,
  Calendar,
  Megaphone,
  BedDouble,
  Sparkles,
  Package,
  Calculator,
  Star,
  LogIn,
  Building
} from 'lucide-react';

const mainNav = [
  { name: 'Dashboard', icon: LayoutDashboard },
  { name: 'Inbox', icon: MessageSquare },
  { name: 'Calendar', icon: Calendar },
  { 
    name: 'Campaigns', 
    icon: Megaphone, 
    hasSub: true,
    subItems: ['Reservations', 'Guest Profile'] 
  },
  { 
    name: 'Rooms', 
    icon: BedDouble, 
    hasSub: true, 
    subItems: ['Rooms', 'Create New Room'] 
  },
  { name: 'Housekeeping', icon: Sparkles },
  { name: 'Inventory', icon: Package },
  { 
    name: 'Finance', 
    icon: Calculator, 
    hasSub: true,
    subItems: ['Finance', 'Invoice']
  },
  { name: 'Reviews', icon: Star, badge: 5 },
  { name: 'Register & Login', icon: LogIn },
];

interface SidebarProps {
  currentPage?: string;
  onPageChange?: (page: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ currentPage = 'Dashboard', onPageChange, isOpen = false, onClose }: SidebarProps) {
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {
      'Campaigns': currentPage === 'Reservations' || currentPage === 'Guest Profile',
      'Rooms': currentPage === 'Rooms' || currentPage === 'Create New Room',
      'Finance': currentPage === 'Finance' || currentPage === 'Invoice',
    };
    
    // Default to 'Campaigns' expanded if none are active sub-items
    if (!initial.Campaigns && !initial.Rooms && !initial.Finance) {
      initial.Campaigns = true;
    }
    
    return initial;
  });

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-screen w-64 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-r border-gray-100/50 dark:border-gray-800/50 flex flex-col justify-between z-50 transition-all duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-10 text-[#1c64f2] dark:text-blue-400 font-bold text-xl transition-colors">
          <Building className="h-6 w-6" />
          <span>Hotelify</span>
        </div>
        
        <nav className="space-y-1">
          {mainNav.map((item) => {
            const active = currentPage === item.name;
            return (
            <React.Fragment key={item.name}>
            <a
              href="#"
              onClick={(e) => { 
                e.preventDefault(); 
                if (!item.hasSub) {
                  onPageChange?.(item.name); 
                } else {
                  setExpandedMenus(prev => ({
                    ...prev,
                    [item.name]: !prev[item.name]
                  }));
                }
              }}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                active && !item.hasSub
                  ? 'bg-[#edf5ff] dark:bg-blue-950/40 text-[#1c64f2] dark:text-blue-400' 
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className={`h-5 w-5 transition-colors ${active ? 'text-[#1c64f2] dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'}`} />
                {item.name}
              </div>
              <div className="flex items-center gap-2">
                {item.badge && (
                  <span className="bg-[#1c64f2] dark:bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
                {item.hasSub && (
                  <svg className={`w-4 h-4 text-gray-400 dark:text-gray-500 transition-transform duration-200 ${expandedMenus[item.name] ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </div>
            </a>
            
            {item.hasSub && item.subItems && expandedMenus[item.name] && (
              <div className="pl-11 mt-1 space-y-1 mb-2 animate-slide-down">
                {item.subItems.map(subItem => (
                   <a 
                     key={subItem}
                     href="#"
                     onClick={(e) => { e.preventDefault(); onPageChange?.(subItem); }}
                     className={`block px-3 py-2 text-xs font-medium rounded-lg transition-all ${
                       currentPage === subItem 
                         ? 'bg-[#edf5ff] dark:bg-blue-950/40 text-[#1c64f2] dark:text-blue-400' 
                         : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white'
                     }`}
                   >
                     {subItem}
                   </a>
                ))}
              </div>
            )}
            </React.Fragment>
          )})}
        </nav>
      </div>

      <div className="p-6">
        <div className="bg-[#edf5ff] dark:bg-blue-950/20 rounded-xl p-4 transition-all duration-300">
          <img 
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            alt="Hotel" 
            className="w-full h-24 object-cover rounded-lg mb-4"
          />
          <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1 transition-colors">Manage Smarter, Serve Better</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 line-clamp-2 transition-colors">Automate check-ins, monitor occupancy, and track performance effortlessly.</p>
          <button className="w-full bg-[#dcf344] hover:bg-[#d4ed36] dark:bg-gradient-to-r dark:from-blue-600 dark:to-indigo-600 dark:hover:from-blue-500 dark:hover:to-indigo-500 text-gray-900 dark:text-white text-sm font-semibold py-2 rounded-lg transition-colors cursor-pointer">
            Upgrade to Pro
          </button>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-down {
          animation: slideDown 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />
    </aside>
    </>
  );
}
