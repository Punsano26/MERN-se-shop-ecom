import React, { useState } from "react";
import CartService from "../services/cart.service";
import { AuthContext } from "../contexts/auth.context";
import { useContext } from "react";
import useCart from "../hooks/useCart";
import Swal from "sweetalert2";
const Card = ({ item }) => {
  const { _id, name, image, description, category, price } = item;
  const { user } = useContext(AuthContext);
  const [cart, refetch] = useCart();
  const [isHeartFilled, setIsHeartFilled] = useState(false);

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };
  //ไม่ต้องส่งค่าเข้าไปเพราะเราใช้ item ที่รับมาจาก props แล้ว
  const handleAddToCart = async () => {
    if (!user || !user.email) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please login to add to cart!",
      });
      return;
    }
    try {
      const cartItem = {
        productId: _id,
        email: user.email,
        quantity: 1,
        name,
        price,
        image,
      };
      const response = await CartService.createCartItem(cartItem);

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Added to cart success!",
          showConfirmButton: false,
          timer: 2000,
        });
        //ไม่ต้อง return อะไรกลับไปเพราะเราใช้ refetch ในการดึงข้อมูลใหม่
        refetch();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };
  return (
    <div className="card shadow-xl relative mr-5 md:my-5 h-120">
      <div
        className="rating gap-1 absolute right-2 top-2 p-4 heartStar z-10 bg-red rounded-full shadow-lg transform transition-all duration-300 hover:scale-110"
        onClick={handleHeartClick}
      >
        <input
          type="radio"
          name="rating-3"
          className={`mask mask-heart ${isHeartFilled ? "bg-white" : ""}`}
        />
      </div>
      <figure>
        <img
          src={image}
          alt={name}
          className="hover:scale-105 transition-all duration-300 md:h-60 md:w-60 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p className="">{description}</p>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-bold">
            {price} <span className="text-sm text-red">฿</span>
          </h5>
          <button onClick={handleAddToCart} className="btn bg-red text-white">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
