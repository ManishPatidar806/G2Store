import { useState } from "react";
import axios from "axios";
import Alert from "../AlertAndHelper/Alert";
import { useNavigate } from "react-router-dom";
import Loader from "../AlertAndHelper/Loader";
import Navbar from "../HeaderAndFooter/Navbar";
import Footer from "../HeaderAndFooter/Footer";

const ProductForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [errorFlag, setErrorFlag] = useState(false);
  const [success, setSuccess] = useState(true);
  const [loader, setLoader] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    const token = localStorage.getItem("token");

    const uploadData = new FormData();
    Object.keys(formData).forEach((key) => {
      uploadData.append(key, formData[key]);
    });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/v1/product/uploadProduct`,
        uploadData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSuccess(true);
      setErrorFlag(true);
      setErrorMessage(response.data.message);
      setLoader(false);
    } catch (error) {
      setSuccess(false);
      setErrorFlag(true);
      setErrorMessage(error.response?.data?.message || "An error occurred.");
      setLoader(false);
    }
  };

  const renderTextFields = (fields) => {
    return fields.map(({ id, type, label }) => (
      <div className="mb-4" key={id}>
        <label htmlFor={id} className="block text-sm font-medium text-white mb-2">
          {label}
        </label>
        <input
          type={type}
          id={id}
          name={id}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gaming-dark border border-gray-700 rounded-lg text-white 
                   focus:border-gaming-accent focus:ring-1 focus:ring-gaming-accent outline-none transition-all"
          required
        />
      </div>
    ));
  };

  const renderDropdown = (id, label, options) => (
    <div className="mb-4" key={id}>
      <label htmlFor={id} className="block text-sm font-medium text-white mb-2">
        {label}
      </label>
      <select
        id={id}
        name={id}
        onChange={handleChange}
        className="w-full px-4 py-3 bg-gaming-dark border border-gray-700 rounded-lg text-white 
                 focus:border-gaming-accent focus:ring-1 focus:ring-gaming-accent outline-none transition-all"
        required
      >
        <option value="">Select {label}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );

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

      <div className="flex-1 pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold gradient-text text-center mb-8">Add New Game</h1>

          <form onSubmit={handleSubmit} className="bg-gaming-dark/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 space-y-6">
            {/* Basic Info */}
            <div className="grid md:grid-cols-2 gap-4">
              {renderTextFields([
                { id: "name", type: "text", label: "Game Name" },
                { id: "company", type: "text", label: "Company" },
                { id: "largePrice", type: "number", label: "Original Price" },
                { id: "price", type: "number", label: "Sale Price" },
              ])}
            </div>

            {renderDropdown("typeOfProduct", "Category", [
              "Action", "Adventure", "Racing", "Sports", "Simulation", "Survival",
              "Horror", "Superhero", "Puzzle", "Strategy", "Card and Casino",
              "Board", "Fighting", "MOBA",
            ])}

            <div>
              <label className="block text-sm font-medium text-white mb-2">Description</label>
              <textarea
                rows="4"
                name="description"
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gaming-dark border border-gray-700 rounded-lg text-white 
                         focus:border-gaming-accent focus:ring-1 focus:ring-gaming-accent outline-none transition-all resize-none"
                placeholder="Game description..."
                required
              ></textarea>
            </div>

            {/* Images */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Images</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {["mainImage", "image1", "image2", "image3", "image4", "image5"].map((id) => (
                  <div key={id}>
                    <label className="block text-sm text-gray-400 mb-2">
                      {id === "mainImage" ? "Main Image" : id.replace("image", "Image ")}
                    </label>
                    <input
                      type="file"
                      id={id}
                      name={id}
                      onChange={handleChange}
                      className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg 
                               file:border-0 file:text-sm file:font-semibold file:bg-gaming-accent 
                               file:text-white hover:file:bg-gaming-accent/80 file:cursor-pointer"
                      accept="image/*"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* System Requirements */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">System Requirements</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {renderDropdown("processer", "Processor", [
                  "Intel i3 11500H", "Intel i5 12450H", "Intel i7 13250H", "Intel i9 14900HX",
                  "AMD Ryzen 3 7000Hx", "AMD Ryzen 5 4000HS", "AMD Ryzen 7 8000HS", "AMD Ryzen 9 9000HS",
                ])}

                {renderDropdown("graphicCard", "Graphics Card", [
                  "NVIDIA GTX 1050", "NVIDIA GTX 1650", "NVIDIA RTX 2060",
                  "NVIDIA RTX 3060", "NVIDIA RTX 4090", "AMD Radeon RX 570", "AMD Radeon RX 6700",
                ])}

                {renderDropdown("ram", "RAM", ["4GB", "8GB", "16GB", "32GB", "64GB"])}

                {renderDropdown("memory", "Storage", [
                  "20GB SSD", "40GB SSD", "60GB SSD", "80GB SSD", "100GB SSD",
                  "120GB SSD", "140GB SSD", "200GB SSD",
                ])}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 justify-end pt-4">
              <button
                onClick={() => navigate(-1)}
                type="button"
                className="px-6 py-2.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-gaming-accent hover:bg-gaming-accent/80 text-white rounded-lg transition-colors"
              >
                Add Game
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductForm;
