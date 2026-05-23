import React from 'react';
import { MoreHorizontal, ArrowUpRight, Star } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell, LabelList, PieChart, Pie } from 'recharts';

const statsData = [
  { name: 'Week 1', value: 40, fill: 'var(--color-pie-2)' },
  { name: 'Week 2', value: 75, fill: 'var(--color-pie-1)' },
  { name: 'Week 3', value: 80, fill: 'var(--color-pie-2)' },
  { name: 'Week 4', value: 78, fill: 'var(--color-pie-1)' }
];

const ratingCategories = [
  { name: 'Location', score: 4.7 },
  { name: 'Value for Money', score: 4.4 },
  { name: 'Facilities / Amenities', score: 4.5 },
  { name: 'Service / Staff', score: 5.0 },
  { name: 'Comfort', score: 4.6 },
  { name: 'Cleanliness', score: 4.8 },
];

const topRooms = [
  {
    id: 1,
    name: 'Deluxe Suite',
    price: 280,
    rating: 4.7,
    occupancy: 92,
    image: 'https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&q=80&w=200&h=150',
    tags: ['view', 'comfortable', 'service', 'spacious']
  },
  {
    id: 2,
    name: 'Executive Suite',
    price: 320,
    rating: 4.9,
    occupancy: 88,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=200&h=150',
    tags: ['modern', 'quiet', 'business', 'lounge']
  },
  {
    id: 3,
    name: 'Premium Deluxe',
    price: 250,
    rating: 4.7,
    occupancy: 85,
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=200&h=150',
    tags: ['elegant', 'cleanliness', 'design', 'relaxing']
  }
];

const userReviews = [
  {
    id: 1,
    name: 'Emily Carter',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    rating: 5.0,
    room: 'Executive Suite',
    date: 'Mar 12 - Mar 15, 2035',
    content: '"Absolutely loved my stay! The staff were so kind and attentive, and the room had an incredible view. Highly recommend for anyone seeking a peaceful retreat."'
  },
  {
    id: 2,
    name: 'Daniel Wong',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    rating: 4.4,
    room: 'Superior Room',
    date: 'Mar 13 - Mar 15, 2035',
    content: '"Great value for money. The room was clean, though the lighting could be softer. Staff were very accommodating and quick to respond to requests."'
  },
  {
    id: 3,
    name: 'Hannah Lee',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    rating: 5.0,
    room: 'Premium Deluxe',
    date: 'Mar 10 - Mar 15, 2035',
    content: '"The atmosphere was warm and elegant. Loved the modern design and cleanliness. The breakfast was delicious and well-presented."'
  },
  {
    id: 4,
    name: 'Liam Johnson',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    rating: 4.3,
    room: 'Standard Room',
    date: 'Mar 13 - Mar 14, 2035',
    content: '"Comfortable and tidy for a short stay. Not many amenities, but the staff made up for it with their great service."'
  }
];

const renderCustomBarLabel = (props: any) => {
  const { x, y, width, value, index } = props;
  const item = statsData[index];
  const isYellow = item.fill.includes('pie-2');
  const textColor = isYellow ? 'var(--color-bar-label-yellow)' : 'var(--color-bar-label-blue)';
  
  return (
    <g transform={`translate(${x + width / 2},${y + 20})`}>
      <text x={0} y={0} dy={0} textAnchor="middle" fill={textColor} fontSize={11} fontWeight={500}>
        {item.name}
      </text>
      <text x={0} y={18} dy={0} textAnchor="middle" fill={textColor} fontSize={14} fontWeight={700}>
        {value}%
      </text>
    </g>
  );
};

