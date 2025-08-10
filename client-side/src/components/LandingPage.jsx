
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Login from './Login';
import Signup from './Signup';

const LandingPage = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const [user, setUser] = useState(null);

    // On mount, check if token & user info in localStorage
    useEffect(() => {
        const token = localStorage.getItem('token');
        const name = localStorage.getItem('name');
        const email = localStorage.getItem('email');
        if (token && name && email) {
            setUser({ name, email, token });
        }
    }, []);

    // Called when login or signup succeed
    const handleAuthSuccess = (userData) => {
        setUser(userData);
        // Save to localStorage
        localStorage.setItem('name', userData.name);
        localStorage.setItem('email', userData.email);
    };

    // Logout handler
    const handleLogout = () => {
        setUser(null);
        localStorage.clear();
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar
                onLoginClick={() => setShowLogin(true)}
                user={user}
                onLogout={handleLogout}
            />

            <main className="flex-grow flex flex-col justify-center items-center text-center p-8 bg-gray-50">
                {!user ? (
                    <>
                        <h1 className="text-4xl font-extrabold mb-4">Welcome to BookBay</h1>
                        <p className="max-w-xl mb-8 text-lg text-gray-700">
                            Your open source online book library. Browse books, and download once you create an account.
                        </p>
                        <button
                            onClick={() => setShowSignup(true)}
                            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
                        >
                            Get Started
                        </button>
                    </>
                ) : (
                    <>
                        <h1 className="text-3xl font-semibold mb-4">Welcome back, {user.name}!</h1>
                        <p className="mb-4">Your email: {user.email}</p>
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                        >
                            Logout
                        </button>
                    </>
                )}
            </main>

            <Footer />

            {showLogin && !user && (
                <Login
                    onClose={() => setShowLogin(false)}
                    onSwitchToSignup={() => {
                        setShowLogin(false);
                        setShowSignup(true);
                    }}
                    onLoginSuccess={handleAuthSuccess}
                />
            )}

            {showSignup && !user && (
                <Signup
                    onClose={() => setShowSignup(false)}
                    onSwitchToLogin={() => {
                        setShowSignup(false);
                        setShowLogin(true);
                    }}
                    onSignupSuccess={handleAuthSuccess}
                />
            )}
        </div>
    );
};

export default LandingPage;
