
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../api/authApi';

export default function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const user = await registerUser(form);

            setSuccess(`Account created successfully for ${user.name}.`);

            setTimeout(() => {
                navigate('/login');
            }, 1000);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                'Registration failed. Please check your details.'
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
                    <h1 className="mt-6 text-2xl font-semibold">
                        Create your account
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Join TrendNest and discover your style.
                    </p>
                </div>

                {error && (
                    <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                        {error}
                    </p>
                )}

                {success && (
                    <p role="status" className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
                        {success}
                    </p>
                )}

                <div>
                    <label htmlFor="name" className="mb-1 block text-sm font-medium">
                        Full name
                    </label>
                    <input
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        autoComplete="name"
                        required
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-rose-500"
                        placeholder="Enter your name"
                    />
                </div>

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
                        autoComplete="new-password"
                        required
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-rose-500"
                        placeholder="Create a password"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-gray-900 px-4 py-3 font-medium text-white transition hover:bg-rose-600 disabled:opacity-60"
                >
                    {loading ? 'Creating account...' : 'Create account'}
                </button>

                <p className="text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="font-semibold text-rose-600">
                        Log in
                    </Link>
                </p>
            </form>
        </main>
    );
}
