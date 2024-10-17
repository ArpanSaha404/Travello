import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle , faIndianRupeeSign , faArrowRight , faMinus , faPlus , faStar } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import Loading from '../Loading/Loading';
import LoginError from '../Auth/LoginError';
import Footer from '../Footer/Footer';
import { decrementAdult, decrementChild, incrementAdult, incrementChild } from '../../Features/PackagePrice/noOfPeopleSlice';
import { priceDecrementAdult, priceDecrementChild, priceIncrementAdult, priceIncrementChild } from '../../Features/PackagePrice/packagePriceSlice';
import { decrementRooms, incrementRooms } from '../../Features/HotelPrice/noOfRoomSlice';
import { decrementPrice, incrementPrice } from '../../Features/HotelPrice/hotelPriceSlice';

const BookPackage = () => {

    const [PkgDetBookDet , setPkgDetBookDet] = useState({bookingPackageData : null , insertedData : null});
    const [IsLoading , setIsLoading] = useState(true);
    const [ImgIdx , setImgIdx] = useState(0);
    const [SelectedDate , setSelectedDate] = useState('');
    const [PackageDetails , setPackageDetails] = useState(true);
    const [BookPackageErr , setBookPackageErr] = useState('');

    const email = useSelector((state) => state.auth.email);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const noAdult = useSelector((state) => state.packagePrice.adultCounter);
    const noChild = useSelector((state) => state.packagePrice.childCounter);
    const adultPrice = useSelector((state) => state.packagePrice.adultValue);
    const childPrice = useSelector((state) => state.packagePrice.childValue);
    const noHotelRooms = useSelector((state) => state.noRooms.value);
    const currHotelSelected = useSelector((state) => state.noRooms.name);
    const hotelPrice = useSelector((state) => state.hotelPrice.value);
    const [ErrorRooms1 , setErrorRooms1] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {packageId} = useParams();
    const [searchParams] = useSearchParams();
    const userEmail = searchParams.get('email');

    useEffect(() => {
        const fetchPackageData = async () => {
            console.log(email);
            if(email)
            {
                await axios
                    .get(`https://travello-r7hg.onrender.com/${packageId}` , {
                        params : { email : userEmail }
                    })
                    .then((res) => {
                    console.log(res.data);
                    if(res.data)
                    {
                        setPkgDetBookDet((prev) => ({
                            ...prev , bookingPackageData : res.data.bookingPackageData , insertedData : res.data.insertedData
                        }));
                        setIsLoading(false);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
            }
        };
        fetchPackageData();
    },[packageId , email]);

    if(!isLoggedIn)     return (<LoginError />);
    if(IsLoading)       return (<Loading />);

    const tripDays = Number(PkgDetBookDet.bookingPackageData.tripLength.split('/')[1].charAt(0));

    const tripEndDate = new Date(SelectedDate);
    tripEndDate.setDate(tripEndDate.getDate() + tripDays);
    const endDate = (tripEndDate.getFullYear() + '-' + tripEndDate.getMonth() + '-' + tripEndDate.getDate()).toString();

    const packagePrice = adultPrice + childPrice;
    const totalPeople = noAdult + noChild;
    const totalPrice = packagePrice + hotelPrice;

    const handleImgIdx = (index) => {
        setImgIdx(index);
    };

    const handlePackageDetails = () => {
        setPackageDetails(!PackageDetails);
    };

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const handlePackageFeatures = (peopleType , actionType) => {
        if(peopleType === 'adult')
        {
            if(actionType === 'increment')
            {
                setErrorRooms1('');
                document.querySelector('#waringAddChild').style.display = 'none';
                dispatch(incrementAdult());
                dispatch(priceIncrementAdult(PkgDetBookDet.bookingPackageData.price.currPrice));
            }
            else if(actionType === 'decrement')
            {
                if(packagePrice < 0)       return;
                dispatch(decrementAdult());
                dispatch(priceDecrementAdult(PkgDetBookDet.bookingPackageData.price.currPrice));
            }
        }
        else if(peopleType === 'child')
        {
            if(actionType === 'increment')
            {
                if(noAdult === 0)
                {
                    document.querySelector('#waringAddChild').style.display = 'block';
                }
                dispatch(incrementChild());
                dispatch(priceIncrementChild(PkgDetBookDet.bookingPackageData.price.currPrice));
            }
            else if(actionType === 'decrement')
            {
                if(packagePrice < 0)       return;
                dispatch(decrementChild());
                dispatch(priceDecrementChild(PkgDetBookDet.bookingPackageData.price.currPrice));
            }
        }
    };

    const handleHotelFeatures = (actionType , item , index) => {
        if(actionType === 'increment')
        {
            if(noAdult > 0)
            {
                setErrorRooms1('');
                dispatch(incrementRooms(item));
                dispatch(incrementPrice({name : item , value : PkgDetBookDet.bookingPackageData.hotels.price[index]}));
            }
            else
            {
                setErrorRooms1('* Add No of People first to Add Rooms');
            }
        }
        else if(actionType === 'decrement')
        {
            dispatch(decrementRooms(item));
            dispatch(decrementPrice({name : item , value : PkgDetBookDet.bookingPackageData.hotels.price[index]}));
        }
    };

    const handlePaymentUpdates = async () => {
        const updatedDetails = {
            dates : [SelectedDate.toString() , endDate.toString()],
            noOfPeople : totalPeople,
            noOfAdults : noAdult,
            bookedHotels : noHotelRooms === 0 && currHotelSelected !== '' ? false : true,
            hotelName : currHotelSelected !== '' ? currHotelSelected : '',
            hotelNoOfRooms : noHotelRooms,
            packagePrice : packagePrice,
            totalPrice : totalPrice
        };

        if(noAdult <= 0 || SelectedDate === '')
        {
            setBookPackageErr('* Add Date of Journey & Atleast 1 Adult to Book');
            return;
        }
        else
        {
            setBookPackageErr('');
            await axios
                .put(`https://travello-r7hg.onrender.com/${PkgDetBookDet.insertedData.bookingId}` , updatedDetails)
                .then((res) => {
                    console.log(res.data)
                })
                .catch((err) => {
                    console.log(err);
                });
                navigate(`/payments/${PkgDetBookDet.insertedData.bookingId}`);
        }
    };

  return (
    <div className='bg-slate-950 text-white w-screen'>
        <div><Navbar /></div>
        <div className='mb-16 mt-8 px-8 flex justify-start items-center w-screen'>
            <div className='w-2/6 border-r-2 border-solid border-black'>
                <div className='font-sans font-bold text-6xl pb-8 mb-12'>{PkgDetBookDet.bookingPackageData.packageTitle.split('0')[0]}</div>
                <div className='font-sans text-2xl'><FontAwesomeIcon icon={faArrowRight} size='lg' fixedWidth /> {PkgDetBookDet.bookingPackageData.subTitle}</div>
            </div>
            <div className='w-4/6 flex flex-col justify-end items-center'>
                <div style={{backgroundImage : `url(${PkgDetBookDet.bookingPackageData.pics[ImgIdx]})`}} className='h-48 w-11/12 mb-1 bg-cover bg-center rounded-md'></div>
                <div className='flex justify-center items-center w-11/12'>
                    {PkgDetBookDet.bookingPackageData.pics.map((item , index) => (
                        <div key={index} className='h-16 w-full bg-cover bg-center border-solid border-2 border-white' style={{backgroundImage : `url(${item})`, border : index === ImgIdx ? '4px solid white' : '2px solid black'}} onClick={() => handleImgIdx(index)}></div>
                    ))}
                </div>
            </div>
        </div>
        <div>
            <div className='ml-8 mr-20 mb-16'>
                <div className='w-full flex justify-evenly items-end border-solid border-x-2 border-t-2 border-white rounded-t-lg'>
                    <button className='w-1/2 text-2xl border-solid border-r-2 border-black pb-4' style={{backgroundColor : PackageDetails === true ? '#0f172a' : '#020617' , borderBottom : PackageDetails === true ? '2px solid transparent' : '2px solid white'}} onClick={handlePackageDetails}>Your Package Includes</button>
                    <button className='w-1/2 text-2xl border-solid border-l-2 border-black pb-4' style={{backgroundColor : PackageDetails === false ? '#0f172a' : '#020617' , borderBottom : PackageDetails === false ? '2px solid transparent' : '2px solid white'}} onClick={handlePackageDetails}>Other Popular Attractions {'(Not Included)'}</button>
                </div>
                <div className='border-solid border-x-2 border-b-2 border-white rounded-b-lg'>
                    {PackageDetails ? (
                        PkgDetBookDet.bookingPackageData.thingsDoSee.places.map((item , index) => (
                            <div key={index} className='flex justify-start items-center py-4 px-16'>
                                <FontAwesomeIcon icon={faCircle} size='sm' fixedWidth />
                                <div className='pl-3 text-lg'>{item}</div>
                            </div>
                    ))) : (
                        PkgDetBookDet.bookingPackageData.thingsDoSee.around.map((item , index) => (
                            <div key={index} className='flex justify-start items-center py-4 px-16'>
                                <FontAwesomeIcon icon={faCircle} size='sm' fixedWidth />
                                <div className='pl-3 text-lg'>{item}</div>
                            </div>
                    )))}
                </div>
            </div>
            <div className='m-8 text-3xl flex justify-center items-center'>
                <div>
                    <label htmlFor='journeyDate'>Select your Journey Date : </label>
                    <input id='journeyDate' type='date' value={SelectedDate} onChange={handleDateChange} className='text-black rounded-lg pl-2' />
                    <div className='flex justify-center items-center mt-8'>{SelectedDate === '' ? '' : SelectedDate.toString() + '  to  ' + endDate}</div>
                </div>
            </div>
            <div className='m-8 mr-20 border-solid border-2 border-white rounded-lg'>
                <div className='text-red-700 pl-56 py-4 flex justify-start items-center'>* Childern below the Age of 10 will have half Prices for Packages as well as Hotels.</div>
                <div className='flex justify-between items-center mx-8 pl-48 py-2'>
                    <div className='text-3xl'>Price : </div>
                    <div className='flex justify-center items-center pr-48'>
                        <div className='text-2xl line-through pr-4'><FontAwesomeIcon icon={faIndianRupeeSign} size='sm' fixedWidth />{PkgDetBookDet.bookingPackageData.price.totalPrice.toString().substring(0 , PkgDetBookDet.bookingPackageData.price.totalPrice.toString().length-3) + ',' + PkgDetBookDet.bookingPackageData.price.totalPrice.toString().substring(PkgDetBookDet.bookingPackageData.price.totalPrice.toString().length-3)}</div>
                        <div className='text-2xl'><FontAwesomeIcon icon={faIndianRupeeSign} size='sm' fixedWidth />{PkgDetBookDet.bookingPackageData.price.currPrice.toString().substring(0 , PkgDetBookDet.bookingPackageData.price.currPrice.toString().length-3) + ',' + PkgDetBookDet.bookingPackageData.price.currPrice.toString().substring(PkgDetBookDet.bookingPackageData.price.currPrice.toString().length-3)}</div>
                        <div className='text-2xl pl-2'>Per Person</div>
                    </div>
                </div>
                <div className='flex justify-between items-center mx-8 pl-48 pt-2 pb-8'>
                    <div className='text-3xl pt-10 items-end'>Add No of People in your Trip : </div>
                    <div className='flex justify-center items-center mr-48'>
                        <div className='px-4'>
                            <div className='py-2 text-xl font-sans'>No. of Adults</div>
                            <div className='flex justify-center items-center text-2xl font-sans font-bold bg-indigo-800 rounded-md hover:shadow-sm hover:shadow-indigo-300 hover:bg-indigo-600 transition duration-300 ease-in-out active:scale-75'>
                                <button className='pl-2 pr-4 py-1' onClick={() => handlePackageFeatures('adult' , 'decrement')}><FontAwesomeIcon icon={faMinus} size='lg' fixedWidth /></button>
                                <div className='text-3xl min-w-16 flex justify-center items-center'>{noAdult === 0 ? 'Add' : noAdult}</div>
                                <button className='pr-2 pl-4 py-1' onClick={() => handlePackageFeatures('adult' , 'increment')}><FontAwesomeIcon icon={faPlus} size='lg' fixedWidth /></button>
                            </div>
                        </div>
                        <div className='px-4'>
                            <div className='py-2 text-xl font-sans'>No. of Children</div>
                            <div className='flex justify-center items-center text-2xl font-sans font-bold bg-indigo-800 rounded-md hover:shadow-sm hover:shadow-indigo-300 hover:bg-indigo-600 transition duration-300 ease-in-out active:scale-75'>
                                <button className='pl-2 pr-4 py-1' onClick={() => handlePackageFeatures('child' , 'decrement')}><FontAwesomeIcon icon={faMinus} size='lg' fixedWidth /></button>
                                <div className='text-3xl min-w-16 flex justify-center items-center'>{noChild === 0 ? 'Add' : noChild}</div>
                                <button className='pr-2 pl-4 py-1' onClick={() => handlePackageFeatures('child' , 'increment')}><FontAwesomeIcon icon={faPlus} size='lg' fixedWidth /></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div id='waringAddChild' className='text-red-700 pl-8 ml-48 py-4 flex justify-start items-center hidden'>* Add Adults to Add Child</div>
                <div className='flex justify-between items-center mx-8 pl-48 pt-2 pb-8'>
                    <div className='text-3xl'>Total Package Price : </div>
                    <div className='flex justify-center items-center pr-56'>
                        <div className='text-3xl'><FontAwesomeIcon icon={faIndianRupeeSign} size='sm' fixedWidth />{packagePrice === 0 ? 0 : packagePrice.toString().substring(0 , packagePrice.toString().length-3) + ',' + packagePrice.toString().substring(packagePrice.toString().length-3)}</div>
                    </div>
                </div>
            </div>
            <div className='m-8 mr-20 border-solid border-2 border-white rounded-lg pb-4'>
                <div className='text-3xl px-8 py-4'>Add Hotels</div>
                <div>{PkgDetBookDet.bookingPackageData.hotels.name.map((item , index) => (
                    <div key={index} className='px-8 py-4 flex items-center justify-between text-2xl'>
                        <div className='flex justify-start items-center'>
                            <div className='pr-6'>{item}</div>
                            <div className=''>{'(' + PkgDetBookDet.bookingPackageData.hotels.rating[index]}<FontAwesomeIcon icon={faStar} size='sm' fixedWidth className='text-amber-500 pl-1.5' />{')'}</div>
                        </div>
                        <div className='flex justify-start items-center'>
                            <div className='pr-32'><FontAwesomeIcon icon={faIndianRupeeSign} size='sm' fixedWidth />{PkgDetBookDet.bookingPackageData.hotels.price[index].toString().substring(0 , PkgDetBookDet.bookingPackageData.hotels.price[index].toString().length-3) + ',' + PkgDetBookDet.bookingPackageData.hotels.price[index].toString().substring(PkgDetBookDet.bookingPackageData.hotels.price[index].toString().length-3)}</div>
                            <div className='flex justify-center items-center text-2xl font-sans font-bold bg-indigo-800 rounded-md hover:shadow-sm hover:shadow-indigo-300 hover:bg-indigo-600 transition duration-300 ease-in-out active:scale-75'>
                                <button className='pl-2 pr-4 py-1' onClick={() => handleHotelFeatures('decrement' , item , index)}><FontAwesomeIcon icon={faMinus} size='lg' fixedWidth /></button>
                                <div className='text-3xl min-w-16 flex justify-center items-center'>{noHotelRooms === 0 ? 'Add' : item === currHotelSelected ? noHotelRooms : 'Add'}</div>
                                <button className='pr-2 pl-4 py-1' onClick={() => handleHotelFeatures('increment' , item , index)}><FontAwesomeIcon icon={faPlus} size='lg' fixedWidth /></button>
                            </div>
                        </div>
                    </div>
                ))}</div>
                <div id='warningAddHotel1' className='text-red-700 pl-8 py-4 flex justify-start items-center'>{ErrorRooms1}</div>
                <div className='flex justify-between items-center'>
                    <div className='text-3xl px-8 py-4'>Total Hotel Price : </div>
                    <div className='text-3xl px-8 py-4'><FontAwesomeIcon icon={faIndianRupeeSign} size='sm' fixedWidth />{hotelPrice === 0 ? 0 : hotelPrice.toString().substring(0 , hotelPrice.toString().length-3) + ',' + hotelPrice.toString().substring(hotelPrice.toString().length-3)}</div>
                </div>
            </div>
            <div className='m-8 mr-20 pb-4'>
                <div className='flex justify-evenly items-center'>
                    <div className='text-4xl px-8 py-2 my-8'>Total Price : <FontAwesomeIcon icon={faIndianRupeeSign} size='sm' fixedWidth />{totalPrice === 0 ? 0 : totalPrice.toString().substring(0 , totalPrice.toString().length-3) + ',' + totalPrice.toString().substring(totalPrice.toString().length-3)}</div>
                    <button className='text-4xl px-8 py-2 my-8 font-sans font-bold bg-indigo-800 rounded-md hover:shadow-sm hover:shadow-indigo-300 hover:bg-indigo-600 transition duration-300 ease-in-out active:scale-75' onClick={handlePaymentUpdates}>Make Payment</button>
                </div>
                <div className='text-red-700 text-lg pl-8 py-4 flex justify-center items-center'>{BookPackageErr}</div>
            </div>
        </div>
        <Footer />
    </div>
  );
};

export default BookPackage;
