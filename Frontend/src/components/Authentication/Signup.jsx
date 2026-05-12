import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../AlertAndHelper/Loader";
import BackgroundImage from "../../resources/BackgroundImage/BACKGROUND.jpg";

const Signup = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [showRolePrompt, setShowRolePrompt] = useState(false);
  const [selectedRole, setSelectedRole] = useState("USER");

  if (loader) {
    return <Loader />;
  }

  const handleGoogleSignup = async (credential) => {
    try {
      setLoader(true);
      setErrorMessage("");
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/v1/auth/google`,
        { idToken: credential }
      );
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        const payload = response.data.data;
        if (payload?.isNewUser) {
          setShowRolePrompt(true);
        } else {
          navigate("/");
        }
      }
      setLoader(false);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Google signup failed");
      setLoader(false);
    }
  };

  const handleRoleSubmit = async () => {
    try {
      setLoader(true);
      setErrorMessage("");
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `${import.meta.env.VITE_APP_API_URL}/v1/auth/role`,
        { role: selectedRole },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        setShowRolePrompt(false);
        navigate("/");
      }
      setLoader(false);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Role update failed");
      setLoader(false);
    }
  };

  useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    let timeoutId;

    const initGoogle = () => {
      const google = window.google;
      if (!clientId || !google?.accounts?.id) {
        timeoutId = setTimeout(initGoogle, 200);
        return;
      }

      google.accounts.id.initialize({
        client_id: clientId,
        callback: (response) => handleGoogleSignup(response.credential),
      });

      const button = document.getElementById("googleSignUp");
      if (button) {
        button.innerHTML = "";
        google.accounts.id.renderButton(button, {
          theme: "outline",
          size: "large",
          width: "100%",
        });
      }
    };

    initGoogle();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <div 
      className="min-h-screen w-screen bg-cover bg-center bg-no-repeat relative flex items-center justify-center"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <div className="absolute inset-0 bg-gaming-darker/90 backdrop-blur-sm" />
      
      <div className="relative flex flex-col items-center justify-center px-6 py-8 mx-auto w-full">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center justify-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-gaming-accent flex items-center justify-center">
              <span className="text-white font-bold text-xl">G2</span>
            </div>
            <span className="ml-3 text-2xl font-bold text-white">G2Store</span>
          </Link>

          <div className="card p-8 shadow-xl">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-white mb-2">
                Create Account
              </h1>
              <p className="text-gray-400">Join our gaming community</p>
            </div>
            
            <div className="space-y-5">
              <p className="text-gray-400 text-sm">
                Create your account with Google. You can choose your role after signup.
              </p>

              {errorMessage && (
                <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                  <p className="text-red-400 text-sm">{errorMessage}</p>
                </div>
              )}

              <div id="googleSignUp" className="w-full" />

              <p className="text-sm text-center text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-gaming-accent hover:text-gaming-accent-light transition-colors"
                >
                  Login
                </Link>
              </p>
            </div>
            </div>
          </div>
        </div>

      {showRolePrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="card w-full max-w-md p-6">
            <h2 className="text-xl font-semibold text-white mb-2">Choose your role</h2>
            <p className="text-sm text-gray-400 mb-4">
              Select the role you want to use in this app.
            </p>
            <select
              value={selectedRole}
              onChange={(event) => setSelectedRole(event.target.value)}
              className="input-field w-full p-3 mb-4"
            >
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
            <button onClick={handleRoleSubmit} className="btn-primary w-full py-3">
              Continue
            </button>
          </div>
        </div>
      )}
      </div>
    
  );
};

export default Signup;
