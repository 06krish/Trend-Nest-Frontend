
import { useEffect, useMemo, useState } from "react";
import {useNavigate} from "react-router-dom";
import Navbar from "../component/Navbar.jsx";
import ProductCard from "../component/ProductCard.jsx";
import { getAllProducts } from "../api/productApi";

export default function Products() {
    const navigate = useNavigate()
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;
        async function loadProducts() {
            try {
                setLoading(true);
                setError("");
                const data = await getAllProducts();
                // Support both a plain array and a paginated response.
                const list = Array.isArray(data)
                    ? data
                    : Array.isArray(data?.content)
                        ? data.content
                        : Array.isArray(data?.products)
                            ? data.products
                            : null;
                if (!list) {
                    throw new Error("Unexpected product response format.");
                }
                if (!cancelled) setProducts(list);
            } catch (err) {
                console.error("Failed to fetch products:", err);
                if (!cancelled) {
                    setError(
                        "We couldn't load products. Please check your connection and try again."
                    );
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        loadProducts();
        return () => {
            cancelled = true;
        };
    }, []);

    const categories = useMemo(() => {
        const names = products
            .map((product) =>
                product.category?.name || product.categoryName
            )
            .filter(Boolean);

        return ["All", ...new Set(names)];
    }, [products]);

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const name = String(product.name || "").toLowerCase();
            const description = String(product.description || "").toLowerCase();
            const category =
                product.category?.name || product.categoryName || "";
            const matchesSearch =
                name.includes(search.toLowerCase()) ||
                description.includes(search.toLowerCase());
            const matchesCategory =
                selectedCategory === "All" || category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [products, search, selectedCategory]);

    return (
        <div className="min-h-screen bg-[#faf9f7] text-gray-900">
            <Navbar />
            <main className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-14">
                <section className="relative overflow-hidden rounded-3xl bg-gray-900 px-6 py-12 text-white sm:px-12 sm:py-16">
                    <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full bg-rose-600/30 blur-3xl" />
                    <div className="absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-orange-400/20 blur-3xl" />

                    <div className="relative max-w-2xl">
                        <p className="text-xs font-bold uppercase tracking-[0.3em] text-rose-300">
                            Your style, your story
                        </p>
                        <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
                            Find your next
                            <span className="block text-rose-400">favourite.</span>
                        </h1>
                        <p className="mt-5 max-w-lg text-sm leading-6 text-gray-300 sm:text-base">
                            Explore everyday essentials and fresh styles, all in one place.
                            Discover something that feels like you.
                        </p>
                    </div>
                </section>
                <section className="mt-10">
                    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.25em] text-rose-600">
                                The collection
                            </p>
                            <h2 className="mt-2 text-3xl font-bold tracking-tight">
                                Shop all products
                            </h2>
                            <p className="mt-2 text-sm text-gray-500">
                                {loading
                                    ? "Finding your favourites..."
                                    : `${filteredProducts.length} products to explore`}
                            </p>
                        </div>

                        <div className="w-full sm:max-w-sm">
                            <label htmlFor="product-search" className="sr-only">
                                Search products
                            </label>
                            <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 focus-within:border-rose-400">
                                <span aria-hidden="true">⌕</span>
                                <input
                                    id="product-search"
                                    type="search"
                                    value={search}
                                    onChange={(event) => setSearch(event.target.value)}
                                    placeholder="Search products..."
                                    className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
                                />
                            </div>
                        </div>
                    </div>

                    {!loading && !error && categories.length > 1 && (
                        <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    type="button"
                                    onClick={() => setSelectedCategory(category)}
                                    className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                                        selectedCategory === category
                                            ? "bg-gray-900 text-white"
                                            : "border border-gray-200 bg-white text-gray-600 hover:border-gray-900"
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    )}

                    {loading && (
                        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {Array.from({ length: 8 }, (_, index) => (
                                <div
                                    key={index}
                                    className="animate-pulse overflow-hidden rounded-2xl bg-white"
                                >
                                    <div className="h-64 bg-gray-200" />
                                    <div className="space-y-3 p-4">
                                        <div className="h-3 w-1/3 rounded bg-gray-200" />
                                        <div className="h-5 w-3/4 rounded bg-gray-200" />
                                        <div className="h-4 w-1/2 rounded bg-gray-200" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {!loading && error && (
                        <div className="mt-10 rounded-2xl border border-rose-100 bg-rose-50 p-8 text-center">
                            <p className="font-semibold text-rose-700">{error}</p>
                            <button
                                type="button"
                                onClick={() => window.location.reload()}
                                className="mt-4 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white"
                            >
                                Try again
                            </button>
                        </div>
                    )}

                    {!loading && !error && filteredProducts.length === 0 && (
                        <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-10 text-center">
                            <p className="text-lg font-semibold">No products found</p>
                            <p className="mt-2 text-sm text-gray-500">
                                Try a different search or select another category.
                            </p>
                            <button
                                type="button"
                                onClick={() => {
                                    setSearch("");
                                    setSelectedCategory("All");
                                }}
                                className="mt-4 font-semibold text-rose-600 hover:text-rose-700"
                            >
                                Clear filters
                            </button>
                        </div>
                    )}

                    {!loading && !error && filteredProducts.length > 0 && (
                        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {filteredProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onViewDetails={(product)=>(navigate(`/products/${product.id}`))}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}
