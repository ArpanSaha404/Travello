import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import axios from 'axios';

const SignUp = () => {

    const navigate = useNavigate();

    const [Inputs , setInputs] = useState({
        userName : "",
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
        if(!Inputs.email || !Inputs.userName || !Inputs.password || !Inputs.phnNo)
        {
            alert(`Pls Enter all the Fields`);
            return;
        }
        await axios
            .post(`https://travello-r7hg.onrender.com/register` , Inputs)
            .then((res) => {
                console.log(res.data);
                if(res.data.message)
                {
                    alert(res.data.message);
                }
                else if(res.data.insertedData.email)
                {
                    console.log(res.data);
                    alert(`Congrats!!! You've made an Account`);
                    setInputs({
                        userName : "",
                        email: "",
                        phnNo: "",
                        password : ""
                    });
                    navigate('/');
                }
                else
                {
                    alert(`Some Error!!!`);
                }
            })
            .catch((res) => {
                console.log(res.data);
                alert(`Some Error...Pls Try Again`);
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
            <div className='h-full w-1/2 flex justify-center items-center bg-indigo-950 clip-signup-trapezium'>
                <h1 className='font-sans font-bold text-7xl text-white pr-12'>Sign UP</h1>
            </div>
            <div className='h-full w-1/2 bg-white flex flex-col items-center justify-center'>
                <input name='userName' type='userName' placeholder='Enter your UserName' className='p-2 shadow-lg border-black border-solid rounded my-2 w-5/6 h-1/6' value={Inputs.userName} onChange={change} />
                <input name='email' type='email' placeholder='Enter your email' className='p-2 shadow-lg border-black border-solid rounded my-2 w-5/6 h-1/6' value={Inputs.email} onChange={change} />
                <input name='phnNo' type='phnNo' placeholder='Enter your Phone Number' className='p-2 shadow-lg border-black border-solid rounded my-2 w-5/6 h-1/6' value={Inputs.phnNo} onChange={change} />
                <input name='password' type='password' placeholder='Enter your password' className='p-2 shadow-lg border-black border-solid rounded my-2 w-5/6 h-1/6' value={Inputs.password} onChange={change} />
                <div className='w-full flex items-center justify-evenly pt-2'>
                    <button className='bg-indigo-950 rounded-md text-white text-xl font-sans font-bold py-1 px-2 hover:shadow-md hover:shadow-indigo-500 hover:bg-indigo-900 transition duration-300 ease-in-out active:scale-75' onClick={submit}>Sign Up</button>
                    <div className='flex flex-col justify-end items-center'>
                        <div>Already have an account?</div>
                        <div>
                            <Link className='font-sans font-bold underline py-1 px-2 pt-4 hover:text-indigo-500 transition duration-300 ease-in-out active:scale-75' to='/logIn'>Log In</Link>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default SignUp;
