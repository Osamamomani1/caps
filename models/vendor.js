"use strict";

require('dotenv').config();
let faker =require('faker');
const io=require('socket.io-client');
const HOST=process.env.HOST || 'http://localhost:8000';
const socket=io.connect(`${HOST}/caps`);

setInterval(() => {
        let customerOrder={
            storeName:process.env.STORENAME || 'kira',
            orderId:faker.datatype.uuid(),
            customerName:faker.name.findName(),
            address:faker.address.streetAddress()
        };
    
        socket.emit('pickup',customerOrder);
}, 1500);

socket.on('added', payload=> {
    console.log("Thank you for adding : ", payload , " to the queue");
});

socket.on('vendorDileverd',msg=>{
    console.log(`thank you for delivering ${msg.id}`);

})

