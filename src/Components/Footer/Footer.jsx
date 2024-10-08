import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthEurope , faEarthAmericas , faEarthAfrica , faEarthAsia , faEarthOceania , faPlane } from '@fortawesome/free-solid-svg-icons';
import { faFacebook , faInstagram , faTwitter , faYoutube , faSnapchat } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope , faPhone } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Footer = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/viewAllPackages');
    }

  return (
    <div className='bg-slate-950'>
        <div className='text-white font-sans text-lg '>
            <div className='text-red-600 font-bold flex items-center justify-center text-xl'>Discover</div>
            <div className='flex items-center justify-center'>Discover the World Through</div>
            <div className='flex items-center justify-center'>Our Eyes <FontAwesomeIcon icon={faPlane} size='sm' transform={{rotate:315}} fixedWidth className='text-white pl-2' /></div>
        </div>
        <div>
            <div className='maps-plane'>
                <div className="cont flex justify-around items-center">
                    <FontAwesomeIcon icon={faEarthEurope} size='3x' fixedWidth className='text-white' />
                    <FontAwesomeIcon icon={faEarthAmericas} size='3x' fixedWidth className='text-white' />
                </div>
                <div className="cont flex justify-evenly items-center px-48">
                    <FontAwesomeIcon icon={faEarthAfrica} size='3x' fixedWidth className='text-white' />
                    <FontAwesomeIcon icon={faEarthAsia} size='3x' fixedWidth className='text-white' />
                </div>
                <div className="cont flex justify-evenly items-center">
                    <FontAwesomeIcon icon={faEarthOceania} size='3x' fixedWidth className='text-white' />
                </div>
            </div><br /><br />
            <div className='flex justify-center items-center'>
                <button className='text-white text-xl font-sans font-bold rounded-md p-2 hover:shadow-md hover:shadow-indigo-800 hover:bg-indigo-600 transition duration-300 ease-in-out active:scale-75' onClick={handleClick} >Book Now</button>
            </div>
        </div>
        <div className='py-8'>
            <div className='flex justify-center items-center text-white font-sans font-bold text-xl underline pb-2'>About US</div>
            <div className='flex justify-center items-center text-white font-sans px-64'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus cumque debitis repellendus ipsum ut consequuntur! Deleniti ut animi aliquid tempora sequi dolorum eaque modi atque placeat in? Sapiente, optio officia.
            Vel cupiditate voluptas recusandae possimus pariatur minus laudantium? Rerum amet dolores tenetur libero accusantium placeat sint magni officia quas, animi, nam officiis repellendus vel sequi recusandae? Quis voluptatem quam officiis?</div>
            <div className='flex justify-center items-center text-white font-sans'>
            <FontAwesomeIcon icon={faFacebook} size='2x' fixedWidth className='text-white pr-8' />
            <FontAwesomeIcon icon={faInstagram} size='2x' fixedWidth className='text-white pr-8' />
            <FontAwesomeIcon icon={faTwitter} size='2x' fixedWidth className='text-white pr-8' />
            <FontAwesomeIcon icon={faYoutube} size='2x' fixedWidth className='text-white pr-8' />
            <FontAwesomeIcon icon={faSnapchat} size='2x' fixedWidth className='text-white pr-8' />
            </div>
        </div>
        <div className='py-8'>
            <div className='flex justify-center items-center text-white font-sans font-bold px-64 text-xl underline'>Contact US</div>
            <div className='md:flex justify-start items-center text-white font-sans'>
                <div className='text-white font-sans flex justify-start items-center px-64 w-screen'>
                    <FontAwesomeIcon icon={faEnvelope} size='2x' fixedWidth className='text-white pr-8' />
                    <div>Write to Us at : <br />abc@gmail.com</div>
                </div>
                <div className='text-white font-sans flex justify-start items-center px-64 w-screen'>
                    <FontAwesomeIcon icon={faPhone} size='2x' fixedWidth className='text-white pr-8' />
                    <div>Call Us at : <br />003-226-112</div>
                </div>
            </div>
        </div>
    </div>
  )
};

export default Footer;