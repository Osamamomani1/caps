"use strict";


require('dotenv').config();
const port=process.env.PORT || 8000;
const io=require('socket.io')(port);
const caps=io.of('/caps')



let time = new Date()

io.on('connection',socket=>{
    console.log('CONNECTED SUCCESSFULLY ',socket.id);
});

caps.on('connection',socket=>{
    console.log('CONNECTED SUCCESSFULLY ',socket.id);

    socket.on('pickup',payload=>{
        console.log('event:',{
            event:'pickup',
            time:time,
            payload:payload
        });
        caps.emit('driverPickup',payload);
    });

    socket.on('transit',payload=>{
        console.log('event:',{
            event:'transit',
            time:time,
            payload:payload
        });
        caps.emit('driverTransit',payload);
    });

    socket.on('deleverd',payload=>{
        console.log('event:',{
            event:'deleverd',
            time:time,
            payload:payload
        });
        caps.emit('deleverd',payload);
        caps.emit('vendorDileverd',payload);
    });


})




module.exports=caps