import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gaming-darker relative overflow-hidden flex items-center justify-center px-4">
      {/* Matrix-style Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(99, 102, 241, 0.1) 2px, rgba(99, 102, 241, 0.1) 4px)',
          backgroundSize: '100% 4px',
          animation: 'scroll 20s linear infinite'
        }}></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gaming-accent rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
              opacity: 0.3
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Illustration */}
          <div className="relative animate-fade-in">
            <div className="relative">
              {/* Glitch Effect on 404 */}
              <div className="relative">
                <h1 className={`text-[8rem] md:text-[12rem] font-black leading-none transition-all duration-100 ${
                  glitchActive ? 'transform translate-x-2 text-red-500' : ''
                }`}>
                  <span className="bg-gradient-to-r from-gaming-accent via-gaming-purple to-gaming-pink bg-clip-text text-transparent">
                    404
                  </span>
                </h1>
                {glitchActive && (
                  <>
                    <h1 className="absolute top-0 left-0 text-[8rem] md:text-[12rem] font-black leading-none text-cyan-500 opacity-70 transform -translate-x-1">
                      404
                    </h1>
                    <h1 className="absolute top-0 left-0 text-[8rem] md:text-[12rem] font-black leading-none text-red-500 opacity-70 transform translate-x-1">
                      404
                    </h1>
                  </>
                )}
              </div>

              {/* Broken Link Chain Icon */}
              <div className="absolute -top-12 -right-12 animate-float">
                <svg className="w-32 h-32 text-gaming-accent/40" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10.59,13.41C11,13.8 11,14.44 10.59,14.83C10.2,15.22 9.56,15.22 9.17,14.83C7.22,12.88 7.22,9.71 9.17,7.76V7.76L12.71,4.22C14.66,2.27 17.83,2.27 19.78,4.22C21.73,6.17 21.73,9.34 19.78,11.29L18.29,12.78C18.3,11.96 18.17,11.14 17.89,10.36L18.36,9.88C19.54,8.71 19.54,6.81 18.36,5.64C17.19,4.46 15.29,4.46 14.12,5.64L10.59,9.17C9.41,10.34 9.41,12.24 10.59,13.41M13.41,9.17C13.8,8.78 14.44,8.78 14.83,9.17C16.78,11.12 16.78,14.29 14.83,16.24V16.24L11.29,19.78C9.34,21.73 6.17,21.73 4.22,19.78C2.27,17.83 2.27,14.66 4.22,12.71L5.71,11.22C5.7,12.04 5.83,12.86 6.11,13.65L5.64,14.12C4.46,15.29 4.46,17.19 5.64,18.36C6.81,19.54 8.71,19.54 9.88,18.36L13.41,14.83C14.59,13.66 14.59,11.76 13.41,10.59C13,10.2 13,9.56 13.41,9.17Z"/>
                </svg>
              </div>

              {/* Binary Code Background */}
              <div className="absolute inset-0 -z-10 opacity-5 font-mono text-xs overflow-hidden">
                {['01001000', '01100101', '01101100', '01110000'].map((code, i) => (
                  <div key={i} className="animate-pulse" style={{ animationDelay: `${i * 0.5}s` }}>
                    {code}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-8 animate-slide-up">
            {/* Error Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-red-400 text-sm font-semibold">ERROR: PAGE NOT FOUND</span>
            </div>

            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                You've Hit a Dead End
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                The page you're searching for has vanished into the digital void. It might have been deleted, moved, or never existed in the first place.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gaming-accent/5 border border-gaming-accent/20 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-gaming-accent">404</div>
                <div className="text-xs text-gray-500 mt-1">Error Code</div>
              </div>
              <div className="bg-gaming-purple/5 border border-gaming-purple/20 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-gaming-purple">0%</div>
                <div className="text-xs text-gray-500 mt-1">Success Rate</div>
              </div>
              <div className="bg-gaming-pink/5 border border-gaming-pink/20 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-gaming-pink">∞</div>
                <div className="text-xs text-gray-500 mt-1">Other Pages</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/")}
                className="group flex-1 px-6 py-4 bg-gradient-to-r from-gaming-accent to-gaming-purple hover:from-gaming-accent/90 hover:to-gaming-purple/90 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-gaming-accent/20"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                  </svg>
                  Take Me Home
                </span>
              </button>
              
              <button
                onClick={() => navigate(-1)}
                className="flex-1 px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-semibold rounded-lg transition-all duration-300"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                  </svg>
                  Go Back
                </span>
              </button>
            </div>

            {/* Quick Links */}
            <div className="pt-6 border-t border-white/5">
              <p className="text-gray-500 text-sm mb-3">Quick Navigation:</p>
              <div className="flex flex-wrap gap-3">
                {[
                  { name: 'Shop', path: '/' },
                  { name: 'Cart', path: '/cartitem' },
                  { name: 'Profile', path: '/profile' },
                  { name: 'Orders', path: '/orderHistory' }
                ].map((link) => (
                  <button
                    key={link.name}
                    onClick={() => navigate(link.path)}
                    className="px-4 py-2 text-sm text-gaming-accent hover:text-gaming-purple border border-gaming-accent/20 hover:border-gaming-purple/40 rounded-lg transition-all duration-300 hover:scale-105"
                  >
                    {link.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(20px); }
        }
      `}</style>
    </div>
  );
};

export default NotFound;
