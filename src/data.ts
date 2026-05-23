export const revenueData = [
  { name: 'Jan', value: 270000 },
  { name: 'Feb', value: 280000 },
  { name: 'Mar', value: 390000 },
  { name: 'Apr', value: 260000 },
  { name: 'May', value: 370000 },
  { name: 'Jun', value: 380000 },
];

export const occupancyData = [
  { name: '12 Jun', occupied: 70, available: 30 },
  { name: '13 Jun', occupied: 45, available: 55 },
  { name: '14 Jun', occupied: 60, available: 40 },
  { name: '15 Jun', occupied: 72, available: 28 },
  { name: '16 Jun', occupied: 68, available: 32 },
  { name: '17 Jun', occupied: 65, available: 35 },
  { name: '18 Jun', occupied: 50, available: 50 },
];

export const bookingSourceData = [
  { name: 'Direct Website', value: 42, fill: 'var(--color-pie-1)' },
  { name: 'Online Travel Agencies (OTA)', value: 33, fill: 'var(--color-pie-foodbev)' },
  { name: 'Walk-In Guests', value: 15, fill: 'var(--color-pie-2)' },
  { name: 'Corporate Partnerships', value: 10, fill: 'var(--color-pie-remaining)' },
];

export const ratingData = [
  { category: 'Cleanliness', score: 4.8 },
  { category: 'Comfort', score: 4.6 },
  { category: 'Service / Staff', score: 4.9 },
  { category: 'Facilities / Amenities', score: 4.5 },
  { category: 'Value for Money', score: 4.6 },
  { category: 'Location', score: 4.7 },
];

export const tasksData = [
  { id: 1, title: 'Confirm Group Booking for VIP Guests', date: 'March 12, 2035', completed: false },
  { id: 2, title: 'Update Room Maintenance Schedule', date: 'March 13, 2035', completed: false },
  { id: 3, title: 'Review Monthly Revenue Report', date: 'March 14, 2035', completed: false },
  { id: 4, title: 'Coordinate Staff Shift Assignments', date: 'March 15, 2035', completed: false },
];

export const activitiesData = [
  {
    id: 1,
    user: 'Front Desk Admin',
    action: 'Checked in Emily Carter to Room 210 (Deluxe Suite).',
    time: '09:45 AM',
    type: 'check-in'
  },
  {
    id: 2,
    user: 'Housekeeping Team',
    action: 'Marked Room 305 as Clean & Ready.',
    time: '09:20 AM',
    type: 'cleaning'
  },
  {
    id: 3,
    user: 'Manager approved',
    action: 'Checked in Emily Carter to Room 210 (Deluxe Suite) rooms reserved.', // Adapted from screenshot
    time: '08:30 AM',
    type: 'approval'
  },
  {
    id: 4,
    user: 'Reservation Staff',
    action: 'Confirmed corporate booking for TechVision Ltd.',
    time: '08:30 AM',
    type: 'reservation'
  },
  {
    id: 5,
    user: 'System Update - Revenue report',
    action: 'For March 2035 successfully generated and saved.',
    time: '08:00 AM',
    type: 'system'
  }
];

export const bookingsData = [
  { id: '#BKG-1024', name: 'Emily Carter', roomType: 'Deluxe Suite', roomNo: '210', duration: '3 Nights', dates: 'Mar 10 - Mar 13, 2035', status: 'Checked-In' },
  { id: '#BKG-1025', name: 'Daniel Wong', roomType: 'Superior Room', roomNo: '315', duration: '2 Nights', dates: 'Mar 11 - Mar 13, 2035', status: 'Pending' },
  { id: '#BKG-1026', name: 'Sophia Riviera', roomType: 'Executive Suite', roomNo: '108', duration: '4 Nights', dates: 'Mar 09 - Mar 13, 2035', status: 'Reserved' },
  { id: '#BKG-1027', name: 'Liam Johnson', roomType: 'Deluxe Suite', roomNo: '412', duration: '1 Nights', dates: 'Mar 12 - Mar 13, 2035', status: 'Checked-Out' },
  { id: '#BKG-1028', name: 'Hannah Lee', roomType: 'Standard Room', roomNo: '205', duration: '5 Nights', dates: 'Mar 10 - Mar 15, 2035', status: 'Checked-In' },
];
