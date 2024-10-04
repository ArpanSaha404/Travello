import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserRound , Plane  } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Features/Auth/authSlice';

const Navbar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logOut = () => {
        sessionStorage.clear('UserName');
        sessionStorage.clear('Email');
        dispatch(logout());
        navigate('/');
    };

    const userName = useSelector((state) => state.auth.userName);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <div className='flex bg-transparent pt-3'>
        <div className='flex w-3/6 items-center justify-start'>
            <Link to='/'><h1 className='flex items-center justify-center text-white font-sans font-bold text-xl pl-8 hover:underline hover:text-indigo-400 transition duration-300 ease-in-out active:scale-150'><Plane className='h-10 w-10 pr-2' /> Travello</h1></Link>
            
        </div>
        <div className='flex w-3/6 items-stretch justify-evenly'>
            <Link className='rounded-md text-white text-xl font-sans font-bold py-1 px-2 hover:underline hover:text-indigo-400 transition duration-300 ease-in-out active:scale-150' to='/viewAllPackages'>View All Packages</Link>
            {isLoggedIn === false ? (<>
                <Link className='bg-indigo-800 rounded-md text-white text-xl font-sans font-bold py-1 px-2 hover:shadow-md hover:shadow-indigo-300 hover:bg-indigo-600 transition duration-300 ease-in-out active:scale-75' to='/logIn'>Log In</Link>
                <Link className='bg-indigo-800 rounded-md text-white text-xl font-sans font-bold py-1 px-2 hover:shadow-md hover:shadow-indigo-300 hover:bg-indigo-600 transition duration-300 ease-in-out active:scale-75' to='/signUp'>Sign Up</Link>
            </>) : (<>
                <div className='flex justify-center items-center text-white font-sans font-bold text-2xl pl-8 hover:underline hover:text-indigo-400 transition duration-300 ease-in-out active:scale-150'><UserRound className='h-10 w-10 text-white font-bold hover:underline hover:text-indigo-400 transition duration-300 ease-in-out' />{userName}</div>
                <button className='bg-indigo-800 rounded-md text-white text-xl font-sans font-bold py-1 px-2 hover:shadow-md hover:shadow-indigo-300 hover:bg-indigo-600 transition duration-300 ease-in-out active:scale-75' onClick={logOut} >Log Out</button>
            </>) }
        </div>
    </div>
  );
};

export default Navbar;