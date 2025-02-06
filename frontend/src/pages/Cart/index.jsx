import React from "react";
import useCart from "../../hooks/useCart";
import CartService from "../../services/cart.service";
import Swal from "sweetalert2";
import { TbHttpDelete } from "react-icons/tb";
const Index = () => {
  const [cart, refetch] = useCart();

  const handleClearCart = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, clear all it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await CartService.clearAllItems(id);
          if (response.status === 200) {
            refetch();
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "clear all item successfully!",
              showConfirmButton: false,
              timer: 2000,
            });
          }
        } catch (error) {
          console.error("Error deleting item:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "An error occurred while Clearing all the item.",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      }
    });
  };

  const handleDeleteItem = async (cartItem) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await CartService.deleteCartItem(id);
          if (response.status === 200) {
            refetch();
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Deleted item successfully!",
              showConfirmButton: false,
              timer: 2000,
            });
          }
        } catch (error) {
          console.error("Error deleting item:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "An error occurred while deleting the item.",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      }
    });
  };

  const handleIncrease = async (id) => {};

  const handleDecrease = async (id) => {};

  return (
    <div>
      <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
        <div className="bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
          <div className="py-28 flex flex-col items-center justify-center">
            <div className="text-center px-4 space-y-7">
              <h2 className="md:text-5xl">Cart</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto ">
        <table className="table container">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Price per unit</th>
              <th>Price</th>
              <th>
                <button
                  onClick={handleClearCart}
                  className="btn glass btn-error text-rose-900"
                >
                  Glass button
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {cart.length > 0 &&
              cart.map((cartItem, index) => (
                <tr key={index}>
                  <th>
                    <label>{index + 1}</label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={cartItem.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {cartItem.name}
                    <br />
                  </td>
                  <td className="">{cartItem.quantity}</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                    <td>{}</td>
                  </th>
                  <td>{cartItem.price}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteItem(cartItem)}
                      className="text-red"
                    >
                      <TbHttpDelete className="h-9 w-9" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
          <tfoot>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Price per unit</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Index;
