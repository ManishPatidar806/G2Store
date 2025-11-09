import React from "react";
import { useNavigate } from "react-router-dom";

const FailedPayment = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gaming-darker flex items-center justify-center px-4">
      <div className="card max-w-md w-full p-8 text-center animate-scale-in">
        {/* Error Icon with Animation */}
        <div className="relative mb-6">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-red-500 to-red-700 rounded-full 
                        flex items-center justify-center shadow-lg shadow-red-500/50">
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 490 490">
              <polygon points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490 489.292,457.678 277.331,245.004 489.292,32.337"/>
            </svg>
          </div>
          {/* Decorative rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 border-2 border-red-500/30 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-red-500">
            Payment Failed!
          </h1>
          <p className="text-gray-400 text-lg mb-2">
            Your payment could not be processed.
          </p>
          <p className="text-gray-500">
            Please check your payment details and try again.
          </p>
        </div>

        {/* Common Reasons */}
        <div className="mb-6 p-4 bg-red-500/10 rounded-lg border border-red-500/30 text-left">
          <p className="text-sm font-semibold text-red-400 mb-2">Common reasons:</p>
          <ul className="text-sm text-gray-400 space-y-1">
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-0.5">•</span>
              <span>Insufficient funds</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-0.5">•</span>
              <span>Incorrect card details</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-0.5">•</span>
              <span>Payment gateway timeout</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => navigate("/cart")}
            className="btn-primary w-full py-3.5"
          >
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
              </svg>
              Retry Payment
            </span>
          </button>
          
          <button
            onClick={() => navigate("/")}
            className="btn-secondary w-full py-3.5"
          >
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
              Back to Home
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FailedPayment;
