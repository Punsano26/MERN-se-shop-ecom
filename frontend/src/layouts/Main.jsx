import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const Main = () => {
  return (
    <div>
      <Navbar />
      <Main />
      <Footer />
    </div>
  );
};

export default Main;
