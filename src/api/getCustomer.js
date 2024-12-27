import apiClient from "./apiClient";

export const getCustomer =  async (id) => {
    const response = await apiClient.get(`http://127.0.0.1:8000/api/customers/${id}`)
    return response.data; 
}
