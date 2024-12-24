export const getCustomersPaginate =  async (page) => {
    const response = await fetch(`http://localhost:3001/customers?_page=${page}&_sort=-updated_at`);
    if (!response.ok) {
        throw new Error("Failed to fetch customers");
    }
    return response.json()
}
