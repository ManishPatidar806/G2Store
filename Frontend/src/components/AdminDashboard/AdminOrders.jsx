import React, { useEffect, useState } from "react";
import Navbar from "../HeaderAndFooter/Navbar";
import Footer from "../HeaderAndFooter/Footer";
import axios from "axios";
import Loader from "../AlertAndHelper/Loader";
import Alert from "../AlertAndHelper/Alert";

const STATUS_OPTIONS = [
  "PAYMENT_SUCCESS",
  "PLACED",
  "APPROVED",
  "READY_TO_SHIP",
  "SHIPPED",
  "DELIVERED",
  "CANCELED",
];

const formatStatus = (status) =>
  status
    ?.toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const statusBadgeClass = (status) => {
  switch (status) {
    case "PAYMENT_SUCCESS":
      return "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30";
    case "PLACED":
      return "bg-blue-500/15 text-blue-300 border border-blue-500/30";
    case "APPROVED":
      return "bg-gaming-accent/15 text-gaming-accent border border-gaming-accent/30";
    case "READY_TO_SHIP":
      return "bg-amber-500/15 text-amber-300 border border-amber-500/30";
    case "SHIPPED":
      return "bg-indigo-500/15 text-indigo-300 border border-indigo-500/30";
    case "DELIVERED":
      return "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30";
    case "CANCELED":
      return "bg-red-500/15 text-red-300 border border-red-500/30";
    default:
      return "bg-white/10 text-gray-200 border border-white/10";
  }
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "success", message: "", visible: false });
  const token = localStorage.getItem("token");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/v1/order/admin/list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status) {
        setOrders(response.data.obj || []);
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

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, status) => {
    try {
      setLoading(true);
      const response = await axios.patch(
        `${import.meta.env.VITE_APP_API_URL}/v1/order/admin/status?orderId=${orderId}&status=${status}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status) {
        setAlert({ type: "success", message: "Order status updated", visible: true });
        fetchOrders();
      }
      setLoading(false);
    } catch (error) {
      setAlert({
        type: "danger",
        message: error.response?.data?.message || "Failed to update status",
        visible: true,
      });
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gaming-darker">
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
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              Order Queue
            </h1>
            <p className="text-gray-400">
              Review payments and move orders through shipping.
            </p>
          </div>

          {orders.length === 0 ? (
            <div className="card p-10 text-center">
              <h2 className="text-2xl font-semibold text-white">No orders yet</h2>
              <p className="text-gray-400 mt-2">New purchases will appear here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="card p-5">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/10">
                        <img
                          src={order.image}
                          alt={order.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">{order.company}</p>
                        <h3 className="text-lg font-semibold text-white">{order.name}</h3>
                        <p className="text-sm text-gray-400">Order ID: {order.id}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadgeClass(
                          order.status
                        )}`}
                      >
                        {formatStatus(order.status)}
                      </span>
                      <span className="text-sm text-gray-300">
                        ₹{order.price}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-sm text-gray-400">
                      Purchased on {order.date}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {STATUS_OPTIONS.map((status) => (
                        <button
                          key={status}
                          onClick={() => updateStatus(order.id, status)}
                          className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
                            order.status === status
                              ? "border-gaming-accent text-gaming-accent"
                              : "border-white/10 text-gray-300 hover:border-gaming-accent/60"
                          }`}
                        >
                          {formatStatus(status)}
                        </button>
                      ))}
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

export default AdminOrders;
