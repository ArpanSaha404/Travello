import React, { useEffect, useState } from 'react';
import { CircleChevronRight, CircleChevronLeft, MoveRight } from 'lucide-react';
import RatingStars from './RatingStars';
import Navbar from '../Navbar/Navbar';
import Loading from '../Loading/Loading';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPriceNo } from '../../Features/PackagePrice/packagePriceSlice';
import { resetPrice } from '../../Features/HotelPrice/hotelPriceSlice';
import { resetRooms } from '../../Features/HotelPrice/noOfRoomSlice';

const MainPage = () => {

    const [Details , setDetails] = useState({topPackages : [{
        packageTitle : "" ,
        desc : "",
        pics: [],
        rating : 0,
    }]});
    const [IsLoading , setIsLoading] = useState(true);
    const [CurrImgIdx , setCurrImgIdx] = useState(0);
    const [Fade , setFade] = useState(true);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    useEffect(() => {
        const fetchDetails = async () => {
            dispatch(resetPriceNo());
            dispatch(resetRooms());
            dispatch(resetPrice());
            await axios
                .get(`https://travello-r7hg.onrender.com/topPackages`)
                .then((res) => {
                    console.log(res.data);
                    if(res.data && res.data.topPackages.length > 0)
                    {
                        setDetails((prev) => ({
                            ...prev , topPackages : res.data.topPackages,
                        }));
                        setIsLoading(false);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        fetchDetails();
    },[dispatch]);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false);

            setTimeout(() => {
                if(CurrImgIdx === 4)    setCurrImgIdx(0);
                else    setCurrImgIdx(CurrImgIdx => CurrImgIdx + 1);
                setFade(true);
            },300);
        },5000);

        return () => clearInterval(interval);
    });

    if(IsLoading)       return (<Loading />);

    const toPackageDetails = (packageTitle) => {
        if(!isLoggedIn)     alert(`Please Login or SignUp First...`);
        else        navigate(`/viewPackageDetails/${packageTitle}`);
    }

    const changeImgNext = () => {
        setFade(false);

        setTimeout(() => {
            if(CurrImgIdx === 4)    setCurrImgIdx(0);
            else    setCurrImgIdx(CurrImgIdx => CurrImgIdx + 1);
            setFade(true);
        },300);
    };

    const changeImgPrev = () => {
        setFade(false);

        setTimeout(() => {
            if(CurrImgIdx === 0)    setCurrImgIdx(4);
            else    setCurrImgIdx(CurrImgIdx => CurrImgIdx - 1);
            setFade(true);
        },300);
    };

    const bckgImgUrl = Details.topPackages[CurrImgIdx].pics.length > 0 ? Details.topPackages[CurrImgIdx].pics[0] : '';

    let sideImgUrlIdx1 = CurrImgIdx === 4 ? 0 : CurrImgIdx + 1;
    let sideImgUrlIdx2, sideImgUrlIdx3;

    if(CurrImgIdx === 3)    sideImgUrlIdx2 = 0
    else if(CurrImgIdx === 4)   sideImgUrlIdx2 = 1
    else sideImgUrlIdx2 = CurrImgIdx + 2;

    if(CurrImgIdx === 2)    sideImgUrlIdx3 = 0
    else if(CurrImgIdx === 3)   sideImgUrlIdx3 = 1
    else if(CurrImgIdx === 4)   sideImgUrlIdx3 = 2
    else sideImgUrlIdx3 = CurrImgIdx + 3;

    let sideImgUrl1 = Details.topPackages[sideImgUrlIdx1].pics[0];
    let sideImgUrl2 = Details.topPackages[sideImgUrlIdx2].pics[0];
    let sideImgUrl3 = Details.topPackages[sideImgUrlIdx3].pics[0];

    const divStyle = {
        backgroundImage: `url(${bckgImgUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100vw',
    };

    const divStyle1 = {
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    };

    const divStyle2 = {
        backgroundSize: '200% 100%',
        backgroundPosition: 'left center'
    };

  return (
    <div>
        <div style={divStyle}>
            <Navbar />
            <div className='flex items-center'>
                <div className='w-2/5 pl-12 text-zinc-50'>
                    <h1 className='pb-20 text-2xl'>Our Most Popular Packages...</h1>
                    <h1 className='animate-Fade-In-Out text-6xl pb-8 font-bold font-sans'>{Details.topPackages[CurrImgIdx].packageTitle.split('0')[0]}</h1>
                    <h1 className={`transition-opacity duration-300 ${Fade ? 'opacity-100' : 'opacity-0'} text-xl pb-8 font-sans`}>{Details.topPackages[CurrImgIdx].desc}</h1>
                    <button className={`transition-opacity duration-300 ${Fade ? 'opacity-100' : 'opacity-0'} flex items-center bg-indigo-800 rounded-md pl-2 text-white text-2xl font-sans font-bold py-2 hover:shadow-md hover:shadow-indigo-300 hover:bg-indigo-600 transition duration-300 ease-in-out active:scale-75`} onClick={() => toPackageDetails(Details.topPackages[CurrImgIdx].packageTitle)}>Explore More<MoveRight className='text-white pt-1 w-20 h-8' /></button>
                </div>
                <div className='w-3/5'>
                    <div className='flex text-slate-50 text-2xl font-sans font-bold pt-32'>
                        <span className='w-2/6 ml-8 hover:underline hover:text-indigo-400 transition duration-300 ease-in-out active:scale-150' onClick={() => toPackageDetails(Details.topPackages[sideImgUrlIdx1].packageTitle)}>{Details.topPackages[sideImgUrlIdx1].packageTitle.split('0')[0]}</span>
                        <span className='w-2/6 ml-8 hover:underline hover:text-indigo-400 transition duration-300 ease-in-out active:scale-150' onClick={() => toPackageDetails(Details.topPackages[sideImgUrlIdx2].packageTitle)}>{Details.topPackages[sideImgUrlIdx2].packageTitle.split('0')[0]}</span>
                        <span className='w-3/12 ml-8 hover:underline hover:text-indigo-400 transition duration-300 ease-in-out active:scale-150' onClick={() => toPackageDetails(Details.topPackages[sideImgUrlIdx3].packageTitle)}>{Details.topPackages[sideImgUrlIdx3].packageTitle.split('0')[0]}</span>
                    </div>
                    <div className='flex'>
                        <div className='w-2/6 ml-8'><RatingStars rating={Details.topPackages[sideImgUrlIdx1].rating} /></div>
                        <div className='w-2/6 ml-8'><RatingStars rating={Details.topPackages[sideImgUrlIdx2].rating} /></div>
                        <div className='w-3/12 ml-8'><RatingStars rating={Details.topPackages[sideImgUrlIdx3].rating} /></div>
                    </div>
                    <div className='flex pb-16'>
                        <div className={`transition-opacity duration-300 ${Fade ? 'opacity-100' : 'opacity-0'} cards h-80 w-2/6 ml-8`} style={{...divStyle1 , backgroundImage:`url(${sideImgUrl1})`}} onClick={() => toPackageDetails(Details.topPackages[sideImgUrlIdx1].packageTitle)}></div>
                        <div className={`transition-opacity duration-300 ${Fade ? 'opacity-100' : 'opacity-0'} cards h-80 w-2/6 ml-8`} style={{...divStyle1 , backgroundImage:`url(${sideImgUrl2})`}} onClick={() => toPackageDetails(Details.topPackages[sideImgUrlIdx2].packageTitle)}></div>
                        <div className={`transition-opacity duration-300 ${Fade ? 'opacity-100' : 'opacity-0'} cards h-80 w-3/12 ml-8`} style={{...divStyle2 , backgroundImage:`url(${sideImgUrl3})`}} onClick={() => toPackageDetails(Details.topPackages[sideImgUrlIdx3].packageTitle)}></div>
                    </div>
                    <div className='flex justify-center'>
                        <button onClick={changeImgPrev}><CircleChevronLeft className='w-20 h-10 text-white hover:text-blue-400 hover:scale-110 transition duration-300 ease-in-out active:scale-50' /></button>
                        <h1 className='text-xl font-bold font-sans'>{CurrImgIdx + 1}/{Details.topPackages.length}</h1>
                        <button onClick={changeImgNext}><CircleChevronRight className='w-20 h-10 text-white hover:text-blue-400 hover:scale-110 transition duration-300 ease-in-out active:scale-50' /></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
};

export default MainPage;
