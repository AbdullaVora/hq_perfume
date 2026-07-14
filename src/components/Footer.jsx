import React from 'react'
import { IoLocationOutline } from "react-icons/io5";
import { CiPhone } from "react-icons/ci";
import { MdOutlineAttachEmail } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaPinterestP } from "react-icons/fa";
import Link from 'next/link';

const Footer = () => {
    const footer = [{ logo: <IoLocationOutline />, title: 'River Point, New Rander Road, Surat, Gujarat, India - 395009' }, { logo: <CiPhone />, title: '+91 63557 72763' }, { logo: <MdOutlineAttachEmail />, title: 'hqtrading63@gmail.com' }]
    return (
        <>
            <footer className='py-5 mt-5'>
                <div className="container">
                    <div className="row">
                        {/* First Column - Logo and Contact Info */}
                        <div className="col-12 col-md-6 col-lg-2 mb-4 mb-lg-0">
                            <div className="logo-2 ">
                                <img src="/images/logo.png" alt="Logo" className='img-fluid my-auto mx-auto' width={200} />
                            </div>
                        </div>



                        {/* Second Column - About Us */}
                        <div className="col-6 col-md-3 col-lg-2 mb-4 mb-lg-0">
                            <h4 className='pb-2 mt-3'>Contact Us</h4>
                            {footer.map((foot, index) => (
                                <div key={index} className="location mt-3 d-flex align-items-center">
                                    <span className='icon'>{foot.logo}</span>
                                    <span className='opacity-75 ps-3'>{foot.title}</span>
                                </div>
                            ))}
                        </div>

                        {/* Third Column - Customer Service */}
                        <div className="col-6 col-md-3 col-lg-2 mb-4 mb-lg-0">
                            <h4 className='pb-2 mt-3'>Customer Service</h4>
                            <Link href="/" className='text-decoration-none text-black'>
                                <h5 className='mt-3 fw-normal fs-6 opacity-75'>Home</h5>
                            </Link>
                            <Link href="/Mens" className='text-decoration-none text-black'>
                                <h5 className='mt-1 fw-normal fs-6 opacity-75'>Mens</h5>
                            </Link>
                            <Link href="/Womens" className='text-decoration-none text-black'>
                                <h5 className='mt-1 fw-normal fs-6 opacity-75'>Womens</h5>
                            </Link>
                            <Link href="/Unisex" className='text-decoration-none text-black'>
                                <h5 className='mt-1 fw-normal fs-6 opacity-75'>Unisex</h5>
                            </Link>
                            <Link href="/Fragnance" className='text-decoration-none text-black'>
                                <h5 className='mt-1 fw-normal fs-6 opacity-75'>Fragnance</h5>
                            </Link>
                        </div>

                        {/* Fourth Column - Support */}
                        <div className="col-6 col-md-3 col-lg-2 mb-4 mb-md-0">
                            <h4 className='pb-2 mt-3'>Support</h4>
                            <Link href="/about" className='text-decoration-none text-black'>
                                <h5 className='mt-1 fw-normal fs-6 opacity-75'>About Us</h5>
                            </Link>
                            <Link href="/contact" className='text-decoration-none text-black'>
                                <h5 className='mt-1 fw-normal fs-6 opacity-75'>Contact Us</h5>
                            </Link>
                            <Link href="/privacy-policy" className='text-decoration-none text-black'>
                                <h5 className='mt-1 fw-normal fs-6 opacity-75'>Privacy Policy</h5>
                            </Link>
                            <Link href="/shipping-policy" className='text-decoration-none text-black'>
                                <h5 className='mt-1 fw-normal fs-6 opacity-75'>Shipping Policy</h5>
                            </Link>
                            <Link href="/terms-and-conditions" className='text-decoration-none text-black'>
                                <h5 className='mt-1 fw-normal fs-6 opacity-75'>Terms and Conditions</h5>
                            </Link>
                            <Link href="/cancellation-policy" className='text-decoration-none text-black'>
                                <h5 className='mt-1 fw-normal fs-6 opacity-75'>Return and Cancellation Policy</h5>
                            </Link>
                        </div>

                        {/* Fifth Column - Newsletter and Social */}
                        <div className="col-12 col-md-6 col-lg-3">
                            <h4 className='pb-2 mt-3'>News Letter</h4>
                            <form className='relative'>
                                <input type="text" name="newsLetter" placeholder='Enter Your Email' className='p-2 border-2 rounded-2' style={{ width: '250px' }} />
                                <button type='submit' className='absolute right-0 translate-middle-x py-2 px-3 rounded-2'>Submit</button>
                            </form>
                            <div className="d-flex mt-3">
                                <div className="facebook me-2">
                                    <FaFacebookF className='icon' size={20} />
                                </div>
                                <div className="imstagram mx-2">
                                    <Link target='_blank' className='text-decoration-none text-black' href="https://www.instagram.com/hq_perfume_2025">
                                        <FaInstagram className='icon' size={20} />
                                    </Link>
                                </div>
                                {/* <div className="pinterset mx-2">
                                    <FaPinterestP className='icon' size={20} />
                                </div>
                                <div className="twiter mx-2">
                                    <FaTwitter className='icon' size={20} />
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
                    <div className="text-center mt-4 pt-3 border-top">
                        <p className='mb-0 opacity-75'>&copy; {new Date().getFullYear()} HQ Perfume. All rights reserved.</p>
                    </div>
            </footer >
        </>
    )
}

export default Footer