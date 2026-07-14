"use client"
import Link from 'next/link'
import React from 'react'

const Header2 = () => {
    return (
        <div className="shadow-sm d-block d-md-none">
            <div className="container-lg">
                <header className="px-3 d-flex align-items-center justify-content-center">
                    <nav className="d-flex d-md-none align-items-center gap-4">
                        <Link
                            href="/Mens"
                            className="px-2 py-2 px-lg-4 text-decoration-none"
                        >
                            Mens
                        </Link>
                        <Link
                            href="/Womens"
                            className="px-2 py-2 px-lg-4 text-decoration-none"
                        >
                            Womens
                        </Link>
                        <Link
                            href="/Unisex"
                            className="px-2 py-2 px-lg-4 text-decoration-none"
                        >
                            Unisex
                        </Link>
                    </nav>
                </header>

            </div>
        </div >

    )
}

export default Header2

