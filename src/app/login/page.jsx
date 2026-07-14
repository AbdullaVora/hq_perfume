// "use client";

// import React, { useState } from 'react'
// import Link from 'next/link'
// import { useRouter } from 'next/navigation';
// import { IoIosMail } from "react-icons/io";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// // import { ToastContainer, toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// import apiInstance from '@/api/instance';
// import SideBar from '@/components/SideBar';
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';
// import Swal from 'sweetalert2';
// import { useDispatch } from 'react-redux';
// import { setUserData } from '@/redux/slice/userDataSlice';

// const Login = () => {
//     const [input, setInput] = useState({});
//     const [showPassword, setShowPassword] = useState(false);
//     const router = useRouter()
//     const dispatch = useDispatch()

//     const handleChange = (e) => {
//         const { name, value } = e.target
//         setInput({ ...input, [name]: value });
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         loginUser();
//     }

//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     }

//     const loginUser = async () => {
//         try {
//             const response = await apiInstance.post('/api/auth/login', input);
//             if (response.loading) {
//                 return (
//                     <div className='loader-container'>
//                         <span className="loader"></span>
//                     </div>
//                 )
//             }
//             if (response.status === 200) {
//                 Swal.fire({
//                     icon: 'success',
//                     text: 'Login Success',
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
//             } else {
//                 Swal.fire({
//                     icon: 'error',
//                     text: response.data.message,
//                     timer: 2000,
//                     showConfirmButton: false
//                 });
//             }
//         } catch (error) {
//             const errMsg = error.response?.data?.message || error.message;
//             Swal.fire({
//                 icon: 'error',
//                 text: errMsg,
//                 timer: 2000,
//                 showConfirmButton: false
//             });
//         }
//     }

//     return (
//         <>
//             {/* <Header /> */}
//             <div className="container-fluid px-3">
//                 <h2 className='text-center fw-bolder display-5 mt-4 mb-4'>ACCOUNT</h2>
//                 <div className="d-flex flex-column align-items-center justify-contant-center py-3 py-md-5">
//                     <div className="login w-100" style={{ maxWidth: "500px" }}>
//                         <h4 className='fw-bold mb-2'>SIGN IN</h4>
//                         <span className='d-block' style={{ fontSize: '13px' }}>Insert Your Account Information: </span>
//                         <form onSubmit={handleSubmit}>
//                             <input
//                                 type="text"
//                                 name="email"
//                                 id="email"
//                                 onChange={handleChange}
//                                 className='form-control mt-3 py-3'
//                                 placeholder='ENTER YOUR EMAIL'
//                             />
//                             <div className="position-relative">
//                                 <input
//                                     type={showPassword ? "text" : "password"}
//                                     name="password"
//                                     id="password"
//                                     onChange={handleChange}
//                                     className='form-control mt-3 py-3 mb-2'
//                                     placeholder='ENTER YOUR PASSWORD'
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
//                             <Link href="/forgot" className='text-decoration-none text-black'>
//                                 <span style={{ fontSize: '13px' }} className='d-flex mb-2 align-items-center'>
//                                     <IoIosMail color='#0a5d5d' size={20} className='me-1' />
//                                     Forgot Your <span className='fw-bold greenHover'>&nbsp;Password ?</span>
//                                 </span>
//                             </Link>
//                             <button className='d-block w-100 mt-3 py-3 mb-2 border-0 fw-semibold text-white rounded-1' type='submit'>Login</button>
//                             <span style={{ fontSize: '14px', opacity: '80%' }}>
//                                 If you don't have an account, please <Link href="/register" className='text-decoration-none text-black'><span className='greenHover fw-bold'>Register Here.</span></Link>
//                             </span>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//             {/* <ToastContainer /> */}
//         </>
//     )
// }

// export default Login


"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IoIosMail } from "react-icons/io";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from 'sweetalert2';
import apiInstance from '@/api/instance';
import { useDispatch } from 'react-redux';
import { setUserData } from '@/redux/slice/userDataSlice';

