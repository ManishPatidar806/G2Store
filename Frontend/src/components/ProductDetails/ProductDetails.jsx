import React, { useState } from "react";
import Navbar from "../HeaderAndFooter/Navbar";
import axios from "axios";
import Footer from "../HeaderAndFooter/Footer";
import { useLocation } from "react-router-dom";
import Review from "./Review";
import Loader from "../AlertAndHelper/Loader";
import Alert from "../AlertAndHelper/Alert";

const ProductDetails = () => {
  const location = useLocation();
  const product = location.state;
  const [loader, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorFlag, setErrorFlag] = useState(false);
  const [success, setSuccess] = useState(true);
  const [visible, setVisible] = useState(false);
  const [productStatus, SetProductStatus] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const data = {
    productPaymentRequestList: [],
  };
  
  const mainImages = [
    product.image1,
    product.image2,
    product.image3,
    product.image4,
    product.image5,
  ];

  const images = [
    product.image1,
    product.image2,
    product.image3,
    product.image4,
    product.image5,
  ];

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
        SetProductStatus(false);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data.message === "Product is already in Cart") {
          SetProductStatus(false);
        }
        setSuccess(false);
        setErrorFlag(true);
        setErrorMessage(error.response?.data?.message || "Failed to add item to cart");
      }
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
        SetProductStatus(true);
      }
    } catch (error) {
      setSuccess(false);
      setErrorFlag(true);
      setErrorMessage(error.response?.data?.message || "Failed to remove item from cart");
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handlePayment = async (name, price, id) => {
    setLoader(true);
    data.productPaymentRequestList.push({
      productId: id,
      name: name,
      amount: price,
    });

    const token = localStorage.getItem("token");

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

      if (response.data.status) {
        window.location.href = response.data.url;
      }
      setLoader(false);
    } catch (error) {
      setSuccess(false);
      setErrorFlag(true);
      setErrorMessage(error.response?.data?.message || "Payment failed");
      setLoader(false);
    }
  };

  if (loader) {
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

      {/* Product Header */}
      <div className="flex-1 pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 animate-fade-in">
            <span className="gradient-text">{product?.name}</span>
          </h1>
          <p className="text-center text-gray-400 text-lg">by {product?.company}</p>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4 animate-slide-up">
            {/* Main Image Carousel */}
            <div className="relative card overflow-hidden group">
              <div className="aspect-video">
                {mainImages?.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      index === currentIndex ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 glass-dark p-3 rounded-full
                         opacity-0 group-hover:opacity-100 transition-opacity duration-300
                         hover:bg-gaming-accent/30 focus:outline-none"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                </svg>
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 glass-dark p-3 rounded-full
                         opacity-0 group-hover:opacity-100 transition-opacity duration-300
                         hover:bg-gaming-accent/30 focus:outline-none"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                </svg>
              </button>

              {/* Image Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {mainImages?.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "w-8 bg-gaming-accent"
                        : "w-2 bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-5 gap-2">
              {images?.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`card overflow-hidden aspect-video transition-all duration-300 ${
                    index === currentIndex
                      ? "ring-2 ring-gaming-accent scale-105"
                      : "hover:scale-105 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="card p-6 space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">About this game</h2>
                <p className="text-gray-400 leading-relaxed">{product.description}</p>
              </div>

              <div className="pt-4 border-t border-gray-700/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Publisher</span>
                  <span className="text-gaming-pink font-medium">{product.company}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Release Date</span>
                  <span className="text-gray-300">{product.localDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Total Downloads</span>
                  <span className="text-gaming-cyan font-medium">100M+</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-700/50">
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-4xl font-bold text-green-400">₹{product.price}</span>
                  {product.largePrice && (
                    <span className="text-xl line-through text-gray-500">₹{product.largePrice}</span>
                  )}
                </div>

                {(localStorage.getItem("role") === "USER" || !localStorage.getItem("role")) && (
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        if (!localStorage.getItem("role")) {
                          window.location.href = "/login";
                        } else {
                          productStatus ? addProductCart(product) : removeProductCart(product.name);
                        }
                      }}
                      className={`w-full py-3.5 rounded-lg font-semibold transition-all duration-300
                               transform hover:scale-105 focus:outline-none focus:ring-2 ${
                        productStatus
                          ? "bg-gradient-to-r from-gaming-accent to-gaming-purple hover:from-gaming-accent-light hover:to-purple-500 text-white focus:ring-gaming-accent/50"
                          : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white focus:ring-red-500/50"
                      }`}
                    >
                      <span className="flex items-center justify-center gap-2">
                        {productStatus ? (
                          <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                            </svg>
                            Add to Cart
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                            Remove from Cart
                          </>
                        )}
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        if (!localStorage.getItem("role")) {
                          window.location.href = "/login";
                        } else {
                          handlePayment(product.name, product.price, product.id);
                        }
                      }}
                      className="btn-primary w-full py-3.5"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                        </svg>
                        Buy Now
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* System Requirements */}
        <div className="mt-12 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="card overflow-hidden">
            <button
              onClick={() => setVisible(!visible)}
              className="w-full p-6 flex items-center justify-between hover:bg-gray-700/30 
                       transition-colors duration-200 focus:outline-none"
            >
              <h2 className="text-2xl md:text-3xl font-bold gradient-text">
                System Requirements
              </h2>
              <svg
                className={`w-8 h-8 text-gaming-accent transition-transform duration-300 ${
                  visible ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>

            <div
              className={`transition-all duration-300 overflow-hidden ${
                visible ? "max-h-96" : "max-h-0"
              }`}
            >
              <div className="p-6 pt-0 border-t border-gray-700/50">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-gray-700/30">
                      <span className="text-gray-400">Operating System</span>
                      <span className="text-white font-medium">Windows 11</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-700/30">
                      <span className="text-gray-400">Processor</span>
                      <span className="text-white font-medium">{product.processer}+</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-700/30">
                      <span className="text-gray-400">Graphic Card</span>
                      <span className="text-white font-medium">{product.graphic_card}+</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-gray-700/30">
                      <span className="text-gray-400">Architecture</span>
                      <span className="text-white font-medium">64 bits</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-700/30">
                      <span className="text-gray-400">Storage Space</span>
                      <span className="text-white font-medium">{product.memory}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-700/30">
                      <span className="text-gray-400">Memory (RAM)</span>
                      <span className="text-white font-medium">{product.ram}+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12 animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <Review productId={product.id} adminEmail={product.adminEmail} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetails;
