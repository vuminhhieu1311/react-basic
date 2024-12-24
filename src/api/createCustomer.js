export const createCustomer = async (values) => {
    const response = await fetch(`http://localhost:3001/customers`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    });
    if (!response.ok) {
        throw new Error("Failed to create customer");
    }
    return response.json()
}
