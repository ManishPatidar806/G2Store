import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../AlertAndHelper/Loader";
import BackgroundImage from "../../resources/BackgroundImage/BACKGROUND.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [flag, setFlag] = useState(false);
  const [selectrole, Setselectrole] = useState("user");
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRole = (e) => {
    Setselectrole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/v1/auth/login?role=${selectrole}`,
        formData
      );

      if (response.data.status) {
        let token = response.data.token.substring(7);
        localStorage.setItem("token", token);
        navigate("/");
      }
      setLoading(false);
    } catch (error) {
      setError(error.response?.data.message);
      hasError = true;
      setLoading(false);
    }
    setFlag(hasError);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div
      className="min-h-screen w-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gaming-darker/80 backdrop-blur-sm" />
      
      {/* Content */}
      <div className="relative flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen">
        <div className="w-full max-w-md animate-fade-in">
          {/* Logo */}
          <Link to="/" className="flex items-center justify-center mb-6 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gaming-accent to-gaming-purple 
                          flex items-center justify-center shadow-lg group-hover:shadow-gaming-accent/50 
                          transition-all duration-300 group-hover:scale-110">
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <span className="ml-3 text-2xl font-bold gradient-text">G2Store</span>
          </Link>

          {/* Form Card */}
          <div className="card p-8 animate-slide-up">
            <h1 className="text-3xl font-bold text-center mb-2">
              <span className="gradient-text">Welcome Back!</span>
            </h1>
            <p className="text-center text-gray-400 mb-8">Sign in to continue your gaming journey</p>
            
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Email */}
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-200">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  id="email"
                  className="input-field w-full p-3"
                  placeholder="your@email.com"
                  required
                />
              </div>

              {/* Role */}
              <div>
                <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-200">
                  Select Your Role
                </label>
                <select
                  name="role"
                  onChange={handleRole}
                  className="input-field w-full p-3 cursor-pointer"
                >
                  <option value="user">USER</option>
                  <option value="admin">ADMIN</option>
                </select>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-200">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  id="password"
                  placeholder="••••••••"
                  className="input-field w-full p-3"
                  required
                />
              </div>

              {/* Forgot Password */}
              <div className="flex items-center justify-end">
                <Link
                  to="/sendOtp"
                  className="text-sm font-medium text-gaming-accent hover:text-gaming-accent-light 
                           transition-colors duration-200"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Error Message */}
              {flag && error && (
                <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="btn-primary w-full py-3 text-base"
              >
                Sign In
              </button>

              {/* Sign Up Link */}
              <p className="text-sm text-center text-gray-400">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-gaming-accent hover:text-gaming-accent-light 
                           transition-colors duration-200"
                >
                  Sign up
                </Link>
              </p>
            </form>

            {/* Terms */}
            <div className="mt-6 pt-6 border-t border-gray-700/50">
              <p className="text-xs text-center text-gray-500">
                By signing in, you agree to our{" "}
                <Link to="#" className="text-gaming-accent hover:text-gaming-accent-light transition-colors">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="#" className="text-gaming-accent hover:text-gaming-accent-light transition-colors">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
