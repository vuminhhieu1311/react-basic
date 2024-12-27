import apiClient from "./apiClient";

export const createCustomer = async (values) => {
    const response = await apiClient.post('http://127.0.0.1:8000/api/customers', values)
    return response.data; 
}