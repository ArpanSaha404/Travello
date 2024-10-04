import React from 'react'
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MainPage from './Components/mainPage/MainPage';
import SignUp from './Components/Auth/SignUp';
import LogIn from './Components/Auth/LogIn';
import ViewAllPackages from './Components/ViewAllPackages/ViewAllPackages';

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
        </Routes>
      </Router>
      </div>
    </div>
  )
};

export default App;