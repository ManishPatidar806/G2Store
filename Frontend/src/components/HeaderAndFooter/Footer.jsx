import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const isAdmin = token && role === "ADMIN";
  const isUser = token && role === "USER";
  
  return (
    <footer className="bg-gaming-darker border-t border-white/10 mt-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gaming-accent flex items-center justify-center">
                <span className="text-white font-bold text-xl">G2</span>
              </div>
              <span className="text-2xl font-bold text-white">G2Store</span>
            </Link>
            <p className="text-gray-400 leading-relaxed">
              Your premium gaming platform for discovering and purchasing the latest games.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-gaming-accent text-gray-400 hover:text-white transition-all">
                <i className="fab fa-facebook-f text-base"></i>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-gaming-accent text-gray-400 hover:text-white transition-all">
                <i className="fab fa-twitter text-base"></i>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-gaming-accent text-gray-400 hover:text-white transition-all">
                <i className="fab fa-discord text-base"></i>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-gaming-accent text-gray-400 hover:text-white transition-all">
                <i className="fab fa-youtube text-base"></i>
              </a>
            </div>
          </div>

          
          <div className="space-y-5">
            <h3 className="text-white font-bold text-lg">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/#games" className="text-gray-400 hover:text-white transition-colors">Browse Games</Link>
              </li>
              {isAdmin && (
                <li>
                  <Link to="/adminAllProduct" className="text-gray-400 hover:text-white transition-colors">Admin Dashboard</Link>
                </li>
              )}
              {isAdmin && (
                <li>
                  <Link to="/adminOrders" className="text-gray-400 hover:text-white transition-colors">Order Queue</Link>
                </li>
              )}
              {isUser && (
                <>
                  <li>
                    <Link to="/cartitem" className="text-gray-400 hover:text-white transition-colors">Cart</Link>
                  </li>
                  <li>
                    <Link to="/orderHistory" className="text-gray-400 hover:text-white transition-colors">Order History</Link>
                  </li>
                </>
              )}
          
            </ul>
          </div>

          
          <div className="space-y-5">
            <h3 className="text-white font-bold text-lg">Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">Action</Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">Adventure</Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">Racing</Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">Strategy</Link>
              </li>
            </ul>
          </div>

          
          <div className="space-y-5">
            <h3 className="text-white font-bold text-lg">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">Help Center</Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>

        
        <div className="pt-8 border-t border-white/10">
          <p className="text-center text-gray-400 text-sm">
            © {currentYear} <span className="text-white font-semibold">G2Store</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
