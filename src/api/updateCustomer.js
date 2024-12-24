export const updateCustomer = async (values) => {
    const response = await fetch(`http://localhost:3001/customers/${values.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values.data),
    });
    if (!response.ok) {
        throw new Error("Failed to update customers");
    }
    return response.json()
}
