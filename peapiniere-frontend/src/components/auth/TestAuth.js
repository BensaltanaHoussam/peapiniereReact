import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

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
        <div className="p-4">
            <h2 className="text-xl mb-4">Auth Test Component</h2>
            
            {!user ? (
                <form onSubmit={handleTestLogin} className="space-y-4">
                    <div>
                        <label>Email:</label>
                        <input 
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border p-2 ml-2"
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input 
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border p-2 ml-2"
                        />
                    </div>
                    {error && <div className="text-red-500">{error}</div>}
                    <button 
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            ) : (
                <div className="space-y-4">
                    <p>User status: Logged in</p>
                    <p>Welcome, {user.email}</p>
                    <button 
                        onClick={logout}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default TestAuth;