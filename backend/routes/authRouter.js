import express from 'express';
import bcrypt from 'bcryptjs';
import {Users} from '../models/users.js'

const router = express.Router();

//Sign Up by Users
router.post('/register' , async (req , res) => {
    try {
        if(req.body.userName || req.body.email || req.body.phnNo || req.body.password)
        {
            const {userName , email , phnNo , password} = req.body;
            const hashPassword = bcrypt.hashSync(password);
            const newUser = new Users({userName, email , phnNo , password : hashPassword , userType : 'User'});
            // await newUser.save().then(() => res.status(200).json({message : "Sign Up SuccessFul"}));
            const insertedData = await Users.create(newUser);
            if(insertedData)
            {
                console.log('Sign Up Successfull');
                return res.status(200).json({insertedData});
            }
            else
            {
                return res.status(200).json({message : "User Already Exists..."});
            }
        }
        else{
            if(!req.body.userName)
            {
                return res.status(400).send({message : "Please Fill in UserName!!!"});
            }
            else if(!req.body.email)
            {
                return res.status(400).send({message : "Please Fill in Email!!!"});
            }
            else if(!req.body.phnNo)
            {
                return res.status(400).send({message : "Please Fill in Phone No!!!"});
            }
            else
            {
                return res.status(400).send({message : "Please Fill in Password!!!"});
            }
        }
        
    } catch (error) {
        console.log(error);
        res.status(200).json({message : "User Already Exists...Pls Try to Log In..."});
    }
});

//Login
router.post('/login' , async (req , res) => {
    try {
        let user , user1 , user2;
        if(req.body.email)
        {
            if(req.body.email.length === 10 && !req.body.email.includes('@'))
            {
                user1 = await Users.findOne({phnNo : req.body.email});
            }
            else
            {
                user2 = await Users.findOne({email: req.body.email});
            }
        }
        else
        {
            return res.status(200).json({message : "Incorrect Data..."});
        }
        if(!user1 && !user2)
        {
            return res.status(200).json({message : "Please Sign Up First..."});
        }

        if(user1)
        {
            user = user1
        }
        else if(user2)
        {
            user = user2;
        }
        const isPasswordCorr = bcrypt.compareSync(req.body.password , user.password);
        if(!isPasswordCorr)
        {
            return res.status(200).json({message : "Password is Incorrect..."});
        }
        else
        {
            console.log('Log In Successfull');
            return res.status(200).json(user);
        }

    } catch (error) {
        console.log(error);
        res.status(400).json({message : "Login Failed..."});
    }
})


export const authRouter = router;