import React, { useEffect, useState } from "react";
import axios from "axios";
import Alert from "../AlertAndHelper/Alert";
import Loader from "../AlertAndHelper/Loader";

const Review = ({ productId, adminEmail }) => {
  const [rating, setRating] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const colors = [
    "bg-red-500",
    "bg-purple-500",
    "bg-indigo-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-pink-500",
    "bg-teal-500",
    "bg-orange-500",
    "bg-lime-500",
    "bg-amber-500",
    "bg-cyan-500",
    "bg-rose-500",
    "bg-fuchsia-500",
    "bg-violet-500",
    "bg-sky-500",
    "bg-emerald-500",
    "bg-amber-600",
    "bg-red-600",
    "bg-purple-600",
    "bg-indigo-600",
    "bg-green-600",
    "bg-blue-600",
    "bg-yellow-600",
    "bg-pink-600",
    "bg-teal-600",
    "bg-orange-600",
    "bg-lime-600",
    "bg-amber-600",
    "bg-cyan-600",
    "bg-rose-600",
    "bg-fuchsia-600",
    "bg-violet-600",
    "bg-sky-600",
    "bg-emerald-600",
    "bg-amber-700",
    "bg-red-700",
    "bg-purple-700",
    "bg-indigo-700",
    "bg-green-700",
    "bg-blue-700",
    "bg-yellow-700",
  ];
  const currUser = localStorage.getItem("name");
  const role = localStorage.getItem("role");
  const currUserEmail = localStorage.getItem("email");
  const token = localStorage.getItem("token");
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [visibleReviews, setVisibleReviews] = useState(15);
  const [loader, setLoader] = useState(false);
  const [alert, setAlert] = useState({ type: "success", message: "", visible: false });
  const [isVisible, setIsVisible] = useState(false);
  const closeDialog = () => setIsVisible(false);
  const [reviewId, setReviewId] = useState();
  const handleLoadMore = () => {
    setVisibleReviews((prev) => prev + 15);
  };
  const [formData, setFormData] = useState({
    comment: "",
    star: 0,
  });

  const handleRating = (i) => {
    setRating(i);
    setFormData((prev) => ({ ...prev, star: i }));
  };

  const handleMouseEnter = (i) => {
    setHoveredRating(i);
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`cursor-pointer text-3xl ${
            i <= hoveredRating || i <= rating
              ? "text-yellow-200"
              : "text-gray-400"
          }`}
          onClick={() => handleRating(i)} 
          onMouseEnter={() => handleMouseEnter(i)} 
          onMouseLeave={handleMouseLeave} 
        >
          ★
        </span>
      );
    }
    return stars;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/v1/review/addReview?productId=${productId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setRefresh(!refresh);
      setAlert({ type: "success", message: response.data.message, visible: true });
    } catch (error) {
      setAlert({
        type: "danger",
        message: error.response?.data?.message || "Failed to submit review",
        visible: true,
      });
    } finally {
      setLoader(false);
    }
  };

  const handleDelete = async (reviewId) => {
    setLoader(true);
    try {
      await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/v1/review/deleteReview?reviewId=${reviewId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setRefresh(!refresh);
    } catch (error) {
      setAlert({
        type: "danger",
        message: error.response?.data?.message || "Failed to delete review",
        visible: true,
      });
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    const fetchreview = async () => {
      try {
        setLoader(true);
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/v1/review/findReview?productId=${productId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.status) {
          setReviews(response.data.review);
        }
        setLoader(false);
      } catch (error) {
        setLoader(false);
      }
    };
    fetchreview();
  }, [refresh]);

  if (loader) {
    return <Loader />;
  }

  return (
    <>
      {alert.visible && alert.message && (
        <Alert
          type={alert.type}
          message={alert.message}
          visible={alert.visible}
          setVisible={(visible) => setAlert((prev) => ({ ...prev, visible }))}
        />
      )}
      <div className="container mx-auto p-4 text-white">
        
        <h2 className="text-2xl text-center font-semibold mb-2">
          Leave a Review
        </h2>
        <div className="mb-8 flex flex-col sm:flex-row">
                {role === "USER" && (
            <form
              onSubmit={handleSubmit}
              className="bg-gray-900/90 sm:w-1/2 p-4 rounded-lg"
            >
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="name"
                >
                  Rating
                </label>
                <div className="flex ">{renderStars()}</div>
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="review"
                >
                  Review
                </label>
                <textarea
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  id="review"
                  name="comment"
                  onChange={handleChange}
                  placeholder="Your review"
                  rows="4"
                />
              </div>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
                type="submit"
              >
                Submit
              </button>
            </form>
          )}
          <div
                className={
                  role === "USER"
                    ? "font-roboto sm:w-1/2 text-gray-200 p-0"
                    : "font-roboto w-full text-gray-200 p-0"
                }
          >
            <div className="max-w-2xl mx-auto bg-gray-900/90 shadow-lg rounded-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">User Reviews</h2>

                
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`fas fa-star ${
                          i <
                          Math.round(
                            reviews.reduce(
                              (acc, review) => acc + review.star,
                              0
                            ) / reviews.length
                          )
                            ? "text-yellow-500"
                            : "text-gray-500"
                        }`}
                      ></i>
                    ))}
                  </div>
                  <span className="ml-2 text-xl font-semibold">
                    {reviews.length > 0
                      ? (
                          reviews.reduce(
                            (acc, review) => acc + review.star,
                            0
                          ) / reviews.length
                        ).toFixed(1)
                      : 0}
                  </span>
                </div>

                
                <p className="text-gray-400">
                  Based on {reviews.length} reviews
                </p>

                
                <div className="mt-6">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = reviews.filter(
                      (review) => review.star === star
                    ).length;
                    const percentage =
                      reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                    return (
                      <div key={star} className="flex items-center mb-2">
                        <div className="w-1/5 text-gray-400">{star} stars</div>
                        <div className="w-3/5 bg-gray-700 rounded-full h-2.5">
                          <div
                            className="bg-yellow-500 h-2.5 rounded-full"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <div className="w-1/5 text-right text-gray-400">
                          {percentage.toFixed(1)}%
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <h1 className="text-center text-2xl font-bold mb-8">
          What our customers say
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reviews?.slice(0, visibleReviews).map((review, index) => {
            const randomColor =
              colors[Math.floor(Math.random() * colors.length)];
            return (
               <div key={index} className="bg-gray-900/90 p-4 rounded-lg flex justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={`w-12 h-12 flex items-center justify-center ${randomColor} text-white text-xl font-bold rounded-full`}
                  >
                    {review.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="font-bold">{review.name}</h2>
                    <p className="text-sm text-gray-400">{review.date}</p>
                  </div>
                </div>
                <div className="flex ml-12 items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`fas fa-star ${
                        i < Number(review.star)
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                    ></i>
                  ))}
                 </div>
                <p className="ml-12">{review.comment}</p>
                </div>
                <div className="mt-0">
                  {(review.name === currUser || (role === "ADMIN" && adminEmail === currUserEmail)) && (
                    <button
                      onClick={ ()=>{
                        setIsVisible(true) 
                        setReviewId(review.id)
                      }}
                      className=" ml-12 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2.5 py-1 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                    >
                      X
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-8">
          {visibleReviews < reviews.length && (
            <button
              onClick={handleLoadMore}
              className="bg-blue-600 text-white py-2 px-4 rounded"
            >
              Explore More...
            </button>
          )}
        </div>
      </div>


         
         {isVisible && (
        <div className="z-20 top-0 left-0 flex justify-center bg-black/60 items-center h-screen w-screen fixed">
          <div className=" bg-gray-700 border-8 border-t-red-600 border-gray-700">
            <section className=" p-6">
              <div className="flex gap-4 justify-center items-center">
                <svg
                  className="  text-gray-400 w-12 h-12 dark:text-red-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h1 className=" text-2xl text-center font-bold text-white">
                  Delete Review
                </h1>
              </div>
              <p className="mt-4 text-xl text-gray-300">
                Are you sure to delete the Review?
              </p>

              <footer className="  flex justify-between items-center mt-6">
                <button
                  className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 transition-colors"
                  onClick={() => {
                   handleDelete(reviewId)
                    closeDialog();
                  }}
                >
                  Yes
                </button>
                <button
                  className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 transition-colors"
                  onClick={closeDialog}
                >
                  No
                </button>
              </footer>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default Review;
