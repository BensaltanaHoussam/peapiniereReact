import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Link 
                        to="/admin/categories"
                        className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
                    >
                        <h2 className="text-xl font-semibold mb-2">Categories Management</h2>
                        <p className="text-gray-600">Create, edit, and delete plant categories</p>
                    </Link>
                    <Link 
                        to="/admin/plants"
                        className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
                    >
                        <h2 className="text-xl font-semibold mb-2">Plants Management</h2>
                        <p className="text-gray-600">Manage your plant inventory</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};


export default AdminDashboard;