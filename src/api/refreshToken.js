import axios from "axios"
// axios.defaults.withCredentials = true;

export const refreshToken = async () => {
    const rf_token = localStorage.getItem('refresh_token')
    console.log('rf_token', rf_token)
    const response = await axios.post('http://127.0.0.1:8000/api/auth/refresh-token', {}, {
        headers: {
            'Authorization': `Bearer ${rf_token}`,
        }
    });
    return response.data;
}