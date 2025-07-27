const cartItems = [
    {
        id: 1,
        name: "Modern Sofa",
        price: 499,
        image: "/sofa.png",
        quantity: 1,
    },
    {
        id: 2,
        name: "Office Chair",
        price: 199,
        image: "/office-chair.jpg",
        quantity: 2,
    },
];

const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

export default function CheckoutPage() {
    return (
        <main className="max-w-3xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>
            <div className="grid md:grid-cols-2 gap-8">
                {/* Shipping Address */}
                <section>
                    <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                    <form className="space-y-4">
                        <input className="w-full border rounded px-3 py-2" placeholder="Full Name" disabled />
                        <input className="w-full border rounded px-3 py-2" placeholder="Address" disabled />
                        <input className="w-full border rounded px-3 py-2" placeholder="City" disabled />
                        <input className="w-full border rounded px-3 py-2" placeholder="Postal Code" disabled />
                        <input className="w-full border rounded px-3 py-2" placeholder="Country" disabled />
                    </form>
                </section>
                {/* Order Summary & Payment */}
                <section>
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                    <div className="space-y-4 mb-6">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex items-center">
                                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
                                <div className="flex-1">
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                                </div>
                                <p className="font-semibold">${item.price * item.quantity}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mb-6">
                        <h3 className="font-semibold mb-2">Payment Info</h3>
                        <input className="w-full border rounded px-3 py-2 mb-2" placeholder="Card Number" disabled />
                        <input className="w-full border rounded px-3 py-2 mb-2" placeholder="Expiry Date" disabled />
                        <input className="w-full border rounded px-3 py-2 mb-2" placeholder="CVC" disabled />
                    </div>
                    <div className="text-right">
                        <span className="text-lg font-bold mr-4">Total: ${total}</span>
                        <button className="px-6 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700" disabled>
                            Place Order
                        </button>
                    </div>
                </section>
            </div>
        </main>
    );
} 