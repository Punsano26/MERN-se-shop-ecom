import React, { useContext } from "react";
import useCart from "../../hooks/useCart";
import CartService from "../../services/cart.service";
import Swal from "sweetalert2";
import { TbHttpDelete } from "react-icons/tb";
import { AuthContext } from "../../contexts/auth.context";
import PaymentButton from "../../components/PaymentButton";
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
      confirmButtonColor: "#ef233c",
      cancelButtonColor: "#8d99ae",
      confirmButtonText: "Yes, remove it!",
    }).then(async (result) => {
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
        const response = await CartService.updateCartItem(cartItem._id, {
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
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      handleDeleteItem(cartItem);
    }
  };

  const totalPrice = (items) => {
    let total = 0;
    items.forEach((item) => {
      total += item.quantity * item.price;
    });
    return total;
  };

  return (
    <div>
      <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
        <div className="py-28 flex flex-col items-center justify-center">
          <h2 className="md:text-5xl">Cart</h2>
        </div>
        <div className="overflow-x-auto w-full">
          {cart.length > 0 ? (
            <div>
              <table className="table">
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
                      <td>{index + 1}</td>
                      <td>
                        <img
                          src={cartItem.image}
                          alt="Product"
                          className="h-12 w-12"
                        />
                      </td>
                      <td>{cartItem.name}</td>
                      <td>
                        <button
                          onClick={() => handleIncrease(cartItem)}
                          className="bg-blue-500 text-white rounded-md p-2 mr-2"
                        >
                          +
                        </button>
                        {cartItem.quantity}
                        <button
                          onClick={() => handleDecrease(cartItem)}
                          className="bg-blue-500 text-white rounded-md p-2 ml-2"
                        >
                          -
                        </button>
                      </td>
                      <td>{formatPrice(cartItem.price)}</td>
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
              </table>
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
                  <p>Total Quantity: {totalPrice(cart)} </p>
                  <PaymentButton cartItems={cart} />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center py-10">
              <img
                className="w-30 h-60 mb-4"
                src="/notitems.gif"
                alt="loading.."
              />
              <p>No Items In Cart</p>
              <a
                className="relative bg-black text-blue-400 font-bold py-2 px-4 rounded-lg shadow-lg before:absolute before:inset-0 before:bg-blue-400 before:opacity-0 before:hover:opacity-100 before:transition-opacity before:duration-300 before:blur-md"
                href="/shop"
              >
                Shopping
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
