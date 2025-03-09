import React, { useEffect, useState } from "react";
import OrderService from "../services/order.service";
import ProductServices from "../services/product.service";
import Swal from "sweetalert2";

const ModalOrderdt = ({ orderDetail, orderID }) => {
    const [order, setOrder] = useState(null);
    const formatPrice = (price) => {
      return new Intl.NumberFormat("th-TH", {
        style: "currency",
        currency: "THB",
      }).format(price);
    };
    
  useEffect(() => {
    const getOrderById = async () => {
      try {
        const response = await OrderService.getOrderById(orderID);
        if (response.status === 200) {
          setOrder(response.data);
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
    getOrderById();
  }, [orderID]);


  useEffect(() => {
    if (order) {
      order.products.map((product, index) => {
        ProductServices.getProductByID(product.productId).then((res) => {
            setOrder((prevOrder) => {
            const updatedProducts = [...prevOrder.products];
            updatedProducts[index] = {
              ...res.data,
              quantity: product.quantity,
            };
            return { ...prevOrder, products: updatedProducts };
          });
        });
      });
    }
  }, [order]);
  return (
    <div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <dialog id={orderDetail} className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              type="button"
              onClick={() => document.getElementById(orderDetail).close()}
            >
              ✕
            </button>
            <h3 className="font-bold text-lg">View Orders Detial!</h3>
            <p className="py-4">Products </p>
            <span>Total:{formatPrice(order?.total)} </span>

            {/* table */}
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Unit price</th>
                    <th>Quantity</th>
                    <th>Sub total</th>
                  </tr>
                </thead>
                <tbody>
                  {order?.products?.length > 0 ? (
                    order?.products.map((item, index) => (
                      // ยังไม่มีการ return ค่าใน map() {/* row 1 */}
                      <tr key={item._id}>
                        <td className="text-center">{index + 1}</td>

                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle h-12 w-12">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-16 h-16 object-cover rounded-lg"
                                />
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="text-center">{item.name}</td>
                        <td className="text-center">{item.price}</td>
                        <td className="text-center">{item.quantity}</td>
                        <td className="text-center">{item.price*item.quantity}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        No products found.
                      </td>
                    </tr>
                  )}
                </tbody>
                {/* foot */}
                <tfoot>
                  <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Unit price</th>
                    <th>Quantity</th>
                    <th>Sub total</th>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="mt-4">
            <h3 className="text-lg font-semibold">Shipping Details</h3>
            <div className="flex justify-between flex-col items-start md:flex-row">
              <div className="w-1/2">
                {/* Left zone */}
                <p>
                  <span className="font-bold">Name:</span>{" "}
                  {order?.shipping?.name}
                </p>
                <p>
                  <span className="font-bold">Phone:</span>{" "}
                  {order?.shipping?.phone}
                </p>
                <p>
                  <span className="font-bold">Address:</span>{" "}
                  {order?.shipping?.address?.line1}
                </p>
              </div>
              <div className="w-1/2">
                {/* Right zone */}
                <p>
                  <span className="font-bold">City:</span>{" "}
                  {order?.shipping?.address?.city}
                </p>
                <p>
                  <span className="font-bold">Country:</span>{" "}
                  {order?.shipping?.address?.country}
                </p>
                <p>
                  <span className="font-bold">Postal code:</span>{" "}
                  {order?.shipping?.address?.postal_code}
                </p>
              </div>
            </div>
          </div>
          </form>
          <button
            className="btn mt-2"
            onClick={() => document.getElementById(orderDetail).close()}
          >
            Close
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default ModalOrderdt;
