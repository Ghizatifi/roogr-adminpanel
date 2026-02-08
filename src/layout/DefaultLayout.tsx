import React, { useState } from 'react';
import Header from '../components/Header/index';
import Sidebar from '../components/Sidebar/index';
import { Outlet } from 'react-router-dom';

const DefaultLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="min-h-screen bg-[#F9FAFF] dark:bg-[#14141A]">
      <div className="flex h-screen overflow-hidden">
        {/* Overlay mobile : cliquer ferme le sidebar */}
        <div
          role="button"
          tabIndex={0}
          aria-label="Fermer le menu"
          onClick={() => setSidebarOpen(false)}
          onKeyDown={(e) => e.key === 'Escape' && setSidebarOpen(false)}
          className={`fixed inset-0 z-9998 bg-black/50 transition-opacity duration-200 ease-out md:hidden ${
            sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        />
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="relative flex flex-1 flex-col min-w-0 overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} isOpen={isOpen} setIsOpen={setIsOpen}/>
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
