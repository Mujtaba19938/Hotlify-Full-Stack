import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { KPIs, MainCharts, SecondaryCharts } from './components/Charts';
import { BookingList } from './components/BookingList';
import { RightSidebar } from './components/RightSidebar';
import { Inbox } from './components/Inbox';
import { GuestProfile } from './components/GuestProfile';
import { Rooms } from './components/Rooms';
import { Finance } from './components/Finance';
import { Reviews } from './components/Reviews';
import { Housekeeping } from './components/Housekeeping';
import { Invoice } from './components/Invoice';
import { Calendar } from './components/Calendar';
import { Reservations } from './components/Reservations';
import { CreateNewRoom } from './components/CreateNewRoom';
import { RegisterLogin } from './components/RegisterLogin';


export default function App() {
  const [currentPage, setCurrentPage] = useState('Dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Initialize theme from localStorage or system preference
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      return true;
    }
    if (saved === 'light') {
      return false;
    }
    // Fallback to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  if (currentPage === 'Register & Login') {
    return (
      <RegisterLogin 
        onLoginSuccess={() => setCurrentPage('Dashboard')}
        onGoBack={() => setCurrentPage('Dashboard')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/30 dark:bg-gray-950 flex font-sans text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Sidebar 
        currentPage={currentPage} 
        onPageChange={(page) => {
          setCurrentPage(page);
          setIsMobileMenuOpen(false);
        }} 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      
      <main className="flex-1 lg:ml-64 flex flex-col min-w-0 bg-gray-50/10 dark:bg-gray-950/20 transition-colors duration-300">
        <Header 
          title={currentPage} 
          onMenuClick={() => setIsMobileMenuOpen(true)}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
        
        <div className="p-6 lg:p-8 flex flex-col xl:flex-row gap-6 lg:gap-8 flex-1 w-full relative">
          {currentPage === 'Dashboard' ? (
            <>
              <div className="flex-1 min-w-0">
                <KPIs />
                <MainCharts />
                <SecondaryCharts />
                <BookingList />
                
                <footer className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500 pb-4">
                  <div className="flex gap-4">
                    <span>Copyright © 2026 Hotelify</span>
                    <a href="#" className="hover:text-gray-900">Privacy Policy</a>
                    <a href="#" className="hover:text-gray-900">Term and conditions</a>
                    <a href="#" className="hover:text-gray-900">Contact</a>
                  </div>
                  <div className="flex gap-3">
                    <a href="#" className="hover:text-gray-900 bg-gray-100 p-1.5 rounded-full">fb</a>
                    <a href="#" className="hover:text-gray-900 bg-gray-100 p-1.5 rounded-full">tw</a>
                    <a href="#" className="hover:text-gray-900 bg-gray-100 p-1.5 rounded-full">ig</a>
                    <a href="#" className="hover:text-gray-900 bg-gray-100 p-1.5 rounded-full">in</a>
                  </div>
                </footer>
              </div>
              
              <RightSidebar />
            </>
          ) : currentPage === 'Inbox' ? (
            <Inbox />
          ) : currentPage === 'Guest Profile' ? (
            <GuestProfile />
          ) : currentPage === 'Rooms' ? (
            <Rooms />
          ) : currentPage === 'Finance' ? (
            <Finance />
          ) : currentPage === 'Reviews' ? (
            <Reviews />
          ) : currentPage === 'Housekeeping' ? (
            <Housekeeping />
          ) : currentPage === 'Invoice' ? (
            <Invoice />
          ) : currentPage === 'Calendar' ? (
            <Calendar />
          ) : currentPage === 'Reservations' ? (
            <Reservations />
          ) : currentPage === 'Create New Room' ? (
            <CreateNewRoom />
          ) : (
             <div className="flex-1 flex items-center justify-center text-gray-400 font-medium">
               Select Dashboard, Inbox, Rooms, Finance, Invoice, Housekeeping, Calendar or Reviews from sidebar.
             </div>
          )}
        </div>
      </main>
    </div>
  );
}
