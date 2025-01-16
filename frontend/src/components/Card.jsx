import React, { useState } from "react";

const sampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    >
      Next
    </div>
  );
};

const Card = ({ item }) => {
  const { _id, name, image, description, cetagory, price } = item;
  const [isHeartfilled, setIsHeartfilled] = useState(false);
  const handleHeartClick = () => {
    setIsHeartfilled(!isHeartfilled);
  };

  return (
    <div className="card shadow-xl relative mr-5 md:my-5 h-120">
      <div
        className={`rating gap-1 absolute right-2 top-2 p-4 heartStar ${
          isHeartfilled ? "filled" : ""
        }`}
        onClick={handleHeartClick}
      >
        ♥
      </div>
      <figure>
        <img
          src={image}
          alt={name}
          className="hover:scale-105 transition-all duration-300 md:h-60"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
        <div className="card-action justify-between items-center mt-2">
          <h5 className="font-bold">
            {price} <span className="text-sm text-red">฿</span>
          </h5>
          <button className="">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
