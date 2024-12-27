import apiClient from "./apiClient";

export const getCustomersPaginate =  async (search, page) => {
    const response = await apiClient.get(`http://127.0.0.1:8000/api/customers?${search !== '' ? 'search=' + search + '&' : ''}page=${page}`)
    return response.data; 
}
