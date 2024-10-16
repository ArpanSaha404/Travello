import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import Loading from '../Loading/Loading';
import Navbar from '../Navbar/Navbar';
import LoginError from '../Auth/LoginError';
import Footer from '../Footer/Footer';

const Payments = () => {

    const [BookingData , setBookingData] = useState({bookingDetails : null});
    const [PaymentData , setPaymentData] = useState({newDetails : null});
    const [IsLoading , setIsLoading] = useState(true);
    const [PaymentDone , setPaymentDone] = useState(false);

    const userName = useSelector((state) => state.auth.userName);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    const {bookingID} = useParams();
    const navigate = useNavigate();

    const months = ['Jan' , 'Feb' , 'Mar' , 'Apr' , 'Jun' , 'Jul' , 'Aug' , 'Sep' , 'Oct' , 'Nov' , 'Dec'];

    useEffect(() => {
        const fetchBookingData = async () => {
            await axios
                .get(`https://travello-r7hg.onrender.com/payments/${bookingID}`)
                .then((res) => {
                console.log(res.data);
                if(res.data)
                {
                    setBookingData((prev) => ({
                        ...prev , bookingDetails : res.data.bookingDetails
                    }));
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                console.log(err);
            });
        };
        fetchBookingData();
    },[bookingID]);

    if(!isLoggedIn)     return (<LoginError />);
    if(IsLoading)       return (<Loading />);


    const handlePayment = async () => {
        await axios
            .put(`https://travello-r7hg.onrender.com/confirmPayments/${BookingData.bookingDetails.bookingId}`)
            .then((res) => {
                console.log(res.data);
                if(res.data)
                {
                    setPaymentData((prev) => ({
                        ...prev , newDetails : res.data.newDetails
                    }));
                }
            })
            .catch((err) => {
                console.log(err)
            });
        setPaymentDone(true);

        const timer = setTimeout(() => {
            navigate('/');
        },5000);

        return () => clearTimeout(timer);
    };

  return (
    <div className='bg-slate-950 text-white font-sans w-screen h-screen'>
        <Navbar />
        <div className='flex justify-center items-center bg-slate-900 mt-16 pb-8 mx-40'>
            <div className='text-4xl font-bold pt-2 underline'>{!PaymentDone ? 'Payment' : 'Payment Completed'}</div>
        </div>
        {!PaymentDone ? (
            <div>
                <div className='flex justify-evenly items-start bg-slate-900 mx-40'>
                    <div className='bg-slate-900'>
                        <div className='bg-slate-900 text-2xl font-bold pb-4'>Your Package Details : </div>
                        <div className='bg-slate-900 text-xl flex justify-start items-center'>
                            <div>Booking ID : </div>
                            <div className='pl-3'>{BookingData.bookingDetails.bookingId}</div>
                        </div>
                        <div className='bg-slate-900 text-xl flex justify-start items-center'>
                            <div>Booked By: </div>
                            <div className='pl-3'>{userName}</div>
                        </div>
                        <div className='bg-slate-900 text-xl flex justify-start items-center'>
                            <div>Package: </div>
                            <div className='pl-3'>{BookingData.bookingDetails.packageName.split('0')[0]}</div>
                        </div>
                        <div className='bg-slate-900 text-xl flex justify-start items-center'>
                            <div>Journey Dates : </div>
                            <div className='pl-3'>{new Date(BookingData.bookingDetails.dates[0]).getDate() + ' ' +  months[new Date(BookingData.bookingDetails.dates[0]).getMonth()-1] + ' ' + new Date(BookingData.bookingDetails.dates[0]).getFullYear() + '  to  ' + new Date(BookingData.bookingDetails.dates[0]).getDate() + ' ' + months[new Date(BookingData.bookingDetails.dates[1]).getMonth()-1] + ' ' + new Date(BookingData.bookingDetails.dates[0]).getFullYear()}</div>
                        </div>
                        <div className='bg-slate-900 text-xl flex justify-start items-center'>
                            <div>No of People: </div>
                            <div className='pl-3'>{BookingData.bookingDetails.noOfAdults} Adults</div>
                            <div className='pl-3'>{BookingData.bookingDetails.noOfPeople - BookingData.bookingDetails.noOfAdults} Children</div>
                        </div>
                    </div>
                    <div>
                        {BookingData.bookingDetails.bookedHotels ? (
                            <div>
                                <div className='bg-slate-900 text-xl flex justify-start items-center'>
                                    <div className='bg-slate-900 text-2xl font-bold pb-4'>Hotel Details: </div>
                                </div>
                                <div className='bg-slate-900 text-xl'>
                                    <div className='flex justify-center items-center'>
                                        <div>Hotel Name: </div>
                                        <div className='pl-3'>{BookingData.bookingDetails.hotelName}</div>
                                    </div>
                                    <div className='flex justify-center items-center'>
                                        <div>No of Rooms Booked: </div>
                                        <div className='pl-3'>{BookingData.bookingDetails.hotelNoOfRooms}</div>
                                    </div>
                                </div>
                            </div>
                        ) : ''}
                    </div>
                </div>
                <div className='bg-slate-900 text-xl flex justify-center items-center py-4 mx-40'>
                    <div className='bg-slate-900 text-2xl font-bold'>Your Price Breakdown: </div>
                </div>
                <div className='bg-slate-900 text-xl flex flex-col justify-center items-center mx-40'>
                    <div>Package Price: <FontAwesomeIcon icon={faIndianRupeeSign} size='sm' fixedWidth />{BookingData.bookingDetails.packagePrice}</div>
                    <div className='px-16 border-solid border-white border-b-2'>Hotel Price : <FontAwesomeIcon icon={faIndianRupeeSign} size='sm' fixedWidth />{BookingData.bookingDetails.totalPrice - BookingData.bookingDetails.packagePrice}</div>
                    <div className='font-bold py-2'>Total Price : <FontAwesomeIcon icon={faIndianRupeeSign} size='sm' fixedWidth />{BookingData.bookingDetails.totalPrice}</div>
                    <button className='text-4xl px-8 py-2 my-8 font-sans font-bold bg-indigo-800 rounded-md hover:shadow-sm hover:shadow-indigo-300 hover:bg-indigo-600 transition duration-300 ease-in-out active:scale-75' onClick={handlePayment}>Make Payment</button>
                </div>
            </div>
        ) : (
        <div className='text-white text-3xl bg-slate-900 mx-40 flex flex-col justify-center items-center'>
            <div className='my-3'>Your Payment of <FontAwesomeIcon icon={faIndianRupeeSign} size='sm' fixedWidth />{PaymentData.newDetails.totalPrice} has been Accepted</div>
            <div className='my-3'>Booking ID : {PaymentData.newDetails.bookingId}</div>
            <div className='my-3'>Payment ID : {PaymentData.newDetails.paymentID}</div>
            <div className='my-16 text-xl'>You'll be redirected to Home Page in 5 Seconds...</div>
        </div>
        )}
        <Footer />
    </div>
  );
};

export default Payments;