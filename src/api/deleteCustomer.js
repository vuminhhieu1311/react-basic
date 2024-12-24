export const deleteCustomer = async (id) => {
    const response = await fetch(`http://localhost:3001/customers/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error("Failed to delete customer");
    }
    return response.json()
}
