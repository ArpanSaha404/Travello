import React from 'react'
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MainPage from './Components/mainPage/MainPage';
import SignUp from './Components/Auth/SignUp';
import LogIn from './Components/Auth/LogIn';
import ViewAllPackages from './Components/ViewAllPackages/ViewAllPackages';
import ViewPackageDetails from './Components/ViewPackageDetails/ViewPackageDetails';
import BookPackage from './Components/BookPackage/BookPackage';
import Payments from './Components/Payments/Payments';

const App = () => {
  return (
    <div>
      <div>
      <Router>
        <Routes>
          <Route exact path='/' element={<MainPage />} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/logIn' element={<LogIn />} />
          <Route path='/viewAllPackages' element={<ViewAllPackages />} />
          <Route path='/viewPackageDetails/:packageId' element={<ViewPackageDetails />} />
          <Route path='/bookingDetails/:packageId/:bookingId' element={<BookPackage />} />
          {/* <Route path='/bookPackage/:packageId' element={<BookPackage />} /> */}
          <Route path='/payments/:bookingID' element={<Payments />} />
          <Route path='*' element={<MainPage />} />
        </Routes>
      </Router>
      </div>
    </div>
  )
};

export default App;