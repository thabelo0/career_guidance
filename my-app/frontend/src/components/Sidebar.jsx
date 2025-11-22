// frontend/src/components/Sidebar.jsx
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  LayoutDashboard, 
  Building, 
  Users, 
  BookOpen, 
  FileText,
  UserCheck,
  GraduationCap,
  Settings
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();

  const adminMenu = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Institutes', href: '/admin/institutes', icon: Building },
    { name: 'Faculties', href: '/admin/faculties', icon: Users },
    { name: 'Courses', href: '/admin/courses', icon: BookOpen },
    { name: 'Admissions', href: '/admin/admissions', icon: FileText },
  ];

  const instituteMenu = [
    { name: 'Dashboard', href: '/institute', icon: LayoutDashboard },
    { name: 'Faculties', href: '/institute/faculties', icon: Users },
    { name: 'Courses', href: '/institute/courses', icon: BookOpen },
    { name: 'Applications', href: '/institute/applications', icon: UserCheck },
    { name: 'Admissions', href: '/institute/admissions', icon: FileText },
  ];

  const studentMenu = [
    { name: 'Dashboard', href: '/student', icon: LayoutDashboard },
    { name: 'Browse Institutes', href: '/student/institutes', icon: Building },
    { name: 'My Applications', href: '/student/applications', icon: FileText },
    { name: 'Admissions', href: '/student/admissions', icon: UserCheck },
  ];

  const getMenu = () => {
    switch (user?.role) {
      case 'admin': return adminMenu;
      case 'institute': return instituteMenu;
      case 'student': return studentMenu;
      default: return [];
    }
  };

  const isActive = (href) => {
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  return (
    <div className="w-64 bg-white shadow-lg border-r">
      {/* Logo */}
      <div className="p-6 border-b">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">CareerGuide</h1>
            <p className="text-xs text-gray-500 capitalize">{user?.role} Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-4">
        <div className="px-4 space-y-1">
          {getMenu().map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center space-x-3 px-4 py-3 text-sm rounded-lg transition-colors ${
                isActive(item.href)
                  ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Settings Link */}
      <div className="absolute bottom-4 left-4 right-4">
        <Link
          to="/settings"
          className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors"
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;