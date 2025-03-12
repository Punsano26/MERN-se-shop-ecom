import React, { useEffect, useState } from "react";
import OrderService from "../services/order.service";

const ModalOrderdt = ({ orderDetail, orderID }) => {
  const [order, setOrder] = useState(null);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
    }).format(price);
  };

  useEffect(() => {
    OrderService.getOrderById(orderID)
      .then((res) => setOrder(res.data))
      .catch((error) => console.log(error));
  }, [orderID]);

  return (
    <div>
      {/* ใช้ showModal() เพื่อเปิด modal */}
      <dialog
        id={orderDetail}
        className="modal flex justify-center items-center"
      >
        <div className="modal-box w-full max-w-2xl">
          <form method="dialog">
            {/* ปุ่มปิด modal */}
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              type="button"
              onClick={() => document.getElementById(orderDetail).close()}
            >
              ✕
            </button>

            <h3 className="font-bold text-lg">View Order Details</h3>
            <div className="flex justify-between items-center mt-2">
              <p className="">Products</p>
              <span className="text-right">
                Total: {formatPrice(order?.total)}{" "}
              </span>
            </div>

            {/* ตารางสินค้า */}
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
                    order.products.map((item, index) => {
                      const product = item.productId;
                      return (
                        <tr key={item._id}>
                          <td className="text-center">{index + 1}</td>
                          <td>
                            <div className="flex items-center gap-3">
                              <div className="avatar">
                                <div className="mask mask-squircle h-12 w-12">
                                  <img
                                    src={product?.image}
                                    alt={product?.name}
                                    className="w-16 h-16 object-cover rounded-lg"
                                  />
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="text-center">{product?.name}</td>
                          <td className="text-center">
                            {formatPrice(product?.price)}
                          </td>
                          <td className="text-center">{item.quantity}</td>
                          <td className="text-center">
                            {formatPrice(product?.price * item.quantity)}
                          </td>
                        </tr>
                      );
                    })
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

            {/* รายละเอียดการจัดส่ง */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Shipping Details</h3>
              <div className="flex justify-between flex-col items-start md:flex-row">
                <div className="w-1/2">
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

          {/* ปุ่มปิด Modal */}
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
