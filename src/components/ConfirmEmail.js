import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { generateConfirmationLink } from '../services/authentication';
import { logout, emailConfirmed } from '../app/authenticationSlice';
import "../styles/ConfirmEmail.css";


const ConfirmEmail = () => {
    const { usernameAndEmail, emailConfirmationLink } = useSelector(state => state.authenticationSlice);

    const [localEmailConfirmationLink, setLocalEmailConfirmationLink] = useState(null);
    const [isConfirmed, setIsConfirmed] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Log del payload per il debug
    console.log("ConfirmEmail component received usernameAndEmail from Redux store:", usernameAndEmail);
    console.log("ConfirmEmail component received emailConfirmationLink from Redux store:", emailConfirmationLink);

    useEffect(() => {
        const fetchConfirmationLink = async () => {
            if (usernameAndEmail && !emailConfirmationLink) {
                const link = await generateConfirmationLink(usernameAndEmail);
                setLocalEmailConfirmationLink(link);
            } else if (emailConfirmationLink) {
                setLocalEmailConfirmationLink(emailConfirmationLink);
            }
        };

        fetchConfirmationLink();
    }, [usernameAndEmail, emailConfirmationLink]);

    const handleEmailConfirmation = () => {
        dispatch(logout());
        dispatch(emailConfirmed());
        setIsConfirmed(true);
    };

    const handleLoginRedirect = () => {
        navigate('/signin');
    };

    return (
        <div className='confirm-email-main-div'>
            <h2 className='header-confirm-email'>Confirm Your Email</h2>
            {isConfirmed ? (
                <div className='confirm-mail-second-div'>
                    <p className='para'>Email confirmed. Click the link below to log in:</p>
                    <button onClick={handleLoginRedirect} className='login-btn-confirm-email'>Click here to login</button>
                </div>
            ) : localEmailConfirmationLink ? (
                <div className='confirm-mail-second-div'>
                    <p className='para'>Please confirm your email by clicking the link below:</p>
                    <a href={localEmailConfirmationLink} target="_blank" rel="noopener noreferrer" onClick={handleEmailConfirmation} className='ancor-confirm-email'>
                        Click here to confirm the email
                    </a>
                </div>
            ) : (
                <p className='para'>No confirmation link available.</p>
            )}
        </div>
    );
};

export default ConfirmEmail;
