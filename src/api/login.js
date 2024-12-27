import axios from "axios"
axios.defaults.withCredentials = true;

export const login = async (values) => {
    await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie');
    const response = await axios.post('http://127.0.0.1:8000/api/login', values);
    return response.data;
}