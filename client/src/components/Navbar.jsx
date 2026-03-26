import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Stethoscope } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <div className="container nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo" onClick={() => setIsOpen(false)}>
          <Stethoscope size={28} />
          <span className="logo-text">
            G'S NATUROPATHY AND PHYSICAL THERAPY CLINIC
          </span>
        </Link>

        {/* Hamburger Icon */}
        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </div>

        {/* Nav Links */}
        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={toggleMenu}>Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/services" className="nav-link" onClick={toggleMenu}>Services</Link>
          </li>
          <li className="nav-item">
            <Link to="/products" className="nav-link" onClick={toggleMenu}>Products</Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link" onClick={toggleMenu}>About</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link" onClick={toggleMenu}>Contact</Link>
          </li>
          <li className="nav-item">
            <Link to="/book" className="nav-booking-btn" onClick={toggleMenu}>Book Now</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;