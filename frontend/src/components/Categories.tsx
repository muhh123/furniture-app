import Link from "next/link";

const categories = [
    { name: "Beds", image: "/bed.png" },
    { name: "Sofas", image: "/sofa.png" },
    { name: "Tables", image: "/dining-table.jpg" },
    { name: "Chairs", image: "/office-chair.jpg" },
];

export default function Categories() {
    return (
        <section className="my-8 sm:my-12">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Categories</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                {categories.map((cat) => (
                    <Link
                        key={cat.name}
                        href={`/products?category=${encodeURIComponent(cat.name)}`}
                        className="flex flex-col items-center p-2 sm:p-4 border rounded-lg shadow hover:shadow-lg transition bg-white"
                    >
                        <img src={cat.image} alt={cat.name} className="w-14 h-14 sm:w-20 sm:h-20 object-contain mb-1 sm:mb-2" />
                        <span className="font-medium text-sm sm:text-base">{cat.name}</span>
                    </Link>
                ))}
            </div>
        </section>
    );
} 