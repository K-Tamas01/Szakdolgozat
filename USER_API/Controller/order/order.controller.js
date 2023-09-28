const express = require('express')
const orderController = express.Router()
const userModel = require('../../model/user.schema')

const order = async (req, res) => {
    const orderData = req.body

    const getUser = await userModel.findOne({_id: orderData.userId})
    
    const userData = {
        firstName: getUser.firstName,
        lastName: getUser.lastName,
        city: getUser.city,
        address: getUser.address,
        mobile: getUser.mobile,
        userId: getUser._id
    }

    const products = orderData.products

    const data = {
        products,
        userData
    }

    fetch('http://nginx:80/api/order/create-order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify(data)
    })
    .then((response) => {if(!response.ok){ return response.text().then((errorText) => { throw new Error(errorText)})}})
    .then(() => res.status(200).send("Success"))
    .catch((e) => {res.status(400).send(e.message)})
}

const deleteOrder = async (req, res) => {
    const { productName, productId, quantity, userId} = req.body

    const getUser = await userModel.find({_id: userId})

    const userData = {
        firstName: getUser.firstName,
        lastName: getUser.lastName,
        city: getUser.city,
        address: getUser.address,
        mobile: getUser.mobile,
        zipCode: getUser.zipCode
    }

    fetch('http://nginx:80/api/order/delete-order', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify(productName, productId, quantity, userData)
    })
    .then(() => res.status(200).send({msg: "Success"}))
    .catch(e => res.status(400).send(e.message))
}

const getOrders = async (req, res) => {
    const user_id = req.params.id
    fetch('http://nginx:80/api/order/get-orders',{
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({userId: user_id})
    })
    .then((response) => res.status(200).send(response))
    .catch((e) => res.status(400).send(e.message))
}

const getOrder = async (req, res) => {
    const user_id = req.params.id
    const orderNumber = req.params.order_id
    const data = {
        userId: user_id,
        orderNumber
    }
    fetch('http://nginx:80/api/order/get-orders',{
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(data)
    })
    .then((response) => res.status(200).send(response))
    .catch((e) => res.status(400).send(e.message))
}

orderController.post('/create-order', order)
orderController.delete('/delete-order', deleteOrder)
orderController.get('/get-orders/:id', getOrders)
orderController.get('/get-order/:id/:order_id', getOrder)


module.exports = orderController