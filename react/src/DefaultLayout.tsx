import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Array yang berisi path di mana Header dan Sidebar tidak akan ditampilkan
  const noHeaderSidebarPaths = ['/auth/signin', '/auth/signup'];

  const shouldShowHeaderSidebar = !noHeaderSidebarPaths.includes(pathname);

  return (
    <div className="flex h-screen bg-gray-100">
      {shouldShowHeaderSidebar && (
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      )}
      <div className="flex flex-col flex-grow">
        {shouldShowHeaderSidebar && (
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        )}
        <main className="flex-grow p-6">{children}</main>
      </div>
    </div>
  );
};

export default DefaultLayout;
