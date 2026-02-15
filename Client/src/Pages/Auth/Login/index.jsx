import React, { useState } from "react";
import notify from "../../../Utils/notify";

export default function Login({handlePageType}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (data.success) {
        notify("success", data.message);
        localStorage.setItem("token", data.token);
        setEmail("");
        setPassword("");
        window.location.href = "/";
      } else {
        notify("error", data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-20 bg-gradient-to-tr from-red-900 to-transparent pointer-events-none"></div>

      <div className="relative w-full max-w-md">
        {/* Card Container */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-700/50 shadow-red-900/20">
          {/* Red Accent Line */}
          <div className="h-1.5 bg-gradient-to-r from-red-600 via-red-500 to-red-600"></div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-red-600 to-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-red-900/30">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    ></path>
                  </svg>
                </div>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-red-300 bg-clip-text text-transparent">
                Welcome Back
              </h1>
              <p className="text-gray-400 text-sm mt-2">Login to your Cin Mony account</p>
            </div>

            {/* Input Fields */}
            <div className="space-y-4">
              {/* Email Input */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-300 mb-2 group-hover:text-red-400 transition-colors duration-300">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-500 group-hover:text-red-400 transition-colors duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 3.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-xl py-3 px-4 pr-10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-300 group-hover:border-red-600/50"
                    placeholder="example@email.com"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-300 mb-2 group-hover:text-red-400 transition-colors duration-300">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-500 group-hover:text-red-400 transition-colors duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-xl py-3 px-4 pr-10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-300 group-hover:border-red-600/50"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                onClick={() => handlePageType("forgot")}
                className="text-sm text-gray-400 hover:text-red-400 transition-colors duration-300"
              >
                Forgot Password?
              </button>
            </div>

            {/* Register Prompt */}
            <div className="text-center pt-2">
              <p className="text-gray-400 text-sm">
                Don't have an account?{" "}
                <p
                  onClick={() => handlePageType("register")}
                  className="text-red-400 hover:text-red-300 cursor-pointer font-semibold transition-colors duration-300 inline-flex items-center gap-1 group/link"
                >
                  Register
                  <svg
                    className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </p>
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold rounded-xl shadow-lg hover:shadow-red-500/25 hover:from-red-500 hover:to-red-400 transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 focus:ring-offset-gray-900 active:scale-95"
            >
              Login
            </button>
          </form>
        </div>

        {/* Footer Note */}
        <p className="text-center text-gray-500 text-xs mt-6">
          Secure login powered by{" "}
          <span className="text-red-400">Cin Mony</span>
        </p>
      </div>
    </div>
  );
}