import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Home, 
  TrendingUp, 
  Wallet, 
  BarChart3, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Bell,
  Search,
  ChevronDown,
  PieChart,
  Book
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [appearanceOpen, setAppearanceOpen] = useState(false);
  const [theme, setTheme] = useState('dark'); // placeholder
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Exchange', href: '/exchange', icon: TrendingUp },
    { name: 'Markets', href: '/earn', icon: BarChart3 },
    { name: 'F&O', href: '/wallet', icon: Book },
    { name: 'Portfolio', href: '/portfolio', icon: PieChart },
  ];

  const notifications = [
    { id: 1, message: 'Cointex to just tick size and trading amount precision of spots/margins and perpetual swaps', time: '5 minutes ago' },
    { id: 2, message: 'Cointex to adjust components of several indexes', time: '5 minutes ago' },
    { id: 3, message: 'Cointex to just tick size and trading amount precision of spots/margins and perpetual swaps', time: '1 day ago' },
    { id: 4, message: 'Cryptex wallet uses Achain network service', time: '1 day ago' },
  ];

  const footerNav = [
    { name: 'Home', to: '/dashboard', icon: Home },
    { name: 'Exchange', to: '/exchange', icon: TrendingUp },
    { name: 'Markets', to: '/earn', icon: BarChart3 },
    { name: 'F&O', to: '/wallet', icon: Book },
    { name: 'Portfolio', to: '/portfolio', icon: PieChart },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex flex-1">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          {/* Account Info Section */}
          <div className="flex flex-col items-start px-6 py-6 border-b border-gray-200">
            <div className="flex items-center mb-2">
              <img
                src={user?.avatar || 'https://ui-avatars.com/api/?name=User&background=3b82f6&color=fff'}
                alt="User"
                className="h-10 w-10 rounded-full mr-3"
              />
              <div>
                <div className="text-lg font-bold text-gray-900">{user?.name}</div>
                <div className="text-xs text-gray-500">{user?.email}</div>
              </div>
            </div>
            <div className="flex items-center mt-1 mb-2">
              <span className="text-xs text-green-700 bg-green-100 rounded px-2 py-0.5 font-semibold mr-2">KYC ACTIVE</span>
              <span className="text-xs text-gray-400">UID: {user?.id}</span>
            </div>
            <div className="w-full flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2 mt-2 mb-2">
              <span className="text-xs text-gray-500">Funds</span>
              <span className="font-bold text-lg text-blue-700">₹{user?.balance}</span>
            </div>
          </div>

          <nav className="mt-4 px-4">
            <div className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </a>
                );
              })}
            </div>

            {/* Appearance and Currency Selectors */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700 font-medium">Appearance</span>
                <div className="relative">
                  <button
                    onClick={() => setAppearanceOpen((v) => !v)}
                    className="flex items-center px-2 py-1 border rounded text-sm bg-gray-100 hover:bg-gray-200"
                  >
                    {theme === 'light' ? 'Light' : 'Dark'}
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </button>
                  {appearanceOpen && (
                    <div className="absolute right-0 mt-2 w-28 bg-white rounded shadow border z-50">
                      <button
                        onClick={() => { setTheme('light'); setAppearanceOpen(false); }}
                        className={`block w-full text-left py-2 px-4 hover:bg-gray-100 ${theme === 'light' ? 'font-bold text-blue-600' : ''}`}
                      >
                        Light
                      </button>
                      <button
                        onClick={() => { setTheme('dark'); setAppearanceOpen(false); }}
                        className={`block w-full text-left py-2 px-4 hover:bg-gray-100 ${theme === 'dark' ? 'font-bold text-blue-600' : ''}`}
                      >
                        Dark
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-gray-700 font-medium">Portfolio base currency</span>
                <div className="relative">
                  <select className="border rounded px-2 py-1 text-sm bg-gray-100">
                    <option value="INR">INR</option>
                    <option value="USDT">USDT</option>
                    <option value="BTC">BTC</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <a
                href="/settings"
                className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
              >
                <Settings className="h-5 w-5 mr-3" />
                Settings
              </a>
              <button
                onClick={logout}
                className="flex items-center w-full px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
              >
                <LogOut className="h-5 w-5 mr-3" />
                Logout
              </button>
            </div>
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top navigation */}
          <div className="sticky top-0 z-30 bg-white shadow-sm border-b border-gray-200">
            <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
                >
                  <Menu className="h-6 w-6" />
                </button>
                
                {/* Search */}
                <div className="ml-4 lg:ml-0 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                    className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 relative"
                  >
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                  </button>

                  {notificationsOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      <div className="p-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map((notification) => (
                          <div key={notification.id} className="p-4 border-b border-gray-100 hover:bg-gray-50">
                            <p className="text-sm text-gray-700">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* User menu */}
                <div className="relative">
                  <button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100">
                    <img
                      src={user?.avatar || 'https://ui-avatars.com/api/?name=User&background=3b82f6&color=fff'}
                      alt="User"
                      className="h-8 w-8 rounded-full"
                    />
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Page content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
            {children}
          </main>
        </div>
      </div>
      {/* Footer Navigation Bar */}
      {!(location.pathname === '/add-funds' || location.pathname === '/withdraw' || location.pathname === '/orders') && (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg flex justify-around items-center h-16 lg:hidden">
          {footerNav.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.to}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center px-2 py-1 text-xs font-medium transition-colors duration-200 ${
                    isActive ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'
                  }`
                }
              >
                <Icon className="h-6 w-6 mb-1" />
                {item.name}
              </NavLink>
            );
          })}
        </nav>
      )}
    </div>
  );
};

export default Layout; 