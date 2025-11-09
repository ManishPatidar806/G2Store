import React, { useEffect, useState } from "react";
import { HeroVideos } from "../../resources/Assets";
import axios from "axios";
import Loader from "../AlertAndHelper/Loader";
import Alert from "../AlertAndHelper/Alert";

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorFlag, setErrorFlag] = useState(false);
  const [success, setSuccess] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const fetchProfileData = async () => {
        setLoading(true);
        const token = localStorage.getItem("token");
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

          localStorage.setItem("name", response.data.obj.name);
          localStorage.setItem("role", response.data.obj.role);
          localStorage.setItem("email", response.data.obj.email);
          setLoading(false);
        } catch (error) {
          setSuccess(false);
          setErrorFlag(true);
          setErrorMessage(
            error.response?.data?.message || "An error occurred."
          );
          setLoading(false);
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

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {errorFlag && errorMessage && (
        <Alert
          type={success ? "success" : "danger"}
          message={errorMessage}
          visible={errorFlag}
          setVisible={setErrorFlag}
        />
      )}

      {/* Video Background */}
      {HeroVideos.map((slide, index) => (
        <div key={index} className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <source src={HeroVideos[index]} type="video/mp4" />
          </video>
        </div>
      ))}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gaming-darker/70 via-gaming-dark/50 to-gaming-darker/90" />

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-4 sm:px-6 lg:px-8 max-w-5xl animate-fade-in">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up">
            <span className="gradient-text">Welcome to</span>
            <br />
            <span className="text-white">G2Store</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-8 animate-slide-up" 
             style={{ animationDelay: '0.2s' }}>
            Discover the best gaming experiences
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" 
               style={{ animationDelay: '0.4s' }}>
            <a
              href="#games"
              className="btn-primary px-8 py-4 text-lg"
            >
              Explore Games
            </a>
           
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 sm:left-8 -translate-y-1/2 z-10
                 glass-dark p-4 rounded-full hover:bg-gaming-accent/30 
                 transition-all duration-300 group focus:outline-none focus:ring-2 
                 focus:ring-gaming-accent/50"
      >
        <svg
          className="w-6 h-6 text-white group-hover:scale-110 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 sm:right-8 -translate-y-1/2 z-10
                 glass-dark p-4 rounded-full hover:bg-gaming-accent/30 
                 transition-all duration-300 group focus:outline-none focus:ring-2 
                 focus:ring-gaming-accent/50"
      >
        <svg
          className="w-6 h-6 text-white group-hover:scale-110 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {HeroVideos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-12 bg-gaming-accent shadow-lg shadow-gaming-accent/50"
                : "w-2 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-slow">
        <svg
          className="w-6 h-6 text-white/70"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;
