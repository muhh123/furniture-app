import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";

export default function HomePage() {
  return (
    <main className="max-w-6xl mx-auto px-2 sm:px-4 py-6 sm:py-8">
      <section className="text-center py-8 sm:py-12 mb-8 sm:mb-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">Welcome to RRR Furniture</h1>
        <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6">Discover quality furniture for every room. Shop our featured products and browse by category!</p>
      </section>
      <Categories />
      <FeaturedProducts />
    </main>
  );
}
