"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const emptyProduct = { name: "", price: "", category: "", image: "" };

export default function AdminPage() {
    const { user } = useAuth();
    const router = useRouter();
    if (!user || !user.isAdmin) return null;
    const [products, setProducts] = useState<any[]>([]);
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    // Product modal state
    const [showProductModal, setShowProductModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any | null>(null);
    const [productForm, setProductForm] = useState<any>(emptyProduct);
    // Order modal state
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [editingOrder, setEditingOrder] = useState<any | null>(null);
    const [orderStatus, setOrderStatus] = useState("");

    useEffect(() => {
        if (!user || !user.isAdmin) {
            router.replace("/login");
        } else {
            fetchData();
        }
        // eslint-disable-next-line
    }, [user, router]);

    const fetchData = async () => {
        setLoading(true);
        setError("");
        try {
            const [productsRes, ordersRes] = await Promise.all([
                fetch("http://localhost:5000/api/products", {
                    headers: { Authorization: `Bearer ${user.token}` },
                }),
                fetch("http://localhost:5000/api/orders/all", {
                    headers: { Authorization: `Bearer ${user.token}` },
                }),
            ]);
            const productsData = await productsRes.json();
            const ordersData = await ordersRes.json();
            if (!productsRes.ok) throw new Error(productsData.message || "Failed to fetch products");
            if (!ordersRes.ok) throw new Error(ordersData.message || "Failed to fetch orders");
            setProducts(productsData);
            setOrders(ordersData);
        } catch (err: any) {
            setError(err.message || "Failed to fetch admin data");
        } finally {
            setLoading(false);
        }
    };

    // Product handlers
    const openAddProduct = () => {
        setEditingProduct(null);
        setProductForm(emptyProduct);
        setShowProductModal(true);
    };
    const openEditProduct = (product: any) => {
        setEditingProduct(product);
        setProductForm({ ...product });
        setShowProductModal(true);
    };
    const closeProductModal = () => {
        setShowProductModal(false);
        setEditingProduct(null);
        setProductForm(emptyProduct);
    };
    const handleProductFormChange = (e: any) => {
        setProductForm({ ...productForm, [e.target.name]: e.target.value });
    };
    const saveProduct = async (e: any) => {
        e.preventDefault();
        try {
            const method = editingProduct ? "PUT" : "POST";
            const url = editingProduct
                ? `http://localhost:5000/api/products/${editingProduct._id}`
                : "http://localhost:5000/api/products";
            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify(productForm),
            });
            if (!res.ok) throw new Error("Failed to save product");
            closeProductModal();
            fetchData();
        } catch (err: any) {
            alert(err.message || "Failed to save product");
        }
    };
    const deleteProduct = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        try {
            const res = await fetch(`http://localhost:5000/api/products/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${user.token}` },
            });
            if (!res.ok) throw new Error("Failed to delete product");
            fetchData();
        } catch (err: any) {
            alert(err.message || "Failed to delete product");
        }
    };

    // Order handlers
    const openEditOrder = (order: any) => {
        setEditingOrder(order);
        setOrderStatus(order.isDelivered ? "Delivered" : "Processing");
        setShowOrderModal(true);
    };
    const closeOrderModal = () => {
        setShowOrderModal(false);
        setEditingOrder(null);
        setOrderStatus("");
    };
    const saveOrder = async (e: any) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:5000/api/orders/${editingOrder._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({ isDelivered: orderStatus === "Delivered" }),
            });
            if (!res.ok) throw new Error("Failed to update order");
            closeOrderModal();
            fetchData();
        } catch (err: any) {
            alert(err.message || "Failed to update order");
        }
    };
    const deleteOrder = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this order?")) return;
        try {
            const res = await fetch(`http://localhost:5000/api/orders/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${user.token}` },
            });
            if (!res.ok) throw new Error("Failed to delete order");
            fetchData();
        } catch (err: any) {
            alert(err.message || "Failed to delete order");
        }
    };

    return (
        <main className="max-w-5xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-red-600">{error}</p>
            ) : (
                <>
                    {/* Product Management */}
                    <section className="mb-12 bg-white p-6 rounded shadow">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Products</h2>
                            <button
                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                onClick={openAddProduct}
                            >
                                Add Product
                            </button>
                        </div>
                        <table className="w-full text-left border-t">
                            <thead>
                                <tr>
                                    <th className="py-2">ID</th>
                                    <th className="py-2">Name</th>
                                    <th className="py-2">Price</th>
                                    <th className="py-2">Category</th>
                                    <th className="py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product._id} className="border-t">
                                        <td className="py-2">{product._id}</td>
                                        <td className="py-2">{product.name}</td>
                                        <td className="py-2">${product.price}</td>
                                        <td className="py-2">{product.category}</td>
                                        <td className="py-2 space-x-2">
                                            <button
                                                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                                onClick={() => openEditProduct(product)}
                                            >Edit</button>
                                            <button
                                                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                                onClick={() => deleteProduct(product._id)}
                                            >Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                    {/* Product Modal */}
                    {showProductModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                            <form
                                className="bg-white p-6 rounded shadow max-w-md w-full"
                                onSubmit={saveProduct}
                            >
                                <h3 className="text-lg font-bold mb-4">
                                    {editingProduct ? "Edit Product" : "Add Product"}
                                </h3>
                                <div className="mb-3">
                                    <label className="block mb-1 font-medium">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="w-full border rounded px-3 py-2"
                                        value={productForm.name}
                                        onChange={handleProductFormChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="block mb-1 font-medium">Price</label>
                                    <input
                                        type="number"
                                        name="price"
                                        className="w-full border rounded px-3 py-2"
                                        value={productForm.price}
                                        onChange={handleProductFormChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="block mb-1 font-medium">Category</label>
                                    <input
                                        type="text"
                                        name="category"
                                        className="w-full border rounded px-3 py-2"
                                        value={productForm.category}
                                        onChange={handleProductFormChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="block mb-1 font-medium">Image URL</label>
                                    <input
                                        type="text"
                                        name="image"
                                        className="w-full border rounded px-3 py-2"
                                        value={productForm.image}
                                        onChange={handleProductFormChange}
                                    />
                                </div>
                                <div className="flex justify-end gap-2 mt-4">
                                    <button
                                        type="button"
                                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                        onClick={closeProductModal}
                                    >Cancel</button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    >Save</button>
                                </div>
                            </form>
                        </div>
                    )}
                    {/* Order Management */}
                    <section className="bg-white p-6 rounded shadow">
                        <h2 className="text-xl font-semibold mb-4">Orders</h2>
                        <table className="w-full text-left border-t">
                            <thead>
                                <tr>
                                    <th className="py-2">Order ID</th>
                                    <th className="py-2">Customer</th>
                                    <th className="py-2">Total</th>
                                    <th className="py-2">Status</th>
                                    <th className="py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id} className="border-t">
                                        <td className="py-2">{order._id}</td>
                                        <td className="py-2">{order.user?.name || order.user?.email || "-"}</td>
                                        <td className="py-2">${order.totalPrice}</td>
                                        <td className="py-2">{order.isDelivered ? "Delivered" : "Processing"}</td>
                                        <td className="py-2 space-x-2">
                                            <button
                                                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                                onClick={() => openEditOrder(order)}
                                            >Update</button>
                                            <button
                                                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                                onClick={() => deleteOrder(order._id)}
                                            >Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                    {/* Order Modal */}
                    {showOrderModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                            <form
                                className="bg-white p-6 rounded shadow max-w-md w-full"
                                onSubmit={saveOrder}
                            >
                                <h3 className="text-lg font-bold mb-4">Update Order Status</h3>
                                <div className="mb-3">
                                    <label className="block mb-1 font-medium">Status</label>
                                    <select
                                        className="w-full border rounded px-3 py-2"
                                        value={orderStatus}
                                        onChange={e => setOrderStatus(e.target.value)}
                                    >
                                        <option value="Processing">Processing</option>
                                        <option value="Delivered">Delivered</option>
                                    </select>
                                </div>
                                <div className="flex justify-end gap-2 mt-4">
                                    <button
                                        type="button"
                                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                        onClick={closeOrderModal}
                                    >Cancel</button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    >Save</button>
                                </div>
                            </form>
                        </div>
                    )}
                </>
            )}
        </main>
    );
} 