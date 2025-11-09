import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const colors = [
    "bg-gradient-to-br from-gaming-accent to-gaming-purple",
    "bg-gradient-to-br from-gaming-purple to-gaming-pink",
    "bg-gradient-to-br from-gaming-pink to-gaming-accent",
    "bg-gradient-to-br from-blue-500 to-cyan-500",
    "bg-gradient-to-br from-purple-500 to-indigo-500",
    "bg-gradient-to-br from-pink-500 to-rose-500",
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const toggleSearch = () => {
    setIsSearchVisible((prevState) => !prevState);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'glass-dark shadow-xl' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Menu Button & Logo */}
          <div className="flex items-center gap-4">
            <button
              className="group relative p-2.5 rounded-xl bg-gradient-to-r from-gaming-accent to-gaming-purple
                       hover:shadow-lg hover:shadow-gaming-accent/50 transition-all duration-300
                       focus:outline-none focus:ring-2 focus:ring-gaming-accent/50"
              type="button"
              onClick={toggleDrawer}
            >
              <svg
                className="w-6 h-6 text-white transform group-hover:scale-110 transition-transform"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                />
              </svg>
            </button>
            
            <Link to="/" className="hidden md:flex items-center space-x-2 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gaming-accent to-gaming-purple 
                            flex items-center justify-center shadow-lg group-hover:shadow-gaming-accent/50 
                            transition-all duration-300 group-hover:scale-110">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <span className="text-xl font-bold gradient-text">G2Store</span>
            </Link>
          </div>

          {/* Search & Actions */}
          <div className="flex items-center gap-3">
            {/* Desktop Search */}
            <div className="hidden md:block relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                className="input-field pl-10 pr-4 py-2.5 w-64 xl:w-80 
                         focus:w-96 transition-all duration-300"
                placeholder="Search games..."
              />
            </div>

            {/* Mobile Search Toggle */}
            <button
              type="button"
              onClick={toggleSearch}
              className="md:hidden p-2.5 rounded-xl glass-dark hover:bg-gray-700/50 
                       transition-all duration-300 focus:outline-none focus:ring-2 
                       focus:ring-gaming-accent/50"
            >
              <svg
                className="w-5 h-5 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchVisible && (
          <div className="md:hidden pb-4 animate-slide-down">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                className="input-field pl-10 pr-4 py-2.5 w-full"
                placeholder="Search games..."
              />
            </div>
          </div>
        )}
      </div>

      {/* Drawer component */}
      <div
        className={`fixed top-0 left-0 z-50 w-72 h-screen overflow-y-auto transition-transform duration-300 ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } glass-dark backdrop-blur-xl shadow-2xl`}
        tabIndex="-1"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-700/50">
          <h5 className="text-xl font-bold gradient-text">
            G2Store
          </h5>
          <button
            type="button"
            onClick={toggleDrawer}
            className="p-2 rounded-lg hover:bg-gray-700/50 transition-colors duration-200 
                     focus:outline-none focus:ring-2 focus:ring-gaming-accent/50"
          >
            <svg
              className="w-5 h-5 text-gray-400 hover:text-white transition-colors"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* User Profile Section */}
        {localStorage.getItem("name") && (
          <div className="p-5 border-b border-gray-700/50">
            <div className="flex flex-col items-center">
              <div
                className={`w-16 h-16 flex items-center justify-center ${randomColor} 
                          text-white text-2xl font-bold rounded-full shadow-lg mb-3 
                          ring-4 ring-gray-700/50`}
              >
                {localStorage.getItem("name")?.charAt(0).toUpperCase()}
              </div>
              <p className="text-lg font-semibold text-white">
                {localStorage.getItem("name")}
              </p>
              <p className="text-sm text-gaming-accent-light font-medium mt-1">
                {localStorage.getItem("role")}
              </p>
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <div className="p-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                onClick={toggleDrawer}
                className="flex items-center gap-3 p-3 rounded-xl text-gray-300 hover:text-white
                         hover:bg-gray-700/50 transition-all duration-200 group"
              >
                <svg className="w-6 h-6 text-gaming-accent group-hover:scale-110 transition-transform" 
                     fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                </svg>
                <span className="font-medium">Home</span>
              </Link>
            </li>

            {localStorage.getItem("role") === "ADMIN" && (
              <li>
                <Link
                  to="/adminAllProduct"
                  onClick={toggleDrawer}
                  className="flex items-center gap-3 p-3 rounded-xl text-gray-300 hover:text-white
                           hover:bg-gray-700/50 transition-all duration-200 group"
                >
                  <svg className="w-6 h-6 text-gaming-purple group-hover:scale-110 transition-transform" 
                       fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                  </svg>
                  <span className="font-medium">Admin Dashboard</span>
                </Link>
              </li>
            )}

            {localStorage.getItem("role") === "USER" && (
              <>
                <li>
                  <Link
                    to="/cartitem"
                    onClick={toggleDrawer}
                    className="flex items-center gap-3 p-3 rounded-xl text-gray-300 hover:text-white
                             hover:bg-gray-700/50 transition-all duration-200 group"
                  >
                    <svg className="w-6 h-6 text-gaming-pink group-hover:scale-110 transition-transform" 
                         fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
                    </svg>
                    <span className="font-medium">Cart</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/orderHistory"
                    onClick={toggleDrawer}
                    className="flex items-center gap-3 p-3 rounded-xl text-gray-300 hover:text-white
                             hover:bg-gray-700/50 transition-all duration-200 group"
                  >
                    <svg className="w-6 h-6 text-gaming-cyan group-hover:scale-110 transition-transform" 
                         fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                    </svg>
                    <span className="font-medium">Order History</span>
                  </Link>
                </li>
              </>
            )}

            {localStorage.getItem("token") && (
              <>
                <li>
                  <Link
                    to="/profile"
                    onClick={toggleDrawer}
                    className="flex items-center gap-3 p-3 rounded-xl text-gray-300 hover:text-white
                             hover:bg-gray-700/50 transition-all duration-200 group"
                  >
                    <svg className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform" 
                         fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                    </svg>
                    <span className="font-medium">Profile</span>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleDrawer();
                    }}
                    className="w-full flex items-center gap-3 p-3 rounded-xl text-gray-300 hover:text-white
                             hover:bg-red-500/20 transition-all duration-200 group"
                  >
                    <svg className="w-6 h-6 text-red-400 group-hover:scale-110 transition-transform" 
                         fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"/>
                    </svg>
                    <span className="font-medium">Logout</span>
                  </button>
                </li>
              </>
            )}

            {!localStorage.getItem("token") && (
              <>
                <li>
                  <Link
                    to="/login"
                    onClick={toggleDrawer}
                    className="flex items-center gap-3 p-3 rounded-xl text-gray-300 hover:text-white
                             hover:bg-gray-700/50 transition-all duration-200 group"
                  >
                    <svg className="w-6 h-6 text-green-400 group-hover:scale-110 transition-transform" 
                         fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span className="font-medium">Login</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    onClick={toggleDrawer}
                    className="flex items-center gap-3 p-3 rounded-xl text-gray-300 hover:text-white
                             hover:bg-gray-700/50 transition-all duration-200 group"
                  >
                    <svg className="w-6 h-6 text-purple-400 group-hover:scale-110 transition-transform" 
                         fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"/>
                    </svg>
                    <span className="font-medium">Sign Up</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      {/* Backdrop */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fade-in"
          onClick={toggleDrawer}
        />
      )}
    </nav>
  );
};

export default Navbar;
