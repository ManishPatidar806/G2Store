import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../AlertAndHelper/Loader";
import Alert from "../AlertAndHelper/Alert";

const SuccessPayment = () => {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "success", message: "", visible: false });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionIdFromURL = urlParams.get("session_id");

    if (sessionIdFromURL) {
      fetchOrderDetails(sessionIdFromURL);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchOrderDetails = async (sessionId) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/v1/payment/detail/session?sessionId=${sessionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;

      setProduct(data.productPaymentRequestList);

      await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/v1/order/addOrderList`,
        data.productPaymentRequestList,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/v1/cartItem/removeAllCart`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      setAlert({
        type: "danger",
        message: error.response?.data?.message || "Failed to fetch order",
        visible: true,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gaming-darker flex items-center justify-center px-4">
      {alert.visible && alert.message && (
        <Alert
          type={alert.type}
          message={alert.message}
          visible={alert.visible}
          setVisible={(visible) => setAlert((prev) => ({ ...prev, visible }))}
        />
      )}
      
      <div className="card max-w-md w-full p-8 text-center">
        
        <div className="relative mb-6">
          <div className="w-20 h-20 mx-auto bg-emerald-500 rounded-full 
                        flex items-center justify-center">
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"/>
            </svg>
          </div>
        </div>

        
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="text-white">Payment Successful!</span>
          </h1>
          <p className="text-gray-400 text-lg mb-2">
            Thank you for completing your secure online payment.
          </p>
          <p className="text-gray-500">
            Your order has been confirmed and will be processed shortly.
          </p>
        </div>

        
        {product.length > 0 && (
          <div className="mb-6 p-4 bg-gaming-accent/10 rounded-lg border border-gaming-accent/30">
            <p className="text-sm text-gray-400 mb-2">Order Items</p>
            <p className="text-white font-semibold">{product.length} {product.length === 1 ? 'item' : 'items'} purchased</p>
          </div>
        )}

        
        <div className="space-y-3">
          <button
            onClick={() => navigate("/orderHistory")}
            className="btn-primary w-full py-3.5"
          >
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
              View Order History
            </span>
          </button>
          
          <button
            onClick={() => navigate("/")}
            className="btn-secondary w-full py-3.5"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPayment;
