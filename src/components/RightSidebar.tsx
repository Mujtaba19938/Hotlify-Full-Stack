import React from 'react';
import { MoreHorizontal, Plus, Check, MapPin, Building, Key, CheckCircle, Clock } from 'lucide-react';
import { tasksData, activitiesData } from '../data';

export function RightSidebar() {
  return (
    <aside className="w-full xl:w-80 flex-shrink-0 flex flex-col gap-6">
      
      {/* Room Availability */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-semibold text-gray-900 dark:text-white transition-colors">Room Availability</h3>
          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500 dark:text-gray-400 transition-colors">Total All Rooms</span>
          <span className="text-3xl font-bold text-gray-900 dark:text-white transition-colors">120</span>
        </div>
        
        {/* Skeleton Bar Graph Representation */}
        <div className="flex gap-1 h-12 mb-6">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className={`flex-1 rounded-sm ${
                i < 9 ? 'bg-[#1c64f2]' : 
                i < 13 ? 'bg-[#edf5ff] dark:bg-blue-950/40' :
                i < 16 ? 'bg-[#dcf344] dark:bg-emerald-500/20' : 'bg-gray-100 dark:bg-gray-800'
              }`}
            ></div>
          ))}
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-xs font-medium">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#1c64f2]"></div>
            <span className="text-gray-900 dark:text-white">68</span> <span className="text-gray-500 dark:text-gray-400">Occupied</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#edf5ff] dark:bg-blue-950/40 border border-gray-200 dark:border-gray-800"></div>
            <span className="text-gray-900 dark:text-white">25</span> <span className="text-gray-500 dark:text-gray-400">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#dcf344] dark:bg-emerald-500/20"></div>
            <span className="text-gray-900 dark:text-white">22</span> <span className="text-gray-500 dark:text-gray-400">Reserved</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"></div>
            <span className="text-gray-900 dark:text-white">5</span> <span className="text-gray-500 dark:text-gray-400">Not Ready</span>
          </div>
        </div>
      </div>

      {/* Tasks */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-900 dark:text-white transition-colors">Tasks</h3>
          <button className="h-6 w-6 rounded-full bg-[#dcf344] dark:bg-emerald-500/20 dark:text-emerald-400 dark:border dark:border-emerald-500/30 flex items-center justify-center text-gray-900 hover:bg-[#d4ed36] transition-all cursor-pointer">
            <Plus className="h-4 w-4" />
          </button>
        </div>
        
        <div className="space-y-4">
          {tasksData.map((task) => (
            <div key={task.id} className="flex gap-3">
              <div className="mt-1">
                <div className="w-5 h-5 rounded border-2 border-gray-200 dark:border-gray-700 flex flex-shrink-0 cursor-pointer"></div>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 leading-snug transition-colors">{task.title}</p>
                <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5 transition-colors">{task.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-semibold text-gray-900 dark:text-white transition-colors">Recent Activities</h3>
          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>
        
        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[15px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gray-100 dark:before:bg-gray-800 before:z-0">
          {activitiesData.map((activity, index) => {
            let Icon = Key;
            let iconBg = "bg-[#dcf344] text-gray-900 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/20";
            
            if (activity.type === 'cleaning') { Icon = Building; iconBg = "bg-[#edf5ff] text-[#1c64f2] dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900/30"; }
            if (activity.type === 'approval') { Icon = CheckCircle; iconBg = "bg-[#dcf344] text-gray-900 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30"; }
            if (activity.type === 'reservation') { Icon = MapPin; iconBg = "bg-[#1c64f2] text-white dark:bg-blue-600 dark:text-white dark:border-blue-500/30"; }
            if (activity.type === 'system') { Icon = Clock; iconBg = "bg-[#dcf344] text-gray-900 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30"; }
            if (activity.user === 'Front Desk Admin' && index === 4) { Icon = Building; iconBg="bg-[#dcf344] text-gray-900 dark:bg-emerald-500/20 dark:text-emerald-400" }

            return (
              <div key={activity.id} className="relative flex gap-4 z-10">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${iconBg} border-4 border-white dark:border-gray-900 shadow-sm transition-colors`}>
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white transition-colors">{activity.user}</h4>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2 transition-colors">{activity.action}</p>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1 transition-colors">{activity.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </aside>
  );
}
