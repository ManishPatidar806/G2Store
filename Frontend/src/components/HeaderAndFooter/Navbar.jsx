import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const avatarColor = "bg-gaming-accent";
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");
  const isAdmin = token && role === "ADMIN";
  const isUser = token && role === "USER";

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

  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-gaming-darker/95 backdrop-blur-md border-b border-white/5'
        : 'bg-gaming-darker/90 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-xl bg-gaming-accent flex items-center justify-center">
                <span className="text-white font-bold text-xl">G2</span>
              </div>
              <span className="hidden lg:block text-2xl font-bold text-white">G2Store</span>
            </Link>
            
            
            <div className="hidden lg:flex items-center gap-1">
              <Link
                to="/"
                className="px-4 py-2 text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-all font-medium"
              >
                Home
              </Link>
            
              {isAdmin && (
                <>
                  <Link
                    to="/adminAllProduct"
                    className="px-4 py-2 text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-all font-medium"
                  >
                    Admin Dashboard
                  </Link>
                  <Link
                    to="/adminOrders"
                    className="px-4 py-2 text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-all font-medium"
                  >
                    Order Queue
                  </Link>
                </>
              )}
              {isUser && (
                <Link
                  to="/orderHistory"
                  className="px-4 py-2 text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-all font-medium"
                >
                  Order History
                </Link>
              )}
              {token && (
                <Link
                  to="/profile"
                  className="px-4 py-2 text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-all font-medium"
                >
                  Profile
                </Link>
              )}
            </div>
          </div>

          
          <div className="flex items-center gap-4">
        

            
            {isUser && (
              <Link
                to="/cartitem"
                className="p-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all relative"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </Link>
            )}

            
            {!token ? (
              <div className="hidden sm:flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-5 py-2 text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-all font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2.5 bg-gaming-accent hover:bg-gaming-accent-light text-white rounded-lg transition-all font-semibold shadow-lg shadow-gaming-accent/25"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${avatarColor} flex items-center justify-center text-white font-bold text-sm`}>
                  {name?.charAt(0).toUpperCase()}
                </div>
                <button
                  onClick={handleLogout}
                  className="px-5 py-2 text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-all font-medium"
                >
                  Logout
                </button>
              </div>
            )}

            
            <button
              className="lg:hidden p-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all"
              type="button"
              onClick={toggleDrawer}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      
      <div
        className={`fixed top-0 left-0 z-50 w-80 h-screen overflow-y-auto transition-transform duration-300 ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } bg-gaming-darker backdrop-blur-xl shadow-2xl border-r border-white/10`}
      >
        
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gaming-accent flex items-center justify-center">
              <span className="text-white font-bold text-xl">G2</span>
            </div>
            <span className="text-xl font-bold text-white">G2Store</span>
          </Link>
          <button
            type="button"
            onClick={toggleDrawer}
            className="p-2 rounded-lg hover:bg-white/5 transition-all"
          >
            <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
            </svg>
          </button>
        </div>

        
        {name && (
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full ${avatarColor} flex items-center justify-center text-white font-bold text-lg`}>
                {name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-white font-bold">{name}</p>
                <p className="text-sm text-gray-400">{role}</p>
              </div>
            </div>
          </div>
        )}

        
        <div className="p-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                onClick={toggleDrawer}
                className="flex items-center gap-3 p-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                </svg>
                <span>Home</span>
              </Link>
            </li>

            {token && (
              <>
                {isAdmin && (
                  <li>
                    <Link
                      to="/adminAllProduct"
                      onClick={toggleDrawer}
                      className="flex items-center gap-3 p-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-all"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                      </svg>
                      <span>Admin Dashboard</span>
                    </Link>
                  </li>
                )}
                {isAdmin && (
                  <li>
                    <Link
                      to="/adminOrders"
                      onClick={toggleDrawer}
                      className="flex items-center gap-3 p-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-all"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 3a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V3zm0 7a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6z" />
                      </svg>
                      <span>Order Queue</span>
                    </Link>
                  </li>
                )}
                {isUser && (
                  <>
                    <li>
                      <Link
                        to="/cartitem"
                        onClick={toggleDrawer}
                        className="flex items-center gap-3 p-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-all"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
                        </svg>
                        <span>Cart</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/orderHistory"
                        onClick={toggleDrawer}
                        className="flex items-center gap-3 p-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-all"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                          <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                        </svg>
                        <span>Order History</span>
                      </Link>
                    </li>
                  </>
                )}
                <li>
                  <Link
                    to="/profile"
                    onClick={toggleDrawer}
                    className="flex items-center gap-3 p-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-all"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                    </svg>
                    <span>Profile</span>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleDrawer();
                    }}
                    className="w-full flex items-center gap-3 p-3 rounded-lg text-gray-300 hover:text-white hover:bg-red-500/10 transition-all"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"/>
                    </svg>
                    <span>Logout</span>
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
                    className="flex items-center gap-3 p-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-all"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span>Login</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    onClick={toggleDrawer}
                    className="flex items-center gap-3 p-3 rounded-lg text-white bg-gaming-accent hover:bg-gaming-accent-light transition-all"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"/>
                    </svg>
                    <span>Sign Up</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={toggleDrawer}
        />
      )}
    </nav>
  );
};

export default Navbar;
