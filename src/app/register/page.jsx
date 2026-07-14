// "use client";

// import React, { useState } from 'react'
// import Link from 'next/link'
// import { useRouter } from 'next/navigation';
// import apiInstance from '@/api/instance';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Header from '@/components/Header';
// import PhoneInput from 'react-phone-number-input';
// import 'react-phone-number-input/style.css';
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import Swal from 'sweetalert2';
// import { useDispatch } from 'react-redux';
// import { setUserData } from '@/redux/slice/userDataSlice';

// const Register = () => {
//     const [input, setInput] = useState({});
//     const [phone, setPhone] = useState('');
//     const [showPassword, setShowPassword] = useState(false);
//     const router = useRouter();
//     const dispatch = useDispatch()

//     const handleInput = (e) => {
//         const { name, value } = e.target;
//         setInput({ ...input, [name]: value });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Format phone number with country code and space
//         const formattedPhone = phone ? `+${phone.replace(/\D/g, '').replace(/(\d{2})(\d+)/, '$1 $2')}` : '';
//         registerUser({ ...input, mobile: formattedPhone });
//     };

//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };

//     const registerUser = async (userData) => {
//         try {
//             const response = await apiInstance.post('/api/auth/register', userData);
//             // console.log("response: ", response);

//             if (response.status === 200) {
//                 // Show success toast
//                 // toast.success('Account created successfully!', { autoClose: 2000 });
//                 Swal.fire({
//                     icon: 'success',
//                     text: 'Account created successfully!',
//                     timer: 2000,
//                     showConfirmButton: false
//                 });
//                 localStorage.setItem('token', response?.data?.token);
//                 localStorage.setItem('userName', response?.data?.name);
//                 localStorage.setItem('userId', response?.data?.id);
//                 localStorage.setItem('userEmail', response?.data?.email);
//                 localStorage.setItem('userPhone', response?.data?.mobile);

//                 dispatch(setUserData({
//                     userId: response?.data?.id,
//                     userName: response?.data?.name,
//                     userEmail: response?.data?.email,
//                     userPhone: response?.data?.mobile,
//                     token: response?.data?.token
//                 }))

//                 router.push('/');
//             }
//         } catch (error) {
//             // Show error toast
//             // toast.error(error.response?.data?.message || 'Registration failed. Please try again.', { autoClose: 2000 });
//             Swal.fire({
//                 icon: 'error',
//                 text: error.response?.data?.message,
//                 timer: 2000,
//                 showConfirmButton: false
//             });
//         }
//     };

//     return (
//         <>
//             {/* <Header /> */}
//             <div className="container-fluid px-3">
//                 <h2 className='text-center fw-bolder display-5 mt-4 mb-4'>CREATE ACCOUNT</h2>
//                 <div className="d-flex flex-column align-items-center justify-contant-center py-3 py-md-5">
//                     <div className="login w-100" style={{ maxWidth: "500px" }}>
//                         <form onSubmit={handleSubmit}>
//                             <input
//                                 type="text"
//                                 name="name"
//                                 id="name"
//                                 onChange={handleInput}
//                                 className='form-control mt-3 py-3'
//                                 placeholder='ENTER YOUR NAME'
//                             />
//                             <input
//                                 type="email"
//                                 name="email"
//                                 id="email"
//                                 onChange={handleInput}
//                                 className='form-control mt-3 py-3'
//                                 placeholder='ENTER YOUR EMAIL'
//                             />
//                             <div className='mt-3'>
//                                 <PhoneInput
//                                     international
//                                     defaultCountry="US"
//                                     value={phone}
//                                     onChange={setPhone}
//                                     className='form-control py-3'
//                                     placeholder="ENTER YOUR PHONE NUMBER"
//                                 />
//                             </div>
//                             <div className="position-relative">
//                                 <input
//                                     type={showPassword ? "text" : "password"}
//                                     name="password"
//                                     onChange={handleInput}
//                                     className='form-control mt-3 py-3 mb-2'
//                                     placeholder='ENTER YOUR PASSWORD'
//                                     minLength="6"
//                                 />
//                                 <button
//                                     type="button"
//                                     className="position-absolute end-0 top-0 bg-transparent border-0 h-100 px-3"
//                                     onClick={togglePasswordVisibility}
//                                     aria-label={showPassword ? "Hide password" : "Show password"}
//                                 >
//                                     {showPassword ? <FaEyeSlash /> : <FaEye />}
//                                 </button>
//                             </div>
//                             <button className='d-block w-100 mt-3 py-3 border-0 fw-semibold text-white rounded-1' type='submit'>Register</button>
//                             <span style={{ fontSize: '13px', opacity: '80%' }}>
//                                 If you have an account, please <Link href='/login' className='text-decoration-none text-black'><span className='greenHover fw-bold'>Login Here.</span></Link>
//                             </span>
//                         </form>
//                     </div>
//                 </div>
//                 {/* <ToastContainer /> */}
//             </div>
//         </>
//     )
// }

