const express = require('express')
const userController = express.Router()
const md5 = require('md5')
const userModel = require('../../model/user.schema')

const userLogin = async (req, res) => {
    const { email, password } = req.body
    const result = await userModel.findOne({email: email})

    if(!result) {res.status(500).send("Invalid email!"); return}
    if(result.password !== md5(password)) {res.status(500).send("Invalid password!"); return}

    res.status(200).send("Login Success")
}

const userRegist = async (req, res) => {
    const { firstName, lastName, password, email, address, city, mobile, zipCode } = req.body
    
    const emailResult = await userModel.findOne({email: email})

    if(!!emailResult) { 
        res.status(500).send("Email is already taken"); 
        return; 
    }

    const result = new userModel({
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: md5(password),
        address: address,
        city: city,
        mobile: mobile,
        zipCode: zipCode
    })

    try{
        await result.save()
    } catch(e){
        res.status(500).send({msg: e});
        return
    }

    res.status(201).send("Registration success")
}

const userUpdate = async (req, res) => {
    const newData = req.body

    const result = await userModel.findOneAndUpdate({_id: newData._id}, {$set: newData}, {upsert: false})

    result ? res.status(500).send('Failed....') : res.status(200).send('Success')
}

const userDelete = async (req, res) => {
    const { email } = req.body

    const userResult = await userModel.findOneAndDelete({email: email})

    if(userResult.deletedCount === 0) return res.code(500).send('Failed...');

    res.code(200).send('Success');
}

userController.post("/login", userLogin)
userController.post("/regist", userRegist)
userController.put("/update", userUpdate)
userController.delete("delete", userDelete)

module.exports = userController