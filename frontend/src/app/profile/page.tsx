"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const { user } = useAuth();
    const router = useRouter();
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!user) {
            router.replace("/login");
        } else {
            const fetchOrders = async () => {
                setLoading(true);
                setError("");
                try {
                    const res = await fetch("http://localhost:5000/api/orders", {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    });
                    const data = await res.json();
                    if (!res.ok) throw new Error(data.message || "Failed to fetch orders");
                    setOrders(data);
                } catch (err: any) {
                    setError(err.message || "Failed to fetch orders");
                } finally {
                    setLoading(false);
                }
            };
            fetchOrders();
        }
    }, [user, router]);

    if (!user) return null;

    return (
        <main className="max-w-3xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
            <section className="mb-10 bg-white p-6 rounded shadow">
                <h2 className="text-xl font-semibold mb-2">User Info</h2>
                <p className="mb-1"><span className="font-medium">Name:</span> {user.name}</p>
                <p><span className="font-medium">Email:</span> {user.email}</p>
            </section>
            <section className="bg-white p-6 rounded shadow">
                <h2 className="text-xl font-semibold mb-4">Your Orders</h2>
                {loading ? (
                    <p>Loading orders...</p>
                ) : error ? (
                    <p className="text-red-600">{error}</p>
                ) : orders.length === 0 ? (
                    <p>You have no orders yet.</p>
                ) : (
                    <table className="w-full text-left border-t">
                        <thead>
                            <tr>
                                <th className="py-2">Order ID</th>
                                <th className="py-2">Date</th>
                                <th className="py-2">Total</th>
                                <th className="py-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id} className="border-t">
                                    <td className="py-2">{order._id}</td>
                                    <td className="py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td className="py-2">${order.totalPrice}</td>
                                    <td className="py-2">{order.isDelivered ? "Delivered" : "Processing"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </section>
        </main>
    );
} 