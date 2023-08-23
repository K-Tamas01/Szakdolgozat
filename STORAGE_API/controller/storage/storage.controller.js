const express = require('express')
const storageController = express.Router()
const storageModel = require('../../model/storage.schame')

const createProduct = async (req, res) => {
    const {
        productName, 
        productCode, 
        description, 
        quantity, 
        unitPrice, 
        category, 
        supplier, 
        location
    } = req.body

    const productResult = await storageModel.findOne({productCode})

    if(!!productResult){
        res.status(400).send('This product is already exists!')
        return;
    }

    const result = new storageModel({
        productName,
        productCode,
        description,
        quantity,
        unitPrice,
        category,
        supplier,
        location
    })

    await result.save()
    .then(() => res.status(201).send('Success'))
    .catch((e) => res.status(400).send(e))
}

const deleteProduct = async (req, res) => {
    const {productCode} = req.body

    const productResult = await storageModel.findOneAndDelete({productCode})

    if(productResult.deletedCount === 0) return res.status(400).send('Failed...')

    res.status(200).send('Success')
}

const updateProduct = async (req, res) => {
    const newData = req.body

    for(const item in newData){
        const result = await storageModel.findOne({productCode: newData[item].productId}, {_id: 0, quantity: 1})
        newData[item].quantity = result.quantity - newData[item].quantity

        await storageModel.findOneAndUpdate({productCode: newData[item].productId}, {$set: newData[item]}, {upsert: false})
        .catch((e) => {res.status(500).send(e); return})
    }

    res.status(200).send('Success')
}

const getProduct = async (req, res) => {
    const result = await storageModel.find()

    !result ? res.status(500).send('Failed...') : res.status(200).send(result) 
}

const getitems = async (req, res) => {
    const data = req.body

    for(const item in data){
        const result = await storageModel.findOne({productCode: data[item].productId})

        if(!result){ res.status(500).send({error: 'Failed...'}); return}
        if(result.quantity < data[item].quantity) {res.status(400).send({error: 'Nincs elegendő a raktáron a megrenedelő árúból!'}); return}
    }
    res.status(200).send('Success')
}

storageController.post('/create-storage', createProduct)
storageController.delete('/delete-storage', deleteProduct)
storageController.put('/update-storage', updateProduct)
storageController.get('/get-storage', getProduct)
storageController.post('/get-items', getitems)

module.exports = storageController