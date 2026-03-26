// client/src/api.js
import axios from 'axios';

const API = axios.create({ 
    baseURL: 'https://gs-clinic-backend.onrender.com/api' // Use your REAL backend URL
}); 

export default API;