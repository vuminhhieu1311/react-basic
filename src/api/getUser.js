import apiClient from "./apiClient";

export const getUser =  async (page) => {
    const response = await apiClient.get(`http://127.0.0.1:8000/api/user`);
    return response.data; 
}
