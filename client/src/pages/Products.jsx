import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
    Package, ShoppingCart, MessageSquare, Truck, ShieldCheck, 
    Settings, HelpCircle, Search, ArrowRight, Home, 
    Filter, ArrowUpDown, PackageX, AlertCircle 
} from 'lucide-react';
import { generateWhatsAppLink } from '../utils/whatsapp';
import './Products.css';

// CENTRALIZED API URL
const BASE_URL = 'https://gs-naturopathy-and-physical-therapy.onrender.com/api/products';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [sortOrder, setSortOrder] = useState('none'); 

    useEffect(() => {
        axios.get(BASE_URL)
            .then(res => {
                setProducts(res.data);
                setFilteredProducts(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching products:", err);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        let result = products.filter(p => 
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (categoryFilter === 'All' || p.category === categoryFilter)
        );

        if (sortOrder === 'low') result.sort((a, b) => a.price - b.price);
        if (sortOrder === 'high') result.sort((a, b) => b.price - a.price);

        setFilteredProducts(result);
    }, [searchTerm, categoryFilter, sortOrder, products]);

    const handleOrder = (product) => {
        if (!product.inStock) return alert("This item is currently out of stock.");
        const message = `Hello G'S Clinic, I want to order the [${product.name}].\nPrice: ₦${Number(product.price).toLocaleString()}`;
        window.location.href = generateWhatsAppLink(message);
    };

    if (loading) return (
        <div className="loader-container">
            <div className="spinner"></div>
            <p>Setting up your storefront...</p>
        </div>
    );

    return (
        <div className="products-page">
            <header className="products-hero">
                <div className="hero-overlay"></div>
                <div className="container hero-content-alt">
                    <div className="badge-light">
                        <Package size={14} /> <span>G'S Clinic Medical Store</span>
                    </div>
                    <h1>Health & Recovery <br/><span>Products</span></h1>
                    <p>Authentic medical equipment, mobility aids, and natural healing drugs.</p>
                </div>
            </header>

            <div className="container">
                <div className="products-filter-bar">
                    <div className="search-box">
                        <Search size={18} />
                        <input type="text" placeholder="Search name..." onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                    <div className="filter-controls">
                        <div className="control-item">
                            <Filter size={16} />
                            <select onChange={(e) => setCategoryFilter(e.target.value)}>
                                <option value="All">All Categories</option>
                                <option value="Medications / Health Products">Medications / Health Products</option>
                                <option value="Mobility Aids">Mobility Aids</option>
                                <option value="Therapy Equipment / Machines">Therapy Equipment / Machines</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>
                        <div className="control-item">
                            <ArrowUpDown size={16} />
                            <select onChange={(e) => setSortOrder(e.target.value)}>
                                <option value="none">Sort Price</option>
                                <option value="low">Low to High</option>
                                <option value="high">High to Low</option>
                            </select>
                        </div>
                    </div>
                </div>

                <section className="section">
                    <div className="products-modern-grid">
                        {filteredProducts.length > 0 ? filteredProducts.map((product) => (
                            <div key={product._id} className={`product-modern-card ${!product.inStock ? 'out-of-stock' : ''}`}>
                                <div className="p-image-area">
                                    {!product.inStock && <div className="stock-badge">Sold Out</div>}
                                    <div className="p-category-tag">{product.category}</div>
                                    <img src={product.image || 'https://via.placeholder.com/300x200?text=Clinic+Product'} alt={product.name} />
                                </div>
                                <div className="p-details">
                                    <h3>{product.name}</h3>
                                    <p className="p-desc">{product.description}</p>
                                    <div className="p-pricing-row">
                                        <div className="p-price">
                                            <span className="p-amount">₦{Number(product.price).toLocaleString()}</span>
                                        </div>
                                        <button 
                                            className={`p-order-btn ${!product.inStock ? 'disabled' : ''}`}
                                            onClick={() => handleOrder(product)}
                                            disabled={!product.inStock}
                                        >
                                            {product.inStock ? <ShoppingCart size={20} /> : <PackageX size={20} />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="no-results">
                                <AlertCircle size={48} />
                                <h3>No products found</h3>
                                <p>Try adjusting your search or category filter.</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Banner sections... (same as before) */}
                <section className="order-timeline-section">
                    <h2 className="section-title">Ordering Process</h2>
                    <div className="timeline-grid">
                        <div className="timeline-item">
                            <div className="t-icon"><Package /></div>
                            <h4>Select Item</h4>
                            <p>Pick the best machine or drug for your needs.</p>
                        </div>
                        <div className="timeline-item">
                            <div className="t-icon"><MessageSquare /></div>
                            <h4>WhatsApp Order</h4>
                            <p>Chat with us to finalize payment and delivery.</p>
                        </div>
                        <div className="timeline-item">
                            <div className="t-icon"><Truck /></div>
                            <h4>Swift Delivery</h4>
                            <p>Get your item delivered to your door.</p>
                        </div>
                    </div>
                </section>

                <div className="delivery-card-modern">
                    <div className="d-info">
                        <Truck size={40} className="d-icon-gold" />
                        <div>
                            <h3>Lagos & Nationwide Shipping</h3>
                            <p>We provide safe doorstep delivery for all equipment and natural drugs.</p>
                        </div>
                    </div>
                    <button className="btn btn-gold" onClick={() => window.location.href = generateWhatsAppLink("I want to inquire about delivery fees.")}>
                        Check Delivery Rates
                    </button>
                </div>

                <section className="p-support-section">
                    <div className="support-inner">
                        <HelpCircle size={40} />
                        <h2>Confused about a product?</h2>
                        <p>Our professional therapists can help you choose the right equipment for your specific condition.</p>
                        <button className="btn btn-primary" onClick={() => window.location.href = generateWhatsAppLink("I need a product consultation.")}>
                            Speak with a Specialist <ArrowRight size={18} />
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Products;