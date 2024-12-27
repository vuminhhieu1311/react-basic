import apiClient from "./apiClient";

export const deleteCustomer = async (id) => {
    const response = await apiClient.delete(`http://127.0.0.1:8000/api/customers/${id}`);
    return response.data; 
}
