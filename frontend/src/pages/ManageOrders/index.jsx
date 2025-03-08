import React, { useState, useEffect } from "react";
import OrderService from "../../services/order.service";
import Swal from "sweetalert2";
import { RiDeleteBin3Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
const index = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getAllOrders = async () => {
      try {
        const response = await OrderService.getAllOrders();
        if (response.status === 200) {
          setOrders(response.data);
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops... Get all orders failed",
          text: error?.response?.data?.message || error.message,
          footer: '<a href="">Why do I have this issue?</a>',
        });
      }
    };
    getAllOrders();
  }, []);
  const handleStatusChange = async (orderId, newStatus) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to change the order status to "${newStatus}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          console.log("hello", newStatus);
          //เราใส่ {delivery_status: newStatus} เพราะว่าเราใช้เป็นไปในการ update ข้อมูล
          await OrderService.updateDeliveryStatus(orderId, {
            delivery_status: newStatus,
          });

          setOrders((prevOrders) =>
            prevOrders.map((order) =>
              order._id === orderId
                ? { ...order, delivery_status: newStatus }
                : order
            )
          );
          Swal.fire("Updated!", "Order status has been updated.", "success");
        } catch (error) {
          console.error("Error updating status:", error);
          Swal.fire("Error!", "Failed to update status.", "error");
        }
      }
    });
  };
  return (
    <>
       <div className="p-6 bg-white shadow-lg rounded-xl overflow-hidden">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Recent Transactions</h2>
        <p className="text-gray-600">Details about the last transactions</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
              <th className="p-4 text-left">Order ID</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Total</th>
              <th className="p-4 text-left">Payment Status</th>
              <th className="p-4 text-left">Delivery Status</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b hover:bg-gray-50">
                <td className="p-4 text-gray-900">{order._id}</td>
                <td className="p-4 text-gray-900">{order.email}</td>
                <td className="p-4 text-gray-900">${order.total}</td>
                <td className="p-4">
                  <span className="px-2 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full">
                    {order.payment_status}
                  </span>
                </td>
                <td className="p-4">
                  <select
                    className="border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                    value={order.delivery_status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  >
                    <option value="delivered">Delivered</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="p-4 flex gap-2">
                  <button className="px-4 py-2 bg-gray-900 text-white text-xs font-bold uppercase rounded-lg hover:bg-gray-700">Detail</button>
                  <button className="text-red">
                    <MdDelete className="w-8 h-8" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4 border-t pt-4">
        <button className="px-4 py-2 border rounded-lg text-gray-900 hover:bg-gray-100">Previous</button>
        <div className="flex gap-2">
          <button className="h-8 w-8 border rounded-lg text-gray-900 hover:bg-gray-100">1</button>
          <button className="h-8 w-8 border rounded-lg text-gray-900 hover:bg-gray-100">2</button>
        </div>
        <button className="px-4 py-2 border rounded-lg text-gray-900 hover:bg-gray-100">Next</button>
      </div>
    </div>
    </>
  );
};

export default index;
