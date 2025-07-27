'use client';
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";

export default function ProductsPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError("");
            try {
                const res = await fetch("http://localhost:5000/api/products");
                const data = await res.json();
                if (!res.ok) throw new Error(data.message || "Failed to fetch products");
                setProducts(data);
            } catch (err: any) {
                setError(err.message || "Failed to fetch products");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <main className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">All Products</h1>
            {loading ? (
                <p>Loading products...</p>
            ) : error ? (
                <p className="text-red-600">{error}</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <ProductCard
                            key={product._id}
                            id={product._id}
                            name={product.name}
                            price={`$${product.price}`}
                            image={product.image}
                        />
                    ))}
                </div>
            )}
        </main>
    );
} 