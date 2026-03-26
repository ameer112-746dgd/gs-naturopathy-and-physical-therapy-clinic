import axios from 'axios';
// Use your REAL Render backend URL here
const API = axios.create({ 
    baseURL: 'https://gs-clinic-backend.onrender.com/api' 
}); 
export default API;