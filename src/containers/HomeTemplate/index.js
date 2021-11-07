import { Fragment } from "react";
import { Route } from "react-router-dom";
import HomeCarousel from "./Layout/Carousel";
import Navbar from "./Layout/Navbar";

export const HomeTemplate = (props) => {
  const { Component, ...restProps } = props;
  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        return (
          <Fragment>
            <Navbar {...propsRoute} />
            <HomeCarousel/>
            <Component {...propsRoute} />
            <footer>Footer</footer>
          </Fragment>
        );
      }}
    />
  );
};
