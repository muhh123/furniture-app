'use client';
import { notFound } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
    const { user } = useAuth();
    const router = useRouter();
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [adding, setAdding] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setError("");
            try {
                const res = await fetch(`http://localhost:5000/api/products/${params.id}`);
                const data = await res.json();
                if (!res.ok) throw new Error(data.message || "Product not found");
                setProduct(data);
            } catch (err: any) {
                setError(err.message || "Product not found");
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [params.id]);

    if (loading) return <main className="max-w-2xl mx-auto px-4 py-12"><p>Loading product...</p></main>;
    if (error || !product) return notFound();

    const handleAddToCart = async () => {
        if (!user) {
            router.push("/login");
            return;
        }
        setAdding(true);
        try {
            const productId = (product._id || params.id).toString();
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
        <main className="max-w-2xl mx-auto px-4 py-12">
            <Link href="/products" className="text-blue-600 hover:underline mb-6 inline-block">&larr; Back to Products</Link>
            <div className="border rounded-lg p-6 shadow bg-white">
                <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded mb-6" />
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                <p className="text-xl text-primary font-semibold mb-4">${product.price}</p>
                <p className="text-gray-700 mb-4">{product.description}</p>
                <button
                    className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                    onClick={handleAddToCart}
                    disabled={adding}
                >
                    {adding ? "Adding..." : "Add to Cart"}
                </button>
            </div>
        </main>
    );
} 