import { useState } from 'react';
import { Link } from 'react-router-dom';
import './nav.css'; // Ensure you have this CSS file

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="http://localhost:5173/">UTO</Link>
      </div>
      <ul className={menuOpen ? "nav-links open" : "nav-links"}>
        <li><Link to="/">Login</Link></li>
        <li><Link to="/about">Profile</Link></li>
      </ul>
      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>
    </nav>
  );
}

export default Nav;
