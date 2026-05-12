import React, { useEffect, useState } from "react";
import { HeroVideos } from "../../resources/Assets";
import { Link } from "react-router-dom";
import axios from "axios";
import Alert from "../AlertAndHelper/Alert";

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [alert, setAlert] = useState({ type: "success", message: "", visible: false });

  useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
      const fetchProfileData = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_APP_API_URL}/v1/auth/profile`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          localStorage.setItem("name", response.data.data.name);
          localStorage.setItem("role", response.data.data.role);
          localStorage.setItem("email", response.data.data.email);
        } catch (error) {
          setAlert({
            type: "danger",
            message: error.response?.data?.message || "Failed to load profile",
            visible: true,
          });
        }
      };

      fetchProfileData();
    }
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % HeroVideos.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + HeroVideos.length) % HeroVideos.length
    );
  };

  return (
    <div className="relative w-full min-h-screen bg-gaming-darker overflow-hidden">
      {alert.visible && alert.message && (
        <Alert
          type={alert.type}
          message={alert.message}
          visible={alert.visible}
          setVisible={(visible) => setAlert((prev) => ({ ...prev, visible }))}
        />
      )}

      {/* Video background */}
      {HeroVideos.map((slide, index) => (
        <div key={index} className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            className={`w-full h-full object-cover ${
              index === currentIndex ? "opacity-70" : "opacity-0"
            } transition-opacity duration-500`}
          >
            <source src={HeroVideos[index]} type="video/mp4" />
          </video>
        </div>
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center py-20">
        <div className="max-w-7xl mx-auto px-6 w-full">
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left side */}
            <div className="space-y-6">
              
              {/* Top label */}
              <div className="flex items-center gap-2">
                <div className="w-12 h-0.5 bg-gaming-accent" />
                <span className="text-sm text-gaming-accent font-semibold uppercase tracking-wide">
                  Gaming Store 2025
                </span>
              </div>

              {/* Main heading */}
              <h1 className="text-5xl lg:text-6xl font-black text-white leading-tight">
                Buy Games.
                <br />
                Play Instantly.
                <br />
                <span className="text-gaming-accent">Save Money.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg text-gray-300 max-w-lg">
                Over 1000+ games from AAA titles to indie gems. Instant delivery, 
                secure payments, and real human support when you need help.
              </p>

              {/* CTA buttons */}
              <div className="flex gap-3 pt-4">
                <a
                  href="#games"
                  className="px-7 py-3 bg-gaming-accent hover:bg-gaming-accent-light text-white font-bold 
                           transition-colors shadow-lg"
                >
                  Browse Games
                </a>
                {!localStorage.getItem("token") && (
                  <Link
                    to="/signup"
                    className="px-7 py-3 border-2 border-white text-white hover:bg-white hover:text-gaming-darker 
                             font-bold transition-all"
                  >
                    Sign Up
                  </Link>
                )}
              </div>

            </div>

            {/* Right side */}
            <div className="space-y-4">
              
              {/* Info box 1 */}
              <div className="bg-gaming-dark/70 border border-white/10 p-6 hover:border-gaming-accent/50 transition-colors">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gaming-accent/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-gaming-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Instant Access</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      Get your game key immediately. No waiting for emails or downloads from slow servers.
                    </p>
                  </div>
                </div>
              </div>

              {/* Info box 2 */}
              <div className="bg-gaming-dark/70 border border-white/10 p-6 hover:border-gaming-purple/50 transition-colors">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gaming-purple/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-gaming-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Best Prices</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      We compare prices daily to make sure you're getting the best deal available.
                    </p>
                  </div>
                </div>
              </div>

              {/* Info box 3 */}
              <div className="bg-gaming-dark/70 border border-white/10 p-6 hover:border-gaming-cyan/50 transition-colors">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gaming-cyan/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-gaming-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Secure Payment</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      All transactions are encrypted and processed through secure payment gateways.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom carousel controls */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/40 px-4 py-2 backdrop-blur-sm">
        <button onClick={prevSlide} className="text-white/60 hover:text-white p-1" aria-label="Previous">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        {HeroVideos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`transition-all ${
              index === currentIndex ? "w-6 h-1 bg-gaming-accent" : "w-1 h-1 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
        
        <button onClick={nextSlide} className="text-white/60 hover:text-white p-1" aria-label="Next">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
