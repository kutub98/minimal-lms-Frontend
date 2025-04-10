"use client";

import { usePathname, useRouter } from "next/navigation";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { useState } from "react";

const RegisterPage = () => {
  const pathname = usePathname();
  const router = useRouter();

  // Track form input state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isLogin = pathname === "/login";

  const toggleAuthMode = () => {
    router.push(isLogin ? "/register" : "/login");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch(
        "https://minimal-lms-backend.vercel.app/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ name: fullName, email, password })
        }
      );

      const data = await res.json();

      if (res.ok) {
        // Registration successful, navigate to login
        router.push("/login");
      } else {
        setErrorMessage(data.message || "Registration failed");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setErrorMessage("Something went wrong, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Welcome Back" : "Create an Account"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name Field */}
          {!isLogin && (
            <div className="relative">
              <FaUser className="absolute top-3.5 left-3 text-gray-400" />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
                className="w-full pl-10 pr-4 py-2 rounded-md bg-white/10 border border-white/20 outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          )}

          {/* Email Field */}
          <div className="relative">
            <FaEnvelope className="absolute top-3.5 left-3 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full pl-10 pr-4 py-2 rounded-md bg-white/10 border border-white/20 outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <FaLock className="absolute top-3.5 left-3 text-gray-400" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-10 pr-4 py-2 rounded-md bg-white/10 border border-white/20 outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-red-500 text-center">{errorMessage}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 transition duration-300 py-2 rounded-md font-semibold"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={toggleAuthMode}
            className="text-purple-300 hover:underline"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
