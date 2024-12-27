import apiClient from "./apiClient";

export const updateCustomer = async (values) => {
    const response = await apiClient.put(`http://127.0.0.1:8000/api/customers/${values.id}`, values.data);
    return response.data; 
}