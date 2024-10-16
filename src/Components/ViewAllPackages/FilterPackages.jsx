import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const FilterPackages = ({filteredPackageArray , onFilter , isVisible , handleDisp}) => {

    const [FilterItems , setFilterItems] = useState({
        type : '',
        name : '',
        selectedOption : ''
    });
    const [Hovered , setHovered] = useState(false);

    const handleOptionChange = (e , type , filter) =>{
        setFilterItems({
            type : type,
            name : filter,
            selectedOption : e.target.value
        });
        console.log(type + ' ' + filter + ' ' + e.target.value);
        console.log(FilterItems);
    };

    const clearFilter = () => {
        setFilterItems({
            type : '',
            name : '',
            selectedOption : ''
        });
        const orgArray = [...filteredPackageArray].sort((a, b) => b.rating - a.rating);
        onFilter(orgArray);
        handleDisp();
    };

    let newFilteredArr = [];

    //Applied Filters
    const filterAppliedPackages = () => {
        //Sorting
        if(FilterItems.type === 'sort')
        {
            //Sort by Price
            if(FilterItems.name === 'price')
            {
                //Sort by Price Ascending/Descending
                if(FilterItems.selectedOption === 'ASC')
                    newFilteredArr = [...filteredPackageArray].sort((a, b) => a.price.currPrice - b.price.currPrice);
                else if(FilterItems.selectedOption === 'DESC')
                    newFilteredArr = [...filteredPackageArray].sort((a, b) => b.price.currPrice - a.price.currPrice);
            }
            //Sort by Rating
            else if(FilterItems.name === 'rating')
            {
                //Sort by Rating Ascending/Descending
                if(FilterItems.selectedOption === 'ASC')
                    newFilteredArr = [...filteredPackageArray].sort((a, b) => a.rating - b.rating);
                else if(FilterItems.selectedOption === 'DESC')
                    newFilteredArr = [...filteredPackageArray].sort((a, b) => b.rating - a.rating);
            }
        }
        //Filtering
        else if(FilterItems.type === 'filter')
        {
            //Filter by Rating
            if(FilterItems.name === 'rating')
            {
                if(FilterItems.selectedOption === '1')
                    newFilteredArr = [...filteredPackageArray].filter((item) => item.rating >= 1);
                else if(FilterItems.selectedOption === '2')
                    newFilteredArr = [...filteredPackageArray].filter((item) => item.rating >= 2);
                else if(FilterItems.selectedOption === '3')
                    newFilteredArr = [...filteredPackageArray].filter((item) => item.rating >= 3);
                else if(FilterItems.selectedOption === '4')
                    newFilteredArr = [...filteredPackageArray].filter((item) => item.rating >= 4);
            }
            //Filter by Trip Type
            else if(FilterItems.name === 'tripType')
            {
                if(FilterItems.selectedOption === 'Domestic')
                    newFilteredArr = [...filteredPackageArray].filter((item) => item.type.toLowerCase() === 'domestic');
                else if(FilterItems.selectedOption === 'International')
                    newFilteredArr = [...filteredPackageArray].filter((item) => item.type.toLowerCase() === 'international');
            }
            //Filter by Duration
            else if(FilterItems.name === 'duration')
            {
                if(FilterItems.selectedOption === '3,0')
                    newFilteredArr = [...filteredPackageArray].filter((item) => 
                        parseInt(item.tripLength.split('/')[1].substring(0 , item.tripLength.split('/')[1].length-1) , 10) <= 3)
                else if(FilterItems.selectedOption === '3,5')
                    newFilteredArr = [...filteredPackageArray].filter((item) => 
                        parseInt(item.tripLength.split('/')[1].substring(0 , item.tripLength.split('/')[1].length-1) , 10) > 3 && 
                        parseInt(item.tripLength.split('/')[1].substring(0 , item.tripLength.split('/')[1].length-1) , 10) <= 5)
                else if(FilterItems.selectedOption === '5,8')
                    newFilteredArr = [...filteredPackageArray].filter((item) => 
                        parseInt(item.tripLength.split('/')[1].substring(0 , item.tripLength.split('/')[1].length-1) , 10) > 5 && 
                        parseInt(item.tripLength.split('/')[1].substring(0 , item.tripLength.split('/')[1].length-1) , 10) <= 8)
                else if(FilterItems.selectedOption === '0,8')
                    newFilteredArr = [...filteredPackageArray].filter((item) => 
                        parseInt(item.tripLength.split('/')[1].substring(0 , item.tripLength.split('/')[1].length-1) , 10) > 8)
            }
            //Filter by Price
            else if(FilterItems.name === 'price')
            {
                if(FilterItems.selectedOption === '2,0')
                    newFilteredArr = [...filteredPackageArray].filter((item) => item.price.currPrice < 20000);
                else if(FilterItems.selectedOption === '2,5')
                    newFilteredArr = [...filteredPackageArray].filter((item) => item.price.currPrice >= 20000 && item.price.currPrice < 50000);
                else if(FilterItems.selectedOption === '5,1')
                    newFilteredArr = [...filteredPackageArray].filter((item) => item.price.currPrice >= 50000 && item.price.currPrice < 80000);
                else if(FilterItems.selectedOption === '0,1')
                    newFilteredArr = [...filteredPackageArray].filter((item) => item.price.currPrice > 100000);
            }
        }




        onFilter(newFilteredArr);
        handleDisp();
    }

  return (
    <div className='absolute z-2 text-white bg-slate-900 w-3/4 px-8 py-4'>
        {isVisible && 
        <div>
            <div className='flex justify-center items-start'>
                <div className='w-3/6 border-solid border-white border-r-2'>
                    <div className='font-bold font-sans text-2xl'>Filter By :</div>
                    <div id='radio-rating'>
                        <h1 className='underline text-lg pt-4 pb-2'>Rating : </h1>
                        <div className='flex items-center justify-start'>
                            <label className='flex items-center pr-2'>More than 1
                                <input type='radio' name='rating' value={1} checked={FilterItems.selectedOption === '1'} onChange={(e) => handleOptionChange(e , 'filter' , 'rating')} className='ml-2 mr-4' />
                            </label>
                            <label className='flex items-center pr-2'>More than 2
                                <input type='radio' name='rating' value={2} checked={FilterItems.selectedOption === '2'} onChange={(e) => handleOptionChange(e , 'filter' , 'rating')} className='ml-2 mr-4' />
                            </label>
                        </div>
                        <div className='flex items-center justify-start'>
                            <label className='flex items-center pr-2'>More than 3
                                <input type='radio' name='rating' value={3} checked={FilterItems.selectedOption === '3'} onChange={(e) => handleOptionChange(e , 'filter' , 'rating')} className='ml-2 mr-4' />
                            </label>
                            <label className='flex items-center pr-2'>More than 4
                                <input type='radio' name='rating' value={4} checked={FilterItems.selectedOption === '4'} onChange={(e) => handleOptionChange(e , 'filter' , 'rating')} className='ml-2 mr-4' />
                            </label>
                        </div>
                    </div>
                    <div id='radio-tripType'>
                        <h1 className='underline text-lg pt-4 pb-2'>Trip Type : </h1>
                        <div className='flex items-center justify-start'>
                            <label className='flex items-center pr-2'>Domestic
                                <input type='radio' name='tripType' value={'Domestic'} checked={FilterItems.selectedOption === 'Domestic'} onChange={(e) => handleOptionChange(e , 'filter' , 'tripType')} className='ml-2 mr-4' />
                            </label>
                            <label className='flex items-center pr-2'>International
                                <input type='radio' name='tripType' value={'International'} checked={FilterItems.selectedOption === 'International'} onChange={(e) => handleOptionChange(e , 'filter' , 'tripType')} className='ml-2 mr-4' />
                            </label>
                        </div>
                    </div>
                    <div id='radio-duration'>
                        <h1 className='underline text-lg pt-4 pb-2'>Duration : </h1>
                        <label className='flex items-center pr-2'>Less than 3 Days
                            <input type='radio' name='duration' value={'3,0'} checked={FilterItems.selectedOption === '3,0'} onChange={(e) => handleOptionChange(e , 'filter' , 'duration')} className='ml-2 mr-4' />
                        </label>
                        <label className='flex items-center pr-2'>More than 3 Days & Less then 5 Days
                            <input type='radio' name='duration' value={'3,5'} checked={FilterItems.selectedOption === '3,5'} onChange={(e) => handleOptionChange(e , 'filter' , 'duration')} className='ml-2 mr-4' />
                        </label>
                        <label className='flex items-center pr-2'>More than 5 Days & Less then 8 Days
                            <input type='radio' name='duration' value={'5,8'} checked={FilterItems.selectedOption === '5,8'} onChange={(e) => handleOptionChange(e , 'filter' , 'duration')} className='ml-2 mr-4' />
                        </label>
                        <label className='flex items-center pr-2'>More than 8 Days
                            <input type='radio' name='duration' value={'0,8'} checked={FilterItems.selectedOption === '0,8'} onChange={(e) => handleOptionChange(e , 'filter' , 'duration')} className='ml-2 mr-4' />
                        </label>
                    </div>
                    <div id='radio-price'>
                        <h1 className='underline text-lg pt-4 pb-2'>Price : </h1>
                        <label className='flex items-center pr-2'>Less than 20,000
                            <input type='radio' name='price' value={'2,0'} checked={FilterItems.selectedOption === '2,0'} onChange={(e) => handleOptionChange(e , 'filter' , 'price')} className='ml-2 mr-4' />
                        </label>
                        <label className='flex items-center pr-2'>More than 20,000 & Less then 50,000
                            <input type='radio' name='price' value={'2,5'} checked={FilterItems.selectedOption === '2,5'} onChange={(e) => handleOptionChange(e , 'filter' , 'price')} className='ml-2 mr-4' />
                        </label>
                        <label className='flex items-center pr-2'>More than 50,000 & Less then 1,00,000
                            <input type='radio' name='price' value={'5,1'} checked={FilterItems.selectedOption === '5,1'} onChange={(e) => handleOptionChange(e , 'filter' , 'price')} className='ml-2 mr-4' />
                        </label>
                        <label className='flex items-center pr-2'>More than 1,00,000
                            <input type='radio' name='price' value={'0,1'} checked={FilterItems.selectedOption === '0,1'} onChange={(e) => handleOptionChange(e , 'filter' , 'price')} className='ml-2 mr-4' />
                        </label>
                    </div>
                </div>
                <div className='w-2/6 pl-32'>
                    <div className='font-bold font-sans text-2xl'>Sort By :</div>
                    <div id='radio-price-sort'>
                        <h1 className='underline text-lg pt-4 pb-2'>Price : </h1>
                        <div className='flex items-center justify-center'>
                            <label className='flex items-center pr-2'>ASC
                                <input type='radio' name='priceSort' value={'ASC'} checked={FilterItems.name === 'price' && FilterItems.selectedOption === 'ASC'} onChange={(e) => handleOptionChange(e , 'sort' , 'price')} className='ml-2 mr-4' />
                            </label>
                            <label className='flex items-center pr-2'>DESC
                                <input type='radio' name='priceSort' value={'DESC'} checked={FilterItems.name === 'price' && FilterItems.selectedOption === 'DESC'} onChange={(e) => handleOptionChange(e , 'sort' , 'price')} className='ml-2 mr-4' />
                            </label>
                        </div>
                    </div>
                    <div id='radio-rating-sort'>
                        <h1 className='underline text-lg pt-4 pb-2'>Rating : </h1>
                        <div className='flex items-center justify-center'>
                            <label className='flex items-center pr-2'>ASC
                                <input type='radio' name='ratingSort' value={'ASC'} checked={FilterItems.name === 'rating' && FilterItems.selectedOption === 'ASC'} onChange={(e) => handleOptionChange(e , 'sort' , 'rating')} className='ml-2 mr-4' />
                            </label>
                            <label className='flex items-center pr-2'>DESC
                                <input type='radio' name='ratingSort' value={'DESC'} checked={FilterItems.name === 'rating' && FilterItems.selectedOption === 'DESC'} onChange={(e) => handleOptionChange(e , 'sort' , 'rating')} className='ml-2 mr-4' />
                            </label>
                        </div>
                    </div>
                </div>
                <div className='w-1/6 flex items-center justify-end'>
                    <div>
                        <button className='hover:shadow-sm hover:shadow-indigo-300 hover:text-indigo-400 transition duration-300 ease-in-out active:scale-90' 
                        onClick={handleDisp}
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}><FontAwesomeIcon fixedWidth size='2x' icon={faXmark} /></button>
                        {Hovered && <h1 className='font-sans text-xl text-red-600'>Close</h1>}  
                    </div>
                </div>
            </div>
            <div className='flex justify-end'>
                <button className='text-lg px-2 mx-2 rounded-lg bg-slate-950 hover:shadow-sm hover:shadow-indigo-300 hover:text-indigo-400 transition duration-300 ease-in-out active:scale-125' onClick={filterAppliedPackages}>Apply Filter</button>
                <button className='text-lg px-2 mx-2 rounded-lg bg-slate-950 hover:shadow-sm hover:shadow-indigo-300 hover:text-indigo-400 transition duration-300 ease-in-out active:scale-125' onClick={clearFilter}>Clear Filter</button>
            </div>
        </div>}
    </div>
  );
};

export default FilterPackages;