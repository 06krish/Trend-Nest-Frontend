
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../api/authApi';

export default function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setLoading(true);

        try {
            const user = await loginUser(form);

            if (user.role === 'ADMIN') {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } catch (err) {
            setError(
                err.response?.data?.message ||
                'Login failed. Check your email and password.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-stone-50 px-4 py-10">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md space-y-5 rounded-2xl bg-white p-8 shadow-sm"
            >
                <div className="text-center">
                    <Link to="/" className="text-3xl font-bold tracking-tight">
                        TrendNest<span className="text-rose-600">.</span>
                    </Link>
                    <h1 className="mt-6 text-2xl font-semibold">Welcome back</h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Log in to continue shopping.
                    </p>
                </div>

                {error && (
                    <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                        {error}
                    </p>
                )}

                <div>
                    <label htmlFor="email" className="mb-1 block text-sm font-medium">
                        Email address
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        autoComplete="email"
                        required
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-rose-500"
                        placeholder="you@example.com"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="mb-1 block text-sm font-medium">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        autoComplete="current-password"
                        required
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-rose-500"
                        placeholder="Enter your password"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-gray-900 px-4 py-3 font-medium text-white transition hover:bg-rose-600 disabled:opacity-60"
                >
                    {loading ? 'Logging in...' : 'Log in'}
                </button>

                <p className="text-center text-sm text-gray-600">
                    New to TrendNest?{' '}
                    <Link to="/register" className="font-semibold text-rose-600">
                        Create an account
                    </Link>
                </p>
            </form>
        </main>
    );
}
