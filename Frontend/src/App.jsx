import { Route, Routes } from "react-router-dom";

import ProductForm from "./components/AdminDashboard/ProductForm";
import ProductUpdate from "./components/AdminDashboard/ProductUpdate";
import Signup from "./components/Authentication/Signup";

import ProductDetails from "./components/ProductDetails/ProductDetails";
import "@fortawesome/fontawesome-free/css/all.min.css";

import WishList from "./components/CartItem/WishList";
import Login from "./components/Authentication/Login";
import Home from "./components/Home/Home";

import Profile from "./components/Profile/Profile";
import Loader from "./components/AlertAndHelper/Loader";
import PurchaseProduct from "./components/PurchaseProduct/PurchaseProduct";
import AdminAllProduct from "./components/AdminDashboard/AdminDashboard";
import SuccessPayment from "./components/Payment/SuccessPayment";
import FailedPayment from "./components/Payment/FailedPayment";

import EmailInput from "./components/ForgotPassword/EmailInput";
import ChangePassword from "./components/ForgotPassword/ChangePassword";
import ResetPassword from "./components/ForgotPassword/ResetPassword";
import MainLoader from "./components/AlertAndHelper/MainLoader";
import NotFound from "./components/NotFound/NotFound";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/productdetails" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cartitem" element={<WishList />} />
        {localStorage.getItem("role") === "ADMIN" && (
          <Route path="/adminAllProduct" element={<AdminAllProduct />} />
        )}
        <Route path="/addProduct" element={<ProductForm />} />
        <Route path="/updateProduct" element={<ProductUpdate />} />
        <Route path="/loader" element={<Loader />} />
        <Route path="/mainloader" element={<MainLoader/>}/>
        <Route path="/orderHistory" element={<PurchaseProduct />} />
        <Route path="/success" element={<SuccessPayment />} />
        <Route path="/failed" element={<FailedPayment />} />
        <Route path="/sendOtp" element={<EmailInput />} />
        <Route path="/verifyOtp" element={<ResetPassword />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
