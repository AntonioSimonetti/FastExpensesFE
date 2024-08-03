import './App.css';
import SignInPage from './components/SignInPage';
import SignUpPage from './components/SignUpPage';
import StatisticsPage  from './components/StatisticsPage';
import ConfirmEmail from './components/ConfirmEmail';
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import HomePage from './components/Homepage';
import { useEffect } from 'react';
import { userAuthenticated } from './app/authenticationSlice';

const App = () => {
  const {isLoggedIn} = useSelector(state => state.authenticationSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token from localStorage:", token); 

    // per qualche motivo non bastava scrivere solo if(token)
    if (token && token !== "undefined" && token !== "null") {
      dispatch(userAuthenticated({
        accessToken: token,
        isLoggedIn: true,  
      }));
    } else {
      console.log("No valid token found");
    }
  }, [dispatch]);

  useEffect(()=> {
    console.log("isloggedin", isLoggedIn)
  },[isLoggedIn]);
 
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={isLoggedIn ? <HomePage /> : <Navigate to="/signin" />} />
        <Route path="/signup" element={isLoggedIn ? <Navigate to="/" /> : <SignUpPage />} />
        <Route path="/signin" element={isLoggedIn ? <Navigate to="/" /> : <SignInPage />} />
        <Route path="/statistics" element={isLoggedIn ?  <StatisticsPage />: <Navigate to="/signin"/> } />
        <Route path="/confirm-email" element={<ConfirmEmail />} />
        <Route path="*" element={<h2>Page not found!</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
