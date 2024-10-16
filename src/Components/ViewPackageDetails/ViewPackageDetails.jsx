import React, { useEffect , useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrainSubway , faPlane , faCircle , faStar , faIndianRupeeSign , faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './ViewPackageDetails.css';
import Navbar from '../Navbar/Navbar';
import Loading from '../Loading/Loading';
import LoginError from '../Auth/LoginError';
import Footer from '../Footer/Footer';
import WorkInProgress from '../WorkInProgress/WorkInProgress';

const ViewPackageDetails = () => {

    const [PackageData , setPackageData] = useState({packageData : null});
    const [IsLoading , setIsLoading] = useState(true);
    const [TDSstate , setTDSstate] = useState('td');
    const [BestTimeIdx , setBestTimeIdx] = useState(0);

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const navigate = useNavigate();
    const {packageId} = useParams();

    useEffect(() => {
        const fetchPackageData = async () => {
            await axios
                .get(`http://localhost:5000/viewPackageDetails/${packageId}`)
                .then((res) => {
                    console.log(res.data);
                    if(res.data)
                    {
                        setPackageData((prev) => ({
                            ...prev , packageData : res.data.packageData
                        }));
                        setIsLoading(false);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        fetchPackageData();
    },[packageId]);

    if(!isLoggedIn)     return (<LoginError />);
    if(IsLoading)       return (<Loading />);

    const hanldeTDSClick = (option) => {
        setTDSstate(option);
    };

    const toBookPackage = () => {
        navigate(`/bookPackage/${packageId}`)
    };

    const picsArr = PackageData.packageData.pics;

    var settings = {
        dots : true,
        arrows : false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1.5,
        slidesToScroll: 1,
        lazyLoad: false,
        centerMode : true,
        centerPadding : '300px',
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "linear",
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
    };

    var tds_settings = {
        dots : true,
        arrows : false,
        infinite: true,
        speed: 1000,
        slidesToScroll: 1,
        lazyLoad: true,
        responsive: [
            {
              breakpoint: 1024,
              tds_settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              tds_settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              tds_settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
    }

  return (
    <div className='bg-slate-950 text-white w-screen'>
        <div className='pb-16'><Navbar /></div>
        <div className='pb-16'>
            <Slider {...settings}>
                {picsArr.map((image , index) => (
                    <div key={index} className='px-8'><div style={{backgroundImage : `url(${image})`}} className='h-80 bg-cover bg-center'></div></div>
                ))}
            </Slider>
        </div>
        <div className='px-8'>
            <div>
                <div className='flex justfy-center items-center'>
                    <div className='font-sans font-bold text-white text-3xl pb-4 underline'>{PackageData.packageData.packageTitle.split('0')[0]}</div>
                    <div className='font-sans font-bold text-white text-2xl pb-4 pl-4'>{'(' + PackageData.packageData.tripLength + ')'}</div>
                    <div className='pb-2 pl-4'>
                        {PackageData.packageData.type === 'Domestic' ? <FontAwesomeIcon icon={faTrainSubway} size='xl' fixedWidth className='text-white' /> :
                        <FontAwesomeIcon icon={faPlane} size='xl' fixedWidth transform={{rotate:315}} className='text-white' />}
                    </div>
                </div>
                {/* <div className='font-sans font-bold text-white text-xl pb-8'>{PackageData.packageData.subTitle}..</div> */}
                <div className='font-sans font-bold text-white text-lg pb-8 w-1/2'>{PackageData.packageData.desc}</div>
            </div>
            <div className='bg-slate-900 text-3xl flex justify-start items-center'>
                <button className='mx-16 py-2 hover:text-indigo-400 transition duration-300 ease-in-out active:scale-150 border-solid border-b-2 border-white'><Link to='scroll-bar-1' smooth={true} duration={500} offset={-10}>Things to Do & See</Link></button>
                <button className='mx-16 py-2 hover:text-indigo-400 transition duration-300 ease-in-out active:scale-150 border-solid border-b-2 border-white'><Link to='scroll-bar-2' smooth={true} duration={500} offset={-10}>Best Time to Visit</Link></button>
                <div className='border-white border-2 border-solid rounded-3xl my-6 mx-8 bg-slate-950'>
                    <button className='px-8 py-2 hover:text-indigo-400 transition duration-300 ease-in-out active:scale-150 border-solid border-r-2 border-black'><Link to='scroll-bar-3' smooth={true} duration={500} offset={-10}>Stay</Link></button>
                    <button className='px-8 py-2 hover:text-indigo-400 transition duration-300 ease-in-out active:scale-150 border-solid border-l-2 border-black'><Link to='scroll-bar-4' smooth={true} duration={500} offset={-10}>Book your Trip</Link></button>
                </div>
            </div>
            <div className='my-16 bg-slate-900 pb-8 rounded-lg'>
                <div id='scroll-bar-1' className='font-sans font-bold text-white text-3xl p-8'>Things to Do & See in {PackageData.packageData.packageTitle.split('0')[0]}</div>
                <div className='flex justify-start items-center text-2xl mb-16'>
                    <button className='mx-16 py-2 hover:text-indigo-400 transition duration-300 ease-in-out active:scale-150' style={{borderBottom : TDSstate === 'td' ? '2px solid white' : '2px solid transparent'}} onClick={() => hanldeTDSClick('td')}>Things to Do</button>
                    <button className='mx-16 py-2 hover:text-indigo-400 transition duration-300 ease-in-out active:scale-150' style={{borderBottom : TDSstate === 'fh' ? '2px solid white' : '2px solid transparent'}} onClick={() => hanldeTDSClick('fh')}>Foodie Hotspots</button>
                    <button className='mx-16 py-2 hover:text-indigo-400 transition duration-300 ease-in-out active:scale-150' style={{borderBottom : TDSstate === 'ar' ? '2px solid white' : '2px solid transparent'}} onClick={() => hanldeTDSClick('ar')}>Around</button>
                </div>
                <div className='pb-8'>
                    {TDSstate === 'td' ? <>
                        <Slider {...tds_settings} slidesToShow={5}>
                            {PackageData.packageData.thingsDoSee.placesPics.map((image , index) => (
                                <div key={index} className='px-4'>
                                    <div className='p-4 bg-slate-950 rounded-lg shadow-2xl mb-8'>
                                        <div style={{backgroundImage : `url(${image})`}} className='h-48 mb-4 bg-cover bg-center rounded-md'></div>
                                        <div className='text-white text-lg'>{PackageData.packageData.thingsDoSee.places[index]}</div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </> : <></>}

                    {TDSstate === 'fh' ? <>
                        <Slider {...tds_settings} slidesToShow={3}>
                            {PackageData.packageData.thingsDoSee.foodieHotspotsPics.map((image , index) => (
                                <div key={index} className='px-4'>
                                    <div className='p-4 bg-slate-950 rounded-lg shadow-2xl mb-8'>
                                        <div style={{backgroundImage : `url(${image})`}} className='h-48 mb-4 bg-cover bg-center rounded-md'></div>
                                        <div className='text-white text-lg'>{PackageData.packageData.thingsDoSee.foodieHotspots[index]}</div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </> : <></>}
                    
                    {TDSstate === 'ar' ? <>
                        <Slider {...tds_settings} slidesToShow={4}>
                            {PackageData.packageData.thingsDoSee.aroundPics.map((image , index) => (
                                <div key={index} className='px-4'>
                                    <div className='p-4 bg-slate-950 rounded-lg shadow-2xl mb-8'>
                                        <div style={{backgroundImage : `url(${image})`}} className='h-48 mb-4 bg-cover bg-center rounded-md'></div>
                                        <div className='text-white text-lg'>{PackageData.packageData.thingsDoSee.around[index]}</div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </> : <></>}
                </div>
                <div id='scroll-bar-2' className='font-sans font-bold text-white text-3xl p-8'>Best Time to Visit {PackageData.packageData.packageTitle.split('0')[0]}</div>
                <div>
                    <div className='flex justify-evenly items-center pr-16 pl-8'>
                        {PackageData.packageData.bestTime.map((item , index) => (
                            <div key={index} className='w-1/3 bg-slate-950 pl-16 border-b-2 border-solid border-black' onClick={() => setBestTimeIdx(index)}>
                                <div>
                                    <button className='text-xl py-2 hover:text-indigo-400 transition duration-300 ease-in-out active:scale-150' onClick={() => setBestTimeIdx(index)}>{item.months}</button>
                                    {index === 0 ? <>
                                        <div className='flex justify-start items-center pb-4' style={{borderBottom : BestTimeIdx === 0 ? '2px solid white' : '2px solid transparent'}}>
                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse glow-green"></div>
                                            <div className='pl-3 text-lg cursor-pointer hover:text-indigo-400 transition duration-300 ease-in-out active:scale-150' onClick={() => setBestTimeIdx(index)}>Peak Season</div>
                                        </div>
                                    </> : <></>}
                                    {index === 1 ? <>
                                        <div className='flex justify-start items-center pb-4' style={{borderBottom : BestTimeIdx === 1 ? '2px solid white' : '2px solid transparent'}}>
                                            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse glow-yellow"></div>
                                            <div className='pl-3 text-lg cursor-pointer hover:text-indigo-400 transition duration-300 ease-in-out active:scale-150' onClick={() => setBestTimeIdx(index)}>Moderate Season</div>
                                        </div>
                                    </> : <></>}
                                    {index === 2 ? <>
                                        <div className='flex justify-start items-center pb-4' style={{borderBottom : BestTimeIdx === 2 ? '2px solid white' : '2px solid transparent'}}>
                                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse glow-red"></div>
                                            <div className='pl-3 text-lg cursor-pointer hover:text-indigo-400 transition duration-300 ease-in-out active:scale-150' onClick={() => setBestTimeIdx(index)}>Off Season</div>
                                        </div>
                                    </> : <></>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='bg-slate-900 pb-8 pr-16 pl-8'>
                    <div className='bg-slate-950 py-8'>
                        {PackageData.packageData.bestTime[BestTimeIdx].points.map((item , index) => (
                            <div key={index} className='flex justify-start items-center py-4 px-16'>
                                <FontAwesomeIcon icon={faCircle} size='sm' fixedWidth />
                                <div className='pl-3 text-lg'>{item}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div id='scroll-bar-3' className='font-sans font-bold text-white text-3xl p-8'>Stay in {PackageData.packageData.packageTitle.split('0')[0]}</div>
                <Slider {...tds_settings} slidesToShow={3}>
                    {PackageData.packageData.hotels.hotelPics.map((image , index) => (
                        <div key={index} className='px-4'>
                            <div className='p-4 bg-slate-950 rounded-lg shadow-2xl mb-8'>
                                <div style={{backgroundImage : `url(${image})`}} className='h-48 mb-4 bg-cover bg-center rounded-md'></div>
                                <div className='text-white text-lg flex justify-start items-center'>
                                    <div className='flex justify-start items-center w-3/4'>
                                        <div>{PackageData.packageData.hotels.name[index]}</div>
                                        <div className='pl-4'>{PackageData.packageData.hotels.rating[index]}<FontAwesomeIcon icon={faStar} size='lg' fixedWidth className='text-amber-500 pl-1.5' /></div>
                                    </div>
                                    <div className='flex justify-end items-center w-1/4'><FontAwesomeIcon icon={faIndianRupeeSign} size='lg' fixedWidth />{PackageData.packageData.hotels.price[index].toString().substring(0 , PackageData.packageData.hotels.price[index].toString().length-3) + ',' + PackageData.packageData.hotels.price[index].toString().substring(PackageData.packageData.hotels.price[index].toString().length-3)}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
                <div id='scroll-bar-4' className='flex items-center justify-start mt-16 mb-8'>
                    <div className='flex justify-start items-center w-2/4'>
                        <div className='font-sans font-bold text-white text-3xl px-8'>Book Your Trip to {PackageData.packageData.packageTitle.split('0')[0]} now</div>
                    </div>
                    <div className='flex justify-end items-center w-2/4'>
                        <div className='text-xl pl-4 line-through'><FontAwesomeIcon icon={faIndianRupeeSign} size='lg' fixedWidth />{PackageData.packageData.price.totalPrice.toString().substring(0 , PackageData.packageData.price.totalPrice.toString().length-3) + ',' + PackageData.packageData.price.totalPrice.toString().substring(PackageData.packageData.price.totalPrice.toString().length-3)}</div>
                        <div className='text-xl pl-4'><FontAwesomeIcon icon={faIndianRupeeSign} size='lg' fixedWidth />{PackageData.packageData.price.currPrice.toString().substring(0 , PackageData.packageData.price.currPrice.toString().length-3) + ',' + PackageData.packageData.price.currPrice.toString().substring(PackageData.packageData.price.currPrice.toString().length-3)}</div>
                        <button className='text-white text-xl font-sans font-bold bg-indigo-800 rounded-md p-2 ml-12 mx-4 hover:shadow-sm hover:shadow-indigo-300 hover:bg-indigo-600 transition duration-300 ease-in-out active:scale-75' onClick={toBookPackage} >Book Now  <FontAwesomeIcon icon={faArrowRight} size='lg' fixedWidth /></button>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        <div className='pt-16'><WorkInProgress /></div>
    </div>
  );
};

export default ViewPackageDetails;