import React, { useState } from 'react';
import { Edit2, UploadCloud } from 'lucide-react';

export function CreateNewRoom() {
  const [activeStatus, setActiveStatus] = useState('Active');
  const [smokingPolicy, setSmokingPolicy] = useState('Non-Smoking');
  const [earlyBookingToggle, setEarlyBookingToggle] = useState(true);

  return (
    <div className="flex flex-col xl:flex-row gap-6 w-full min-h-[700px]">
      
      {/* Left Column */}
      <div className="flex-1 flex flex-col gap-6 min-w-0">
        
        {/* Basic Information */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-6 flex flex-col relative transition-all duration-300">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-gray-900 dark:text-white transition-colors">Basic Information</h3>
            <div className="flex items-center gap-2">
              <button className="bg-[#dcf344] dark:bg-blue-600 hover:bg-[#d4ed36] dark:hover:bg-blue-700 text-gray-900 dark:text-white text-xs font-semibold px-4 py-1.5 rounded-md transition-colors">
                Save
              </button>
              <button className="p-1.5 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-md transition-colors">
                <Edit2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-[11px] font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Room Type Name</label>
              <input 
                type="text" 
                defaultValue="Premier Garden Suite"
                className="w-full bg-gray-50/80 dark:bg-gray-800 border-none rounded-lg px-4 py-2.5 text-sm font-medium text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-500 dark:text-gray-400 mb-1.5">About Room</label>
              <textarea 
                rows={4}
                defaultValue="The Premier Garden Suite offers a serene escape with elegant interiors, modern amenities, and direct access to the hotel's lush garden. Perfect for guests seeking comfort, privacy, and natural surroundings."
                className="w-full bg-gray-50/80 dark:bg-gray-800 border-none rounded-lg px-4 py-2.5 text-sm font-medium text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 resize-none transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Max Adults</label>
                <div className="relative flex items-center">
                  <select defaultValue="3" className="w-full bg-gray-50/80 dark:bg-gray-800 border-none rounded-lg px-4 py-2.5 text-sm font-medium text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 appearance-none transition-colors">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                  <div className="absolute right-3 flex flex-col pointer-events-none">
                    <Chevron size={10} className="text-gray-500 dark:text-gray-400" dir="up" />
                    <Chevron size={10} className="text-gray-500 dark:text-gray-400" dir="down" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Max Children</label>
                <div className="relative flex items-center">
                  <select defaultValue="2" className="w-full bg-gray-50/80 dark:bg-gray-800 border-none rounded-lg px-4 py-2.5 text-sm font-medium text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 appearance-none transition-colors">
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                  <div className="absolute right-3 flex flex-col pointer-events-none">
                    <Chevron size={10} className="text-gray-500 dark:text-gray-400" dir="up" />
                    <Chevron size={10} className="text-gray-500 dark:text-gray-400" dir="down" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-500 dark:text-gray-400 mb-2">Availability Status</label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <div className="relative flex items-center justify-center">
                    <input 
                      type="radio" 
                      name="status" 
                      className="peer sr-only" 
                      checked={activeStatus === 'Active'}
                      onChange={() => setActiveStatus('Active')}
                    />
                    <div className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-650 peer-checked:border-[#1c64f2] dark:peer-checked:border-blue-500 transition-colors"></div>
                    <div className="w-2 h-2 rounded-full bg-[#1c64f2] dark:bg-blue-500 absolute opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                  </div>
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-300 transition-colors">Active</span>
                </label>
                
                <label className="flex items-center gap-2 cursor-pointer">
                  <div className="relative flex items-center justify-center">
                    <input 
                      type="radio" 
                      name="status" 
                      className="peer sr-only" 
                      checked={activeStatus === 'Inactive'}
                      onChange={() => setActiveStatus('Inactive')}
                    />
                    <div className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-650 peer-checked:border-[#1c64f2] dark:peer-checked:border-blue-500 transition-colors"></div>
                    <div className="w-2 h-2 rounded-full bg-[#1c64f2] dark:bg-blue-500 absolute opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                  </div>
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-300 transition-colors">Inactive</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Inventory Count</label>
              <div className="relative flex items-center">
                <select defaultValue="10" className="flex-1 bg-gray-50/80 dark:bg-gray-800 border-none rounded-lg pl-4 pr-40 py-2.5 text-sm font-medium text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 appearance-none transition-colors">
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                </select>
                <div className="absolute right-[190px] flex flex-col pointer-events-none">
                  <Chevron size={10} className="text-gray-500 dark:text-gray-400" dir="up" />
                  <Chevron size={10} className="text-gray-500 dark:text-gray-400" dir="down" />
                </div>
                <span className="absolute right-4 text-[10px] font-semibold text-gray-400 dark:text-gray-500 pointer-events-none transition-colors">
                  Rooms Available Under This Type
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-6 flex flex-col transition-all duration-300">
           <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-gray-900 dark:text-white transition-colors">Pricing</h3>
            <div className="flex items-center gap-2">
              <button className="bg-[#dcf344] dark:bg-blue-600 hover:bg-[#d4ed36] dark:hover:bg-blue-700 text-gray-900 dark:text-white text-xs font-semibold px-4 py-1.5 rounded-md transition-colors">
                Save
              </button>
              <button className="p-1.5 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-md transition-colors">
                <Edit2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="space-y-4 text-sm font-medium">
            <div>
              <label className="block text-[11px] font-semibold text-gray-500 dark:text-gray-400 mb-1.5 transition-colors">Base Price</label>
              <div className="relative">
                <input 
                  type="text" 
                  defaultValue="$270"
                  className="w-full bg-gray-50/80 dark:bg-gray-800 border-none rounded-lg pl-4 pr-16 py-2.5 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 transition-colors"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 text-xs transition-colors">/ Night</span>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-500 dark:text-gray-400 mb-1.5 transition-colors">Additional Person Charge</label>
              <div className="relative">
                <input 
                  type="text" 
                  defaultValue="$30"
                  className="w-full bg-gray-50/80 dark:bg-gray-800 border-none rounded-lg pl-4 pr-32 py-2.5 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 transition-colors"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 text-xs transition-colors">/ Night per Person</span>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-500 dark:text-gray-400 mb-1.5 transition-colors">Weekend / Seasonal Rate Adjustment</label>
              <div className="relative">
                <input 
                  type="text" 
                  defaultValue="+15%"
                  className="w-full bg-gray-50/80 dark:bg-gray-800 border-none rounded-lg pl-4 pr-44 py-2.5 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 transition-colors"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 text-xs font-semibold transition-colors">(High Season & Weekends)</span>
              </div>
            </div>

            <div>
               <label className="block text-[11px] font-semibold text-gray-500 dark:text-gray-400 mb-2 transition-colors">Discount Options</label>
               <div className="flex items-center gap-3 mt-1">
                 <button 
                  onClick={() => setEarlyBookingToggle(!earlyBookingToggle)}
                  className={`w-10 h-5 rounded-full relative transition-colors ${earlyBookingToggle ? 'bg-[#1c64f2]' : 'bg-gray-200 dark:bg-gray-800'}`}
                 >
                   <div className={`w-3.5 h-3.5 bg-white rounded-full absolute top-[3px] transition-transform ${earlyBookingToggle ? 'translate-x-[22px]' : 'translate-x-[3px]'}`}></div>
                 </button>
                 <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 transition-colors">
                   - 10% Off for Early Bookings <span className="font-medium text-gray-400 dark:text-gray-500">(7+ days in advance)</span>
                 </span>
               </div>
            </div>
          </div>
        </div>

      </div>

      {/* Right Column */}
      <div className="flex-1 flex flex-col gap-6 min-w-0">
        
        {/* Room Configuration */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-6 flex flex-col transition-all duration-300">
           <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-gray-900 dark:text-white transition-colors">Room Configuration</h3>
            <div className="flex items-center gap-2">
              <button className="bg-[#dcf344] dark:bg-blue-600 hover:bg-[#d4ed36] dark:hover:bg-blue-700 text-gray-900 dark:text-white text-xs font-semibold px-4 py-1.5 rounded-md transition-colors">
                Save
              </button>
              <button className="p-1.5 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-md transition-colors">
                <Edit2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-[11px] font-semibold text-gray-500 dark:text-gray-400 mb-1.5 transition-colors">Room Size</label>
              <input 
                type="text" 
                defaultValue="50 m²"
                className="w-full bg-gray-50/80 dark:bg-gray-800 border-none rounded-lg px-4 py-2.5 text-sm font-medium text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 transition-colors"
              />
            </div>

            <div>
              <div className="flex justify-between items-end mb-3">
                <label className="block text-[11px] font-semibold text-gray-500 dark:text-gray-400 transition-colors">Bed Type</label>
                <span className="text-[9px] font-medium text-gray-400 dark:text-gray-500 transition-colors">*Qty input will appear if checked</span>
              </div>
              <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <div className="w-4 h-4 rounded-sm border border-gray-300 dark:border-gray-700 flex items-center justify-center bg-[#dcf344] dark:bg-blue-600 border-transparent transition-colors">
                       <svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                         <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                       </svg>
                    </div>
                    <span className="text-[13px] font-medium text-gray-700 dark:text-gray-300 transition-colors">King Bed</span>
                  </label>
                  <div className="flex items-center bg-gray-50 dark:bg-gray-800 rounded-md px-2 py-1 transition-colors">
                    <span className="text-xs font-semibold w-4 text-center text-gray-900 dark:text-white">1</span>
                    <div className="flex flex-col ml-1">
                      <Chevron size={10} className="text-gray-500 dark:text-gray-400" dir="up" />
                      <Chevron size={10} className="text-gray-500 dark:text-gray-400" dir="down" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <div className="w-4 h-4 rounded-sm border border-gray-300 dark:border-gray-700 flex items-center justify-center">
                    </div>
                    <span className="text-[13px] font-medium text-gray-600 dark:text-gray-400 transition-colors">Twin Beds</span>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <div className="w-4 h-4 rounded-sm border border-gray-300 dark:border-gray-700 flex items-center justify-center">
                    </div>
                    <span className="text-[13px] font-medium text-gray-600 dark:text-gray-400 transition-colors">Queen Beds</span>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <div className="w-4 h-4 rounded-sm border border-gray-300 dark:border-gray-700 flex items-center justify-center bg-[#dcf344] dark:bg-blue-600 border-transparent transition-colors">
                       <svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                         <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                       </svg>
                    </div>
                    <span className="text-[13px] font-medium text-gray-700 dark:text-gray-300 transition-colors">Sofa Bed</span>
                  </label>
                  <div className="flex items-center bg-gray-50 dark:bg-gray-800 rounded-md px-2 py-1 transition-colors">
                    <span className="text-xs font-semibold w-4 text-center text-gray-900 dark:text-white">1</span>
                    <div className="flex flex-col ml-1">
                      <Chevron size={10} className="text-gray-500 dark:text-gray-400" dir="up" />
                      <Chevron size={10} className="text-gray-500 dark:text-gray-400" dir="down" />
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div>
               <label className="block text-[11px] font-semibold text-gray-500 dark:text-gray-400 mb-3 transition-colors">Smoking Policy</label>
               <div className="grid grid-cols-2 gap-4">
                 <label className="flex items-center gap-2 cursor-pointer">
                  <div className="relative flex items-center justify-center">
                    <input 
                      type="radio" 
                      name="smoking" 
                      className="peer sr-only" 
                      checked={smokingPolicy === 'Non-Smoking'}
                      onChange={() => setSmokingPolicy('Non-Smoking')}
                    />
                    <div className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-700 peer-checked:border-[#1c64f2] dark:peer-checked:border-blue-500 transition-colors"></div>
                    <div className="w-2 h-2 rounded-full bg-[#1c64f2] dark:bg-blue-500 absolute opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                  </div>
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-300 transition-colors">Non-Smoking</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <div className="relative flex items-center justify-center">
                    <input 
                      type="radio" 
                      name="smoking" 
                      className="peer sr-only" 
                      checked={smokingPolicy === 'Smoking'}
                      onChange={() => setSmokingPolicy('Smoking')}
                    />
                    <div className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-700 peer-checked:border-[#1c64f2] dark:peer-checked:border-blue-500 transition-colors"></div>
                    <div className="w-2 h-2 rounded-full bg-[#1c64f2] dark:bg-blue-500 absolute opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                  </div>
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-300 transition-colors">Smoking</span>
                </label>
               </div>
            </div>

            <div>
               <label className="block text-[11px] font-semibold text-gray-500 dark:text-gray-400 mb-3 transition-colors">View Type</label>
               <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                 <label className="flex items-center gap-2 cursor-pointer">
                    <div className="w-4 h-4 rounded-sm border border-gray-300 dark:border-gray-750 flex items-center justify-center bg-[#dcf344] dark:bg-blue-600 border-transparent transition-colors">
                       <svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                         <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                       </svg>
                    </div>
                    <span className="text-[13px] font-medium text-gray-700 dark:text-gray-300 transition-colors">City View</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <div className="w-4 h-4 rounded-sm border border-gray-300 dark:border-gray-700 flex items-center justify-center">
                    </div>
                    <span className="text-[13px] font-medium text-gray-600 dark:text-gray-400 transition-colors">Sea View</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <div className="w-4 h-4 rounded-sm border border-gray-300 dark:border-gray-700 flex items-center justify-center">
                    </div>
                    <span className="text-[13px] font-medium text-gray-600 dark:text-gray-400 transition-colors">Garden View</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <div className="w-4 h-4 rounded-sm border border-gray-300 dark:border-gray-700 flex items-center justify-center">
                    </div>
                    <span className="text-[13px] font-medium text-gray-600 dark:text-gray-400 transition-colors">Pool View</span>
                  </label>
               </div>
            </div>

          </div>
        </div>

        {/* Media */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-6 flex flex-col flex-1 transition-all duration-300">
           <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-gray-900 dark:text-white transition-colors">Media</h3>
            <div className="flex items-center gap-2">
              <button className="bg-[#dcf344] dark:bg-blue-600 hover:bg-[#d4ed36] dark:hover:bg-blue-700 text-gray-900 dark:text-white text-xs font-semibold px-4 py-1.5 rounded-md transition-colors">
                Save
              </button>
              <button className="p-1.5 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-md transition-colors">
                <Edit2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl bg-gray-50/50 dark:bg-gray-800/30 flex flex-col items-center justify-center py-10 mb-6 flex-1 min-h-[220px] transition-colors">
             <UploadCloud className="w-8 h-8 text-gray-400 dark:text-gray-500 mb-3" />
             <p className="text-[13px] font-semibold text-gray-800 dark:text-gray-200 mb-1 transition-colors">Drag and drop to upload Photo</p>
             <p className="text-[11px] text-gray-400 dark:text-gray-500 font-medium mb-3 transition-colors">or</p>
             <button className="bg-[#1c64f2] hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white text-[13px] font-semibold px-6 py-2 rounded-lg transition-colors shadow-sm mb-4">
               Upload Photo
             </button>
             <p className="text-[10px] text-gray-400 dark:text-gray-500 font-medium text-center px-4 transition-colors">
               © Up to 5 MB per image in JPG, PNG, WEBP<br/>
               (Recommended: at least 4 images: bedroom, bathroom, view, and living area)
             </p>
          </div>

          <div>
             <label className="block text-[11px] font-semibold text-gray-500 dark:text-gray-400 mb-3 transition-colors">Uploaded Files and Select The Cover Image</label>
             <div className="flex gap-3 overflow-x-auto pb-2">
               {/* Cover Image */}
               <div className="w-24 h-24 rounded-2xl bg-gray-100 dark:bg-gray-800 flex-shrink-0 relative overflow-hidden ring-2 ring-[#1c64f2] dark:ring-blue-500 ring-offset-2 dark:ring-offset-gray-900 transition-all">
                 <img src="https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&q=80&w=200&h=200" alt="room 1" className="w-full h-full object-cover" />
               </div>
               <div className="w-24 h-24 rounded-2xl bg-gray-100 dark:bg-gray-800 flex-shrink-0 overflow-hidden opacity-80 hover:opacity-100 transition-all cursor-pointer">
                 <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=200&h=200" alt="room 2" className="w-full h-full object-cover" />
               </div>
               <div className="w-24 h-24 rounded-2xl bg-gray-100 dark:bg-gray-800 flex-shrink-0 overflow-hidden opacity-80 hover:opacity-100 transition-all cursor-pointer">
                 <img src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=200&h=200" alt="room 3" className="w-full h-full object-cover" />
               </div>
               <div className="w-24 h-24 rounded-2xl bg-gray-100 dark:bg-gray-800 flex-shrink-0 overflow-hidden opacity-80 hover:opacity-100 transition-all cursor-pointer">
                 <img src="https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?auto=format&fit=crop&q=80&w=200&h=200" alt="room 4" className="w-full h-full object-cover" />
               </div>
               <div className="w-24 h-24 rounded-2xl bg-gray-100 dark:bg-gray-800 flex-shrink-0 overflow-hidden opacity-80 hover:opacity-100 transition-all cursor-pointer">
                 <img src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=200&h=200" alt="room 5" className="w-full h-full object-cover" />
               </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// Helper arrow for inputs
function Chevron({ size = 12, className = "", dir = "up" }: { size?: number, className?: string, dir?: "up" | "down" }) {
  if (dir === "up") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m18 15-6-6-6 6"/>
      </svg>
    )
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m6 9 6 6 6-6"/>
    </svg>
  )
}
