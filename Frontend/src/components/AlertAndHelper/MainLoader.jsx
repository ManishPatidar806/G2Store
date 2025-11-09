import React from "react";

const MainLoader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gaming-darker">
      <div className="text-center px-4">
        {/* Modern Animated Logo/Icon */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          {/* Outer Ring */}
          <div className="absolute inset-0 rounded-full border-4 border-gaming-accent/30 animate-ping"></div>
          {/* Middle Ring */}
          <div className="absolute inset-2 rounded-full border-4 border-gaming-purple/40 animate-spin"></div>
          {/* Inner Circle */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-gaming-accent via-gaming-purple to-gaming-pink animate-pulse shadow-lg shadow-gaming-accent/50"></div>
          {/* Game Controller Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-16 h-16 text-white animate-float" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
        </div>

        {/* Loading Text */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text">Loading Game Store</span>
        </h1>
        <p className="text-gray-400 text-lg mb-2">
          Please wait while the server starts.
        </p>
        <p className="text-gray-500 text-sm mb-6">
          This may take a few moments as the Spring Boot project initializes.
        </p>
        
        {/* Progress Bar */}
        <div className="max-w-md mx-auto mb-6">
          <div className="h-2 bg-gaming-dark rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-gaming-accent via-gaming-purple to-gaming-pink animate-pulse"
                 style={{ width: '100%' }}></div>
          </div>
        </div>

        {/* Animated Dots */}
        <div className="flex justify-center gap-2">
          <div className="w-3 h-3 bg-gaming-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 bg-gaming-purple rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-3 h-3 bg-gaming-pink rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          <div className="w-3 h-3 bg-gaming-cyan rounded-full animate-bounce" style={{ animationDelay: '450ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default MainLoader;
