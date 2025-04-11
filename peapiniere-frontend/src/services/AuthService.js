import axios from 'axios';

const API_URL = 'http://localhost:8000';

class AuthService {
  async login(email, password) {
    try {
      // Get CSRF cookie
      await axios.get(`${API_URL}/sanctum/csrf-cookie`);
      
      const response = await axios.post(`${API_URL}/api/login`, {
        email,
        password
      });
      
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  logout() {
    localStorage.removeItem('user');
    return axios.post(`${API_URL}/api/logout`);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();