const Login = () => {
  const [input, setInput] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isOtpStage, setIsOtpStage] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  // Handle login form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  // OTP input change
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isOtpStage) {
      verifyOtp();
    } else {
      loginUser();
    }
  };

  // 🔹 Step 1: Login API
  const loginUser = async () => {
    try {
      setLoading(true);
      const response = await apiInstance.post('/api/auth/login', input);

      if (response.status === 200) {
        // Send OTP to user email
        await apiInstance.post('/api/auth/send-otp', { email: input.email });
        setIsOtpStage(true);
        Swal.fire({
          icon: 'info',
          text: 'OTP sent to your email.',
          timer: 2000,
          showConfirmButton: false
        });
      } else {
        Swal.fire({ icon: 'error', text: response.data.message });
      }
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      Swal.fire({ icon: 'error', text: errMsg });
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Step 2: Verify OTP API
  const verifyOtp = async () => {
    try {
      setLoading(true);
      const otpCode = otp.join('');
      const response = await apiInstance.post('/api/auth/verify-otp', { email: input.email, otp: otpCode });

      if (response.status === 200) {
        // ✅ Login success after OTP
        const loginData = await apiInstance.post('/api/auth/login', input);

        Swal.fire({
          icon: 'success',
          text: 'Login Success',
          timer: 2000,
          showConfirmButton: false
        });

        localStorage.setItem('token', loginData.data.token);
        localStorage.setItem('userName', loginData.data.name);
        localStorage.setItem('userId', loginData.data.id);
        localStorage.setItem('userEmail', loginData.data.email);
        localStorage.setItem('userPhone', loginData.data.mobile);

        dispatch(setUserData({
          userId: loginData.data.id,
          userName: loginData.data.name,
          userEmail: loginData.data.email,
          userPhone: loginData.data.mobile,
          token: loginData.data.token
        }));

        router.push('/');
      } else {
        Swal.fire({ icon: 'error', text: response.data.message });
      }
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      Swal.fire({ icon: 'error', text: errMsg });
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    try {
      await apiInstance.post('/api/auth/send-otp', { email: input.email });
      Swal.fire({ icon: 'info', text: 'OTP resent successfully', timer: 2000, showConfirmButton: false });
    } catch {
      Swal.fire({ icon: 'error', text: 'Failed to resend OTP' });
    }
  };

  // 🔹 Stage 1: Login Form
  if (!isOtpStage) {
    return (
      <div className="container-fluid px-3">
        <h2 className='text-center fw-bolder display-5 mt-4 mb-4'>ACCOUNT</h2>
        <div className="d-flex flex-column align-items-center justify-contant-center py-3 py-md-5">
          <div className="login w-100" style={{ maxWidth: "500px" }}>
            <h4 className='fw-bold mb-2'>SIGN IN</h4>
            <span className='d-block' style={{ fontSize: '13px' }}>Insert Your Account Information:</span>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="email"
                onChange={handleChange}
                className='form-control mt-3 py-3'
                placeholder='ENTER YOUR EMAIL'
              />
              <div className="position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  className='form-control mt-3 py-3 mb-2'
                  placeholder='ENTER YOUR PASSWORD'
                />
                <button
                  type="button"
                  className="position-absolute end-0 top-0 bg-transparent border-0 h-100 px-3"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <Link href="/forgot" className='text-decoration-none text-black'>
                <span style={{ fontSize: '13px' }} className='d-flex mb-2 align-items-center'>
                  <IoIosMail color='#0a5d5d' size={20} className='me-1' />
                  Forgot Your <span className='fw-bold greenHover'>&nbsp;Password ?</span>
                </span>
              </Link>
              <button className='d-block w-100 mt-3 py-3 mb-2 border-0 fw-semibold text-white rounded-1' type='submit'>
                {loading ? "Loading..." : "Login"}
              </button>
              <span style={{ fontSize: '14px', opacity: '80%' }}>
                If you don't have an account, please <Link href="/register" className='text-decoration-none text-black'><span className='greenHover fw-bold'>Register Here.</span></Link>
              </span>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // 🔹 Stage 2: OTP Verification UI
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 py-3 py-md-5">
          <div className="login px-3 px-sm-4">
            <h4 className='fw-bold mb-2'>VERIFY OTP</h4>
            <span className='d-block' style={{ fontSize: '13px' }}>Enter the 6-digit code sent to your email</span>

            {loading ? (
              <div className='loader-container'>
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
                        width: '100%',
                        height: '50px',
                        maxWidth: '60px',
                        minWidth: '40px'
                      }}
                    />
                  ))}
                </div>

                <button className='d-block w-100 mb-2 mt-4 py-3 border-0 fw-semibold text-white rounded-1' type='submit'>
                  Verify OTP
                </button>

                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-2">
                  <span style={{ fontSize: '13px', opacity: '80%' }}>
                    Didn't receive code? <span className='greenHover fw-bold cursor-pointer' onClick={resendOtp}>Resend OTP</span>
                  </span>
                  <span style={{ fontSize: '13px', opacity: '80%', marginTop: '8px' }}>
                    <Link href="/login" className='text-decoration-none text-black'>
                      <span className='greenHover fw-bold'>Back</span>
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

export default Login;
