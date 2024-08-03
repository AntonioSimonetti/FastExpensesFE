import { useDispatch, useSelector } from "react-redux";
import { Nav, Button } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import { logout } from "../app/authenticationSlice";
import { FaSignInAlt, FaHome, FaChartBar, FaSignOutAlt, FaUser, FaCoins } from "react-icons/fa";
import "../styles/Navbar.css";

const Navbar = () => {
    const { isLoggedIn, usernameAndEmail } = useSelector(state => state.authenticationSlice);
    const dispatch = useDispatch();
    const location = useLocation();

    return (
        <Nav className="navbar">
               <h1 className="logo">
                    <FaCoins  className="icon-spacing-logo" /> FastExpenses
               </h1>
            {
                isLoggedIn ? (
                    <div  className="isLogged-main-div">
                        <NavLink className="custom-nav-link-bold-username">
                            <FaUser size={20} className="icon-spacing-username" /> {usernameAndEmail}
                        </NavLink>
                        <NavLink to="/" variant="link" className="custom-nav-link-bold">
                            <FaHome size={20} className="icon-spacing" /> <b className="bolder-text">Home</b>
                        </NavLink>
                        <NavLink to="/statistics" className="custom-nav-link-bold">
                            <FaChartBar size={20} className="icon-spacing" />  <b className="bolder-text">Statistics</b>
                        </NavLink>
                        <Button  variant="link" href="/signin" onClick={() => dispatch(logout())} className="custom-nav-link-bold btn-navbar">
                            <FaSignOutAlt size={20} className="icon-spacing" /> <b className="bolder-text">Log out</b>
                        </Button >
                    </div>
                ) : (
                    <div className="extra">
                        {location.pathname !== "/signup" && (
                            <NavLink to="/signup" className="custom-nav-link">
                                Don't have an account? <b className="logged-out">Sign up!</b>
                            </NavLink>
                        )}
                        {location.pathname !== "/signin" && (
                            <NavLink to="/signin" className="custom-nav-link logged-out">
                                <b>Sign in</b>
                                <FaSignInAlt size={20} className="icon-spacing"/>
                            </NavLink>
                        )}
                    </div>
                )
            }
        </Nav>
    );
};

export default Navbar;
