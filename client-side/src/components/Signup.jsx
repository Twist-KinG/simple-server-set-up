
import React, { useState } from 'react';
import axios from 'axios';

const Signup = ({ onClose, onSwitchToLogin, onSignupSuccess }) => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:3000/api/auth/signup', formData);
            const { token, name, email } = response.data;

            // Save JWT token
            localStorage.setItem('token', token);

            // Notify parent about successful signup (pass user info)
            onSignupSuccess({ name, email, token });

            // Close signup modal
            onClose();
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('Signup failed. Please try again.');
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
                    aria-label="Close signup form"
                >
                    &times;
                </button>
                <h2 className="text-2xl mb-4 font-semibold">Create Account</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="border px-3 py-2 rounded"
                    />
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
                        {loading ? 'Signing up...' : 'Sign Up'}
                    </button>
                </form>
                {error && <p className="text-red-600 mt-2 text-center">{error}</p>}
                <p className="mt-4 text-center">
                    Already have an account?{' '}
                    <button
                        onClick={() => {
                            onClose();
                            onSwitchToLogin();
                        }}
                        className="text-blue-600 underline hover:text-blue-800"
                    >
                        Login here
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Signup;
