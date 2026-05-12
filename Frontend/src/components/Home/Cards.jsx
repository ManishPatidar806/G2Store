import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../AlertAndHelper/MainLoader";
import Alert from "../AlertAndHelper/Alert";

const Cards = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const [cartStatus, setCartStatus] = useState({});
  const navigate = useNavigate();
  const [alert, setAlert] = useState({ type: "success", message: "", visible: false });
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const isUser = localStorage.getItem("role") === "USER";

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
        setAllProducts(response.data.productList);
        setLoading(false);
      } catch (error) {
        setAlert({
          type: "danger",
          message: error.response?.data?.message || "Failed to load products",
          visible: true,
        });
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
      if (error.response?.data?.message === "Product is already in Cart") {
        setCartStatus((prevStatus) => ({
          ...prevStatus,
          [product.name]: true,
        }));
      }
      setAlert({
        type: "danger",
        message: error.response?.data?.message || "Failed to add item",
        visible: true,
      });
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
      setAlert({
        type: "danger",
        message: error.response?.data?.message || "Failed to remove item from cart",
        visible: true,
      });
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
      setProducts(allProducts);
    } else {
      const filteredProducts = allProducts.filter(
        (product) => product.typeOfProduct === cat
      );
      setProducts(filteredProducts);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div id="games" className="min-h-screen py-24 px-6 sm:px-8 lg:px-12 bg-gaming-darker">
      {alert.visible && alert.message && (
        <Alert
          type={alert.type}
          message={alert.message}
          visible={alert.visible}
          setVisible={(visible) => setAlert((prev) => ({ ...prev, visible }))}
        />
      )}

      
      <div className="max-w-7xl mx-auto mb-16">
        <div className="space-y-4">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
            Browse Games
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl">
            Discover your next favorite game from our curated collection
          </p>
        </div>
      </div>

      
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex flex-wrap gap-3">
          {category.map((cat, index) => (
            <button
              key={index}
              onClick={() => handleCategoryClick(cat)}
              className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-200
                         ${
                           selectedCategory === cat
                             ? "bg-gaming-accent text-white shadow-lg shadow-gaming-accent/25"
                             : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
                         }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div className="mt-6">
          <p className="text-sm text-gray-500">
            {products?.length || 0} {products?.length === 1 ? 'game' : 'games'} available
          </p>
        </div>
      </div>

      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products?.map((product) => (
            <div
              key={product.id}
              className="group bg-white/5 rounded-2xl overflow-hidden border border-white/10
                       hover:border-gaming-accent/50 transition-all duration-300 hover:shadow-2xl hover:shadow-gaming-accent/10"
            >
              
              <div 
                className="relative overflow-hidden cursor-pointer aspect-[3/4] bg-gaming-dark"
                onClick={() => navigate("/productdetails", { state: product })}
              >
                <img
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  src={`${product.main_Image}`}
                  alt={product.name}
                  loading="lazy"
                />
                
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                
                {product.largePrice && (
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1.5 bg-green-500 text-white text-xs font-bold rounded-lg">
                      SALE
                    </span>
                  </div>
                )}
                
                
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1.5 bg-gaming-dark/90 backdrop-blur-sm text-gaming-accent text-xs font-semibold rounded-lg border border-white/10">
                    {product.typeOfProduct}
                  </span>
                </div>
              </div>

              
              <div className="p-5 space-y-4">
                <div
                  onClick={() => navigate("/productdetails", { state: product })}
                  className="cursor-pointer"
                >
                  <h3 className="text-lg font-bold text-white line-clamp-1 group-hover:text-gaming-accent transition-colors">
                    {product.name}
                  </h3>
                </div>

                
                <div className="flex items-center gap-3">
                  {product.largePrice ? (
                    <>
                      <span className="text-2xl font-bold text-white">
                        ₹{product.price}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ₹{product.largePrice}
                      </span>
                      <span className="ml-auto text-xs font-bold text-green-400">
                        {Math.round(
                          ((product.largePrice - product.price) / product.largePrice) * 100
                        )}% OFF
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold text-white">
                      ₹{product.price}
                    </span>
                  )}
                </div>

                
                {isUser && (
                  <button
                    onClick={
                      cartStatus[product.name]
                        ? () => removeProductCart(product.name)
                        : () => addProductCart(product)
                    }
                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-200
                             ${
                               cartStatus[product.name]
                                 ? "bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30"
                                 : "bg-gaming-accent hover:bg-gaming-accent-light text-white shadow-lg shadow-gaming-accent/25"
                             }`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      {cartStatus[product.name] ? (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                          </svg>
                          Remove from Cart
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                          </svg>
                          Add to Cart
                        </>
                      )}
                    </span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        
        {products?.length === 0 && !loading && (
          <div className="text-center py-32">
            <div className="max-w-md mx-auto">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gray-800 
                            flex items-center justify-center">
                <svg className="w-16 h-16 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-white mb-3">No Games Found</h3>
              <p className="text-gray-400 mb-6 text-lg">We couldn't find any games in this category.</p>
              <button 
                onClick={() => handleCategoryClick("All Products")}
                className="px-6 py-3 bg-gaming-accent hover:bg-gaming-accent-light text-white rounded-xl font-semibold transition-all duration-200"
              >
                Browse All Games
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cards;
