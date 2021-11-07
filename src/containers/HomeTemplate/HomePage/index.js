import React, { useEffect } from "react";
import HomeCarousel from "../_components/Carousel";
import HomeFooter from "../_components/Footer";
import Navbar from "../_components/Navbar";
import Home from "./Home/Home";

export default function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <React.Fragment>
      <Navbar />
      <HomeCarousel />
      <Home />

      <HomeFooter />
    </React.Fragment>
  );
}
