import User from '../models/user.model.js';
import bcrpyt from 'bcryptjs';

export const signup = async (req, res) => {
    try {
        const { fullName, username, email, password } = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "invalid email format" })
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "Username is already taken" })
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ error: "Email is already taken" })
        }

        //hash password
        const salt = await bcrpyt.genSalt(10);
        const hashedPassword = await bcrpyt.hash(password.salt);
        const newUser = new User({
            fullName,
            username,
            email,
            password: hashedPassword
        })

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res)
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                fullName: newUser.fullName,
                profileImg: newUser.profileImg,
                coverImg: newUser.coverImg,
                bio: newUser.bio,
                link: newUser.link,
                followers: newUser.followers,
                following: newUser.following
            })
        } else {
            res.status(400).json({ error: "invalid user data" })
        }
    } catch (error) {
        console.log("Error in signup controller", error.message)
        res.status(500).json({ error: "invalid server error" })
    }
}

export const login = async (req, res) => {
    res.json({
        data: "you hit the login endpoint"
    })
}


export const logout = async (req, res) => {
    res.json({
        data: "you hit the logout endpoint"
    })
}


