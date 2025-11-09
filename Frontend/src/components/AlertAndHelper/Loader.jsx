import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gaming-darker">
      <div className="text-center">
        {/* Modern Spinner */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          {/* Outer Ring */}
          <div className="absolute inset-0 rounded-full border-4 border-gaming-accent/20"></div>
          {/* Spinning Ring */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-gaming-accent animate-spin"></div>
          {/* Inner Glow */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-gaming-accent/20 to-gaming-purple/20 animate-pulse"></div>
          {/* Center Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-10 h-10 text-gaming-accent animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
        </div>

        {/* Loading Text */}
        <h2 className="text-2xl font-bold mb-2">
          <span className="gradient-text">Loading...</span>
        </h2>
        <p className="text-gray-400">Please wait a moment</p>
        
        {/* Animated Dots */}
        <div className="flex justify-center gap-2 mt-4">
          <div className="w-2 h-2 bg-gaming-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-gaming-purple rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-gaming-pink rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
