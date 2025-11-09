import axios from "axios";
import { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../AlertAndHelper/Loader";
import Alert from "../AlertAndHelper/Alert";



export default function ResetPassword() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);
  const location = useLocation();
  const email = location.state;
  const [errorMessage, setErrorMessage] = useState("");
  const [errorFlag, setErrorFlag] = useState(false);
  const [success, setSuccess] = useState(true);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Allow only numbers
    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if filled
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    setLoader(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/v1/forgotPassword/verifyOtp?email=${email}&otp=${otp.join(
          ""
        )}`
      );
      setSuccess(true);
      setErrorFlag(true);
      setErrorMessage(response.data.message);
      setLoader(false);
      if (response.data.status) {
        navigate("/changePassword", { state: email });
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
          <div className="w-20 h-20 bg-gradient-to-br from-gaming-purple to-gaming-pink rounded-full 
                        flex items-center justify-center shadow-lg shadow-gaming-purple/50">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">
            <span className="gradient-text">Verify OTP</span>
          </h2>
          <p className="text-gray-400 mb-3">
            Enter the 6-digit code sent to
          </p>
          <p className="text-gaming-accent font-medium">{email}</p>
          <p className="text-sm text-gray-500 mt-1">Code expires in 5 minutes</p>
        </div>

        {/* OTP Input */}
        <div className="flex justify-center gap-2 mb-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              ref={(el) => (inputsRef.current[index] = el)}
              className="w-12 h-14 text-center text-xl font-bold bg-gaming-dark border-2 border-gray-700 
                       rounded-lg text-white focus:outline-none focus:border-gaming-accent 
                       transition-colors duration-200"
            />
          ))}
        </div>

        {/* Verify Button */}
        <button
          onClick={handleSubmit}
          className="btn-primary w-full py-3.5 mb-6"
        >
          <span className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
            Verify Code
          </span>
        </button>

        {/* Resend Option */}
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            Didn't receive the code?{" "}
            <button 
              onClick={() => navigate(-1)}
              className="text-gaming-accent hover:text-gaming-accent-light transition-colors font-medium"
            >
              Resend Code
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
