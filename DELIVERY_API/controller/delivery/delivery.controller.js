const express = require('express')
const deliveryController = express.Router()
const deliveryModel = require('../../model/delivery.schema')

const deliverNumberGenerate = async () => {
    const result = await deliveryModel.find()
    return result.length + 1
}

const generateDate = () => {
    const deliveryDate = new Date()
    let year = deliveryDate.getFullYear()
    let month = deliveryDate.getMonth() + 1
    let day = deliveryDate.getDate()
    let dayOfWeek = deliveryDate.getDay() + 3
    const date = new Date(year, month, 0).getDate()

    dayOfWeek === 0 ? day += 4 : day += 5

    if(day > date) {
        day -= date
        month++
        if(month >= 12){
            month = 0
            year++
        }
    }

    return `${year}-${month}-${day}`    
}

const createDelivery = async (req, res) => {
    const data = req.body
    
    const result = new deliveryModel({
        deliveryNumber: await deliverNumberGenerate(),
        customerFirstName: data.userData.firstName,
        customerLastName: data.userData.lastName,
        customerId: data.userData.userId,
        delivery_date: generateDate(),
        Location: "A Raktár",
        items: data.products,
        city: data.userData.city,
        deliveryAddress: data.userData.address
    })

    result.save()
    .then(() => res.status(200).send('Success'))
    .catch((e) => res.status(500).send(e))
}

const getDeliveryById = async (req, res) => {
    const id = req.params.id

    deliveryModel.find({deliveryNumber: id})
    .then((result) => {
        res.status(200).send(result)
    })
    .catch((e) => {
        res.status(500).send(e)
    })
}

const modifyDeliveryById = async (req, res) => {
    const data = req.body

    await deliveryModel.findOneAndUpdate({deliveryNumber: data.deliveryNumber}, {$set: data}, {upsert: false})
    .then(() => res.status(200).send('Success'))
    .catch((e) => res.status(500).send(e))
}

const getDeliveries = (req, res) => {
    deliveryModel.find()
    .then((result) => {
            res.status(200).send(result)
        })
    .catch((e) => {
            res.status(500).send(e)
        })
}

deliveryController.post('/createDelivery', createDelivery)
deliveryController.get('/getDelivery/:id', getDeliveryById)
deliveryController.get('/getDeliveries', getDeliveries)
deliveryController.put('/modifyDeliveryById', modifyDeliveryById)

module.exports = deliveryController