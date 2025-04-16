import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const TestAuth = () => {
    const { user, login, logout } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleTestLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            console.log('Login attempt with:', { email, password });
            const response = await login(email, password);
            console.log('Login response:', response);
        } catch (error) {
            console.error('Login error:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            setError(`Login failed: ${error.response?.data?.message || error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    {user ? 'Welcome Back!' : 'Sign In'}
                </h2>
                
                {!user ? (
                    <>
                        <form onSubmit={handleTestLogin} className="space-y-6">
                            <div>
                                <label className="block text-gray-700 mb-2">Email:</label>
                                <input 
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Password:</label>
                                <input 
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            {error && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                                    {error}
                                </div>
                            )}
                            <button 
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                                disabled={loading}
                            >
                                {loading ? 'Signing in...' : 'Sign In'}
                            </button>
                        </form>
                        <div className="mt-6 text-center">
                            <p className="text-gray-600">
                                Don't have an account?{' '}
                                <Link 
                                    to="/register" 
                                    className="text-blue-500 hover:text-blue-600 font-medium"
                                >
                                    Sign up here
                                </Link>
                            </p>
                        </div>
                    </>
                ) : (
                    <div className="space-y-6">
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                            <p className="font-semibold">Logged in successfully!</p>
                            <p>Welcome back, {user.email}</p>
                        </div>
                        <button 
                            onClick={logout}
                            className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            Sign Out
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TestAuth;