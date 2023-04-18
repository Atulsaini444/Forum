import axios from 'axios';

export default function authHeader() {
  const getUser = localStorage.getItem('user');
  const user = getUser !==null && JSON.parse(getUser);
  if (user && user.token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}
