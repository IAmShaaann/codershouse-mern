import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../../http";
import styles from "./Navigation.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../../store/authSlice";

const Navigation = () => {
  const brandStyle = {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "22px",
    display: "flex",
    alighItems: "center",
  };
  const logoText = {
    marginLeft: "10px",
  };

  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.auth);
  async function logoutUser() {
    //from here we will send the logout request.
    try {
      const { data } = await logout(); //we'll send empty data from the server and set the new empty data. 
      dispatch(setAuth(data));
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <nav className={`${styles.navbar} container`}>
      <Link to="/" style={brandStyle}>
        <img src="/images/logo.png" alt="logo" />
        <span style={logoText}>CodersHouse</span>
      </Link>
      {isAuth && <button onClick={logoutUser}>logout</button>}
    </nav>
  );
};

export default Navigation;

// Note: The html a tag and react Link tag are different.  The a tag refreshes the page and the Link tag does not.
