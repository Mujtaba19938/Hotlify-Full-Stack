import React, { useState } from 'react';
import { 
  Search, 
  ChevronDown, 
  SlidersHorizontal, 
  Square, 
  Bed, 
  Users, 
  Home, 
  Check, 
  Dumbbell, 
  Coffee, 
  Wifi, 
  Tv, 
  Bath, 
  Wind,
  Shield,
  Utensils
} from 'lucide-react';

const rooms = [
  {
    id: 1,
    title: 'Deluxe Suite',
    description: 'Elegant suite with premium furnishings, city view, and private balcony.',
    status: 'Available',
    left: '5 Rooms Left',
    price: 280,
    size: '55 m²',
    bed: '1 King Bed',
    guests: '3 guests',
    occupancy: '20 / 25 Rooms – 80%',
    image: 'https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&q=80&w=400&h=300',
    isActive: true
  },
  {
    id: 2,
    title: 'Superior Room',
    description: 'Comfortable and stylish room designed for business or leisure travelers.',
    status: 'Fully Booked',
    left: '',
    price: 190,
    size: '38 m²',
    bed: '1 Queen Bed',
    guests: '2 guests',
    occupancy: '25 / 25 Rooms – 100%',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=400&h=300',
    isActive: false
  },
  {
    id: 3,
    title: 'Executive Suite',
    description: 'Spacious and modern suite featuring a lounge area and work desk.',
    status: 'Available',
    left: '5 Rooms Left',
    price: 320,
    size: '60 m²',
    bed: '1 King Bed',
    guests: '4 guests',
    occupancy: '18 / 24 Rooms – 75%',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=400&h=300',
    isActive: false
  },
  {
    id: 4,
    title: 'Standard Room',
    description: 'Simple yet cozy room with all essential comforts for a short stay.',
    status: 'Fully Booked',
    left: '',
    price: 150,
    size: '30 m²',
    bed: '1 Queen Bed',
    guests: '3 guests',
    occupancy: '30 / 30 Rooms – 100%',
    image: 'https://images.unsplash.com/photo-1631049552057-403fb4f235a4?auto=format&fit=crop&q=80&w=400&h=300',
    isActive: false
  },
  {
    id: 5,
    title: 'Premium Deluxe',
    description: 'Luxurious room combining comfort, modern design, and a relaxing ambience.',
    status: 'Available',
    left: '5 Rooms Left',
    price: 250,
    size: '45 m²',
    bed: '1 King Bed',
    guests: '3 guests',
    occupancy: '16 / 20 Rooms – 80%',
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=400&h=300',
    isActive: false
  }
];

