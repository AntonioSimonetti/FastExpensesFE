import { Form, Button, FormControl, InputGroup } from "react-bootstrap";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { SignIn, isEmailConfirmed } from "../services/authentication";
import Loader from "./Loader";
import "../styles/SignInPage.css";


const SignInPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showEmailError, setShowEmailError] = useState(false);
    const [showAuthError, setShowAuthError] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const [showLoader, setShowLoader] = useState(false);
    const dispatch = useDispatch();

    const validateForm = () => {
        const errors = {};

        const emailRegex = /\S+@\S+\.\S+/;
        const uppercaseRegex = /[A-Z]/;
        const numberRegex = /[0-9]/;
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

        if (!email) {
            errors.email = "Email is required";
        } else if (!emailRegex.test(email)) {
            errors.email = "Email address is invalid";
        }

        if (!password) {
            errors.password = "Password is required";
        } else if (password.length < 8) {
            errors.password = "Password must be at least 8 characters long";
        } else if (!uppercaseRegex.test(password)) {
            errors.password = "Password must contain at least one uppercase letter";
        } else if (!numberRegex.test(password)) {
            errors.password = "Password must contain at least one number";
        } else if (!specialCharRegex.test(password)) {
            errors.password = "Password must contain at least one special character";
        }
        
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();


        if (!validateForm()) {
            return;
        }

        setShowLoader(true);


        setShowAuthError(false);
        setShowEmailError(false);

        // Check if email is confirmed
        const emailConfirmed = await isEmailConfirmed({ email, password });
        if (emailConfirmed === false) {
            console.log("Email not confirmed yet!");
            setShowLoader(false);
            setShowEmailError(true);
            setTimeout(() => {
                setShowEmailError(false);
            }, 5000);
            return;
        }

        // Sign in the user
        const signInResult = await SignIn(dispatch, { email, password });
        console.log("signInResult", signInResult);
        if (!signInResult) {
            setShowLoader(false);
            setShowAuthError(true);
            setTimeout(() => {
                setShowAuthError(false);
            }, 5000);
        }
    };

    return (
        <div className="main-div">
            <Form onSubmit={handleSubmit} className="main-form">
             <h4>Welcome back!</h4>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                        isInvalid={!!validationErrors.email}
                    />
                    <Form.Control.Feedback type="invalid" className="error">
                        {validationErrors.email}
                    </Form.Control.Feedback>
                </InputGroup>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                        isInvalid={!!validationErrors.password}
                    />
                    <Form.Control.Feedback type="invalid" className="error">
                        {validationErrors.password}
                    </Form.Control.Feedback>
                </InputGroup>
                <Button type="submit" variant="primary"  className="form-btn">
                    Sign In
                </Button>
                {showEmailError && (
                    <p style={{
                        color: "red",
                        textAlign: "center",
                        marginTop: "10px",
                    }}>
                        Email not confirmed yet!
                    </p>
                )}
                {showAuthError && (
                    <p style={{
                        color: "red",
                        textAlign: "center",
                        marginTop: "10px",
                    }}>
                        Incorrect email and/or password!
                    </p>
                )}
                {showLoader && <Loader/>}
            </Form>
        </div>
    );
};

export default SignInPage;

