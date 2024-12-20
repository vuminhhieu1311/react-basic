const fs = require('fs');
const { faker } = require('@faker-js/faker');

const randomBookData = (n)=>{
    const bookData = [];
    if (n <= 0) return [];
    Array.from(new Array(n)).forEach(()=>{
        const _book = {
            id: faker.database.mongodbObjectId(),
            title: faker.book.title(),
            author: faker.book.author(),
            price: faker.number.int({ min: 100000, max: 1000000, multipleOf: 1000 })
        }
        bookData.push(_book)
    })
    return bookData;
}

const randomCustomerData = (n)=>{
    const customerData = [];
    if (n <= 0) return [];
    Array.from(new Array(n)).forEach(()=>{
        const _customer = {
            id: faker.database.mongodbObjectId(),
            fullname: faker.person.fullName(),
            sex: faker.person.sex(),
            age: faker.number.int({ min: 10, max: 70}),
            phone: faker.phone.number()
        }
        customerData.push(_customer)
    })
    return customerData;
}

(()=>{
    const bookData = randomBookData(5)
    const customerData = randomCustomerData(5)
    const db = {
        customers: customerData,
        books: bookData,
    };
    fs.writeFile('./src/db.json',JSON.stringify(db),()=>{
        console.log('Write successfully')
    });
})()
