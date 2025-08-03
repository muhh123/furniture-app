"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, loading, error: authError } = useAuth();
    const router = useRouter();
    const [formError, setFormError] = useState("");
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError("");
        try {
            await login(email, password);
            router.push("/profile");
        } catch (err: any) {
            setFormError(err.message || "Login failed");
        }
    };

    // Don't render the form during SSR or before hydration is complete
    if (!isClient) {
        return (
            <main className="max-w-md mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold mb-8 text-center">Loading...</h1>
            </main>
        );
    }

    return (
        <main className="max-w-md mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8 text-center">Login</h1>
            <form 
                className="space-y-6 bg-white p-8 rounded shadow" 
                onSubmit={handleSubmit}
                suppressHydrationWarning
            >
                <div>
                    <label className="block mb-2 font-medium">Email</label>
                    <input
                        type="email"
                        className="w-full border rounded px-3 py-2"
                        placeholder="Enter your email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        disabled={loading}
                        suppressHydrationWarning
                    />
                </div>
                <div>
                    <label className="block mb-2 font-medium">Password</label>
                    <input
                        type="password"
                        className="w-full border rounded px-3 py-2"
                        placeholder="Enter your password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        disabled={loading}
                        suppressHydrationWarning
                    />
                </div>
                {formError && (
                    <div className="text-red-500 text-sm">{formError}</div>
                )}
                {authError && !formError && (
                    <div className="text-red-500 text-sm">{authError}</div>
                )}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                    suppressHydrationWarning
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link href="/register" className="text-blue-600 hover:underline">
                            Register here
                        </Link>
                    </p>
                </div>
            </form>
        </main>
    );
}