import React, { useEffect } from "react";
import { Redirect, Route } from "react-router";
import { USER_LOGIN } from "../../util/setting/config";
import Checkout from "./Checkout/Checkout";

const CheckoutTeamplate = (props) => {
  const { Component, ...restProps } = props;
  useEffect(()=>{
    window.scrollTo(0, 0);
  })

  if (!localStorage.getItem(USER_LOGIN)) {
    return <Redirect to="/login" />;
  }
  return (
    <Route
      {...restProps}
      render={(props) => {
        return (
          <div>
            <Checkout {...restProps} />
          </div>
        );
      }}
    />
  );
};

export default CheckoutTeamplate;
