import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import Pages
import Home from './pages/Home';
import Services from './pages/Services';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';
import Book from './pages/Book';
import Admin from './pages/Admin';

// Global Styles
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        {/* The Navbar will stay at the top of every page */}
        <Navbar />

        {/* Main Content Area */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/book" element={<Book />} />
            <Route path="/admin-gs" element={<Admin />} />
            
            {/* Fallback route for 404 - Not Found */}
            <Route path="*" element={
              <div style={{ padding: '100px', textAlign: 'center' }}>
                <h2>404 - Page Not Found</h2>
                <p>The page you are looking for does not exist.</p>
                <a href="/" className="btn btn-primary">Go Home</a>
              </div>
            } />
          </Routes>
        </main>

        {/* The Footer will stay at the bottom of every page */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;