export function Reviews() {
  return (
    <div className="flex flex-col gap-6 w-full min-h-[700px]">
      
      {/* Top Row: Statistics, Ratings, Top Rooms */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        
        {/* Review Statistics (col-span-2) */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 xl:col-span-2 flex flex-col">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h3 className="font-semibold text-gray-900 dark:text-white">Review Statistics</h3>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-full flex p-0.5">
              <button className="px-3 py-1 rounded-full text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer">This Week</button>
              <button className="px-3 py-1 rounded-full text-xs font-semibold bg-[#dcf344] dark:bg-blue-600 text-gray-900 dark:text-white shadow-sm transition-colors cursor-pointer">This Month</button>
              <button className="px-3 py-1 rounded-full text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer">This Year</button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="border border-gray-100 dark:border-gray-800 rounded-xl p-4 md:p-5 flex flex-col">
              <span className="text-xs text-gray-500 dark:text-gray-400 mb-2">Total Guests</span>
              <h4 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">1,248 Reviews</h4>
            </div>
            <div className="border border-gray-100 dark:border-gray-800 rounded-xl p-4 md:p-5 flex flex-col">
              <span className="text-xs text-gray-500 dark:text-gray-400 mb-2">Average Rating</span>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 lg:gap-6">
                <h4 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">68.25%</h4>
                <span className="bg-[#dcf344] dark:bg-emerald-500/20 dark:text-emerald-450 dark:border dark:border-emerald-500/30 text-gray-900 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 w-fit">
                  <ArrowUpRight className="h-3 w-3" /> +1.4%
                </span>
              </div>
            </div>
          </div>

          <div className="h-56 w-full mt-auto">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={statsData}
                margin={{ top: 20, right: 0, left: -20, bottom: 0 }}
                barGap={8}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-gray-750)" strokeOpacity={0.6} />
                <XAxis dataKey="name" hide />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 500 }}
                  dx={-10}
                  ticks={[0, 25, 50, 75, 100]}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={80}>
                  {statsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                  <LabelList content={renderCustomBarLabel} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Ratings */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 flex flex-col xl:col-span-1">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-gray-900 dark:text-white">Ratings</h3>
            <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>
          
          <div className="relative aspect-square max-h-[180px] mx-auto w-full flex items-center justify-center mb-6 pt-2">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie
                   data={[{ value: 94, fill: 'var(--color-pie-1)' }, { value: 6, fill: 'var(--color-pie-2)' }]}
                   cx="50%" cy="50%"
                   innerRadius="75%" outerRadius="90%"
                   startAngle={90} endAngle={-270}
                   stroke="none"
                   dataKey="value"
                   cornerRadius={8}
                 >
                 </Pie>
               </PieChart>
             </ResponsiveContainer>
             <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none pb-2 mt-4">
               <span className="text-[11px] text-gray-500 dark:text-gray-405 font-medium mb-1">Excellent Rating</span>
               <h4 className="text-3xl font-bold text-gray-900 dark:text-white leading-none">4.7<span className="text-sm font-semibold text-gray-400 dark:text-gray-500">/5.0</span></h4>
               <span className="text-[10px] text-gray-400 dark:text-gray-500 mt-1.5 font-medium">1,248 Reviews</span>
             </div>
          </div>
          
          <div className="space-y-3.5 mt-auto border-t border-gray-50 dark:border-gray-800 pt-4">
            {ratingCategories.map(cat => (
              <div key={cat.name} className="flex justify-between items-center text-xs">
                <span className="text-gray-500 dark:text-gray-400 font-medium">{cat.name}</span>
                <div className="flex items-center gap-2.5">
                  <span className="font-bold text-gray-900 dark:text-white">{cat.score.toFixed(1)}</span>
                  <div className="flex gap-0.5">
                     {[1,2,3,4,5].map(star => {
                       const isActive = star <= Math.round(cat.score);
                       return (
                         <Star 
                           key={star} 
                           className={`h-[11px] w-[11px] ${
                             isActive 
                               ? 'text-amber-400 dark:text-amber-500 fill-amber-400 dark:fill-amber-500' 
                               : 'text-gray-200 dark:text-gray-700 fill-gray-200 dark:fill-gray-700'
                           }`} 
                         />
                       )
                     })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top-Rated Room Type */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 flex flex-col xl:col-span-1">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-gray-900 dark:text-white">Top-Rated Room Type</h3>
            <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>
          
          <div className="space-y-5 flex-1 overflow-y-auto pr-1">
            {topRooms.map(room => (
              <div key={room.id} className="flex gap-3.5">
                <img src={room.image} alt={room.name} className="w-[84px] h-[84px] rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0 flex flex-col">
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex items-center gap-1.5 flex-1 min-w-0 pr-2">
                      <div className="w-4 h-4 rounded-full bg-[#1c64f2] dark:bg-blue-600 text-white flex justify-center items-center text-[9px] font-bold flex-shrink-0 leading-none pb-px">
                        {room.id}
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-[13px] truncate">{room.name}</h4>
                    </div>
                    <span className="font-bold text-gray-900 dark:text-white text-[13px]">${room.price}<span className="font-medium text-gray-400 dark:text-gray-500 text-[10px]">/night</span></span>
                  </div>
                  
                  <div className="flex items-center gap-1.5 mb-1.5 mt-0.5">
                    <span className="text-[11px] font-bold text-gray-900 dark:text-white">{room.rating.toFixed(1)}</span>
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(star => {
                        const isActive = star <= Math.round(room.rating);
                        return (
                          <Star 
                            key={star} 
                            className={`h-2.5 w-2.5 ${
                              isActive 
                                ? 'text-amber-400 dark:text-amber-500 fill-amber-400 dark:fill-amber-500' 
                                : 'text-gray-200 dark:text-gray-700 fill-gray-200 dark:fill-gray-700'
                            }`} 
                          />
                        )
                      })}
                    </div>
                  </div>
                  
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium mb-2 line-clamp-1">
                    Occupancy Rate <span className="text-gray-700 dark:text-gray-300 font-bold">{room.occupancy}%</span>
                  </span>
                  
                  <div className="flex gap-1.5 flex-wrap mt-auto">
                    {room.tags.map(tag => (
                      <span key={tag} className="text-[9px] font-medium text-gray-500 dark:text-gray-400 bg-gray-50/80 dark:bg-gray-800 px-1.5 py-0.5 rounded leading-tight tracking-wide">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row: User Reviews List */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-semibold text-gray-900 dark:text-white">Reviews</h3>
          <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-full pb-2">
          {userReviews.map(review => (
            <div key={review.id} className="bg-gray-50/50 dark:bg-gray-850/40 rounded-xl p-5 border border-gray-100/50 dark:border-gray-800 flex flex-col transition-all hover:bg-gray-50 dark:hover:bg-gray-800/80">
              <div className="flex items-center gap-3.5 mb-5">
                <img src={review.avatar} alt={review.name} className="w-[42px] h-[42px] rounded-full object-cover flex-shrink-0 shadow-sm" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm leading-tight mb-1">{review.name}</h4>
                  <div className="flex items-center gap-1.5">
                    <div className="flex gap-[3px]">
                       {[1,2,3,4,5].map(star => {
                         const isActive = star <= Math.round(review.rating);
                         return (
                           <Star 
                             key={star} 
                             className={`h-2.5 w-2.5 ${
                               isActive 
                                 ? 'text-amber-400 dark:text-amber-500 fill-amber-400 dark:fill-amber-500' 
                                 : 'text-gray-200 dark:text-gray-700 fill-gray-200 dark:fill-gray-700'
                             }`} 
                           />
                         )
                       })}
                    </div>
                    <span className="text-[10px] font-bold text-gray-700 dark:text-gray-350">{review.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-3">
                <h5 className="text-[13px] font-semibold text-gray-800 dark:text-gray-200 mb-0.5">{review.room}</h5>
                <span className="text-[10px] text-gray-500 dark:text-gray-450 font-medium">{review.date}</span>
              </div>
              
              <p className="text-xs text-gray-655 text-gray-600 dark:text-gray-300 leading-relaxed font-medium mt-1">
                {review.content}
              </p>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}
