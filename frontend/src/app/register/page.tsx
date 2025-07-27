"use client";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { register, loading, error, user } = useAuth();
    const router = useRouter();
    const [formError, setFormError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError("");
        try {
            await register(name, email, password);
            router.push("/profile");
        } catch (err: any) {
            setFormError(err.message || "Registration failed");
        }
    };

    return (
        <main className="max-w-md mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8 text-center">Register</h1>
            <form className="space-y-6 bg-white p-8 rounded shadow" onSubmit={handleSubmit}>
                <div>
                    <label className="block mb-2 font-medium">Name</label>
                    <input
                        type="text"
                        className="w-full border rounded px-3 py-2"
                        placeholder="Enter your name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>
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
                    />
                </div>
                {(formError || error) && <div className="text-red-600 text-sm">{formError || error}</div>}
                <button
                    className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 disabled:opacity-60"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>
            <p className="mt-6 text-center text-gray-700">
                Already have an account?{' '}
                <Link href="/login" className="text-blue-600 hover:underline">Login</Link>
            </p>
        </main>
    );
} 