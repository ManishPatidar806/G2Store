import React, { useState, useEffect } from "react";
import axios from "axios";
import Alert from "../AlertAndHelper/Alert";
import Navbar from "../HeaderAndFooter/Navbar";
import { useNavigate } from "react-router-dom";
import Loader from "../AlertAndHelper/Loader";
import Footer from "../HeaderAndFooter/Footer";

const Profile = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState({ type: "success", message: "", visible: false });
  const [profileData, setProfileData] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [loader, setLoader] = useState(false);

  const closeDialog = () => setIsVisible(false);




  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    setLoader(true)
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/v1/auth/deleteAccount`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setAlert({ type: "success", message: response.data.message, visible: true });
      setLoader(false);
      navigate("/login");
    } catch (error) {
      setAlert({
        type: "danger",
        message: error.response?.data?.message || "An error occurred",
        visible: true,
      });
      setLoader(false);
    }
  };

  useEffect(() => {
    const fetchProfileData = async () => {
     setLoader(true)
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/v1/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        setProfileData(response.data.data);
        setLoader(false);
      } catch (error) {
        setAlert({
          type: "danger",
          message: error.response?.data?.message || "Error fetching profile",
          visible: true,
        });
        setLoader(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loader) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gaming-darker flex flex-col">
      <Navbar />
      
      {alert.visible && alert.message && (
        <Alert
          type={alert.type}
          message={alert.message}
          visible={alert.visible}
          setVisible={(visible) => setAlert((prev) => ({ ...prev, visible }))}
        />
      )}

      <div className="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-2">
              <span className="text-white">Your Profile</span>
            </h1>
            <p className="text-center text-gray-400">Manage your account settings</p>
          </div>
          <div className="card p-8 space-y-6 animate-fade-in">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Account Information</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-colors">
                  <div className="p-2 bg-gaming-accent/20 rounded-lg">
                    <svg className="w-6 h-6 text-gaming-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-400">Email Address</p>
                    <p className="text-lg text-white font-medium">{profileData.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-colors">
                  <div className="p-2 bg-gaming-cyan/20 rounded-lg">
                    <svg className="w-6 h-6 text-gaming-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-400">Phone Number</p>
                    <p className="text-lg text-white font-medium">{profileData.number}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-700/50">
              <h4 className="text-lg font-semibold text-gray-300 mb-4">Account Actions</h4>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setIsVisible(true)}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 
                           hover:from-red-600 hover:to-red-700 text-white font-semibold 
                           rounded-lg transition-all duration-300 transform hover:scale-105 
                           focus:outline-none focus:ring-2 focus:ring-red-500/50"
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                    Delete Account
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      {isVisible && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in"
          onClick={closeDialog}
        >
          <div 
            className="card max-w-md w-full mx-4 overflow-hidden animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-red-500/20 to-red-600/20 p-6 border-b border-red-500/30">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-500/20 rounded-full">
                  <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Delete Account</h2>
                  <p className="text-red-400 text-sm">This action cannot be undone</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-gray-300 text-lg mb-6">
                Are you sure you want to permanently delete your account? All your data will be lost forever.
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    handleDelete();
                    closeDialog();
                  }}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 
                           hover:from-red-600 hover:to-red-700 text-white font-semibold 
                           rounded-lg transition-all duration-300 transform hover:scale-105 
                           focus:outline-none focus:ring-2 focus:ring-red-500/50"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={closeDialog}
                  className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white 
                           font-semibold rounded-lg transition-all duration-300 
                           focus:outline-none focus:ring-2 focus:ring-gray-500/50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Profile;
