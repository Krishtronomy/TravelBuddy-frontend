import React from "react";
import { NavigationDots } from "../components";

// Set container wrapper with navdots
const AppWrap = (Component, idName, classNames) =>
  function HOC() {

    return (
              <div id={idName} className={`app__container ${classNames}`}>
                <div className="app__wrapper app__flex">
                  <Component />
                </div>
                <NavigationDots active={idName} />
              </div>
    );
  };

export default AppWrap;
