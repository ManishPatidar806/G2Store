import React, { useEffect, useState } from "react";
import Navbar from "../HeaderAndFooter/Navbar";
import Footer from "../HeaderAndFooter/Footer";
import axios from "axios";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import Loader from "../AlertAndHelper/Loader";
import Alert from "../AlertAndHelper/Alert";

const WishList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [removeStatus, setRemoveStatus] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorFlag, setErrorFlag] = useState(false);
  const [success, setSuccess] = useState(true);
  const navigate = useNavigate();
  const data = {
    productPaymentRequestList: [],
  };

  // Remove Product from Cart
  const removeProductCart = async (name) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/v1/cartItem/removeToCart?productName=${name}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status) {
        setRemoveStatus(true);
        setRefresh(!refresh);
      }
      setSuccess(true);
      setErrorFlag(true);
      setErrorMessage(response.data.message);
    } catch (error) {
      
      setSuccess(false);
      setErrorFlag(true);
      setErrorMessage(error.response?.data?.message || "Failed to remove item from cart");
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/v1/cartItem/allCartItem`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.status) {
          setUsers(response.data.list);
        }
        setLoading(false);
      } catch (error) {
       
        setSuccess(false);
      setErrorFlag(true);
      setErrorMessage(error.response?.data?.message || "Failed to load cart items");
        setLoading(false);
      }
    };

    fetchProducts();
  }, [refresh]);

  const handlePurchase = async () => {
    const token = localStorage.getItem("token");
    setLoading(true)
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/v1/payment/v2/stripe`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);

      if (response.data.status) {
        window.location.href = response.data.url;
      }
      setLoading(false)
    } catch (error) {
      setSuccess(false);
      setErrorFlag(true);
      setErrorMessage(error.response?.data?.message || "Payment failed");
        setLoading(false);
    
    }
  };

  if (loading) {
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
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-2">
              <span className="gradient-text">Shopping Cart</span>
            </h1>
            <p className="text-center text-gray-400">
              {users.length} {users.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>

          {users.length === 0 ? (
            <div className="card p-12 text-center animate-slide-up">
              <div className="flex flex-col items-center gap-4">
                <div className="w-24 h-24 bg-gaming-accent/20 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gaming-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">Your cart is empty</h2>
                <p className="text-gray-400 mb-4">Add some games to get started!</p>
                <button
                  onClick={() => navigate('/')}
                  className="btn-primary px-8 py-3"
                >
                  Browse Games
                </button>
              </div>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4 animate-slide-up">
                {users.map((product, index) => {
                  // Hidden logic to populate payment data
                  data.productPaymentRequestList.push({
                    productId: product.productId,
                    name: product.name,
                    amount: product.price,
                  });

                  return (
                    <div
                      key={product.id}
                      className="card p-4 hover:shadow-lg hover:shadow-gaming-accent/10 transition-all duration-300 animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex gap-4">
                        <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gaming-pink font-medium mb-1">
                            {product.companyName}
                          </p>
                          <h3 className="text-lg font-bold text-white mb-2 truncate">
                            {product.name}
                          </h3>
                          <div className="flex items-baseline gap-2">
                            <span className="text-xl font-bold text-green-400">
                              ₹{product.price}
                            </span>
                            {product.largePrice && product.largePrice > product.price && (
                              <span className="text-sm line-through text-gray-500">
                                ₹{product.largePrice}
                              </span>
                            )}
                          </div>
                        </div>

                        <button
                          onClick={() => removeProductCart(product.name)}
                          className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg
                                   bg-red-500/20 hover:bg-red-500/30 text-red-500 
                                   transition-all duration-300 hover:scale-110 focus:outline-none"
                          title="Remove from cart"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Price Summary */}
              <div className="lg:col-span-1 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="card p-6 sticky top-24">
                  <h3 className="text-2xl font-bold gradient-text mb-6">
                    Order Summary
                  </h3>

                  <div className="space-y-4">
                    <div className="flex justify-between text-gray-300">
                      <span>Subtotal ({users.length} {users.length === 1 ? 'item' : 'items'})</span>
                      <span>₹{users.reduce((acc, p) => acc + p.price, 0)}</span>
                    </div>

                    <div className="flex justify-between text-gray-300">
                      <span>Discount</span>
                      <span className="text-green-400">
                        -₹{users.reduce((acc, p) => acc + (p.largePrice ? (p.largePrice - p.price) : 0), 0)}
                      </span>
                    </div>

                    <div className="border-t border-gray-700/50 pt-4">
                      <div className="flex justify-between items-baseline mb-6">
                        <span className="text-lg font-semibold text-white">Total Amount</span>
                        <span className="text-3xl font-bold gradient-text">
                          ₹{users.reduce((acc, p) => acc + p.price, 0)}
                        </span>
                      </div>

                      <button
                        onClick={handlePurchase}
                        className="btn-primary w-full py-4 text-lg"
                      >
                        <span className="flex items-center justify-center gap-2">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                          </svg>
                          Proceed to Checkout
                        </span>
                      </button>
                    </div>

                    <div className="pt-4 border-t border-gray-700/50">
                      <div className="flex items-start gap-2 text-sm text-gray-400">
                        <svg className="w-5 h-5 flex-shrink-0 text-gaming-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                        </svg>
                        <span>Secure payment powered by Stripe</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default WishList;
