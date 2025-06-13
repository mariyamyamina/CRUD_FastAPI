// src/components/Navbar.js
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h1>FastAPI Blog</h1>
      
      <div className="nav-links">
        <Link to="/blogs">Blogs</Link>
        <Link to="/create">Create Blog</Link>
      </div>
      
    </nav>
    
  );
}

export default Navbar;
