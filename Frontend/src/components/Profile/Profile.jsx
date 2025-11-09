import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Alert from "../AlertAndHelper/Alert";
import Navbar from "../HeaderAndFooter/Navbar";
import { useNavigate } from "react-router-dom";
import Loader from "../AlertAndHelper/Loader";
import Footer from "../HeaderAndFooter/Footer";

const Profile = () => {
  const navigate = useNavigate();
  const [changePassword, setChangePassword] = useState(false);
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [errorFlag, setErrorFlag] = useState(false);
  const [success, setSuccess] = useState(true);
  const formRef = useRef();
  const [profileData, setProfileData] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [loader, setLoader] = useState(false);

  const closeDialog = () => setIsVisible(false);



  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true)
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/v1/changePassword/createNewPassword`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess(true);
      console.log(response);
      setErrorFlag(true);
      setErrorMessage(response.data.message);
      setLoader(false);
      
    } catch (error) {
      setSuccess(false);
      setErrorFlag(true);
      setErrorMessage(error.response?.data?.message );
      setLoader(false);
      
    }
  };

  // Delete the Account
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

      setSuccess(true);
      console.log(response);
      setErrorFlag(true);
      setErrorMessage(response.data.message);
      setLoader(false);
      navigate("/login");
    } catch (error) {
      setSuccess(false);
      setErrorFlag(true);
      setErrorMessage(error.response?.data?.message || "An error occurred");
      setLoader(false);
    }
  };

  // Profile data Loaded
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

        setProfileData(response.data.obj);
        setLoader(false);
      } catch (error) {
        setSuccess(false);
      setErrorFlag(true);
      setErrorMessage(
          "Error fetching products:",
          error.response?.data?.message
        );
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
      
      {errorFlag && errorMessage && (
        <Alert
          type={success ? "success" : "danger"}
          message={errorMessage}
          visible={errorFlag}
          setVisible={setErrorFlag}
        />
      )}

      <div className="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-2">
              <span className="gradient-text">Your Profile</span>
            </h1>
            <p className="text-center text-gray-400">Manage your account settings</p>
          </div>

          {/* Profile Card */}
          <div className="card overflow-hidden animate-slide-up">
            <div className="grid md:grid-cols-3 gap-0">
              {/* Profile Sidebar */}
              <div className="bg-gradient-to-br from-gaming-accent/20 to-gaming-purple/20 
                            p-8 flex flex-col items-center justify-center space-y-4 border-b md:border-b-0 md:border-r border-gray-700/50">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gaming-accent shadow-lg shadow-gaming-accent/50">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-gaming-accent rounded-full p-2">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                </div>
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white mb-1">{profileData.name}</h2>
                  <span className="px-4 py-1 bg-gaming-purple/30 rounded-full text-gaming-purple text-sm font-medium">
                    {profileData.role}
                  </span>
                </div>
              </div>

              {/* Profile Content */}
              <div className="md:col-span-2 p-8">
                {!changePassword ? (
                  <div className="space-y-6 animate-fade-in">
                    <div>
                      <h3 className="text-2xl font-bold gradient-text mb-6">Account Information</h3>
                      
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
                          onClick={() => setChangePassword(true)}
                          className="flex-1 px-6 py-3 bg-gradient-to-r from-gaming-accent to-gaming-purple 
                                   hover:from-gaming-accent-light hover:to-purple-500 text-white font-semibold 
                                   rounded-lg transition-all duration-300 transform hover:scale-105 
                                   focus:outline-none focus:ring-2 focus:ring-gaming-accent/50"
                        >
                          <span className="flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/>
                            </svg>
                            Change Password
                          </span>
                        </button>
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
                ) : (
                  <div className="animate-fade-in">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold gradient-text">Change Password</h3>
                      <button
                        onClick={() => setChangePassword(false)}
                        className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
                      >
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                      </button>
                    </div>

                    <form onSubmit={handleSubmit} ref={formRef} className="space-y-5">
                      {[
                        { id: "oldPassword", label: "Current Password", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
                        { id: "newPassword", label: "New Password", icon: "M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" },
                        { id: "confirmPassword", label: "Confirm New Password", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
                      ].map((field) => (
                        <div key={field.id} className="space-y-2">
                          <label htmlFor={field.id} className="block text-sm font-medium text-gray-300">
                            {field.label}
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={field.icon}/>
                              </svg>
                            </div>
                            <input
                              type="password"
                              id={field.id}
                              name={field.id}
                              onChange={handleChange}
                              required
                              className="input-field pl-10"
                              placeholder={`Enter ${field.label.toLowerCase()}`}
                            />
                          </div>
                        </div>
                      ))}

                      <div className="flex gap-3 pt-4">
                        <button
                          type="submit"
                          className="btn-primary flex-1 py-3"
                        >
                          <span className="flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                            </svg>
                            Update Password
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setChangePassword(false)}
                          className="btn-secondary flex-1 py-3"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
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
