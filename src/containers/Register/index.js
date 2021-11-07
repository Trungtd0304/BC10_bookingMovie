import React from "react";
import { Route } from "react-router";
import Login from "./Login";
import Register from "./Register";

const UserTeamplate = (props) => {
  const { Component, ...restProps } = props;

  return (
    <Route
      {...restProps}
      render={(props) => {
        return (
          <React.Fragment>
            <div className="maincontainer">
              <div class="container-fluid">
                <div class="row no-gutter">
                  <div class="col-md-6 d-none d-md-flex bg-image"></div>
                  <Login />
                  <Register />
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      }}
    />
  );
};

export default UserTeamplate;
