'use client';
import { notFound } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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

    return (
        <main className="max-w-2xl mx-auto px-4 py-12">
            <Link href="/products" className="text-blue-600 hover:underline mb-6 inline-block">&larr; Back to Products</Link>
            <div className="border rounded-lg p-6 shadow bg-white">
                <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded mb-6" />
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                <p className="text-xl text-primary font-semibold mb-4">${product.price}</p>
                <p className="text-gray-700 mb-4">{product.description}</p>
            </div>
        </main>
    );
} 