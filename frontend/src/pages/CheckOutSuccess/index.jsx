import React from "react";
import "./style.css"; // นำเข้า CSS จากโฟลเดอร์เดียวกัน

const CheckoutSuccess = () => {
  // Clear cart logic
  return (
    <div className="checkout-success">
      <h2>Checkout Successful</h2>
      <p>Your order might take some time to process.</p>
      <p>Check your order status at your profile after about 10 minutes.</p>
      <p>
        In case of any inquiries, contact the support at{" "}
        <strong>support@se-shop.com</strong>.
      </p>
    </div>
  );
};

export default CheckoutSuccess;
