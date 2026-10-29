
import { Link } from "react-router-dom";

const collections = [
    {
        title: "Everyday Essentials",
        subtitle: "Comfort that fits every day",
        image:
            "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=800&q=85",
    },
    {
        title: "Streetwear",
        subtitle: "Make your own statement",
        image:
            "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=85",
    },
    {
        title: "New Arrivals",
        subtitle: "Fresh styles, just dropped",
        image:
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=85",
    },
];

const benefits = [
    {
        icon: "↗",
        title: "Great prices",
        description: "Style within your budget",
    },
    {
        icon: "✧",
        title: "Quality first",
        description: "Made for everyday wear",
    },
    {
        icon: "♡",
        title: "Easy shopping",
        description: "A smooth shopping experience",
    },
    {
        icon: "♧",
        title: "Fresh finds",
        description: "Discover your next favourite",
    },
];

export default function Home() {
    const user = JSON.parse(
        localStorage.getItem("trendnest_user") || "null"
    );

    return (
        <main className="min-h-screen overflow-hidden bg-[#fcfaf7] text-[#201d1b]">
            {/* Navigation */}
            <nav className="relative z-20 border-b border-black/5 bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
                    <Link to="/" className="text-2xl font-black tracking-tight">
                        TrendNest<span className="text-rose-600">.</span>
                    </Link>

                    <div className="hidden items-center gap-8 md:flex">
                        <Link to="/" className="text-sm font-semibold text-rose-600">
                            Home
                        </Link>
                        <Link to="/products" className="text-sm text-gray-600 hover:text-rose-600">
                            Shop
                        </Link>
                        <a href="#collections" className="text-sm text-gray-600 hover:text-rose-600">
                            Collections
                        </a>
                        <a href="#bestsellers" className="text-sm text-gray-600 hover:text-rose-600">
                            Discover
                        </a>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-5">
                        {user ? (
                            <Link
                                to="/products"
                                aria-label="Continue shopping"
                                className="rounded-full border border-gray-200 p-2.5 hover:border-rose-500 hover:text-rose-600"
                            >
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                >
                                    <circle cx="12" cy="8" r="4" />
                                    <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
                                </svg>
                            </Link>
                        ) : (
                            <>
                                <Link to="/login" className="text-sm font-medium hover:text-rose-600">
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="rounded-lg bg-[#201d1b] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-600"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="relative isolate min-h-[540px] overflow-hidden bg-[#eee3d7] sm:min-h-[600px]">
                <img
                    src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2000&q=90"
                    alt="Fashion collection"
                    className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#f4e9df] via-[#f4e9df]/90 to-transparent" />

                <div className="mx-auto flex min-h-[540px] max-w-7xl items-center px-6 py-16 sm:min-h-[600px] sm:px-10 lg:px-12">
                    <div className="max-w-xl">
                        <p className="text-xs font-bold uppercase tracking-[0.3em] text-rose-700">
                            Your style, your story
                        </p>

                        <h1 className="mt-6 text-5xl font-black leading-[1.06] tracking-tight sm:text-7xl">
                            Find your next
                            <span className="mt-1 block font-serif italic font-medium text-rose-700">
                favourite.
              </span>
                        </h1>

                        <p className="mt-6 max-w-md text-base leading-7 text-gray-700 sm:text-lg">
                            Everyday essentials. Fresh styles. Pieces that feel like you.
                            Find something worth wearing on repeat.
                        </p>

                        {user?.name && (
                            <p className="mt-4 text-sm font-medium text-gray-700">
                                Welcome back, {user.name}.
                            </p>
                        )}

                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link
                                to="/products"
                                className="inline-flex items-center gap-3 rounded-lg bg-[#201d1b] px-6 py-4 text-sm font-semibold text-white transition hover:bg-rose-700"
                            >
                                Shop collection <span aria-hidden="true">→</span>
                            </Link>

                            <Link
                                to="/products"
                                className="rounded-lg border border-gray-500/60 bg-white/30 px-6 py-4 text-sm font-semibold transition hover:bg-white"
                            >
                                Explore styles
                            </Link>
                        </div>

                        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium text-gray-700">
                            <span>✓ Easy browsing</span>
                            <span>✓ Secure checkout</span>
                            <span>✓ Styles for every day</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Collections */}
            <section
                id="collections"
                className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20"
            >
                <div className="mb-8 flex items-end justify-between gap-4">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-rose-700">
                            Find your fit
                        </p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                            Explore collections
                        </h2>
                    </div>

                    <Link
                        to="/products"
                        className="hidden text-sm font-semibold hover:text-rose-600 sm:block"
                    >
                        Shop everything →
                    </Link>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {collections.map((collection, index) => (
                        <Link
                            to="/products"
                            key={collection.title}
                            className={`group relative h-[340px] overflow-hidden rounded-2xl bg-gray-200 sm:h-[400px] ${
                                index === 1 ? "sm:translate-y-5" : ""
                            }`}
                        >
                            <img
                                src={collection.image}
                                alt={collection.title}
                                loading="lazy"
                                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-white">
                                <div>
                                    <h3 className="text-xl font-bold">{collection.title}</h3>
                                    <p className="mt-2 text-sm text-white/80">
                                        {collection.subtitle}
                                    </p>
                                </div>

                                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-xl text-gray-900 transition group-hover:bg-rose-600 group-hover:text-white">
                  ↗
                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Featured products: connected to your existing backend page */}
            <section
                id="bestsellers"
                className="border-y border-black/5 bg-white py-16 sm:py-20"
            >
                <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 sm:flex-row sm:items-end sm:justify-between sm:px-8">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-rose-700">
                            Worth a look
                        </p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                            Your next favourite awaits.
                        </h2>
                        <p className="mt-3 max-w-lg text-sm leading-6 text-gray-500">
                            Explore the collection and find pieces for your everyday style.
                        </p>
                    </div>

                    <Link
                        to="/products"
                        className="inline-flex w-fit items-center gap-2 rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold transition hover:border-gray-900"
                    >
                        View all products <span>→</span>
                    </Link>
                </div>

                <div className="mx-auto mt-8 max-w-7xl px-5 sm:px-8">
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                        {[
                            {
                                name: "Everyday classics",
                                image:
                                    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=650&q=85",
                            },
                            {
                                name: "Relaxed comfort",
                                image:
                                    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=650&q=85",
                            },
                            {
                                name: "Modern layers",
                                image:
                                    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=650&q=85",
                            },
                            {
                                name: "Street essentials",
                                image:
                                    "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=650&q=85",
                            },
                        ].map((item) => (
                            <Link to="/products" key={item.name} className="group">
                                <div className="aspect-[3/4] overflow-hidden rounded-xl bg-stone-100">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        loading="lazy"
                                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <h3 className="mt-3 text-sm font-semibold sm:text-base">
                                    {item.name}
                                </h3>
                                <p className="mt-1 text-xs text-gray-500">
                                    Explore the collection →
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
                <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
                    {benefits.map((benefit) => (
                        <div key={benefit.title} className="flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-rose-50 text-2xl text-rose-700">
                {benefit.icon}
              </span>
                            <div>
                                <h3 className="text-sm font-bold">{benefit.title}</h3>
                                <p className="mt-1 text-xs leading-5 text-gray-500">
                                    {benefit.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#211e1c] text-white">
                <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
                    <div>
                        <Link to="/" className="text-2xl font-black">
                            TrendNest<span className="text-rose-400">.</span>
                        </Link>
                        <p className="mt-4 max-w-xs text-sm leading-6 text-gray-400">
                            Your style, your story. Discover everyday fashion that feels like you.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold">Explore</h3>
                        <div className="mt-4 flex flex-col gap-3 text-sm text-gray-400">
                            <Link to="/products" className="hover:text-white">All products</Link>
                            <Link to="/products" className="hover:text-white">Collections</Link>
                            <Link to="/products" className="hover:text-white">New styles</Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold">Your account</h3>
                        <div className="mt-4 flex flex-col gap-3 text-sm text-gray-400">
                            <Link to="/login" className="hover:text-white">Sign in</Link>
                            <Link to="/register" className="hover:text-white">Create account</Link>
                            <Link to="/products" className="hover:text-white">Start shopping</Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold">Stay in the loop</h3>
                        <p className="mt-4 text-sm leading-6 text-gray-400">
                            New styles and fresh finds, all in one place.
                        </p>
                        <Link
                            to="/products"
                            className="mt-4 inline-flex rounded-lg bg-white px-4 py-3 text-sm font-semibold text-gray-900 transition hover:bg-rose-100"
                        >
                            Discover TrendNest →
                        </Link>
                    </div>
                </div>

                <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-gray-400">
                    © {new Date().getFullYear()} TrendNest. All rights reserved.
                </div>
            </footer>
        </main>
    );
}
