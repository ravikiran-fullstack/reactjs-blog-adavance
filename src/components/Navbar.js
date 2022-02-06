import React, { useContext, useState } from "react";
import { ThemeContext } from "../ThemeContext";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [query, setQuery] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search/${query}`);
    setQuery("");
  };

  return (
    <div className='header'>
      <div className='header-item'>
        <Link to='/'>
          <strong>Awesome Blog</strong>
        </Link>
      </div>
      <div className='header-item'>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            name='query'
            value={query}
            placeholder='Search here'
            onChange={(e) => setQuery(e.target.value)}
          />
          <button>Go</button>
        </form>
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
