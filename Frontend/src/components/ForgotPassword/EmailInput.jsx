import { useState } from "react";
import axios from "axios";
import Loader from "../AlertAndHelper/Loader";
import Alert from "../AlertAndHelper/Alert";
import { useNavigate } from "react-router-dom";

const EmailInput = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorFlag, setErrorFlag] = useState(false);
  const [success, setSuccess] = useState(true);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true)
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/v1/forgotPassword/sendOtp?email=${email}`
      );
      setSuccess(true);
      setErrorFlag(true);
      setLoader(false);
      setErrorMessage(response.data.message);
      if (response.data.status) {
        navigate('/verifyOtp' ,{state:email});
      }
    } catch (error) {
      setSuccess(false);
      setErrorFlag(true);
      setErrorMessage(error.response?.data?.message || "An error occurred.");
      setLoader(false);
    }
  };

  if (loader) {
    return <Loader />;
  }
  
  return (
    <div className="min-h-screen bg-gaming-darker flex items-center justify-center px-4">
      {errorFlag && errorMessage && (
        <Alert
          type={success ? "success" : "danger"}
          message={errorMessage}
          visible={errorFlag}
          setVisible={setErrorFlag}
        />
      )}
      
      <div className="card max-w-md w-full p-8 animate-fade-in">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-gaming-accent to-gaming-purple rounded-full 
                        flex items-center justify-center shadow-lg shadow-gaming-accent/50">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2a6 6 0 00-6 6v2H4v12h16V10h-2V8a6 6 0 00-6-6zm0 2a4 4 0 014 4v2h-8V8a4 4 0 014-4zm-6 8h12v10H6V12z"/>
            </svg>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">
            <span className="gradient-text">Reset Password</span>
          </h2>
          <p className="text-gray-400">
            Enter your email address to receive a verification code
          </p>
        </div>

        {/* Email Input Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 16">
                  <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                  <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
                </svg>
              </div>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                required
                className="input-field pl-10"
                placeholder="example@gmail.com"
              />
            </div>
          </div>

          <button type="submit" className="btn-primary w-full py-3.5">
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              Send Verification Code
            </span>
          </button>
        </form>

        {/* Back to Login */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/login')}
            className="text-gaming-accent hover:text-gaming-accent-light transition-colors text-sm"
          >
            ← Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailInput;
