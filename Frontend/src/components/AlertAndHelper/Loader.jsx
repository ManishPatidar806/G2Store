import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gaming-darker">
      <div className="text-center">
        
        <div className="relative w-24 h-24 mx-auto mb-8">
          
          <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-gaming-accent border-r-gaming-accent animate-spin"></div>
          
          <div className="absolute inset-3 rounded-full border-[3px] border-transparent border-b-white/40 border-l-white/40" 
               style={{ animation: 'spin 1s linear infinite reverse' }}></div>
          
          <div className="absolute inset-6 rounded-full bg-gaming-accent/20 animate-pulse"></div>
        </div>

        
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-3 h-3 rounded-full bg-gaming-accent animate-bounce"></div>
          <div className="w-3 h-3 rounded-full bg-gaming-accent animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 rounded-full bg-gaming-accent animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>

        
        <p className="text-gray-400 text-sm font-medium">Loading content...</p>
      </div>
    </div>
  );
};

export default Loader;
