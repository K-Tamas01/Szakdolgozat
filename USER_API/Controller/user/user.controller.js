const express = require('express')
const userController = express.Router()
const md5 = require('md5')
const userModel = require('../../model/user.schema')

const userLogin = async (req, res) => {
    const { username, password } = req.body
    const result = await userModel.findOne({Uname: username})

    if(!result) res.status(400).send("Invalid username!")
    if(result.password == md5(password)) res.status(400).send("Invalid password!")

    res.status(200).send("Login Success")
}

const userRegist = async (req, res) => {
    const { username, password, email } = req.body
    
    const emailResult = await userModel.findOne({email: email})

    if(!!emailResult) { 
        res.status(400).send("Email is already taken"); 
        return; 
    }
    
    const UnameResult = await userModel.findOne({Uname: username})

    if(!!UnameResult) {
        res.status(400).send("Username is already taken");
        return;
    }

    const result = new userModel({
        email: email,
        Uname: username,
        password: md5(password)
    })

    try{
        await result.save()
    } catch(e){
        res.status(400).send({msg: e});
        return;
    }

    res.status(201).send("Registration success")
}

const userUpdate = async (req, res) => {

}

const userDelete = async (req, res) => {

}

const getUser = async (req, res) => {

}

userController.post("/login", userLogin)
userController.post("/regist", userRegist)
userController.put("/update", userUpdate)
userController.delete("delete", userDelete)
userController.get("getUser", getUser)


module.exports = userController