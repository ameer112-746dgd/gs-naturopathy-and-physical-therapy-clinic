import React, { useEffect, useState } from 'react';
import API from '../api'; 
import { 
    Package, ShoppingCart, Search, ArrowUpDown, Filter, PackageX, AlertCircle 
} from 'lucide-react';
import { generateWhatsAppLink } from '../utils/whatsapp';
import './Products.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [sortOrder, setSortOrder] = useState('none'); 

    useEffect(() => {
        API.get('/products')
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

    if (loading) return <div className="loader-container"><div className="spinner"></div></div>;

    return (
        <div className="products-page">
            <header className="products-hero">
                <div className="hero-overlay"></div>
                <div className="container hero-content-alt">
                    <h1>Clinic <span>Store</span></h1>
                    <p>Authentic medical equipment, mobility aids, and natural healing drugs.</p>
                </div>
            </header>

            <div className="container">
                <div className="products-filter-bar">
                    <div className="search-box">
                        <Search size={18} />
                        <input type="text" placeholder="Search..." onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                    <div className="filter-controls">
                        <select onChange={(e) => setCategoryFilter(e.target.value)}>
                            <option value="All">All Categories</option>
                            <option value="Medications / Health Products">Medications / Health Products</option>
                            <option value="Mobility Aids">Mobility Aids</option>
                            <option value="Therapy Equipment / Machines">Therapy Equipment / Machines</option>
                        </select>
                        <select onChange={(e) => setSortOrder(e.target.value)}>
                            <option value="none">Sort Price</option>
                            <option value="low">Low to High</option>
                            <option value="high">High to Low</option>
                        </select>
                    </div>
                </div>

                <div className="products-modern-grid">
                    {filteredProducts.map((product) => (
                        <div key={product._id} className={`product-modern-card ${!product.inStock ? 'out-of-stock' : ''}`}>
                            <div className="p-image-area">
                                {!product.inStock && <div className="stock-badge">Sold Out</div>}
                                <img src={product.image} alt={product.name} />
                            </div>
                            <div className="p-details">
                                <h3>{product.name}</h3>
                                <div className="p-pricing-row">
                                    <span className="p-amount">₦{Number(product.price).toLocaleString()}</span>
                                    <button className="p-order-btn" onClick={() => handleOrder(product)} disabled={!product.inStock}>
                                        {product.inStock ? <ShoppingCart size={20} /> : <PackageX size={20} />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Products;