import bcrypt from "bcrypt"
import User from "../models/UserModel.js"

export const register = async (req, res) => {
    const {name, email, password, isAdmin} = req.body;

    try {

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name: name,
            email: email,
            password: hash,
            isAdmin: isAdmin
        })

        await newUser.save();
        res.status(201).json({message:"User is created."})
    } catch (error) {
        res.status(400).json(error)
        console.log(error);
    }
}

export const login = async (req, res) => {
    try {
        const {email} = await req.body

        const loginUser = await User.findOne({ email: email});
        if(!loginUser) return res.status(404).json({message:"Invalid Email"})

        const validPassword = await bcrypt.compare(req.body.password, loginUser.password);
        if(!validPassword) return res.status(500).json({message:"Invalid password"});

        const { password, isAdmin, ...otherDetail } = loginUser._doc

        res.status(200).json(otherDetail);
    } catch (error) {
        res.status(400).json(error);
    }
}

export const allUser = async (req, res) => {
    const users = await User.find()
    res.status(200).json(users);
}
