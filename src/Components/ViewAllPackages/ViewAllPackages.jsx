import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../../Features/Counter/counterSlice';
import Navbar from '../Navbar/Navbar';


const ViewAllPackages = () => {

    const dispatch = useDispatch();
    const counter = useSelector((state) => state.counter.value);
    const abc = useSelector((state) => state.counter.name);
    const userName = useSelector((state) => state.auth.userName);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <div className='bg-slate-950'>
        <div><Navbar /></div>
        <div className='text-xl text-white font-sans font-bold'>Page Building --- Still in Progress...</div>
        ViewAllPackages
        <div>
            Counter = {counter}
        </div>
        <div>
            name = {abc}
        </div>
        <div>
            <button onClick={() => dispatch(increment())}>Increment</button>
            <button onClick={() => dispatch(decrement())}>Decrement</button>
        </div>
        <div>
            Auth UserName = {userName} Ends..
        </div>
        <div>
            Auth isLoggedIn = {isLoggedIn} Ends..{console.log(userName)}
        </div>
    </div>
  )
};

export default ViewAllPackages;