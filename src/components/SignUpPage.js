import { Form, Button, FormControl, InputGroup } from "react-bootstrap";
import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SignUp } from "../services/authentication";
import Loader from "./Loader";
import "../styles/SignUpPage.css";

const SignUpPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [validationErrors, setValidationErrors] = useState({});
    const [showLoader, setShowLoader] = useState(false);
    const [emailInUseError, setEmailInUseError] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

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

        if (password !== confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSignUp = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        setShowLoader(true);
        setEmailInUseError("");

        try {
            const data = await SignUp(dispatch, { username, email, password });
            navigate('/confirm-email', { state: { emailConfirmationLink: data.emailConfirmationLink } });
        } catch (error) {
            console.log("Error inside the component", error.message);
            if (error.response && error.response.status === 400) {
                setEmailInUseError("Email is already in use. Please use a different email.");
            }
        } finally {
            setShowLoader(false);
        }
    };

    return (
        <div className="main-div-signup">
            <Form onSubmit={handleSignUp} className="main-form-signup">
                <h4 style={{ textAlign: "center" }}>Welcome!</h4>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                        isInvalid={!!validationErrors.email || !!emailInUseError}
                    />
                    <Form.Control.Feedback type="invalid">
                        {validationErrors.email || emailInUseError}
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
                    <Form.Control.Feedback type="invalid">
                        {validationErrors.password}
                    </Form.Control.Feedback>
                </InputGroup>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Confirm Password"
                        type="password"
                        value={confirmPassword}
                        onChange={event => setConfirmPassword(event.target.value)}
                        isInvalid={!!validationErrors.confirmPassword}
                    />
                    <Form.Control.Feedback type="invalid">
                        {validationErrors.confirmPassword}
                    </Form.Control.Feedback>
                </InputGroup>
                <Button
                    type="submit"
                    variant="success"
                    className="form-btn-signup"
                    disabled={password !== confirmPassword || password.length <= 0}
                >
                    Sign Up
                </Button>
                {showLoader && <Loader />}
            </Form>
        </div>
    )
}

export default SignUpPage;
