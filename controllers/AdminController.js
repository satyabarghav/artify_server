const Admin = require('../models/Admin')
const Product = require('../models/Product')
require('dotenv').config();
const defaultAdmin = {
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD,
}
const login = async (req, res) => {
    try {
        if(req.body.username === defaultAdmin.username && req.body.password === defaultAdmin.password) {
            return res.status(200).send("Logged in Successfully");
        }
        const admin = await Admin.findOne({
        username: req.body.username ,
        password: req.body.password,
        });
        if (!admin) {
            return res.status(404).send("Invalid Username or Password");
        }
        res.status(200).send("Logged in Successfully");
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}
const viewUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(400 ).send(error.message);
    }
}
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.status(200).send("User deleted successfully");
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}
const viewArts = async (req, res) => {
    try {
        const arts = await Product.find();
        res.status(200).send(arts);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const deleteArt = async (req, res) => {
    try {
        const art = await Product.findByIdAndDelete(req.params.id);
        if (!art) {
            return res.status(404).send("Art not found");
        }
        res.status(200).send("Art deleted successfully");
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}
module.exports = { login,viewUsers,viewArts,deleteUser,deleteArt }