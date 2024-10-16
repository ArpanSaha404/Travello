import express from 'express';
import {PackageDetails} from '../models/packageDetails.js';

const router = express.Router();

router.post('/addPackage' , async (req , res) => {
    try {
        const packageData = req.body;
        const newPackage = new PackageDetails(packageData);
        await newPackage.save().then(() => res.status(200).send({message : "Package Added Successfully"}));
    } catch (error) {
        console.log(error);
        return res.status(400).json({message : "Package not Added..."});
    }
});

export const packageAdmin = router;