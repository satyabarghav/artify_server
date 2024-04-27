const Admin = require('../models/Admin')
require('dotenv').config();
const defaultAdmin = {
    username: PROCESS.env.ADMIN_USERNAME,
    password: PROCESS.env.ADMIN_PASSWORD,
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
module.exports = { login,viewUsers }