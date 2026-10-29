
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../component/Navbar.jsx";
import { getProductById } from "../API/productApi.js";

function formatPrice(price) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2,
    }).format(Number(price) || 0);
}

export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;

        async function loadProduct() {
            try {
                setLoading(true);
                setError("");

                const data = await getProductById(id);

                if (!cancelled) {
                    setProduct(data);
                }
            } catch (err) {
                console.error("Failed to load product:", err);

                if (!cancelled) {
                    setError("Unable to load this product. Please try again.");
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        loadProduct();

        return () => {
            cancelled = true;
        };
    }, [id]);

    if (loading) {
        return (
            <main className="min-h-screen bg-[#faf9f7]">
                <Navbar />
                <p className="p-10 text-center">Loading product...</p>
            </main>
        );
    }

    if (error || !product) {
        return (
            <main className="min-h-screen bg-[#faf9f7]">
                <Navbar />
                <div className="mx-auto max-w-3xl p-10 text-center">
                    <p className="text-rose-600">
                        {error || "Product not found."}
                    </p>
                    <Link
                        to="/products"
                        className="mt-5 inline-block font-semibold underline"
                    >
                        Back to products
                    </Link>
                </div>
            </main>
        );
    }

    const price = Number(product.price) || 0;
    const discount = Math.min(
        100,
        Math.max(0, Number(product.discount) || 0)
    );
    const finalPrice = price * (1 - discount / 100);
    const inStock = Number(product.stock) > 0;

    return (
        <main className="min-h-screen bg-[#faf9f7] text-gray-900">
            <Navbar />

            <div className="mx-auto max-w-6xl px-5 py-8">
                <Link
                    to="/products"
                    className="text-sm font-medium text-gray-500 hover:text-rose-600"
                >
                    ← Back to products
                </Link>

                <section className="mt-6 grid gap-10 rounded-3xl bg-white p-5 shadow-sm md:grid-cols-2 md:p-8">
                    <div className="flex min-h-80 items-center justify-center overflow-hidden rounded-2xl bg-rose-50">
                        {product.imageUrl ? (
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="h-full max-h-[500px] w-full object-contain"
                            />
                        ) : (
                            <span className="text-7xl text-rose-300">✦</span>
                        )}
                    </div>

                    <div className="flex flex-col justify-center py-3">
                        <p className="text-xs font-bold uppercase tracking-widest text-rose-600">
                            {product.category?.name ||
                                product.categoryName ||
                                "TRENDNEST"}
                        </p>

                        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
                            {product.name}
                        </h1>

                        <div className="mt-5 flex flex-wrap items-center gap-3">
                            <span className="text-2xl font-bold">
                                {formatPrice(finalPrice)}
                            </span>

                            {discount > 0 && (
                                <>
                                    <span className="text-gray-400 line-through">
                                        {formatPrice(price)}
                                    </span>
                                    <span className="rounded-full bg-rose-100 px-3 py-1 text-sm font-semibold text-rose-700">
                                        {discount}% OFF
                                    </span>
                                </>
                            )}
                        </div>

                        <p className="mt-6 whitespace-pre-line leading-7 text-gray-600">
                            {product.description ||
                                "Discover your next everyday favourite."}
                        </p>

                        <p
                            className={`mt-6 text-sm font-semibold ${
                                inStock ? "text-emerald-700" : "text-rose-600"
                            }`}
                        >
                            {inStock
                                ? `${product.stock} available in stock`
                                : "Currently out of stock"}
                        </p>

                        <button
                            type="button"
                            disabled={!inStock}
                            className="mt-6 rounded-xl bg-gray-900 px-6 py-4 font-semibold text-white transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:bg-gray-300"
                        >
                            {inStock ? "Add to cart — coming next" : "Out of stock"}
                        </button>
                    </div>
                </section>
            </div>
        </main>
    );
}
