
import React from 'react';

const Navbar = ({ onLoginClick, user, onLogout }) => {
    return (
        <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
            <div className="font-bold text-xl">BookBay</div>

            <div>
                {!user ? (
                    <button
                        onClick={onLoginClick}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                ) : (
                    <button
                        onClick={onLogout}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                    >
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
