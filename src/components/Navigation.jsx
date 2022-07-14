import * as React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { AppBar, Toolbar } from "@mui/material";

const Navigation = () => {
  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <ul>
            <li>
              <Link to="pages/home">Home</Link>
            </li>
            <li>
              <Link to="pages/explore">Explore</Link>
            </li>
            <li>
              <Link to="pages/travels">Travels</Link>
            </li>
            <li>
              <Link to="pages/profile">Profile</Link>
            </li>
            <li>
              <Link to="pages/login">Login/Sign Out</Link>
            </li>
          </ul>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navigation;
