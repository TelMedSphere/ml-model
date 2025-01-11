import React, { useContext, useRef, useState } from 'react';
import commonContext from '../../contexts/common/commonContext';
import useOutsideClose from '../../hooks/useOutsideClose';
import useScrollDisable from '../../hooks/useScrollDisable';
import { Alert, CircularProgress } from "@mui/material";
import { Lock, Mail, Phone, User } from 'lucide-react';
import httpClient from '../../httpClient';

const AccountForm = () => {
    const { isFormOpen, toggleForm, setFormUserInfo } = useContext(commonContext);
    const [username, setUsername] = useState("");
    const [usertype, setUsertype] = useState("patient");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("male");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [passwd, setPasswd] = useState("");
    const [isInvPhone, setIsInvPhone] = useState(false);
    const [specialization, setSpecialization] = useState("");
    const [isInvEmail, setIsInvEmail] = useState(false);
    const [isInvPass, setIsInvPass] = useState(false);
    const [isInvAge, setIsInvAge] = useState(false);
    const [isAlert, setIsAlert] = useState("");
    const [alertCont, setAlertCont] = useState("");
    const [isSuccessLoading, setIsSuccessLoading] = useState(false);
    const [doctorId, setDoctorId] = useState("");
    const [isForgotPassword, setIsForgotPassword] = useState(false);

    const formRef = useRef();

    useOutsideClose(formRef, () => {
        resetForm();
    });

    useScrollDisable(isFormOpen);

    const [isSignupVisible, setIsSignupVisible] = useState(false);

    const resetForm = () => {
        toggleForm(false);
        setUsername("");
        setUsertype("patient");
        setAge("");
        setGender("male");
        setPhone("");
        setEmail("");
        setPasswd("");
        setSpecialization("");
        setIsForgotPassword(false);
    };

    const handleIsSignupVisible = () => {
        setIsSignupVisible(prevState => !prevState);
        setIsForgotPassword(false);
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        if (isInvEmail) return;

        setIsSuccessLoading(true);
        try {
            await httpClient.post("/forgot_password", { email });
            setIsAlert("success");
            setAlertCont("Password reset link sent to your email");
            setTimeout(() => {
                setIsAlert("");
                setIsForgotPassword(false);
            }, 1500);
        } catch (err) {
            setIsAlert("error");
            setAlertCont("Email not found");
            setTimeout(() => setIsAlert(""), 1500);
        }
        setIsSuccessLoading(false);
    };

    const checkAge = (a) => {
        const t = ( parseInt(a) > 0 && parseInt(a) <= 120 && /^[0-9]{1,3}$/.test(a));
        setIsInvAge(!t);
        return t;
    }

    const checkEmail = (email) => {
        // eslint-disable-next-line
        const res = (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email));
        setIsInvEmail(!res);
        return res;
    }

    const checkPasswd = (passwd) => {
        const res = (/^.{6,}$/.test(passwd));
        setIsInvPass(!res);
        return res;
    }

     const validatePhoneNumber = (phoneNumber) => {
        const pattern = /^\+?1?\d{10,10}$/;
        const res = pattern.test(phoneNumber);
        setIsInvPhone(!res);
        return res;
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (isInvEmail || isInvPass || isInvPhone) return;

        setIsSuccessLoading(true);
        try {
            if (isSignupVisible) {
                const res = await httpClient.post("/register", {
                    username,
                    registerer: usertype,
                    age,
                    gender,
                    phone: "91" + phone,
                    email,
                    passwd,
                    specialization
                });
                setIsAlert("success");
                setAlertCont("Signup Successful");
                setTimeout(() => {
                    setIsAlert("");
                    setFormUserInfo({
                        username, usertype, gender, phone,
                        email, passwd, specialization, age,
                        verified: false
                    });
                    resetForm();
                }, 1500);
            } else {
                const res = await httpClient.post("/login", { email, passwd });
                localStorage.setItem("token", res.data.access_token);
                setIsAlert("success");
                setAlertCont("Login Successful");
                setTimeout(() => {
                    setIsAlert("");
                    resetForm();
                    setFormUserInfo({
                        username: res.data.username,
                        usertype: res.data.usertype,
                        gender: res.data.gender,
                        phone: res.data.phone,
                        email,
                        passwd,
                        specialization: res.data.specialization,
                        age: res.data.age,
                        verified: res.data.verified
                    });
                }, 1500);
            }
        } catch (err) {
            setIsAlert("error");
            setAlertCont(isSignupVisible ? "User already exists" : "Login Failed");
            setTimeout(() => setIsAlert(""), 1500);
        }
        setIsSuccessLoading(false);
    };

    
    return (
        <>
            {isFormOpen && (
                <div className="backdrop">
                    <div className="modal_centered">
                        <form ref={formRef} onSubmit={isForgotPassword ? handleForgotPassword : handleFormSubmit} className="account_form">
                            {isAlert !== "" && (
                                <Alert severity={isAlert} className="form_alert">
                                    {alertCont}
                                </Alert>
                            )}

                            <div className="form_head">
                                <h2>{isForgotPassword ? 'Forgot Password' : (isSignupVisible ? 'Sign Up' : 'Login')}</h2>
                                {!isForgotPassword && (
                                    <p>
                                        {isSignupVisible ? 'Already have an account?' : 'New to TelMedSphere?'}
                                        <button type="button" onClick={handleIsSignupVisible}>
                                            {isSignupVisible ? 'Login' : 'Create an account'}
                                        </button>
                                    </p>
                                )}
                            </div>

                            <div className="form_body">
                                {isSignupVisible && (
                                    <>
                                        <div className="input_box">
                                            <label>Register as</label>
                                            <div className="radio_inputs">
                                                <label>
                                                    <input
                                                        type="radio"
                                                        name="usertype"
                                                        value="patient"
                                                        checked={usertype === "patient"}
                                                        onChange={(e) => setUsertype(e.target.value)}
                                                    />
                                                    <span>Patient</span>
                                                </label>
                                                <label>
                                                    <input
                                                        type="radio"
                                                        name="usertype"
                                                        value="doctor"
                                                        checked={usertype === "doctor"}
                                                        onChange={(e) => setUsertype(e.target.value)}
                                                    />
                                                    <span>Doctor</span>
                                                </label>
                                                
                                            </div>

                                        </div>

                                 <div className="relative">
                                         <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                         <input
                                            type="text"
                                            placeholder="Username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>

                                    {usertype === "doctor" && (
                                        <>
                                            <input
                                                type="text"
                                                placeholder="Specialization (e.g., Cancer Surgeon)"
                                                value={specialization}
                                                onChange={(e) => setSpecialization(e.target.value)}
                                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                required
                                            />
                                            <input
                                                type="text"
                                                placeholder="Doctor ID"
                                                value={doctorId}
                                                onChange={(e) => setDoctorId(e.target.value)}
                                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                required
                                            />
                                        </>
                                    )}

                                    {usertype === "patient" && (
                                        <div>
                                            <input
                                                type="text"
                                                placeholder="Age"
                                                value={age}
                                                onChange={(e) => {
                                                    checkAge(e.target.value);
                                                    setAge(e.target.value);
                                                }}
                                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                required
                                            />
                                            {age !== "" && isInvAge && (
                                                <p className="text-red-500 text-sm mt-1">Invalid Age</p>
                                            )}
                                        </div>
                                    )}

                                    <div className="flex gap-4">
                                        {["male", "female", "other"].map((g) => (
                                            <label key={g} className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    value={g}
                                                    checked={gender === g}
                                                    onChange={(e) => setGender(e.target.value)}
                                                    className="w-4 h-4 text-blue-600"
                                                />
                                                <span className="ml-2 capitalize">{g}</span>
                                            </label>
                                        ))}
                                    </div>

                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                        <input
                                            type="text"
                                            placeholder="Phone"
                                            value={phone}
                                            onChange={(e) => {
                                                validatePhoneNumber(e.target.value);
                                                setPhone(e.target.value);
                                            }}
                                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                        {phone !== "" && isInvPhone && (
                                            <p className="text-red-500 text-sm mt-1">Invalid Phone Number</p>
                                        )}
                                    </div>


                             
                                    </>
                                )}

                                <div className="input_box">
                                    <Mail size={20} />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => {
                                            checkEmail(e.target.value);
                                            setEmail(e.target.value);
                                        }}
                                        required
                                    />
                                    {email !== "" && isInvEmail && (
                                        <span className="error_message">Invalid Email</span>
                                    )}
                                </div>

                                {!isForgotPassword && (
                                    <div className="input_box">
                                        <Lock size={20} />
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            value={passwd}
                                            onChange={(e) => {
                                                checkPasswd(e.target.value);
                                                setPasswd(e.target.value);
                                            }}
                                            required
                                        />
                                        {isSignupVisible && passwd !== "" && isInvPass && (
                                            <span className="error_message">Password should contain at least 6 characters</span>
                                        )}
                                    </div>
                                )}

                                {!isSignupVisible && !isForgotPassword && (
                                    <button
                                        type="button"
                                        onClick={() => setIsForgotPassword(true)}
                                        className="forgot_password_btn"
                                    >
                                        Forgot Password?
                                    </button>
                                )}

                                {isForgotPassword && (
                                    <button
                                        type="button"
                                        onClick={() => setIsForgotPassword(false)}
                                        className="back_to_login_btn"
                                    >
                                        Back to Login
                                    </button>
                                )}

                                <button
                                    type="submit"
                                    className="submit_btn"
                                    disabled={isSuccessLoading}
                                >
                                    {isSuccessLoading ? (
                                        <CircularProgress size={24} />
                                    ) : (
                                        isForgotPassword ? 'Send Reset Link' : (isSignupVisible ? 'Sign Up' : 'Login')
                                    )}
                                </button>
                            </div>

                            <button
                                type="button"
                                className="close_btn"
                                onClick={() => toggleForm(false)}
                            >
                                ×
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default AccountForm;