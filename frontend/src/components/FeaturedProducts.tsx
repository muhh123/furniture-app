'use client';
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";

export default function FeaturedProducts() {
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
                setProducts(data.slice(0, 3)); // Take first 3 as featured
            } catch (err: any) {
                setError(err.message || "Failed to fetch products");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <section className="my-8 sm:my-12">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Featured Products</h2>
            {loading ? (
                <p>Loading featured products...</p>
            ) : error ? (
                <p className="text-red-600">{error}</p>
            ) : (
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-8">
                    {products.map((product) => (
                        <ProductCard
                            key={product._id}
                            id={product._id}
                            name={product.name}
                            price={`$${product.price}`}
                            image={product.image}
                            showAddToCart={false}
                        />
                    ))}
                </div>
            )}
        </section>
    );
} 