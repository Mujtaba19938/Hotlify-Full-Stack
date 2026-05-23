import React from 'react';
import { Search, MessageSquare, Bell, Menu, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  title?: string;
  onMenuClick?: () => void;
  darkMode?: boolean;
  toggleDarkMode?: () => void;
}

export function Header({ title = 'Dashboard', onMenuClick, darkMode = false, toggleDarkMode }: HeaderProps) {
  return (
    <header className="h-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-40 transition-colors duration-300">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="p-2 -ml-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden transition-colors"
        >
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white transition-colors">{title}</h1>
      </div>
      
      <div className="flex items-center gap-4 lg:gap-6">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search placeholder" 
            className="w-64 pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border-none rounded-full text-sm dark:text-white dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 outline-none transition-all"
          />
        </div>
        
        <div className="flex items-center gap-3 lg:gap-4">
          {/* Theme Toggle Button placed adjacent to the chat icon */}
          <button
            onClick={toggleDarkMode}
            className="relative w-[92px] h-[36px] rounded-full bg-gray-200/40 dark:bg-black/40 backdrop-blur-md flex items-center p-1 cursor-pointer transition-all duration-300 select-none border border-gray-300/30 dark:border-white/10 active:scale-95 shadow-sm"
            aria-label="Toggle dark mode"
          >
            {/* Label text */}
            <span className="text-[10px] font-bold tracking-wider uppercase transition-all duration-300 select-none pointer-events-none text-white pl-3 block dark:block hidden dark:inline">
              Dark
            </span>
            <span className="text-[10px] font-bold tracking-wider uppercase transition-all duration-300 select-none pointer-events-none text-gray-800 dark:text-gray-200 pr-3 ml-auto block dark:hidden inline">
              Light
            </span>

            {/* Sliding Knob */}
            <div
              className={`absolute top-[3px] w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 shadow-md border backdrop-blur-sm ${
                darkMode
                  ? 'left-[60px] bg-gray-900/90 border-gray-800/50 text-[#edf5ff]'
                  : 'left-[3px] bg-white/90 border-gray-100/50 text-yellow-500'
              }`}
            >
              {darkMode ? (
                <Moon className="h-3.5 w-3.5 fill-[#edf5ff] text-[#edf5ff]" />
              ) : (
                <Sun className="h-3.5 w-3.5 fill-yellow-400 text-yellow-500" />
              )}
            </div>
          </button>

          <button className="p-2 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-400 dark:text-gray-400 transition-colors relative">
            <MessageSquare className="h-5 w-5" />
          </button>
          
          <button className="p-2 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-400 dark:text-gray-400 transition-colors relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></span>
          </button>
        </div>
        
        <div className="flex items-center gap-3 pl-4 lg:pl-6 border-l border-gray-100 dark:border-gray-800 transition-colors">
          <img 
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
            alt="Polina Steward" 
            className="h-9 w-9 lg:h-10 lg:w-10 rounded-full object-cover border border-gray-200 dark:border-gray-800 transition-colors"
          />
          <div className="hidden sm:block text-left">
            <div className="text-sm font-medium text-gray-900 dark:text-white transition-colors">Polina Steward</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 transition-colors">Admin</div>
          </div>
        </div>
      </div>
    </header>
  );
}
