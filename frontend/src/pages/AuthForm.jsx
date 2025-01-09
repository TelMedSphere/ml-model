import React, { useState } from 'react';
import { Alert, CircularProgress } from "@mui/material";
import httpClient from '../httpClient';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSignupVisible, setIsSignupVisible] = useState(false);
    const [loginData, setLoginData] = useState({ email: "", passwd: "" });
    const [signupData, setSignupData] = useState({
        username: "",
        usertype: "",
        age: "",
        gender: "",
        phone: "",
        email: "",
        passwd: "",
        specialization: "",
        doctorId: "",
    });
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isSuccessLoading, setIsSuccessLoading] = useState(false);
    const [alert, setAlert] = useState({ type: "", message: "" });

    const [errors, setErrors] = useState({
        username: "",
        email: "",
        phone: "",
        passwd: "",
        gender: "",
        specialization: "",
        doctorId: "",
    });

    const [loginErrors, setLoginErrors] = useState({
        email: "",
        passwd: "",
    });

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleSignupChange = (e) => {
        const { name, value } = e.target;
        setSignupData({ ...signupData, [name]: value });
    };

    // Handles back button functionality: toggles between signup and login views or navigates to previous page
    const handleBackButtonClick = () => {
        if (isSignupVisible) {
            setIsSignupVisible(false); 
            navigate(location.pathname, { replace: true });
        } else {
            navigate(-1); 
        }
    };
    
    // Handles form submission for both signup and login, including validation, and error handling
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsSuccessLoading(true);

        const isValid = handleValidation(); 
        if (!isValid) {
            setIsSuccessLoading(false);
            return;
        }
        
        try {
            if (isSignupVisible) {
                await httpClient.post("/register", { 
                    ...signupData, 
                    phone: "91" + signupData.phone 
                });
                setAlert({ type: "success", message: "Signup Successful!" });
            } else {
                await httpClient.post("/login", loginData);
                setAlert({ type: "success", message: "Login Successful!" });
            }
        } catch (error) {
            if (error.response?.data?.message === 'User already exists') {
                setAlert({ type: "error", message: "User already exists!" });
            } else {
                setAlert({ type: "error", message: error.response?.data?.message || "Something went wrong!" });
            }
        } finally {
            setIsSuccessLoading(false);
        }
    };

    const [requirements, setRequirements] = useState({
        length: false,
        letters: false,
        numbers: false,
        special: false,
    });
    
    // Validates password requirements and updates state
    const validatePassword = (password) => {
    setRequirements({
        length: password.length >= 12,
        letters: /[a-zA-Z]/.test(password),
        numbers: /[0-9]/.test(password),
        special: /[@$!%*#?&]/.test(password),
    });
    };
    
    const handlePasswordChange = (e) => {
        const password = e.target.value;
        setSignupData({ ...signupData, passwd: password });
        validatePassword(password);
    };
    
    const renderRequirement = (isMet, text) => (
        <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
        <div
            style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            border: `2px solid ${isMet ? "green" : "#295080"}`,
            backgroundColor: isMet ? "green" : "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "8px",
            }}
        >
            {isMet && (
            <span
                style={{
                color: "white",
                fontWeight: "bold",
                fontSize: "8px",
                }}
            >
                ✓
            </span>
            )}
        </div>
        <span style={{ color: isMet ? "green" : "#295080", fontSize: "12px" }}>
            {text}
        </span>
        </div>
    );
    
    // Performs form validation for both signup and login
    // Returns true if validation passes, else false
    const handleValidation = () => {
        if (isSignupVisible) {
            let formErrors = {};
            if (!signupData.username) formErrors.username = "Username is required";
            if (!signupData.email) formErrors.email = "Email is required";
            if (!signupData.phone) formErrors.phone = "Phone number is required";
            if (!signupData.age) formErrors.age = "Age is required";
            if (!signupData.passwd) formErrors.passwd = "Password is required";
            else {
                validatePassword(signupData.passwd);

                if (!requirements.length) formErrors.passwd = "Use 12 or more characters";
                else if (!requirements.letters || !requirements.numbers || !requirements.special) formErrors.passwd = "Password must be a combination of letters, numbers and special characters";
                
            }
            if (!signupData.gender) formErrors.gender = "Please select a gender";
            if (!signupData.usertype) formErrors.usertype = "Please select how you would like to register";
            if (signupData.usertype === "doctor") {
                if (!signupData.specialization) formErrors.specialization = "Specialization is required";
                if (!signupData.doctorId) formErrors.doctorId = "Doctor ID is required";
            }
            setErrors(formErrors);
            return Object.keys(formErrors).length === 0;
        } else {
            let errors = {};
            if (!loginData.email) errors.email = "Email is required";
            if (!loginData.passwd) errors.passwd = "Password is required";
            else if(!/\S+@\S+\.\S+/.test(loginData.email)) errors.email = "Email is invalid";
            setLoginErrors(errors);
            return Object.keys(errors).length === 0;
        }
            
    };

    const handleInputFocus = (e) => {
        const { name } = e.target;
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    };

    const handleLoginInputFocus = (e) => {
        const { name } = e.target;
        setLoginErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    };

    const handleSignupVisibility = () => setIsSignupVisible(!isSignupVisible);

    return (
        <div className="auth-form-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: '20px', minHeight: '50vh', padding: '10px 0' }}>
            <form onSubmit={handleFormSubmit} className="auth-form" style={{ maxWidth: '400px', width: '100%', color: '#295080' }}>
                {alert.message && <Alert severity={alert.type}>{alert.message}</Alert>}

                {/* Back Button */}
                <button type="button" onClick={handleBackButtonClick} style={{ background: 'none', border: 'none', cursor: 'pointer', marginBottom: '16px' }}>
                    &lt; Back
                </button>

                {/* Heading */}
                <h1 style={{ marginBottom: '16px', fontWeight: '600', fontSize: '2em', color: '#53779c', fontFamily: '"Star Serif", serif'  }}>{isSignupVisible ? "Getting to know you" : "Welcome back"}</h1>

                {/* Subheading */}
                {isSignupVisible && <p style={{ marginBottom: '16px' }}>Tell us a bit about yourself!</p>}

                {/* Signup Fields */}
                {isSignupVisible && (
                    <>
                        <div className="input-group">
                            <label htmlFor="username" className="input-label">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={signupData.username}
                                onChange={handleSignupChange}
                                onFocus={handleInputFocus}
                                style={{ width: '100%', border: `2px solid ${errors.username ? 'red' : '#e7e7e7'}`, padding: '0.5em', borderRadius: '8px' }}
                                
                            />
                            {errors.username && <p style={{ color: 'red', fontSize: '12px' }}>{errors.username}</p>}
                        </div>
                        <div className="input-group" style={{ marginTop: '16px' }}>
                            <label htmlFor="email" className="input-label">Email address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={signupData.email}
                                onChange={handleSignupChange}
                                onFocus={handleInputFocus}
                                style={{ width: '100%', border: `2px solid ${errors.email ? 'red' : '#e7e7e7'}`, padding: '0.5em', borderRadius: '8px' }}
                            />
                            {errors.email && <p style={{ color: 'red', fontSize: '12px' }}>{errors.email}</p>}
                        </div>
                        <div className="input-group" style={{ marginTop: '16px' }}>
                            <label htmlFor="phone" className="input-label">Mobile number</label>
                            <p style={{ fontSize: '12px' }}>Don't worry, we won't spam you. This is just to keep your account secure.</p>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={signupData.phone}
                                onChange={(e) => {
                                    const re = /^[0-9\b]+$/;
                                        if (e.target.value === '' || re.test(e.target.value)) {
                                            setSignupData({
                                                ...signupData,
                                                phone: e.target.value.slice(0, 10),
                                            });
                                        }}}
                                onFocus={handleInputFocus}
                                style={{ width: '100%', border: `2px solid ${errors.phone ? 'red' : '#e7e7e7'}`, padding: '0.5em', borderRadius: '8px' }}
                            />
                            {errors.phone && <p style={{ color: 'red', fontSize: '12px' }}>{errors.phone}</p>}
                        </div>
                        <div className="input-group" style={{ marginTop: '16px' }}>
                            <label htmlFor="age" className="input-label">Age</label>
                            <input
                                type="number"
                                id="age"
                                name="age"
                                value={signupData.age}
                                onChange={(e) => {
                                    const age = e.target.value;
                                    if (age >= 0 && age <= 120) {
                                        setSignupData({
                                            ...signupData,
                                            age: age
                                        });
                                    }
                                }}
                                onFocus={handleInputFocus}
                                style={{ width: '100%', border: `2px solid ${errors.age ? 'red' : '#e7e7e7'}`, padding: '0.5em', borderRadius: '8px' }}
                            />
                            {errors.age && <p style={{ color: 'red', fontSize: '12px' }}>{errors.age}</p>}
                        </div>
                        <div className="input-group" style={{ marginTop: '16px', position: 'relative' }}>
                            <label htmlFor="password" className="input-label">Password</label>
                            <div style={{ marginTop: "8px" }}>
                                <p style={{ marginBottom: "8px", fontSize: "12px" }}>
                                Your password must…
                                </p>
                                {renderRequirement(requirements.length, "Have 12 or more characters")}
                                {renderRequirement(requirements.letters, "Include letters a-z")}
                                {renderRequirement(requirements.numbers, "Include numbers 0-9")}
                                {renderRequirement(requirements.special, "Have at least one of these special characters @$!%*#?&")}
                            </div>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type={isPasswordVisible ? 'text' : 'password'}
                                    id="password"
                                    name="passwd"
                                    value={signupData.passwd}
                                    onChange={handlePasswordChange}
                                    onClick= {handleInputFocus}
                                    style={{
                                    width: "100%",
                                    border: `2px solid ${errors.passwd ? 'red' : '#e7e7e7'}`,
                                    padding: "0.5em",
                                    borderRadius: "8px",
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                    // style={{ position: 'absolute', right: '0px', top: '70%', height: '100%', padding: '0.5rem', width: '4em', transform: 'translateY(-50%)', background: 'none', border: '2px solid #e7e7e7', cursor: 'pointer' }}
                                    style={{
                                        position: 'absolute',
                                        right: '8px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        height: '100%',
                                        fontSize: '14px'  
                                    }}
                                >
                                        {isPasswordVisible ? 'Hide' : 'Show'}
                                </button>
                            </div>
                            {errors.passwd && <p style={{ color: 'red', fontSize: '12px' }}>{errors.passwd}</p>}
                        </div>
 
                        <div className="input-group" style={{ marginTop: '16px' }}>
                            <label htmlFor="gender" className="input-label" style={{ display: 'block', marginBottom: '8px' }}>How do you identify?</label>
                            <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                                <label style={{ display: 'flex', alignItems: 'center' }}>
                                    <input 
                                        type="radio" 
                                        name="gender" 
                                        value="male" 
                                        checked={signupData.gender === 'male'} 
                                        onChange={() => {
                                            setSignupData({ ...signupData, gender: 'male' });
                                            setErrors((prevErrors) => ({ ...prevErrors, gender: null }));
                                        }}
                                        style={{ marginRight: '8px' }}
                                    /> 
                                    Male
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center' }}>
                                    <input 
                                        type="radio" 
                                        name="gender" 
                                        value="female" 
                                        checked={signupData.gender === 'female'} 
                                        onChange={() => {
                                            setSignupData({ ...signupData, gender: 'female' });
                                            setErrors((prevErrors) => ({ ...prevErrors, gender: null }));
                                        }} 
                                        style={{ marginRight: '8px' }}
                                    /> 
                                    Female
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center' }}>
                                    <input 
                                        type="radio" 
                                        name="gender" 
                                        value="other" 
                                        checked={signupData.gender === 'other'} 
                                        onChange={() => {
                                            setSignupData({ ...signupData, gender: 'other' });
                                            setErrors((prevErrors) => ({ ...prevErrors, gender: null }));
                                        }} 
                                        style={{ marginRight: '8px' }}
                                    /> 
                                    Other
                                </label>
                            </div>
                            {errors.gender && <p style={{ color: 'red', fontSize: '12px' }}>{errors.gender}</p>}
                        </div>

                        <div className="input-group" style={{ marginTop: '16px', marginBottom: '16px' }}>
                            <label className="input-label" style={{ display: 'block', marginBottom: '8px' }}>How would you like to register?</label>
                            <div style={{ display: 'flex', gap: '16px' }}>
                                <label style={{ display: 'flex', alignItems: 'center' }}>
                                    <input 
                                        type="radio" 
                                        name="usertype" 
                                        value="patient" 
                                        checked={signupData.usertype === 'patient'} 
                                        onChange={() => {
                                            setSignupData({ ...signupData, usertype: 'patient' });
                                            setErrors((prevErrors) => ({ ...prevErrors, usertype: null }));
                                        }}
                                        style={{ marginRight: '8px' }}
                                    /> 
                                    Patient
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center' }}>
                                    <input 
                                        type="radio" 
                                        name="usertype" 
                                        value="doctor" 
                                        checked={signupData.usertype === 'doctor'} 
                                        onChange={() => {
                                            setSignupData({ ...signupData, usertype: 'doctor' });
                                            setErrors((prevErrors) => ({ ...prevErrors, usertype: null }));
                                        }}
                                        style={{ marginRight: '8px' }}
                                    /> 
                                    Doctor
                                </label>
                            </div>
                            {errors.usertype && <p style={{ color: 'red', fontSize: '12px' }}>{errors.usertype}</p>}
                        </div>


                        {signupData.usertype === 'doctor' && (
                            <>
                                <div className="input-group">
                                    <label htmlFor="specialization" className="input-label">Specialization (eg: Cancer Surgeon)</label>
                                    <input
                                        type="text"
                                        name="specialization"
                                        value={signupData.specialization}
                                        onChange={handleSignupChange}
                                        onFocus={handleInputFocus}
                                        style={{ width: '100%', border: `2px solid ${errors.specialization ? 'red' : '#e7e7e7'}`, padding: '0.5em', borderRadius: '8px' }}
                                    />
                                    {errors.specialization && <p style={{ color: 'red', fontSize: '12px' }}>{errors.specialization}</p>}
                                </div>
                                <div className="input-group" style={{ marginTop: '16px' }}>
                                    <label htmlFor="doctorid" className="input-label">Doctor ID</label>
                                    <input
                                        type="text"
                                        name="doctorId"
                                        value={signupData.doctorId}
                                        onChange={handleSignupChange}
                                        onFocus={handleInputFocus}
                                        style={{  width: '100%', border: `2px solid ${errors.doctorId ? 'red' : '#e7e7e7'}`, padding: '0.5em', borderRadius: '8px' }}
                                    />
                                    {errors.doctorId && <p style={{ color: 'red', fontSize: '12px' }}>{errors.doctorId}</p>}
                                </div>
                            </>
                        )}
                    </>
                )}

                {/* Login Fields */}
                {!isSignupVisible && (
                    <>
                        <div className="input-group">
                            <label htmlFor="email" className="input-label">Enter your email address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={loginData.email}
                                onChange={handleLoginChange}
                                onFocus={handleLoginInputFocus}
                                style={{ width: '100%', border: `2px solid ${loginErrors.email ? 'red' : '#e7e7e7'}`, padding: '0.5em', borderRadius: '8px' }}                                
                            />
                            {loginErrors.email && <p style={{ color: 'red', fontSize: '12px' }}>{loginErrors.email}</p>}
                        </div>
                        <div className="input-group" style={{ marginTop: '16px', position: 'relative' }}>
                            <label htmlFor="password" className="input-label">Enter your password</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type={isPasswordVisible ? 'text' : 'password'}
                                    id="password"
                                    name="passwd"
                                    value={loginData.passwd}
                                    onChange={handleLoginChange}
                                    onFocus={handleLoginInputFocus}
                                    style={{ width: '100%', border: `2px solid ${loginErrors.passwd ? 'red' : '#e7e7e7'}`, padding: '0.5em', borderRadius: '8px' }}                                    
                                />
                                <button
                                    type="button"
                                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}                    
                                    style={{
                                        position: 'absolute',
                                        right: '8px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        height: '100%',
                                        fontSize: '14px'  
                                    }}
                                >
                                    {isPasswordVisible ? 'Hide' : 'Show'}
                                </button>
                            </div>
                            {loginErrors.passwd && <p style={{ color: 'red', fontSize: '12px' }}>{loginErrors.passwd}</p>}                                
                        </div>
                        
                    </>
                )}

                {/* Submit Button */}
                <div style={{ marginBottom: '16px', flexWrap:'nowrap' }}>
                    <button type="submit" disabled={isSuccessLoading} style={{ display: 'flex', padding: '0.5rem 2.5rem', background: '#3e6b9c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '15px' }}>
                        {isSuccessLoading ? <CircularProgress size={24} /> : isSignupVisible ? "Create Account" : "Login"}
                    </button>
                </div>

                {/* Footer Links */}
                {!isSignupVisible && (
                    <>
                        <h2 style={{ fontWeight: 'bold', marginTop: '2rem', fontSize: '20px', color: '#53779c' }}>Problems signing in?</h2>
                        <p style={{ fontSize: '15px' }}>Forgotten your password (or don't remember setting one)? No problem. Set a new one in seconds!</p>
                        <a href="#" style={{ display: 'block', fontSize: '15px', color: '#3e6b9c', textDecoration: 'underline' }}>Reset your password</a>
                    </>
                )}
                <div style={{ marginTop: '16px', fontSize: '15px' }}>
                    <p>
                        {isSignupVisible ? "Already have an account?" : "Don't have a TelMedSphere account yet?"}
                    </p>
                    <button 
                        type="button" 
                        onClick={handleSignupVisibility} 
                        style={{ 
                            background: 'none', border: 'none', cursor: 'pointer', padding: '0', display: 'inline-block'
                        }}
                    >
                        {isSignupVisible ? (
                            <span>
                                You can skip all this and sign in <span style={{ color: '#53779c', textDecoration: 'underline' }}>here</span>
                            </span>
                        ) : (
                            <span style={{ color: '#53779c', textDecoration: 'underline' }}>
                                Create a TelMedSphere account
                            </span>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AuthForm;
