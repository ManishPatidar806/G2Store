import React from "react";

const MainLoader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gaming-darker relative overflow-hidden">
      
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gaming-accent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gaming-purple rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="text-center px-4 max-w-md relative z-10">
        
        <div className="mb-8 animate-fade-in">
          <div className="relative inline-block">
            
            <div className="absolute inset-0 rounded-2xl bg-gaming-accent/20 animate-pulse"></div>
            <div className="relative w-24 h-24 mx-auto bg-gaming-accent rounded-2xl flex items-center justify-center shadow-2xl shadow-gaming-accent/30">
              <span className="text-white font-bold text-4xl">G2</span>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-white mt-6 mb-2">
            G2Store
          </h1>
          <p className="text-gaming-accent text-sm font-medium tracking-wider uppercase">Gaming Platform</p>
        </div>

        
        <div className="mb-8">
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gaming-accent rounded-full animate-progress"></div>
          </div>
        </div>

        
        <div className="space-y-2">
          <p className="text-white text-base font-medium">
            Initializing Store
            Render take some time to start the application
          </p>
          <div className="flex items-center justify-center gap-1">
            <span className="text-gray-400 text-sm">Please wait</span>
            <span className="text-gaming-accent animate-pulse">.</span>
            <span className="text-gaming-accent animate-pulse" style={{ animationDelay: '0.2s' }}>.</span>
            <span className="text-gaming-accent animate-pulse" style={{ animationDelay: '0.4s' }}>.</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
        .animate-progress {
          animation: progress 2s ease-in-out infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default MainLoader;
