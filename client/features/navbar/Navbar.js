import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";
import AuthForm from "../auth/AuthForm";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navRef = useRef(null);
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const messageHistory = useSelector((state) => state.messageHistory);
  const [toggleAuthForm, setToggleAuthForm] = useState(false);

  const showNav = () => {
    const navElement = navRef.current;
    if (navElement) {
      navElement.classList.toggle("show-nav");
    }
  };

  const logoutAndRedirectHome = () => {
    showNav();
    dispatch(logout());
    navigate("/about");
    setToggleAuthForm(false);
  };

  const handleMobileLoginClick = () => {
    showNav();
    setToggleAuthForm(true);
  };

  return (
    <div>
      {isLoggedIn ? (
        <nav ref={navRef}>
          <Link to="/" onClick={showNav}>
            Home
          </Link>
          {messageHistory.length > 0 ? (
            <Link to="/continue" onClick={showNav}>
              Play
            </Link>
          ) : (
            <Link to="/settings" onClick={showNav}>
              Play
            </Link>
          )}
          <Link to="/guide" onClick={showNav}>
            Guide
          </Link>
          <Link to="/about" onClick={showNav}>
            About
          </Link>
          <button id="logout-btn" type="button" onClick={logoutAndRedirectHome}>
            Logout
          </button>
        </nav>
      ) : (
        <nav ref={navRef}>
          <Link to="/" onClick={showNav}>
            Home
          </Link>
          {messageHistory.length > 0 ? (
            <Link to="/continue" onClick={showNav}>
              Play
            </Link>
          ) : (
            <Link to="/settings" onClick={showNav}>
              Play
            </Link>
          )}
          <Link to="/guide" onClick={showNav}>
            Guide
          </Link>
          <Link to="/about" onClick={showNav}>
            About
          </Link>
          <Link to="#" onClick={handleMobileLoginClick}>
            Login
          </Link>
        </nav>
      )}
      {toggleAuthForm && (
        <AuthForm
          name="login"
          displayName="Login"
          setToggleAuthForm={setToggleAuthForm}
        />
      )}
      <div id="sidebar-toggle" onClick={showNav}>
        <div className="menu-icon"></div>
        <div className="menu-icon"></div>
        <div className="menu-icon"></div>
      </div>
    </div>
  );
};

export default Navbar;
