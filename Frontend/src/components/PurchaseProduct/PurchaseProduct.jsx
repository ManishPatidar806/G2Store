import React, { useEffect, useState } from "react";
import Navbar from "../HeaderAndFooter/Navbar";
import Footer from "../HeaderAndFooter/Footer";
import axios from "axios";
import Loader from "../AlertAndHelper/Loader";
import Alert from "../AlertAndHelper/Alert";

const PurchaseProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "success", message: "", visible: false });

  const statusSteps = [
    "PAYMENT_SUCCESS",
    "PLACED",
    "APPROVED",
    "READY_TO_SHIP",
    "SHIPPED",
    "DELIVERED",
  ];

  const formatStatus = (status) =>
    status
      ?.toLowerCase()
      .split("_")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/v1/order/getOrderList`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.status) {
          setProducts(response.data.obj);
        }
        setLoading(false);
      } catch (error) {
        setAlert({
          type: "danger",
          message: error.response?.data?.message || "Failed to load orders",
          visible: true,
        });
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
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
        <div className="max-w-7xl mx-auto">
          
          <div className="mb-8 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-2">
              <span className="text-white">Order History</span>
            </h1>
            <p className="text-center text-gray-400">
              View all your purchased items
            </p>
          </div>

          {products.length === 0 ? (
            <div className="card p-12 text-center animate-slide-up">
              <div className="flex flex-col items-center gap-4">
                <div className="w-24 h-24 bg-gaming-accent/20 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gaming-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">No orders yet</h2>
                <p className="text-gray-400 mb-4">Start shopping to see your order history here!</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4 animate-slide-up">
              {products?.map((product, index) => (
                <div
                  key={product.id}
                  className="card p-6 hover:shadow-lg hover:shadow-gaming-accent/10 transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {(() => {
                    const normalizedStatus = (product.status || "PAYMENT_SUCCESS").toUpperCase();
                    const currentIndex = Math.max(
                      statusSteps.indexOf(normalizedStatus),
                      0
                    );
                    const progress =
                      statusSteps.length > 1
                        ? (currentIndex / (statusSteps.length - 1)) * 100
                        : 0;
                    const isCanceled = normalizedStatus === "CANCELED";

                    return (
                      <div className="mb-5">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="text-sm text-gray-400">
                            Tracking status
                          </p>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                              isCanceled
                                ? "border-red-500/40 text-red-300 bg-red-500/10"
                                : "border-gaming-accent/30 text-gaming-accent bg-gaming-accent/10"
                            }`}
                          >
                            {formatStatus(normalizedStatus)}
                          </span>
                        </div>
                        <div className="mt-3">
                          <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                isCanceled
                                  ? "bg-red-500/70"
                                  : "bg-gaming-accent"
                              }`}
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-xs text-gray-400">
                            {statusSteps.map((step, stepIndex) => (
                              <div
                                key={step}
                                className={`text-center px-2 py-1 rounded-lg border ${
                                  stepIndex <= currentIndex && !isCanceled
                                    ? "border-gaming-accent/40 text-gaming-accent"
                                    : "border-white/5"
                                }`}
                              >
                                {formatStatus(step)}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  <div className="flex flex-col md:flex-row gap-6">
                    
                    <div className="relative w-full md:w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>

                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="text-xs text-gaming-pink font-medium mb-1">
                            {product.company}
                          </p>
                          <h3 className="text-xl font-bold text-white mb-2">
                            {product.name}
                          </h3>
                        </div>
                        <span className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full 
                                     text-gray-300 text-sm font-medium">
                          {formatStatus(product.status || "PAYMENT_SUCCESS")}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                          <div>
                            <p className="text-xs text-gray-500">Price Paid</p>
                            <p className="text-lg font-bold text-green-400">₹{product.price}</p>
                          </div>
                        </div>

                        {product.largePrice && (
                          <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                            </svg>
                            <div>
                              <p className="text-xs text-gray-500">Original Price</p>
                              <p className="text-sm line-through text-gray-500">₹{product.largePrice}</p>
                            </div>
                          </div>
                        )}

                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                          </svg>
                          <div>
                            <p className="text-xs text-gray-500">Purchase Date</p>
                            <p className="text-sm text-gray-300">{product.date}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PurchaseProduct;
