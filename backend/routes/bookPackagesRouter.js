import express from 'express';
import { Users } from '../models/users.js';
import { PackageDetails } from '../models/packageDetails.js';
import { BookedPackages } from '../models/bookedPackages.js';

const router = express.Router();

router.post('/insertBookPackageData/:packageID' , async (req , res) => {
    try {
        const pkgId = req.params.packageID.toLowerCase();
        const {userEmail} = req.body;
        console.log(`Package : ${pkgId} & Email : ${userEmail}`);

        const user = await Users
            .findOne({email : userEmail});

        const bookingPackageData = await PackageDetails
            .findOne({packageTitle : pkgId});
        
        if(user && bookingPackageData)
        {
            let newBookingID , newPaymentID;
            for(let i=0;i<9999;i++)
            {
                newBookingID = 'BID' + Math.floor(10000 + Math.random() * 90000);
                const dupBID = await BookedPackages
                    .findOne({bookingID : newBookingID})
                if(!dupBID)
                {
                    console.log(newBookingID);
                    break;
                }     
            }
            for(let i=0;i<9999;i++)
            {
                newPaymentID = 'PID' + Math.floor(10000 + Math.random() * 90000);
                const dupPID = await BookedPackages
                    .findOne({paymentID : newPaymentID})
                if(!dupPID)
                {
                    console.log(newPaymentID);
                    break;
                }     
            }
            const newBookedPackage = new BookedPackages({
                packageName : pkgId,
                bookedBy : userEmail,
                bookingId : newBookingID,
                paymentID : newPaymentID,
                bookingStatus : 'saved',
                bookedHotels : 'false',
            });
            const insertedData = await BookedPackages.create(newBookedPackage);
            if(insertedData)
            {
                user.bookedPackages.push(newBookedPackage)
                user.save();
                console.log(`Package Saved with Booing ID : ${newBookingID}`);
                res.status(200).json({insertedData});
            }
        }
        else
        {
            if(!user)
            {
                res.status(200).json({message : "No Such User Found"});
            }
            else
            {
                res.status(200).json({message : "No Such Package Found"});
            }
        }


    } catch (error) {
        console.log(error);
        res.status(400).json({message : 'Some Error in Inserting Booked Package Data'});
    }
});

