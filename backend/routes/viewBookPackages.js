import express from 'express'
import {PackageDetails} from '../models/packageDetails.js'

const router = express.Router();

router.get('/topPackages' , async (req , res) => {
    try {
        const topPackages = await PackageDetails.find({} , {packageTitle : 1 , desc : 1 , pics : 1 , rating : 1 , _id  :0})
        .sort({rating : -1})
        .limit(5);
        res.status(200).json({topPackages});
    } catch (error) {
        console.log(error);
        res.status(400).json({message : "Some Error..."});
    }
});


export const viewBookPackage = router;