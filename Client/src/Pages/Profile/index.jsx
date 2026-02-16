// import React from 'react'

// export default function Profile() {
//     const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

//   return (
//     <div>
//       <h1>{user.fullName}</h1> 
//       <p>{user.email}</p> <p>{user.role}</p>
//     </div>
//   )
// }
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const navigate = useNavigate();
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/auth");
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
                <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-red-600 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-900/30">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">No User Found</h2>
                    <p className="text-gray-400 mb-6">Please login to view your profile</p>
                    <button
                        onClick={() => navigate("/auth")}
                        className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold rounded-xl shadow-lg hover:shadow-red-500/25 hover:from-red-500 hover:to-red-400 transform hover:-translate-y-0.5 transition-all duration-300"
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    // Get initials for avatar
    const initials = user.fullName
        .split(' ')
        .map(name => name[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-12">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-64 h-64 bg-red-600 rounded-full filter blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-900 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
            </div>

            <div className="container mx-auto px-4 relative">
                <div className="max-w-4xl mx-auto">
                    {/* Profile Header Card */}
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-700/50 shadow-red-900/20 mb-6">
                        <div className="h-32 bg-gradient-to-r from-red-600 to-red-500 relative">
                            <div className="absolute inset-0 opacity-20">
                            </div>
                        </div>
                        
                        <div className="px-8 pb-8">
                            {/* Avatar */}
                            <div className="flex justify-center -mt-16 mb-4">
                                <div className="relative">
                                    <div className="w-32 h-32 bg-gradient-to-br from-red-600 to-red-500 rounded-full flex items-center justify-center text-4xl font-bold text-white shadow-xl border-4 border-gray-800">
                                        {initials}
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 rounded-full border-4 border-gray-800"></div>
                                </div>
                            </div>

                            {/* User Info */}
                            <div className="text-center mb-6">
                                <h1 className="text-3xl font-bold text-white mb-2">{user.fullName}</h1>
                                <div className="flex items-center justify-center gap-2">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                        user.role === "admin" 
                                            ? "bg-purple-900/50 text-purple-400 border border-purple-700" 
                                            : "bg-blue-900/50 text-blue-400 border border-blue-700"
                                    }`}>
                                        {user.role === "admin" ? "👑 Admin" : "👤 User"}
                                    </span>
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="max-w-md mx-auto space-y-3 mb-8">
                                <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-xl border border-gray-700">
                                    <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-500 rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400">Email Address</p>
                                        <p className="text-white font-medium">{user.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-xl border border-gray-700">
                                    <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-500 rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400">User ID</p>
                                        <p className="text-white font-mono text-sm">{user._id}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <button
                                    onClick={() => navigate("/categories/all/all")}
                                    className="px-6 py-3 bg-gray-800 text-white font-bold rounded-xl hover:bg-gray-700 transition-all duration-300 border border-gray-700 hover:border-red-600 inline-flex items-center justify-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                                    </svg>
                                    Manage Categories
                                </button>
                                <button
                                    onClick={() => navigate("/transactions/all")}
                                    className="px-6 py-3 bg-gray-800 text-white font-bold rounded-xl hover:bg-gray-700 transition-all duration-300 border border-gray-700 hover:border-red-600 inline-flex items-center justify-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                                    </svg>
                                    View Transactions
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold rounded-xl shadow-lg hover:shadow-red-500/25 hover:from-red-500 hover:to-red-400 transform hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center justify-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                                    </svg>
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Account Stats Card */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-red-600 transition-all duration-300">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-500 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">Member Since</p>
                                    <p className="text-white font-bold">2024</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-red-600 transition-all duration-300">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-500 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">Categories</p>
                                    <p className="text-white font-bold">Active</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-red-600 transition-all duration-300">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-500 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">Account Status</p>
                                    <p className="text-green-400 font-bold">Active</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}