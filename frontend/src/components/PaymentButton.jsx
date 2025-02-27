import React from "react";
import StripeService from "../services/stripe.service";
import { AuthContext } from "../contexts/auth.context";
import { useContext } from "react";

const PaymentButton = ({ cartItems }) => {
  const { user } = useContext(AuthContext);
  const handleCheckOut = async () => {
    StripeService.createCheckOutSession({
      cart: cartItems,
      email: user.email,
    })
      .then((res) => {
        window.location.href = res.data.url;
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <>
      <button
        onClick={handleCheckOut}
        className="btn btn-md bg-red text-white px-8 py-1"
      >
        Proceed to checkout
      </button>
    </>
  );
};

export default PaymentButton;
