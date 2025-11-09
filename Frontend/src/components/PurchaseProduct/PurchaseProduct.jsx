import React, { useEffect, useState } from "react";
import Navbar from "../HeaderAndFooter/Navbar";
import Footer from "../HeaderAndFooter/Footer";
import axios from "axios";
import Loader from "../AlertAndHelper/Loader";
import Alert from "../AlertAndHelper/Alert";

const PurchaseProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorFlag, setErrorFlag] = useState(false);
  const [success, setSuccess] = useState(true);

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
        setSuccess(false);
        setErrorFlag(true);
        setErrorMessage(error.response?.data.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [refresh]);

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
              <span className="gradient-text">Order History</span>
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
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Product Image */}
                    <div className="relative w-full md:w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>

                    {/* Product Details */}
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
                        <span className="px-4 py-1.5 bg-green-500/20 border border-green-500/30 rounded-full 
                                     text-green-400 text-sm font-medium flex items-center gap-2">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"/>
                          </svg>
                          Purchased
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
