import React, { useReducer, useState } from "react";
import { NavigationDots } from "../components";
import UserContext from "../utils/UserContext";
import { Login } from "../pages";

const AppWrap = (Component, idName, classNames) =>
  function HOC() {
    const loggedInUser = {
      user: sessionStorage.getItem("user"),
      about: sessionStorage.getItem("about"),
    };
    return (
      <UserContext.Provider value={loggedInUser}>
        <div id={idName} className={`app__container ${classNames}`}>
          <div className="app__wrapper app__flex">
            <Component />
          </div>
          <NavigationDots active={idName} />
        </div>
      </UserContext.Provider>
    );
  };

export default AppWrap;