export function Rooms() {
  const [activeRoom, setActiveRoom] = useState(rooms[0]);

  return (
    <div className="bg-gray-50/50 dark:bg-gray-950 rounded-3xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col xl:flex-row gap-6 w-full min-h-[700px]">
      
      {/* Left Column (Room Category List) */}
      <div className="flex-1 min-w-0 flex flex-col bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        
        {/* Header Options */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Room Category</h2>
          
          <div className="flex items-center gap-3 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            <div className="flex items-center gap-2 flex-shrink-0 text-sm text-gray-500 dark:text-gray-400">
              <span>Sort by:</span>
              <button className="bg-gray-50 dark:bg-gray-800 px-3 py-1.5 rounded-full flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium">
                Popular <ChevronDown className="h-3 w-3" />
              </button>
            </div>
            
            <button className="bg-gray-50 dark:bg-gray-800 px-4 py-1.5 rounded-full flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium text-sm flex-shrink-0">
              All Type <ChevronDown className="h-3 w-3" />
            </button>
            
            <button className="bg-[#dcf344] dark:bg-gradient-to-r dark:from-blue-600 dark:to-indigo-600 dark:hover:from-blue-500 dark:hover:to-indigo-500 dark:text-white px-4 py-1.5 rounded-full font-semibold text-gray-900 hover:bg-[#d4ed36] transition-colors text-sm flex-shrink-0">
              Add Room
            </button>
            
            <button className="bg-[#dcf344] dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 w-8 h-8 rounded-full flex items-center justify-center text-gray-900 hover:bg-[#d4ed36] transition-colors flex-shrink-0">
              <SlidersHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Room List */}
        <div className="overflow-y-auto p-6 space-y-4 h-[calc(100vh-280px)] min-h-[500px]">
          {rooms.map((room) => (
            <div 
              key={room.id}
              onClick={() => setActiveRoom(room)}
              className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col sm:flex-row gap-5 ${
                activeRoom.id === room.id 
                  ? 'border-[#1c64f2] dark:border-blue-500 bg-white dark:bg-gray-800/40 shadow-sm' 
                  : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/40 hover:border-gray-200 dark:hover:border-gray-700'
              }`}
            >
              <img src={room.image} alt={room.title} className="w-full sm:w-48 h-32 object-cover rounded-lg flex-shrink-0" />
              
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex justify-between items-start mb-2 gap-4">
                  <div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">{room.title}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed max-w-sm">{room.description}</p>
                  </div>
                  <div className="flex flex-col items-end flex-shrink-0">
                    <div className="flex items-center gap-2 mb-2">
                      {room.left && <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">{room.left}</span>}
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        room.status === 'Available' 
                          ? 'bg-[#edf5ff] text-[#1c64f2] dark:bg-blue-950/40 dark:text-blue-400' 
                          : 'bg-[#ffe5e5] text-[#e02424] dark:bg-red-950/40 dark:text-red-400'
                      }`}>
                        {room.status}
                      </span>
                    </div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">${room.price}<span className="text-xs font-medium text-gray-400 dark:text-gray-500">/night</span></div>
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800/80 flex flex-wrap gap-4 text-xs font-medium text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-1.5"><Square className="h-3.5 w-3.5 text-gray-400 dark:text-gray-500" /> {room.size}</div>
                  <div className="flex items-center gap-1.5"><Bed className="h-3.5 w-3.5 text-gray-400 dark:text-gray-500" /> {room.bed}</div>
                  <div className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5 text-gray-400 dark:text-gray-500" /> {room.guests}</div>
                  <div className="flex items-center gap-1.5 ml-auto"><Home className="h-3.5 w-3.5 text-gray-400 dark:text-gray-500" /> {room.occupancy}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column (Room Details) */}
      <div className="w-full xl:w-[450px] bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-700 flex-shrink-0 flex flex-col overflow-hidden h-[calc(100vh-190px)] min-h-[600px]">
        <div className="p-6 md:p-8 overflow-y-auto w-full h-full">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{activeRoom.title}</h2>
            <div className="flex items-center gap-2">
              {activeRoom.left && <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">{activeRoom.left}</span>}
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                activeRoom.status === 'Available'
                  ? 'bg-[#edf5ff] text-[#1c64f2] dark:bg-blue-950/40 dark:text-blue-400'
                  : 'bg-[#ffe5e5] text-[#e02424] dark:bg-red-950/40 dark:text-red-400'
              }`}>
                {activeRoom.status}
              </span>
            </div>
          </div>
          
          <p className="text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2">{activeRoom.occupancy} Occupied</p>
          <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full mb-6 overflow-hidden">
             <div 
               className="h-full bg-[#1c64f2] dark:bg-blue-600 rounded-full"
               style={{ width: activeRoom.status === 'Fully Booked' ? '100%' : '80%' }}
             ></div>
          </div>

          {/* Photos */}
          <div className="mb-6 space-y-2">
            <img src={activeRoom.image} alt="Main view" className="w-full h-48 sm:h-56 object-cover rounded-xl" />
            <div className="grid grid-cols-5 gap-2">
               <img src="https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&q=80&w=120&h=120" className="w-full aspect-square object-cover rounded-lg border-2 border-[#1c64f2] dark:border-blue-500 p-0.5" alt="Thumb 1" />
               <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=120&h=120" className="w-full aspect-square object-cover rounded-lg p-0.5 opacity-80 hover:opacity-100 cursor-pointer" alt="Thumb 2" />
               <img src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=120&h=120" className="w-full aspect-square object-cover rounded-lg p-0.5 opacity-80 hover:opacity-100 cursor-pointer" alt="Thumb 3" />
               <img src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=120&h=120" className="w-full aspect-square object-cover rounded-lg p-0.5 opacity-80 hover:opacity-100 cursor-pointer" alt="Thumb 4" />
               <img src="https://images.unsplash.com/photo-1631049552057-403fb4f235a4?auto=format&fit=crop&q=80&w=120&h=120" className="w-full aspect-square object-cover rounded-lg p-0.5 opacity-80 hover:opacity-100 cursor-pointer" alt="Thumb 5" />
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-xs font-semibold text-gray-700 dark:text-gray-300 mb-4">
            <div className="flex items-center gap-1.5"><Square className="h-4 w-4 text-gray-400 dark:text-gray-500" /> {activeRoom.size}</div>
            <div className="flex items-center gap-1.5"><Bed className="h-4 w-4 text-gray-400 dark:text-gray-500" /> {activeRoom.bed}</div>
            <div className="flex items-center gap-1.5"><Users className="h-4 w-4 text-gray-400 dark:text-gray-500" /> {activeRoom.guests}</div>
          </div>

          <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed mb-8">
            The {activeRoom.title} offers a premium stay experience, blending luxury and functionality. Guests enjoy spacious interiors, elegant décor, and premium views. Ideal for leisure or business travelers seeking extra comfort and privacy.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Features</h3>
              <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs text-gray-600 dark:text-gray-300 font-medium">
                <div className="flex items-start gap-2">
                  <div className="bg-[#edf5ff] dark:bg-blue-950/40 p-0.5 rounded-full text-[#1c64f2] dark:text-blue-400 mt-0.5"><Check className="h-2.5 w-2.5" strokeWidth={3} /></div>
                  <span className="leading-tight">Private Balcony with City View</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="bg-[#edf5ff] dark:bg-blue-950/40 p-0.5 rounded-full text-[#1c64f2] dark:text-blue-400 mt-0.5"><Check className="h-2.5 w-2.5" strokeWidth={3} /></div>
                  <span>Soundproof Windows</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="bg-[#edf5ff] dark:bg-blue-950/40 p-0.5 rounded-full text-[#1c64f2] dark:text-blue-400 mt-0.5"><Check className="h-2.5 w-2.5" strokeWidth={3} /></div>
                  <span>Lounge & Workspace Area</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="bg-[#edf5ff] dark:bg-blue-950/40 p-0.5 rounded-full text-[#1c64f2] dark:text-blue-400 mt-0.5"><Check className="h-2.5 w-2.5" strokeWidth={3} /></div>
                  <span>Smart Room Controls</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Facilities</h3>
              <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs text-gray-600 dark:text-gray-300 font-medium">
                <div className="flex items-center gap-2">
                  <Dumbbell className="h-3.5 w-3.5 text-gray-400 dark:text-gray-500" /> Access to Fitness Center
                </div>
                <div className="flex items-center gap-2">
                  <Utensils className="h-3.5 w-3.5 text-gray-400 dark:text-gray-500" /> 24/7 Room Service
                </div>
                <div className="flex items-center gap-2">
                  <Wind className="h-3.5 w-3.5 text-gray-400 dark:text-gray-500" /> Rooftop Pool
                </div>
                <div className="flex items-center gap-2">
                  <Coffee className="h-3.5 w-3.5 text-gray-400 dark:text-gray-500" /> In-House Restaurant
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Amenities</h3>
              <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs text-gray-600 dark:text-gray-300 font-medium">
                 <div className="flex items-start gap-2">
                  <div className="bg-[#edf5ff] dark:bg-blue-950/40 p-0.5 rounded-full text-[#1c64f2] dark:text-blue-400 mt-0.5"><Check className="h-2.5 w-2.5" strokeWidth={3} /></div>
                  <span>Free High-Speed Wi-Fi</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="bg-[#edf5ff] dark:bg-blue-950/40 p-0.5 rounded-full text-[#1c64f2] dark:text-blue-400 mt-0.5"><Check className="h-2.5 w-2.5" strokeWidth={3} /></div>
                  <span className="leading-tight">Bathrobe, Slippers, and Toiletries</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="bg-[#edf5ff] dark:bg-blue-950/40 p-0.5 rounded-full text-[#1c64f2] dark:text-blue-400 mt-0.5"><Check className="h-2.5 w-2.5" strokeWidth={3} /></div>
                  <span className="leading-tight">Smart TV with Streaming Apps</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="bg-[#edf5ff] dark:bg-blue-950/40 p-0.5 rounded-full text-[#1c64f2] dark:text-blue-400 mt-0.5"><Check className="h-2.5 w-2.5" strokeWidth={3} /></div>
                  <span>In-Room Safe</span>
                </div>
                 <div className="flex items-start gap-2">
                  <div className="bg-[#edf5ff] dark:bg-blue-950/40 p-0.5 rounded-full text-[#1c64f2] dark:text-blue-400 mt-0.5"><Check className="h-2.5 w-2.5" strokeWidth={3} /></div>
                  <span>Minibar & Coffee Maker</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