router.get('/bookingDetails/:packageId/:bookingId' , async (req , res) => {
    const pkgId = req.params.packageId.toLowerCase();
    const bId = 'BID' + req.params.bookingId.substring(3);

    try {
        const insertedData = await BookedPackages
            .findOne({bookingId : bId} , {_id : 0});

        const bookingPackageData = await PackageDetails
            .findOne({packageTitle : pkgId} , {_id : 0})
    
        if(insertedData && bookingPackageData)
        {
            res.status(200).json({bookingPackageData , insertedData})
        }
        else
        {
            res.status(200).json({message : 'No Such Booking Found!!!'});
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({message : 'Some Error!!!'});
    }
})

router.get('/bookPackage/:packageId' , async (req , res) => {
    try {
        const pkgId = req.params.packageId.toLowerCase();
        const {email} = req.query;
        console.log(email);

        const user = await Users
            .findOne({email : email});

        if(user)
        {
            const bookingPackageData = await PackageDetails
            .findOne({packageTitle : pkgId} , {packageTitle : 1 , subTitle : 1 , pics : 1 , price : 1 , tripLength : 1 , thingsDoSee : 1 , hotels : 1 , _id : 0});

            if(bookingPackageData)
            {
                let newBookingID , newPaymentID;
                for(let i=0;i<9999;i++)
                {
                    newBookingID = 'BID' + Math.floor(10000 + Math.random() * 90000);
                    const dupBID = await BookedPackages
                        .findOne({bookingID : newBookingID})
                    if(!dupBID)
                    {
                        console.log(newBookingID);
                        break;
                    }     
                }
                for(let i=0;i<9999;i++)
                {
                    newPaymentID = 'PID' + Math.floor(10000 + Math.random() * 90000);
                    const dupPID = await BookedPackages
                        .findOne({paymentID : newPaymentID})
                    if(!dupPID)
                    {
                        console.log(newPaymentID);
                        break;
                    }     
                }

                async function insertBookedPackageData() {
                    try {
                        const newBookedPackage = new BookedPackages({
                            packageName : pkgId,
                            bookedBy : email,
                            bookingId : newBookingID,
                            paymentID : newPaymentID,
                            bookingStatus : 'saved',
                            bookedHotels : 'false',
                        });
                        const insertedData = await BookedPackages.create(newBookedPackage);
                        if(insertedData)
                        {
                            user.bookedPackages.push(newBookedPackage)
                            user.save();
                            console.log(`Package Saved with Booing ID : ${newBookingID}`);
                            res.status(200).json({ bookingPackageData , insertedData });
                        }
                    } catch (error) {
                        console.log('Error while Inserting Booked Package Data');
                        console.log(error);
                        res.status(400).json({message : 'Some Error in Inserting Booked Package Data'});
                    }
                };
                insertBookedPackageData();
            }
            else
            {
                res.status(200).json({message : "No Such Package Found"});
            }
        }
        else
        {
            res.status(200).json({message : "No Such User Found"});
        }
    } catch (error) {
        console.log('Error while Reading Package Details Data');
        console.log(error);
        res.status(400).json({message : 'Some Error while Reading Package Details Data'});
    }
});

router.put('/bookedPackage/:bookingID' , async (req , res) => {
    const updateBookingDetails = req.body;
    const bookingID = 'BID' + req.params.bookingID.substring(3);

    try {
        const existingBooking = await BookedPackages.findOne({bookingId : bookingID});
        if(existingBooking)
        {
            existingBooking.noOfPeople = updateBookingDetails.noOfPeople ? updateBookingDetails.noOfPeople : existingBooking.noOfPeople;
            existingBooking.noOfAdults = updateBookingDetails.noOfAdults ? updateBookingDetails.noOfAdults : existingBooking.noOfAdults;
            existingBooking.bookedHotels = updateBookingDetails.bookedHotels ? updateBookingDetails.bookedHotels : existingBooking.bookedHotels;
            existingBooking.hotelName = updateBookingDetails.hotelName ? updateBookingDetails.hotelName : existingBooking.hotelName;
            existingBooking.hotelNoOfRooms = updateBookingDetails.hotelNoOfRooms ? updateBookingDetails.hotelNoOfRooms : existingBooking.hotelNoOfRooms;
            existingBooking.packagePrice = updateBookingDetails.packagePrice ? updateBookingDetails.packagePrice : existingBooking.packagePrice;
            existingBooking.totalPrice = updateBookingDetails.totalPrice ? updateBookingDetails.totalPrice : existingBooking.totalPrice;
            existingBooking.paymentStatus = 'saved';

            if(updateBookingDetails.dates && updateBookingDetails.dates.length === 2)
            {
                const startDate = new Date(updateBookingDetails.dates[0]);
                const endDate = new Date(updateBookingDetails.dates[1]);

                if(isNaN(startDate) || isNaN(endDate))
                {
                    res.status(200).json({message : 'Date Format is Invalid!!!'});
                    return;
                }
                else
                {
                    const newDates = [startDate , endDate];
                    existingBooking.dates = newDates;
                }
            }
            const newDetails = await existingBooking.save();
            if(newDetails)
            {
                res.status(200).json({newDetails});
            }
            else
            {
                res.status(200).json({message : 'Data not Updated!!!'});
            }
        }
        else
        {
            res.status(200).json({message : 'Data not Found!!!'});
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({message : 'Some Error!!!'});
    }
});

router.get('/payments/:bookingID' , async (req , res) => {
    const bookingID = 'BID' + req.params.bookingID.substring(3);
    const bookingDetails = await BookedPackages.findOne({bookingId : bookingID} , {_id : 0});

    if(bookingDetails)
    {
        res.status(200).json({bookingDetails});
    }
    else
    {
        res.status(200).json({message : 'No Such Booking Found!!!'});
    }
});

router.put('/confirmPayments/:bookingID' , async (req , res) => {
    const bookingID = 'BID' + req.params.bookingID.substring(3);
    try {
        const bookingDetails = await BookedPackages.findOne({bookingId : bookingID})

        if(bookingDetails)
        {
            bookingDetails.paymentStatus = 'confirmed';
            const newDetails = await bookingDetails.save();
            if(newDetails)
            {
                res.status(200).json({newDetails});
            }
            else
            {
                res.status(200).json({message : 'Payment Not Accepted!!!'});
            }
        }
        else
        {
            res.status(200).json({message : 'No Such Booking Found!!!'});
        }
    } catch (error) {
        console.log('Some Error!!!');
    }
});

export const bookPackagesRouter = router;