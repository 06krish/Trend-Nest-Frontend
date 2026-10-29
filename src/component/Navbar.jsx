
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    // Use the same storage keys as your authApi.js.
    const token = localStorage.getItem("trendnest_token");
    const user = JSON.parse(
        localStorage.getItem("trendnest_user") || "null"
    );

    const loggedIn = Boolean(token);

    const navClass = ({ isActive }) =>
        `text-sm font-medium transition hover:text-rose-600 ${
            isActive ? "text-rose-600" : "text-gray-600"
        }`;

    function handleLogout() {
        localStorage.removeItem("trendnest_token");
        localStorage.removeItem("trendnest_user");
        setMenuOpen(false);
        navigate("/login");
        window.location.reload();
    }

    return (
        <header className="sticky top-0 z-40 border-b border-gray-100 bg-white">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
                <Link to="/" className="text-2xl font-black text-gray-900">
                    trend<span className="text-rose-600">nest.</span>
                </Link>

                <div className="flex items-center gap-5 sm:gap-7">
                    <NavLink to="/" className={navClass}>
                        Home
                    </NavLink>

                    <NavLink to="/products" className={navClass}>
                        Shop
                    </NavLink>

                    {loggedIn ? (
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setMenuOpen(!menuOpen)}
                                aria-label="Open account menu"
                                aria-expanded={menuOpen}
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition hover:border-rose-500 hover:text-rose-600"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="22"
                                    height="22"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="12" cy="8" r="4" />
                                    <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
                                </svg>
                            </button>

                            {menuOpen && (
                                <div className="absolute right-0 top-12 z-50 w-52 rounded-xl border border-gray-100 bg-white p-2 shadow-xl">
                                    <div className="border-b border-gray-100 px-3 py-3">
                                        <p className="font-semibold text-gray-900">
                                            {user?.name || "My Account"}
                                        </p>
                                        {user?.email && (
                                            <p className="mt-1 truncate text-xs text-gray-500">
                                                {user.email}
                                            </p>
                                        )}
                                    </div>

                                    <Link
                                        to="/profile"
                                        onClick={() => setMenuOpen(false)}
                                        className="block rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                                    >
                                        My Profile
                                    </Link>

                                    <Link
                                        to="/orders"
                                        onClick={() => setMenuOpen(false)}
                                        className="block rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                                    >
                                        My Orders
                                    </Link>

                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-rose-600 hover:bg-rose-50"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="text-sm font-medium text-gray-600 hover:text-rose-600"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="rounded-full bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-rose-600"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}
