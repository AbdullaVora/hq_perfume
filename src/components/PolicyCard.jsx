import React from 'react'

const policyDescriptions = {
    "Extra Shipping": "Express delivery across India on all luxury perfume orders.",
    "Return Policy": "Easy 7-day hassle-free return and replacement policy.",
    "Payment Secured": "100% encrypted & secure payment gateways via Razorpay.",
    "Money Back Guarantee": "Guaranteed authentic fragrances or 100% money back."
};

const PolicyCard = ({ img, title, description }) => {
    const text = description || policyDescriptions[title] || "Premium customer service and guaranteed satisfaction.";
    return (
        <>
            <div className="policyCard shadow-lg py-4 rounded-3 border-dark-subtle mx-2 mb-3">
                <div className="policy-head d-flex align-items-center justify-content-center">
                    <img src={img} alt="image" className='img-fluid' width={30} />
                    <span className='fs-6 ms-2 fw-semibold'>{title}</span>
                </div>
                <p className='text-center mt-3 px-3 small opacity-75'>{text}</p>
            </div>
        </>
    )
}

export default PolicyCard
