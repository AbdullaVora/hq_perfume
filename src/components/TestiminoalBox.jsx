import React from 'react'
import { FaComments } from "react-icons/fa6";


const TestiminoalBox = ({ title, author, img, description }) => {
    return (
        <>
            <div className="testimonialBox w-100 d-flex px-4 py-5 shadow justify-content-between align-items-center rounded-3 bg-white">
                <div className="left col-5 d-flex flex-column align-items-center text-center">
                    <div className="img mb-2">
                        <img 
                            src={img} 
                            alt={author || "Customer"} 
                            className='img-fluid shadow-sm' 
                            style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                    </div>
                    <h6 className='fw-bold mt-2 mb-1 text-center' style={{ fontSize: '15px' }}>{title}</h6>
                    <span className='text-center d-block opacity-75 small fw-semibold'>{author}</span>
                </div>
                <div className="right col-6">
                    <div className="icon text-center mb-2">
                        <FaComments size={36} color='#0A5D5D' />
                    </div>
                    <p className='text-center opacity-75 small mb-0' style={{ lineHeight: '1.5' }}>{description}</p>
                </div>
            </div>
        </>
    )
}

export default TestiminoalBox
