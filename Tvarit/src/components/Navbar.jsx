import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, Search, Home } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gov-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <span className="text-xl font-bold text-gov-dark tracking-tight">NagarSamadhan</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className={({ isActive }) => `flex items-center space-x-1 text-sm font-medium transition-colors ${isActive ? 'text-gov-blue' : 'text-gray-500 hover:text-gov-blue'}`}>
              <Home className="w-4 h-4" />
              <span>Home</span>
            </NavLink>
            <NavLink to="/report" className={({ isActive }) => `flex items-center space-x-1 text-sm font-medium transition-colors ${isActive ? 'text-gov-blue' : 'text-gray-500 hover:text-gov-blue'}`}>
              <FileText className="w-4 h-4" />
              <span>Report</span>
            </NavLink>
            <NavLink to="/track" className={({ isActive }) => `flex items-center space-x-1 text-sm font-medium transition-colors ${isActive ? 'text-gov-blue' : 'text-gray-500 hover:text-gov-blue'}`}>
              <Search className="w-4 h-4" />
              <span>Track</span>
            </NavLink>
            <NavLink to="/dashboard" className={({ isActive }) => `flex items-center space-x-1 text-sm font-medium transition-colors ${isActive ? 'text-gov-blue' : 'text-gray-500 hover:text-gov-blue'}`}>
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </NavLink>
          </div>

          <div className="md:hidden">
            <button className="p-2 rounded-md text-gray-500">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
