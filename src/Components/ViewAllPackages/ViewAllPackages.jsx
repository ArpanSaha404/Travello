import React, { useEffect , useState } from 'react';
import { Search , SlidersHorizontal  } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrainSubway , faPlane , faIndianRupeeSign , faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../Navbar/Navbar';
import Loading from '../Loading/Loading';
import RatingStars from '../mainPage/RatingStars';
import FilterPackages from './FilterPackages';
import LoginError from '../Auth/LoginError';
import Footer from '../Footer/Footer';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ViewAllPackages = () => {

    const [PackageData , setPackageData] = useState({allPackages : [{
        price : {
            totalPrice : 0,
            currPrice : 0,
        },
        packageTitle : "",
        subTitle : "",
        pics : [],
        rating : 0,
        type : "",
        tripLength : ""
    }]});
    const [ImgIdx , setImgIdx] = useState(1);
    const [IsLoading , setIsLoading] = useState(true);
    const [SearchTxt , setSearchTxt] = useState("");
    const [FilteredPackages , setFilteredPackages] = useState([]);
    const [IsVisible , setIsVisible] = useState(false);

    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    useEffect(() => {
        const fetchPackageData = async () => {
            await axios
                .get(`https://travello-r7hg.onrender.com/viewAllPackages`)
                .then((res) => {
                    console.log(res.data);
                    if(res.data)
                    {
                        setPackageData((prev) => ({
                            ...prev , allPackages : res.data.allPackages,
                        }));
                        setFilteredPackages(res.data.allPackages);
                        setIsLoading(false);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        fetchPackageData();
    },[]);

    useEffect(() => {
        const interval = setInterval(() => {

            setTimeout(() => {
                if(ImgIdx === 4) setImgIdx(1);
                else setImgIdx(ImgIdx => ImgIdx + 1);
            },300);
        },5000);

        return () => clearInterval(interval);
    });

    if(!isLoggedIn)     return (<LoginError />);
    if(IsLoading)       return (<Loading />);

    const change = (e) => {
        setSearchTxt(e.target.value);
        if(!SearchTxt)
        {
            setFilteredPackages(PackageData.allPackages);
        }
    };

    const toPackageDetails = (packageTitle) => {
        if(!isLoggedIn)     return (<LoginError />);
        else        navigate(`/viewPackageDetails/${packageTitle}`);
    }

    const handleDisplay = () =>  {
        setIsVisible(!IsVisible);
    }

    const handleSearch = () => {
        const displayData = PackageData.allPackages.filter((item) => item.packageTitle.toLowerCase().includes(SearchTxt.toLowerCase()));
        console.log(displayData);
        setFilteredPackages(displayData);
    };

    const handleFilteredPackages = (FilteredPackages) => {
        setFilteredPackages(FilteredPackages);
    };

  return (
    <div className='bg-slate-950'>
        <div><Navbar /></div>
        <div id='Search-bar' className='text-xl flex justify-center items-center py-10 pr-64'>
            <div className='w-3/6 flex jusify-center items-center border-black'>
                <button><SlidersHorizontal className='h-9 w-9 px-2 bg-white text-black rounded-l-md border-black border-r-2 hover:bg-indigo-600 transition duration-300 ease-in-out active:scale-125' onClick={handleDisplay} /></button>
                <input name='search' type='text' placeholder='Search for a Package' className='py-1 w-5/6 px-2' value={SearchTxt} onChange={change} />
                <button><Search className='h-9 w-9 px-2 bg-white text-black rounded-r-md border-black border-l-2 hover:bg-indigo-600 transition duration-300 ease-in-out active:scale-125' onClick={handleSearch} /></button>
            </div>
        </div>
        {IsVisible && <div className='flex justify-center items-center sm:mt-96 md:mt-64 absolute z-2 bg-slate-900 w-5/6'><FilterPackages filteredPackageArray={PackageData.allPackages} onFilter={handleFilteredPackages} isVisible={IsVisible} handleDisp={handleDisplay} /></div>}
        { FilteredPackages.length !== 0 ? FilteredPackages.map((item , index) => (
            <div id='cards' key={index} className='flex justify-center items-center border-2 border-solid border-white rounded-lg p-6 mb-12 mx-8'>
                <div className='flex justify-start items-center w-4/6'>
                    {/* <img src={item.pics[ImgIdx]} alt={item.packageTitle.split('#')[0]} className='h-full w-1/4 bg-cover text-white hover:scale-95' /> */}
                    <div style={{backgroundImage:`url(${item.pics[ImgIdx]})`}} className='h-40 w-1/4 bg-cover text-white hover:scale-95 bg-cover bg-center text-white' onClick={() => toPackageDetails(item.packageTitle)}></div>
                    <div className='pl-6'>
                        <span className='text-2xl text-white font-sans font-bold underline pb-4 hover:cursor-pointer hover:text-indigo-400 transition duration-300 ease-in-out active:scale-90' onClick={() => toPackageDetails(item.packageTitle)}>{item.packageTitle.split('0')[0]}</span>
                        <h1 className='text-lg text-white font-sans pb-2'>{item.subTitle}</h1>
                        <div className='flex justify-start items-center pb-1'>
                            <h1 className='text-lg text-white font-sans pr-1'>{item.tripLength}</h1>
                            {item.type === 'Domestic' ? <FontAwesomeIcon icon={faTrainSubway} size='lg' fixedWidth className='text-white' /> :
                            <FontAwesomeIcon icon={faPlane} size='lg' fixedWidth transform={{rotate:315}} className='text-white' />}
                        </div>
                        <div className='text-white font-sans text-xl flex justify-start items-center'>
                            <div className='line-through pr-4'><FontAwesomeIcon icon={faIndianRupeeSign} size='sm' fixedWidth />{item.price.totalPrice.toString().substring(0 , item.price.totalPrice.toString().length-3) + ',' + item.price.totalPrice.toString().substring(item.price.totalPrice.toString().length-3)}</div>
                            <div><FontAwesomeIcon icon={faIndianRupeeSign} size='sm' fixedWidth />{item.price.currPrice.toString().substring(0 , item.price.currPrice.toString().length-3) + ',' + item.price.currPrice.toString().substring(item.price.currPrice.toString().length-3)}</div>
                        </div>
                    </div>
                </div>
                <div className='w-2/6 flex intems-center justify-end'>
                    <div>
                        <div className='flex justify-center items-center pb-8'>
                            <h1 className='text-white text-xl font-sans pr-2'>{item.rating}</h1><RatingStars rating={item.rating} />
                        </div>
                        <div>
                            <button className='text-white text-xl font-sans font-bold bg-indigo-800 rounded-md p-2 hover:shadow-sm hover:shadow-indigo-300 hover:bg-indigo-600 transition duration-300 ease-in-out active:scale-75' onClick={() => toPackageDetails(item.packageTitle)}>View Details <FontAwesomeIcon icon={faArrowRight} size='sm' fixedWidth /></button>
                        </div>
                    </div>
                    
                </div>
            </div>
        )) : (<div className='font-sans font-bold text-2xl text-white flex justify-center items-center border-2 border-solid border-white rounded-lg p-6 mb-12 mx-8'>
                <div>No Packages to Show...Pls Clear all Filters...</div>
            </div>)};
        <Footer />
    </div>
  );
};

export default ViewAllPackages;
