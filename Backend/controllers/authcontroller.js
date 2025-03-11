import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const registerUser = async (req, res) => {

    try{
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ emial });
        if(userExists){
            res.status(400).json({message: 'User alrady exists in Database'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            message: 'User created successfully',
            user :{
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
        });

    }
    catch(error){
        res.status(500).json({message: 'Server Error'});
    }
};