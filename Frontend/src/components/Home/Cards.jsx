import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../AlertAndHelper/MainLoader";
import Alert from "../AlertAndHelper/Alert";

const Cards = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [cartStatus, setCartStatus] = useState({});
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [errorFlag, setErrorFlag] = useState(false);
  const [success, setSuccess] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All Products");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/v1/product/allProducts`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        setProducts(response.data.productList);
        setOriginalProducts(response.data.productList);
        setLoading(false);
      } catch (error) {
        setSuccess(false);
        setErrorFlag(true);
        setErrorMessage(error.response?.data?.message || "An error occurred.");
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const addProductCart = async (product) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/v1/cartItem/addToCart`,
        product,
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
          [product.name]: true,
        }));
      }
    } catch (error) {
      if (error.response.data.message === "Product is already in Cart") {
        setCartStatus((prevStatus) => ({
          ...prevStatus,
          [product.name]: true,
        }));
      }
      setSuccess(false);
      setErrorFlag(true);
      setErrorMessage(error.response?.data?.message || "An error occurred.");
    }
  };

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
        setCartStatus((prevStatus) => ({
          ...prevStatus,
          [name]: false,
        }));
      }
    } catch (error) {
      setSuccess(false);
      setErrorFlag(true);
      setErrorMessage(error.response?.data?.message || "Failed to remove item from cart");
      setLoading(false);
    }
  };

  const category = [
    "All Products",
    "Action",
    "Adventure",
    "Racing",
    "Sports",
    "Simulation",
    "Puzzle",
    "Strategy",
    "Card and Casino",
    "Board",
    "Fighting",
    "MOBA",
  ];

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    if (cat === "All Products") {
      setProducts(originalProducts);
    } else {
      const filteredProducts = originalProducts.filter(
        (product) => product.typeOfProduct === cat
      );
      setProducts(filteredProducts);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div id="games" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      {errorFlag && errorMessage && (
        <Alert
          type={success ? "success" : "danger"}
          message={errorMessage}
          visible={errorFlag}
          setVisible={setErrorFlag}
        />
      )}

      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-12 text-center animate-fade-in">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">
          <span className="gradient-text">Discover</span> Amazing Games
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Browse through our collection of premium games across various genres
        </p>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex flex-wrap items-center justify-center gap-3 animate-slide-up">
          {category.map((cat, index) => (
            <button
              key={index}
              onClick={() => handleCategoryClick(cat)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 
                       transform hover:scale-105 focus:outline-none focus:ring-2 
                       ${
                         selectedCategory === cat
                           ? "bg-gradient-to-r from-gaming-accent to-gaming-purple text-white shadow-lg shadow-gaming-accent/30"
                           : "bg-gray-800/50 text-gray-300 border border-gray-700 hover:border-gaming-accent hover:text-white hover:bg-gray-700/50"
                       }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {products.map((product, index) => (
            <div
              key={index}
              className="card card-glow group animate-scale-in overflow-hidden"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Image Container */}
              <div 
                className="relative overflow-hidden cursor-pointer"
                onClick={() => navigate("/productdetails", { state: product })}
              >
                <img
                  className="w-full h-64 object-cover transform group-hover:scale-110 
                           transition-transform duration-500"
                  src={`${product.main_Image}`}
                  alt={product.name}
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-gaming-darker via-transparent 
                              to-transparent opacity-0 group-hover:opacity-100 transition-opacity 
                              duration-300" />
              </div>

              {/* Content */}
              <div className="p-5">
                <div
                  onClick={() => navigate("/productdetails", { state: product })}
                  className="cursor-pointer"
                >
                  <h5 className="text-xl font-bold text-white mb-2 line-clamp-1 
                               group-hover:text-gaming-accent-light transition-colors duration-200">
                    {product.name}
                  </h5>
                  <p className="text-sm font-medium text-gaming-pink mb-2">
                    {product.company}
                  </p>
                  <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                    {product.name} is a best {product.typeOfProduct} Game. It is
                    Published by {product.company} on {product.localDate}
                  </p>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-2xl font-bold text-green-400">
                      ₹{product.price}
                    </span>
                    {product.largePrice && (
                      <span className="text-sm line-through text-gray-500">
                        ₹{product.largePrice}
                      </span>
                    )}
                  </div>
                </div>

                {/* Add to Cart Button */}
                {localStorage.getItem("role") === "USER" && (
                  <button
                    type="button"
                    onClick={
                      cartStatus[product.name]
                        ? () => removeProductCart(product.name)
                        : () => addProductCart(product)
                    }
                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300
                             transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 
                             ${
                               cartStatus[product.name]
                                 ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white focus:ring-red-500/50"
                                 : "bg-gradient-to-r from-gaming-accent to-gaming-purple hover:from-gaming-accent-light hover:to-purple-500 text-white focus:ring-gaming-accent/50"
                             }`}
                  >
                    {cartStatus[product.name] ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                        Remove from Cart
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                        </svg>
                        Add to Cart
                      </span>
                    )}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {products.length === 0 && !loading && (
          <div className="text-center py-20 animate-fade-in">
            <svg className="w-24 h-24 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
            </svg>
            <h3 className="text-2xl font-bold text-gray-400 mb-2">No Games Found</h3>
            <p className="text-gray-500">Try selecting a different category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cards;
