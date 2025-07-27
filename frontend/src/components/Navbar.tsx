"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const { user, logout } = useAuth();

    return (
        <nav className="w-full bg-white border-b shadow-sm">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                <div className="text-xl font-bold">
                    <Link href="/">RRR Furniture</Link>
                </div>
                <button
                    className="sm:hidden p-2 rounded focus:outline-none"
                    onClick={() => setOpen((v) => !v)}
                    aria-label="Toggle menu"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <div className="hidden sm:flex space-x-6 text-base font-medium items-center">
                    <Link href="/">Home</Link>
                    <Link href="/products">Products</Link>
                    <Link href="/cart">Cart</Link>
                    {user ? (
                        <>
                            <Link href="/profile">Profile</Link>
                            {user.isAdmin && <Link href="/admin">Admin</Link>}
                            <span className="text-gray-700">{user.name}</span>
                            <button
                                onClick={logout}
                                className="ml-2 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link href="/login">Login/Register</Link>
                    )}
                </div>
            </div>
            {/* Mobile menu */}
            {open && (
                <div className="sm:hidden px-4 pb-4">
                    <div className="flex flex-col space-y-2 text-base font-medium">
                        <Link href="/" onClick={() => setOpen(false)}>Home</Link>
                        <Link href="/products" onClick={() => setOpen(false)}>Products</Link>
                        <Link href="/cart" onClick={() => setOpen(false)}>Cart</Link>
                        {user ? (
                            <>
                                <Link href="/profile" onClick={() => setOpen(false)}>Profile</Link>
                                {user.isAdmin && <Link href="/admin" onClick={() => setOpen(false)}>Admin</Link>}
                                <span className="text-gray-700">{user.name}</span>
                                <button
                                    onClick={() => { logout(); setOpen(false); }}
                                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm text-left mt-1"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link href="/login" onClick={() => setOpen(false)}>Login/Register</Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
} 