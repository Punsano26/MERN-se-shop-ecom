import React, { useState, useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import productList from "./produc.json"
import Card from "../../components/Card";

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
    >
      Next
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { className, onClick, style } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
    >
      Back
    </div>
  );
};
const Product = () => {
  const [products, setProducts] = useState(productList);
  const slider = useRef(null);
  const settings = {
    dots: true,
    Infinity: false,
    speed: 500,
    slidersToShow: 3,
    slidersToScroll: 3,
    initialSlide: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        setting: {
          dots: true,
          Infinity: true,
          slidersToShow: 3,
          slidersToScroll: 3,
        },
      },
      {
        breakpoint: 970,
        setting: {
          initialSlide: 2,
          slidersToShow: 3,
          slidersToScroll: 3,
        },
      },
      {
        breakpoint: 540,
        setting: {
          initialSlide: 2,
          slidersToShow: 2,
          slidersToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        setting: {
          initialSlide: 2,
          slidersToShow: 1,
          slidersToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="section-container my-20 relative">
      <div className="text-left">
        <p className="subtitle">Special Items</p>
        <h2 className="title">Standout Items from Our Products</h2>
      </div>
      <div className="md:absolute right-3 top-8 mb-10 md:mr-24 space-x-2">
        <button onClick={() => slider?.current?.slickPrev()}>arrow left</button>
        <button onClick={() => slider?.current?.slickNext()}>arrow right</button>
      </div>
      <div className="slider-container">
        <Slider
          ref={slider}
          {...settings}
          className="overflow-hidden mt-10 space-x-5"
        >
          {products.length > 0 &&
            products.map((item, index) => {
              return <Card item={item} key={index} />;
            })}
        </Slider>
      </div>
    </div>
  );
};

export default Product;
