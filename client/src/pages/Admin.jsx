import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faPlus, faTrash, faEdit, faSave, faTimes, 
    faUpload, faLock, faUserShield, faSignOutAlt, faCheckCircle, faTimesCircle 
} from '@fortawesome/free-solid-svg-icons';
import './Admin.css';

const Admin = () => {
    // CENTRALIZED URL TO AVOID ERRORS
    const BASE_URL = 'https://gs-naturopathy-and-physical-therapy.onrender.com/api/products';

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginPass, setLoginPass] = useState('');
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({ 
        name: '', description: '', price: '', image: '', category: 'Medications / Health Products', inStock: true 
    });
    const [editingId, setEditingId] = useState(null);
    const [selectedIds, setSelectedIds] = useState([]);

    const ADMIN_PASSWORD = "GSClinicAdmin@2024"; 

    useEffect(() => {
        if (isLoggedIn) fetchProducts();
    }, [isLoggedIn]);

    const fetchProducts = async () => {
        try {
            const res = await axios.get(BASE_URL);
            setProducts(res.data);
        } catch (err) { console.error("Fetch Error:", err); }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (loginPass === ADMIN_PASSWORD) setIsLoggedIn(true);
        else alert("Incorrect Admin Password!");
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => setFormData({ ...formData, image: reader.result });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dataToSend = { ...formData, price: Number(formData.price) };
            if (editingId) {
                await axios.put(`${BASE_URL}/${editingId}`, dataToSend);
            } else {
                await axios.post(BASE_URL, dataToSend);
            }
            
            setEditingId(null);
            setFormData({ name: '', description: '', price: '', image: '', category: 'Medications / Health Products', inStock: true });
            fetchProducts();
            alert("Database Updated Successfully!");
        } catch (err) { alert("Error saving data. Check connection and image size."); }
    };

    const handleSelect = (id) => {
        setSelectedIds(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
    };

    const deleteMultiple = async () => {
        if (window.confirm(`Delete ${selectedIds.length} items?`)) {
            try {
                await axios.post(`${BASE_URL}/bulk-delete`, { ids: selectedIds });
                setSelectedIds([]);
                fetchProducts();
            } catch (err) { alert("Bulk delete failed."); }
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="admin-login-overlay">
                <div className="login-card">
                    <FontAwesomeIcon icon={faUserShield} size="3x" color="#2e7d32" />
                    <h2>Admin Access</h2>
                    <form onSubmit={handleLogin}>
                        <div className="password-input-wrapper">
                            <FontAwesomeIcon icon={faLock} className="lock-icon" />
                            <input type="password" placeholder="Password" onChange={(e) => setLoginPass(e.target.value)} required />
                        </div>
                        <button type="submit" className="login-btn">Login</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-container">
            <div className="admin-top-bar">
                <h1>Store Manager</h1>
                <button className="logout-btn" onClick={() => setIsLoggedIn(false)}>
                    <FontAwesomeIcon icon={faSignOutAlt} /> <span>Logout</span>
                </button>
            </div>
            
            <form className="admin-form" onSubmit={handleSubmit}>
                <h3>{editingId ? "Update Product" : "New Product"}</h3>
                <div className="input-group">
                    <input type="text" placeholder="Name" value={formData.name} required onChange={e => setFormData({...formData, name: e.target.value})} />
                    <input type="number" placeholder="Price (Numbers Only)" value={formData.price} required onChange={e => setFormData({...formData, price: e.target.value})} />
                </div>

                <div className="input-group">
                    <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                        <option value="Medications / Health Products">Medications / Health Products</option>
                        <option value="Mobility Aids">Mobility Aids</option>
                        <option value="Therapy Equipment / Machines">Therapy Equipment / Machines</option>
                        <option value="Others">Others</option>
                    </select>
                    <label className="stock-toggle">
                        <input type="checkbox" checked={formData.inStock} onChange={e => setFormData({...formData, inStock: e.target.checked})} />
                        Available In Stock
                    </label>
                </div>

                <textarea placeholder="Description" value={formData.description} required onChange={e => setFormData({...formData, description: e.target.value})} />
                
                <div className="file-input-wrapper">
                    <label className="custom-file-upload">
                        <FontAwesomeIcon icon={faUpload} /> {formData.image ? "Change Image" : "Upload Image"}
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                    </label>
                    {formData.image && <img src={formData.image} className="preview-img" alt="preview" />}
                </div>

                <div className="form-actions">
                    <button type="submit" className="save-btn"><FontAwesomeIcon icon={faSave} /> Save</button>
                    {editingId && <button type="button" className="cancel-btn" onClick={() => setEditingId(null)}>Cancel</button>}
                </div>
            </form>

            <div className="inventory-list">
                <div className="list-header">
                    <h2>Stock List ({products.length})</h2>
                    {selectedIds.length > 0 && (
                        <button className="bulk-delete-btn" onClick={deleteMultiple}>
                            <FontAwesomeIcon icon={faTrash} /> Delete Selected ({selectedIds.length})
                        </button>
                    )}
                </div>

                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Select</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(p => (
                            <tr key={p._id}>
                                <td data-label="Select">
                                    <input type="checkbox" checked={selectedIds.includes(p._id)} onChange={() => handleSelect(p._id)} />
                                </td>
                                <td data-label="Image"><img src={p.image} className="table-img" alt="" /></td>
                                <td data-label="Name"><strong>{p.name}</strong></td>
                                <td data-label="Category"><span className="cat-badge">{p.category}</span></td>
                                <td data-label="Price">₦{Number(p.price).toLocaleString()}</td>
                                <td data-label="Stock">{p.inStock ? <FontAwesomeIcon icon={faCheckCircle} color="green" /> : <FontAwesomeIcon icon={faTimesCircle} color="red" />}</td>
                                <td data-label="Actions">
                                    <button className="edit-ico-btn" onClick={() => {setEditingId(p._id); setFormData(p); window.scrollTo(0,0);}}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Admin;