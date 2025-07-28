import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

type ProductCardProps = {
    id: string | number;
    name: string;
    price: string;
    image: string;
};

export default function ProductCard({ id, name, price, image }: ProductCardProps) {
    const { user } = useAuth();
    const [adding, setAdding] = useState(false);
    const handleAddToCart = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (!user) {
            alert("Please log in to add items to your cart.");
            return;
        }
        setAdding(true);
        try {
            // Ensure product id is a string (MongoDB ObjectId)
            const productId = (id as any).toString();
            await fetch("http://localhost:5000/api/cart/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    userId: user._id,
                    productId,
                    qty: 1
                }),
            });
            alert("Added to cart!");
        } catch {
            alert("Failed to add to cart.");
        } finally {
            setAdding(false);
        }
    };
    return (
        <div className="block">
            <Link href={`/products/${id}`}>
                <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
                    <img src={image} alt={name} className="w-full h-40 object-cover rounded mb-4" />
                    <h3 className="text-lg font-semibold mb-2">{name}</h3>
                    <p className="text-primary font-bold">{price}</p>
                </div>
            </Link>
            <button
                className="mt-2 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                onClick={handleAddToCart}
                disabled={adding}
            >
                {adding ? "Adding..." : "Add to Cart"}
            </button>
        </div>
    );
}