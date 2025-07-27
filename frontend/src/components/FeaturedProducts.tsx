const products = [
    {
        id: 1,
        name: "Modern Sofa",
        price: "$499",
        image: "/sofa.png",
    },
    {
        id: 2,
        name: "Office Chair",
        price: "$199",
        image: "/office-chair.jpg",
    },
    {
        id: 3,
        name: "Dining Table",
        price: "$399",
        image: "/dining-table.jpg",
    },
];

export default function FeaturedProducts() {
    return (
        <section className="my-8 sm:my-12">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Featured Products</h2>
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-8">
                {products.map((product) => (
                    <div key={product.id} className="border rounded-lg p-3 sm:p-4 shadow hover:shadow-lg transition">
                        <img src={product.image} alt={product.name} className="w-full h-32 sm:h-40 object-cover rounded mb-3 sm:mb-4" />
                        <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">{product.name}</h3>
                        <p className="text-primary font-bold">{product.price}</p>
                    </div>
                ))}
            </div>
        </section>
    );
} 