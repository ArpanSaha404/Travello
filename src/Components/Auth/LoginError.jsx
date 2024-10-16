import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginError = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/');
        },2000);

        return () => clearTimeout(timer);
    });

  return (
    <div className='bg-slate-950 text-white text-2xl font-sans font-bold flex justify-center items-center h-screen w-screen'>
        <div>
            <div>Please Login or SignUp First!!!</div>
            <div>Redirecting to Home Page in 2 Seconds...</div>
        </div>
    </div>
  );
};

export default LoginError;