import React, { useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div className='header'>
      <div className='header-item'>
        <Link to='/'>
          <strong>Awesome Blog</strong>
        </Link>
      </div>
      <div className='header-item'>
        <Link to='/login'>Login</Link>
        <button onClick={toggleTheme}>
          {theme === "light" ? "Theme:Light" : "Theme:Dark"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
