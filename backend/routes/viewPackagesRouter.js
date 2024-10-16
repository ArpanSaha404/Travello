import express from 'express'
import {PackageDetails} from '../models/packageDetails.js'

const router = express.Router();

router.get('/topPackages' , async (req , res) => {
    try {
        const topPackages = await PackageDetails
            .find({} , {packageTitle : 1 , desc : 1 , pics : 1 , rating : 1 , _id :0})
            .sort({rating : -1})
            .limit(5);
        res.status(200).json({topPackages});
    } catch (error) {
        console.log(error);
        res.status(400).json({message : "Some Error..."});
    }
});


router.get('/viewAllPackages' , async (req , res) => {
    try {
        const allPackages = await PackageDetails
            .find({} , {packageTitle : 1 , subTitle: 1 , pics : 1 , rating : 1 , type : 1 , tripLength : 1 , price : 1 , _id : 0})
            .sort({rating : -1 , type : 1});
            
        res.status(200).json({allPackages});
    } catch (error) {
        console.log(error);
        res.status(400).json({message : "Some Error..."});
    }
});

router.get('/viewPackageDetails/:packageId' , async (req , res) => {
    try {
        const pkgId = req.params.packageId.toLowerCase();
        const packageData = await PackageDetails
            .findOne({packageTitle : pkgId});

        if(packageData)
        {
            res.status(200).json({packageData});
        }
        else
        {
            res.status(200).json({message : "No Such Package Found"});
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).json({message : "Some Error..."});
    }
})

export const viewPackagesRouter = router;