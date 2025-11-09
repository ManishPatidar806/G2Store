import React, { useEffect, useState } from "react";
import Navbar from "../HeaderAndFooter/Navbar";
import Footer from "../HeaderAndFooter/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../AlertAndHelper/Loader";
import Alert from "../AlertAndHelper/Alert";

const AdminAllProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorFlag, setErrorFlag] = useState(false);
  const [success, setSuccess] = useState(true);
  const closeDialog = () => setIsVisible(false);
  const [name, setName] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [cartStatus, setCartStatus] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/v1/product/getAllProducts`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.status) {
          setProducts(response.data.productList);
        }
        setLoading(false);
      } catch (error) {
        setSuccess(false);
        setErrorFlag(true);
        setErrorMessage(error.response?.data?.message || "An error occurred.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, [refresh]);

  const handleDelete = async (name) => {
    try {
      const token = localStorage.getItem("token");
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/v1/product/removeProduct?name=${name}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status) {
        setCartStatus((prevStatus) => ({
          ...prevStatus,
          [name]: false,
        }));
      }
      setLoading(false);
      setRefresh((prev) => !prev);
    } catch (error) {
      setSuccess(false);
      setErrorFlag(true);
      setErrorMessage(error.response?.data?.message || "Failed to delete product");
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
          {/* Page Header with Add Button */}
          <div className="mb-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  <span className="gradient-text">Admin Dashboard</span>
                </h1>
                <p className="text-gray-400">Manage all products</p>
              </div>
              <button
                onClick={() => navigate("/addProduct")}
                className="btn-primary px-6 py-3"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                  </svg>
                  Add New Product
                </span>
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="space-y-4 animate-slide-up">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="card p-6 hover:shadow-lg hover:shadow-gaming-accent/10 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Product Image */}
                  <div className="relative w-full md:w-32 h-40 flex-shrink-0 rounded-lg overflow-hidden">
                    <img
                      src={product.main_Image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="mb-3">
                      <p className="text-xs text-gaming-pink font-medium mb-1">
                        {product.company}
                      </p>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {product.name}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-2">
                        {product.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-green-400">₹{product.price}</span>
                        {product.largePrice && (
                          <span className="text-sm line-through text-gray-500">₹{product.largePrice}</span>
                        )}
                      </div>
                      {product.discount && (
                        <span className="px-3 py-1 bg-red-500/20 border border-red-500/30 rounded-full text-red-400 text-xs font-medium">
                          {product.discount} OFF
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex md:flex-col gap-3 self-end md:self-center">
                    <button
                      onClick={() =>
                        navigate("/updateProduct", { state: products[index] })
                      }
                      className="flex-1 md:flex-none px-6 py-2.5 bg-gradient-to-r from-gaming-accent to-gaming-purple 
                               hover:from-gaming-accent-light hover:to-purple-500 text-white font-semibold 
                               rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                        </svg>
                        Edit
                      </span>
                    </button>
                    <button
                      onClick={() => {
                        setName(product.name);
                        setIsVisible(true);
                      }}
                      className="flex-1 md:flex-none px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 
                               hover:from-red-600 hover:to-red-700 text-white font-semibold 
                               rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                        </svg>
                        Remove
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
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
                  <h2 className="text-2xl font-bold text-white">Delete Product</h2>
                  <p className="text-red-400 text-sm">This action cannot be undone</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-gray-300 text-lg mb-6">
                Are you sure you want to permanently delete this product?
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    handleDelete(name);
                    closeDialog();
                  }}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 
                           hover:from-red-600 hover:to-red-700 text-white font-semibold 
                           rounded-lg transition-all duration-300"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={closeDialog}
                  className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white 
                           font-semibold rounded-lg transition-all duration-300"
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

export default AdminAllProduct;
