const express = require('express')
const orderController = express.Router()
const orderSchema = require('../../model/order.schema')

const generateOrderNumber = async () => {
    const result = await orderSchema.find()
    return result.length + 1
}

const createOrder = async (req, res) => {
    const data = req.body
    const orderNumber = await generateOrderNumber()    
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    fetch('http://nginx:80/api/storage/get-items',{
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data.products)
    })
    .then(async (resp1) => {
        if(!resp1.ok) {
            const textError = await resp1.text()
            throw Error(textError)
         }})
    .then(() =>{
        fetch('http://nginx:80/api/storage/update-storage',{
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data.products)
        })
        .then((resp) => {if(!resp.ok){ return resp.text().then((errorText) =>{ throw new Error(errorText)})}})
        .then(() => {

            const result = new orderSchema({
                orderNumber: orderNumber,
                customerName: data.userData.firstName + " " + data.userData.lastName,
                customer_id: data.userId,
                orderDate: `${year}.${month}.${day}`,
                status: 'Összekészítés alatt',
                items: data.products
            })

            result.save()
            .then(() => {
                fetch('http://nginx:80/api/delivery/createDelivery',{
                    mode: 'cors',
                    method: 'post',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then((resp) => {if(!resp.ok) return resp.text().then((text) => {throw new Error(text)})})
                .then(() => res.status(200).send('Success'))
                .catch((e) => res.status(500).send(e.message))
            })
            .catch((e) => res.status(400).send(e))
        })
        .catch((e) => res.status(400).send(e.message))
    })
    .catch((e) => res.status(400).send(e.message))
}

const deleteOrder = async (req, res) => {
    const {orderNumber} = req.body
    const result = await orderSchema.findOne({orderNumber}, {_id: 0, status: 1})
    
    if(result.status !== 'Kiszállítás alatt'){
        await orderSchema.findOneAndUpdate({orderNumber}, {status: 'Törölt'}, {upsert: false})
        .then(() => res.status(200).send('Success'))
        .catch((e) => res.status(500).send(e))
    } else {
        res.status(400).send({ error: 'Your order is already being delivered!'})
    }
}

const getOrders = async (req, res) => {
    const {userId} = req.body

    await orderSchema.find({userId: userId})
    .then((result) => res.status(200).send(result))
    .catch((e) => res.status(500).send(e))
}

const getOrder = async (req, res) => {
    const order = req.body

    await orderSchema.findOne({userId: order.userId, orderNumber: order.orderNumber})
    .then((result) => res.status(200).send(result))
    .catch((e) => res.status(500).send(e))
}

const updateOrder = async (req, res) => {
    const newStatus = req.body

    await orderSchema.findOneAndUpdate({orderNumber: newStatus.orderNumber}, {$set: newStatus}, {upsert: false})
    .then(() => res.status(200).send('Success'))
    .catch((e) => {res.status(500).send(e)})
}

orderController.post('/create-order', createOrder)
orderController.post('/get-orders', getOrders)
orderController.post('/get-order', getOrder)
orderController.put('/delete-order', deleteOrder)
orderController.put('/update-order', updateOrder)

module.exports = orderController