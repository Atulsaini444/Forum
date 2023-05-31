import axios from 'axios';

export default function authHeader() {
  const token = localStorage.getItem('token');
  console.log(token)
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}
