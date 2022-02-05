import { useContext } from "react";
import Navbar from "./components/Navbar";
import { ThemeContext } from "./ThemeContext";

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`container ${theme}`}>
      <Navbar></Navbar>
      <div className='main'>
        <h1>Posts</h1>
        <ul>
          <li>
            <h2>Post 1</h2>
            <p>post 1 content</p>
          </li>
          <li>
            <h2>Post 2</h2>
            <p>post 2 content</p>
          </li>
          <li>
            <h2>Post 3</h2>
            <p>post 3 content</p>
          </li>
        </ul>
      </div>
      <div className='footer'>Awesome blog, all rights reserved</div>
    </div>
  );
}

export default App;
