import React, { Fragment } from "react";
import { Login } from "../../Components/LoginForm/LoginForm";
import "./Homepage.scss";

export const Homepage = () => {
  return (
    <div className="Homepage">
      <div className="context">
        <h1 className="height10">Quiz Dance</h1>
        <Login />
      </div>

      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  );
};
