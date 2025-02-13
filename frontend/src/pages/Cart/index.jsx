import React, { useContext } from "react";
import useCart from "../../hooks/useCart";
import CartService from "../../services/cart.service";
import Swal from "sweetalert2";
import { TbHttpDelete } from "react-icons/tb";
import { AuthContext } from "../../contexts/auth.context";

const Index = () => {
  const [cart, refetch] = useCart();
  const { user } = useContext(AuthContext);
  const formatPrice = (price) => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
    }).format(price);
  };
  const handleClearCart = async () => {
    Swal.fire({
      icon: "question",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: "#ef233c",
      cancelButtonColor: "#8d99ae",
      confirmButtonText: "Yes, remove it!",
    }).then(async (result) => {
      console.log(user?.email);

      if (result.isConfirmed) {
        try {
          const response = await CartService.clearAllItems(user?.email);
          if (response.status === 200) {
            Swal.fire({
              title: "Success",
              text: response.data.message,
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
            refetch();
          }
        } catch (error) {
          Swal.fire({
            title: "Oops...",
            text: error.message,
            icon: "error",
            timer: 1500,
            showConfirmButton: false,
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
          const response = await CartService.deleteCartItem(cartItem._id);
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

  const handleIncrease = async (cartItem) => {
    if (cartItem.quantity + 1 < 16) {
      try {
        const updatedQuantity = cartItem.quantity + 1;
        //เรียกใช้ updateCartItem จาก CartService โดยส่ง _id และ quantity ที่เพิ่มขึ้นไป และใช้ refetch เพื่อดึงข้อมูลใหม่
        const response = await CartService.updateCartItem(cartItem._id, {
          //ส่ง quantity ที่เพิ่มขึ้นไป
          quantity: updatedQuantity,
        });
        if (response.status === 200) {
          refetch();
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "You reach maximum quantity!",
        text: "You can't add more than 15 items!",
        showConfirmButton: true,
        timer: 1500,
      });
    }
  };

  const handleDecrease = async (cartItem) => {
    if (cartItem.quantity > 1) {
      try {
        const updatedQuantity = cartItem.quantity - 1;
        const response = await CartService.updateCartItem(cartItem._id, {
          quantity: updatedQuantity,
        });
        if (response.status === 200) {
          refetch();
        }
      } catch (error) {
        console.log(error);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
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
            const response = await CartService.deleteCartItem(cartItem._id);
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
    }
  };
  let TotalItem = 0;
  let TotalPrice = 0;
  if (cart && cart.length > 0) {
    cart.forEach((item) => {
      TotalPrice += item.quantity * item.price;
    });
  }
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
        <div className="overflow-x-auto items-center justify-center w-full container">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10">
              <img
                className="w-30 h-60 mb-4"
                src="/notitems.gif"
                alt="loading.."
              />{" "}
              <p className="text-center">No Items In Cart</p>
              <button>Shoping</button>
            </div>
          ) : (
            <table className="table container">
              {/* head */}
              <thead>
                <tr className="text-center">
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
                      Clear Cart
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody className="text-center">
                {cart.map((cartItem, index) => (
                  <tr key={cartItem._id}>
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
                    <td className="">
                      <button
                        onClick={() => handleIncrease(cartItem)}
                        className="bg-blue-500 hover:bg-blue-800 text-white rounded-md p-2 mr-2"
                      >
                        +
                      </button>
                      {cartItem.quantity}
                      <button
                        onClick={() => handleDecrease(cartItem)}
                        className="bg-blue-500 hover:bg-blue-800 text-white rounded-md p-2 ml-2"
                      >
                        -
                      </button>
                    </td>
                    <th>{formatPrice(cartItem.price)}</th>
                    <td>{formatPrice(cartItem.quantity * cartItem.price)}</td>
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
                <tr className="text-center">
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
          )}
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start my-12 gap-8">
          <div className="md:w-1/2 space-y-3">
            <h3 className="text-lg font-semibold">Customer Details</h3>
            <p>Name: {user?.displayName}</p>
            <p>Email: {user?.email}</p>
            <p>User Id: {user?.uid}</p>
          </div>
          <div className="md:w-1/2 space-y-3">
            <h3 className="text-lg font-semibold">Shopping Details</h3>
            <p>Total Product Items:{cart.length}</p>
            <p>Total Quantity:{TotalPrice}</p>
            <a
              href="/check-out"
              className="btn btn-md bg-red text-white px-8 py-1"
            >
              Proceed to checkout
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
