// frontend/src/components/Header.jsx
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, User, Bell, Settings } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();

  const getRoleDisplay = (role) => {
    switch (role) {
      case 'admin': return 'Administrator';
      case 'institute': return 'Institute Manager';
      case 'student': return 'Student';
      default: return 'User';
    }
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="flex justify-between items-center px-6 py-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">CareerGuide</h1>
          <p className="text-gray-600 text-sm">Welcome, {getRoleDisplay(user?.role)}</p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-gray-500 rounded-lg hover:bg-gray-100">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          {/* Settings */}
          <button className="p-2 text-gray-400 hover:text-gray-500 rounded-lg hover:bg-gray-100">
            <Settings className="w-5 h-5" />
          </button>
          
          {/* User Info */}
          <div className="flex items-center space-x-3 border-l pl-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-gray-700">{user?.email}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
            </div>
            
            {/* Logout */}
            <button
              onClick={logout}
              className="flex items-center space-x-1 bg-red-50 text-red-600 px-3 py-2 rounded-lg hover:bg-red-100 transition-colors text-sm"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;