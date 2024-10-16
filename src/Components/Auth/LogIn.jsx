import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginAsync } from '../../Features/Auth/authSlice';

const LogIn = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [Inputs , setInputs] = useState({
        email: "",
        phnNo: "",
        password : ""
    });

    const change = (e) => {
        const {name , value} = e.target;
        setInputs({...Inputs , [name]:value});
    };

    const submit = async (e) => {
        e.preventDefault();
        if(!Inputs.email || !Inputs.password)
        {
            alert(`Pls Enter all the Fields`);
            return;
        }
        await axios
            .post(`https://travello-r7hg.onrender.com/login` , Inputs)
            .then((res) => {
                console.log(res.data);
                if(res.data.message)
                {
                    alert(res.data.message);
                }
                else if(res.data.email && res.data.userName)
                {
                    alert(`Log In Successfull`);
                    sessionStorage.setItem('UserName' , res.data.userName);
                    sessionStorage.setItem('Email' , res.data.email);
                    dispatch(loginAsync({userName : res.data.userName , email : res.data.email}));
                    navigate('/');
                }
            })
            .catch((res) => {
                console.log(res);
                alert(`Some Error...Pls Try Again`);
            });
        setInputs({
            email: "",
            phnNo: "",
            password : ""
        });
    };

    const outerDivClick = () => {
        navigate('/');;
    };
    const innerDivClick = (e) => {
        e.stopPropagation();
    };

  return (
    <div className='h-screen w-screen flex items-center justify-center bg-indigo-900' onClick={outerDivClick}>
        <div className='w-3/6 h-3/6 flex items-center justify-center bg-white' onClick={innerDivClick}>
            <div className='h-full w-1/2 bg-white flex flex-col items-center justify-center'>
                <input name='email' type='text' placeholder='Enter your email or Phone Number' className='p-2 shadow-lg border-black border-solid rounded my-2 w-5/6 h-1/6' value={Inputs.email} onChange={change} />
                <input name='password' type='password' placeholder='Enter your password' className='p-2 shadow-lg border-black border-solid rounded my-2 w-5/6 h-1/6' value={Inputs.password} onChange={change} />
                <div className='w-full flex items-center justify-evenly pt-8'>
                    <button className='bg-indigo-950 rounded-md text-white text-xl font-sans font-bold py-1 px-2 hover:shadow-md hover:shadow-indigo-500 hover:bg-indigo-900 transition duration-300 ease-in-out active:scale-75' onClick={submit}>Log In</button>
                    <div className='flex flex-col justify-end items-center'>
                        <div>Don't have an account?</div>
                        <div>
                            <Link className='font-sans font-bold underline py-1 px-2 pt-4 hover:text-indigo-500 transition duration-300 ease-in-out active:scale-125' to='/signUp' >Sign Up</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className='h-full w-1/2 flex justify-center items-center bg-indigo-950 clip-login-trapezium'>
                <h1 className='font-sans font-bold text-7xl text-white pl-12'>Log In</h1>
            </div>
        </div>
    </div>
  );
};

export default LogIn;
