import axios from 'axios';
const API = axios.create({ baseURL: 'https://gs-clinic-api.onrender.com/api' }); 
export default API;