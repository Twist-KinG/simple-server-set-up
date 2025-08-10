
import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onClose, onSwitchToSignup, onLoginSuccess }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', formData);
            const { token, name, email } = response.data;

            // Save token to localStorage (or wherever you prefer)
            localStorage.setItem('token', token);

            // Notify parent about successful login (pass user info)
            onLoginSuccess({ name, email, token });

            // Close login modal
            onClose();
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('Login failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-200 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-md w-80 relative">
                <button
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 font-bold"
                    onClick={onClose}
                    aria-label="Close login form"
                >
                    &times;
                </button>
                <h2 className="text-2xl mb-4 font-semibold">Login</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="border px-3 py-2 rounded"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="border px-3 py-2 rounded"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {loading ? 'Logging in...' : 'Log In'}
                    </button>
                </form>
                {error && <p className="text-red-600 mt-2 text-center">{error}</p>}
                <p className="mt-4 text-center">
                    New here?{" "}
                    <button
                        onClick={() => {
                            onClose();
                            onSwitchToSignup();
                        }}
                        className="text-blue-600 underline hover:text-blue-800"
                    >
                        Create an account
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;
