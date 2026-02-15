import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-red-600 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-red-800 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-red-900 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        {/* Hero Content */}
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                Cin Mony
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 mb-4">
              Smart Income & Expense Management
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
              Take control of your finances with powerful tracking, insightful reports, 
              and real-time analytics. Your financial freedom starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/auth"
                className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold rounded-xl shadow-lg hover:shadow-red-500/25 hover:from-red-500 hover:to-red-400 transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Get Started Free
              </Link>
              <Link
                to="/categories/all/all"
                className="px-8 py-4 bg-gray-800 text-white font-bold rounded-xl shadow-lg hover:shadow-gray-900/25 hover:bg-gray-700 transform hover:-translate-y-0.5 transition-all duration-300 border border-gray-700"
              >
                Explore Features
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 text-center hover:border-red-600 transition-colors duration-300">
              <div className="text-3xl font-bold text-red-400 mb-2">10K+</div>
              <div className="text-gray-300">Active Users</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 text-center hover:border-red-600 transition-colors duration-300">
              <div className="text-3xl font-bold text-red-400 mb-2">$50M+</div>
              <div className="text-gray-300">Transactions Tracked</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 text-center hover:border-red-600 transition-colors duration-300">
              <div className="text-3xl font-bold text-red-400 mb-2">99.9%</div>
              <div className="text-gray-300">Uptime</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Powerful Features for
            <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent"> Financial Control</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Everything you need to manage your income and expenses in one place
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700 hover:border-red-600 transition-all duration-300 hover:transform hover:-translate-y-2">
            <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-500 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Income Tracking</h3>
            <p className="text-gray-400">Easily track all your income sources with detailed categories and real-time updates.</p>
          </div>

          {/* Feature 2 */}
          <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700 hover:border-red-600 transition-all duration-300 hover:transform hover:-translate-y-2">
            <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-500 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Expense Management</h3>
            <p className="text-gray-400">Monitor and categorize your expenses to identify saving opportunities and reduce costs.</p>
          </div>

          {/* Feature 3 */}
          <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700 hover:border-red-600 transition-all duration-300 hover:transform hover:-translate-y-2">
            <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-500 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Advanced Reports</h3>
            <p className="text-gray-400">Get detailed financial reports with visual charts and insights to make better decisions.</p>
          </div>

          {/* Feature 4 */}
          <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700 hover:border-red-600 transition-all duration-300 hover:transform hover:-translate-y-2">
            <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-500 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Real-time Analytics</h3>
            <p className="text-gray-400">Watch your finances grow with real-time updates and instant notifications.</p>
          </div>

          {/* Feature 5 */}
          <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700 hover:border-red-600 transition-all duration-300 hover:transform hover:-translate-y-2">
            <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-500 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Budget Planning</h3>
            <p className="text-gray-400">Set budgets for different categories and get alerts when you're close to limits.</p>
          </div>

          {/* Feature 6 */}
          <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700 hover:border-red-600 transition-all duration-300 hover:transform hover:-translate-y-2">
            <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-500 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Secure & Private</h3>
            <p className="text-gray-400">Your financial data is encrypted and protected with enterprise-grade security.</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-12 border border-gray-700 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600 rounded-full filter blur-3xl"></div>
          </div>
          <div className="relative text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Take Control of Your Finances?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already managing their money smarter with Cin Mony
            </p>
            <Link
              to="/auth"
              className="inline-block px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold rounded-xl shadow-lg hover:shadow-red-500/25 hover:from-red-500 hover:to-red-400 transform hover:-translate-y-0.5 transition-all duration-300"
            >
              Start Your Free Trial
            </Link>
            <p className="text-gray-500 text-sm mt-4">No credit card required • Free forever</p>
          </div>
        </div>
      </div>
    </div>
  )
}