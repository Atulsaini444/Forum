import axios from 'axios';

export const register = async (data:any) => {
    return await axios.post('https://api.realworld.io/api/users', data);
};

export const login = async (data:any) => {
    return await axios.post('https://api.realworld.io/api/users/login',data)
}

export const editProfile = async (data:any) => {
    return await axios.put('https://api.realworld.io/api/user',data)
}
