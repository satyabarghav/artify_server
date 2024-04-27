const User = require("../models/User");
const Token = require("../models/Token");
const sendEmail = require("../mailer");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const register = async (req, res) => {
  try {
    const hasedPwd = await bcrypt.hash(req.body.password, 10);
    let user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hasedPwd,
    });
    user = await user.save();
    const token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();
    const url = `${process.env.BASE_URL}/${user._id}/verify/${token.token}`;

    // Call sendEmail function to send verification email
    await sendEmail(
      user.email,
      "Account Verification",
      `Please click on the link to verify your account: ${url}`
    );
    res.status(201).send("Registered Successfully");
  } catch (error) {
    res.status(400).send(error);
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });

    if (!user) {
      return res.status(404).send("Invalid Username or Email");
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.status(401).send("Invalid Password");
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const verify = async (req, res) => {
  try {
    const token = await Token.findOne({
      userId: req.params.userId,
      token: req.params.token,
    });
    console.log(req.params.userId);
    if (!token) {
      return res.status(404).send("Invalid token");
    }
    await User.updateOne({ _id: req.params.userId }, { isVerified: true });
    await token.remove();
    res.status(200).send("Account verified successfully");
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { register, login, verify };
