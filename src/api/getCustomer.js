export const getCustomer =  async (id) => {
    const response = await fetch(`http://localhost:3001/customers/${id}`);
    if (!response.ok) {
        throw new Error("Failed to fetch customer");
    }
    return response.json()
}
