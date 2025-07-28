"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function CartPage() {
    const { user } = useAuth();
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCart = async () => {
            if (!user) return;
            setLoading(true);
            setError("");
            try {
                const res = await fetch(`http://localhost:5000/api/cart?userId=${user._id}`);
                const data = await res.json();
                setCartItems(data.cartItems || []);
            } catch {
                setError("Failed to fetch cart.");
            } finally {
                setLoading(false);
            }
        };
        fetchCart();
    }, [user]);

    const handleRemove = async (productId: string | number) => {
        if (!user) return;
        try {
            await fetch("http://localhost:5000/api/cart/remove", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({ userId: user._id, productId }),
            });
            setCartItems((items) => items.filter((item) => {
                // Handle ObjectId type
                if (typeof item.product === 'object' && item.product !== null && 'toString' in item.product) {
                    return item.product.toString() !== productId.toString();
                }
                return item.product !== productId;
            }));
        } catch {
            alert("Failed to remove item.");
        }
    };

    const total = cartItems.reduce((sum, item) => sum + Number(item.price) * (item.qty || 1), 0);

    return (
        <main className="max-w-3xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
            {loading ? (
                <p>Loading...</p>
            ) : cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="space-y-6">
                    {cartItems.map((item) => (
                        <div key={typeof item.product === 'object' && item.product !== null && 'toString' in item.product ? item.product.toString() : item.product} className="flex items-center border rounded-lg p-4 shadow bg-white">
                            <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded mr-6" />
                            <div className="flex-1">
                                <h2 className="text-lg font-semibold">{item.name}</h2>
                                <p className="text-gray-600">Price: ${item.price}</p>
                                <p className="text-gray-600">Quantity: {item.qty || 1}</p>
                                <p className="text-gray-800 font-bold mt-2">Subtotal: ${Number(item.price) * (item.qty || 1)}</p>
                            </div>
                            <button
                                className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                onClick={() => handleRemove(typeof item.product === 'object' && item.product !== null && 'toString' in item.product ? item.product.toString() : item.product)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <div className="text-right mt-8">
                        <span className="text-xl font-bold">Total: ${total}</span>
                    </div>
                </div>
            )}
            {error && <p className="text-red-500 mt-4">{error}</p>}
        </main>
    );
}