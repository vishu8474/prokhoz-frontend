// frontend/src/services/api.jsx
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const authAPI = {
    register: (userData) => api.post('/auth/register', userData),
    login: (credentials) => api.post('/auth/login', credentials),
    getMe: () => api.get('/auth/me'),
};
// In frontend/src/services/api.jsx
export const contactAPI = {
  sendMessage: (messageData) => api.post('/contact', messageData),
};
export const usersAPI = {
    getProfile: () => api.get('/users/profile'),
    updateProfile: (userData) => api.put('/users/profile', userData),
    updatePassword: (passwordData) => api.put('/users/password', passwordData),
    deleteAccount: (passwordData) => api.delete('/users/account', { data: passwordData })
};

export const productsAPI = {
    getProducts: () => api.get('/products'),
    createProduct: (productData) => api.post('/products', productData),
    getMyProducts: () => api.get('/products/my-products'),
};

export const inquiriesAPI = {
    getMyInquiries: () => api.get('/inquiries/manufacturer'),
    getBuyerInquiries: () => api.get('/inquiries/buyer'),
    getInquiry: (id) => api.get(`/inquiries/${id}`),
    createInquiry: (inquiryData) => api.post('/inquiries', inquiryData),
    updateInquiryStatus: (id, statusData) => api.put(`/inquiries/${id}/status`, statusData),
    addResponse: (id, responseData) => api.post(`/inquiries/${id}/respond`, responseData),
    getDashboardStats: () => api.get('/inquiries/stats'),
};

export default api;