// export default Register

"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import apiInstance from "@/api/instance";
import Swal from "sweetalert2";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setUserData } from "@/redux/slice/userDataSlice";

const Register = () => {
    const [input, setInput] = useState({});
    const [phone, setPhone] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isOtpStage, setIsOtpStage] = useState(false);
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);
    const router = useRouter();
    const dispatch = useDispatch();

    // ✅ handle input
    const handleInput = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };

    // ✅ OTP input logic
    const handleOtpChange = (index, value) => {
        if (!/^[0-9]*$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < 5) inputRefs.current[index + 1]?.focus();
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        const paste = e.clipboardData.getData("text");
        if (!/^[0-9]{6}$/.test(paste)) return;
        setOtp(paste.split(""));
    };

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    // ✅ main submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isOtpStage) {
            verifyOtp();
        } else {
            sendOtp();
        }
    };

    // 🔹 Step 1: Send OTP before actual registration
    const sendOtp = async () => {
        try {
            setLoading(true);
            if (!input.email) {
                Swal.fire({ icon: "error", text: "Please enter your email first" });
                return;
            }

            await apiInstance.post("/api/auth/send-otp", { email: input.email });
            setIsOtpStage(true);
            Swal.fire({
                icon: "info",
                text: "OTP sent to your email.",
                timer: 2000,
                showConfirmButton: false,
            });
        } catch (error) {
            const msg = error.response?.data?.message || "Failed to send OTP";
            Swal.fire({
                icon: "error",
                text: msg,
            }).then(() => {
                window.location.reload();
            });
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Step 2: Verify OTP
    const verifyOtp = async () => {
        try {
            setLoading(true);
            const otpCode = otp.join("");
            const response = await apiInstance.post("/api/auth/verify-otp", {
                email: input.email,
                otp: otpCode,
            });

            if (response.status === 200) {
                Swal.fire({
                    icon: "success",
                    text: "OTP verified successfully!",
                    timer: 1500,
                    showConfirmButton: false,
                });

                // ✅ now call register API
                await registerUser();
            } else {
                Swal.fire({ icon: "error", text: response.data.message });
            }
        } catch (error) {
            const errMsg = error.response?.data?.message || "Invalid OTP";
            Swal.fire({ icon: "error", text: errMsg }).then(() => {
                window.location.reload();
            });
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Step 3: Register after OTP success
    const registerUser = async () => {
        try {
            const formattedPhone = phone
                ? `+${phone.replace(/\D/g, "").replace(/(\d{2})(\d+)/, "$1 $2")}`
                : "";

            const response = await apiInstance.post("/api/auth/register", {
                ...input,
                mobile: formattedPhone,
            });

            if (response.status === 200) {
                Swal.fire({
                    icon: "success",
                    text: "Account created successfully!",
                    timer: 2000,
                    showConfirmButton: false,
                });

                const data = response.data;

                localStorage.setItem("token", data.token);
                localStorage.setItem("userName", data.name);
                localStorage.setItem("userId", data.id);
                localStorage.setItem("userEmail", data.email);
                localStorage.setItem("userPhone", data.mobile);

                dispatch(
                    setUserData({
                        userId: data.id,
                        userName: data.name,
                        userEmail: data.email,
                        userPhone: data.mobile,
                        token: data.token,
                    })
                );

                router.push("/");
            }
        } catch (error) {
            const msg = error.response?.data?.message || "Registration failed.";
            Swal.fire({ icon: "error", text: msg });
        } finally {
            setLoading(false);
        }
    };

    // 🔁 resend otp
    const resendOtp = async () => {
        try {
            await apiInstance.post("/api/auth/send-otp", { email: input.email });
            Swal.fire({
                icon: "info",
                text: "OTP resent successfully",
                timer: 2000,
                showConfirmButton: false,
            });
        } catch {
            Swal.fire({ icon: "error", text: "Failed to resend OTP" });
        }
    };

    // UI — Registration
    if (!isOtpStage) {
        return (
            <div className="container-fluid px-3">
                <h2 className="text-center fw-bolder display-5 mt-4 mb-4">
                    CREATE ACCOUNT
                </h2>
                <div className="d-flex flex-column align-items-center py-3 py-md-5">
                    <div className="login w-100" style={{ maxWidth: "500px" }}>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                onChange={handleInput}
                                className="form-control mt-3 py-3"
                                placeholder="ENTER YOUR NAME"
                            />
                            <input
                                type="email"
                                name="email"
                                onChange={handleInput}
                                className="form-control mt-3 py-3"
                                placeholder="ENTER YOUR EMAIL"
                            />
                            <div className="mt-3">
                                <PhoneInput
                                    international
                                    defaultCountry="US"
                                    value={phone}
                                    onChange={setPhone}
                                    className="form-control py-3"
                                    placeholder="ENTER YOUR PHONE NUMBER"
                                />
                            </div>
                            <div className="position-relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    onChange={handleInput}
                                    className="form-control mt-3 py-3 mb-2"
                                    placeholder="ENTER YOUR PASSWORD"
                                    minLength="6"
                                />
                                <button
                                    type="button"
                                    className="position-absolute end-0 top-0 bg-transparent border-0 h-100 px-3"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>

                            <button
                                className="d-block w-100 mt-3 py-3 border-0 fw-semibold text-white rounded-1"
                                type="submit"
                            >
                                {loading ? "Loading..." : "Send OTP"}
                            </button>
                            <span style={{ fontSize: "13px", opacity: "80%" }}>
                                If you have an account, please{" "}
                                <Link href="/login" className="text-decoration-none text-black">
                                    <span className="greenHover fw-bold">Login Here.</span>
                                </Link>
                            </span>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    // UI — OTP
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-sm-10 col-md-8 col-lg-6 py-3 py-md-5">
                    <div className="login px-3 px-sm-4">
                        <h4 className="fw-bold mb-2">VERIFY OTP</h4>
                        <span className="d-block" style={{ fontSize: "13px" }}>
                            Enter the 6-digit code sent to your email
                        </span>

                        {loading ? (
                            <div className="loader-container">
                                <span className="loader"></span>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="d-flex justify-content-between gap-1 gap-sm-2 mt-3 mb-3">
                                    {[0, 1, 2, 3, 4, 5].map((index) => (
                                        <input
                                            key={index}
                                            ref={(el) => (inputRefs.current[index] = el)}
                                            type="text"
                                            maxLength={1}
                                            className="form-control text-center fw-bold fs-4 p-0"
                                            value={otp[index]}
                                            onChange={(e) => handleOtpChange(index, e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(index, e)}
                                            onPaste={index === 0 ? handlePaste : null}
                                            style={{
                                                width: "100%",
                                                height: "50px",
                                                maxWidth: "60px",
                                                minWidth: "40px",
                                            }}
                                        />
                                    ))}
                                </div>

                                <button
                                    className="d-block w-100 mb-2 mt-4 py-3 border-0 fw-semibold text-white rounded-1"
                                    type="submit"
                                >
                                    Verify OTP & Register
                                </button>

                                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-2">
                                    <span style={{ fontSize: "13px", opacity: "80%" }}>
                                        Didn't receive code?{" "}
                                        <span
                                            className="greenHover fw-bold cursor-pointer"
                                            onClick={resendOtp}
                                        >
                                            Resend OTP
                                        </span>
                                    </span>
                                    <span
                                        style={{ fontSize: "13px", opacity: "80%", marginTop: "8px" }}
                                    >
                                        <Link href="/register" className="text-decoration-none text-black">
                                            <span className="greenHover fw-bold">Back</span>
                                        </Link>
                                    </span>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
