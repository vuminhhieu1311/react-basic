import apiClient from "./apiClient";

export const logout = async () => {
    const response = await apiClient.post('http://127.0.0.1:8000/api/logout')
    console.log('res logout', response.data)
    return response.data; 
}