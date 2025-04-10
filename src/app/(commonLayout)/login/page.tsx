"use client";

import { usePathname, useRouter } from "next/navigation";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const LoginPage = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { login } = useAuth();

  const isLogin = pathname === "/login";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleAuthMode = () => {
    router.push(isLogin ? "/register" : "/login");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`/api/auth/${isLogin ? "login" : "register"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isLogin
            ? { email, password }
            : { name, email, password, role: "admin" }
        )
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
        return;
      }

      if (isLogin) {
        const token = data.data.accessToken;
        const userPayload = JSON.parse(atob(token.split(".")[1]));

        login(
          {
            id: userPayload.id,
            email: userPayload.email,
            role: userPayload.role
          },
          token
        );

        router.push("/dashboard/home");
      } else {
        router.push("/login");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error("Auth error:", err);
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

        <form className="space-y-5" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="relative">
              <FaUser className="absolute top-3.5 left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2 rounded-md bg-white/10 border border-white/20 outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          )}

          <div className="relative">
            <FaEnvelope className="absolute top-3.5 left-3 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2 rounded-md bg-white/10 border border-white/20 outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="relative">
            <FaLock className="absolute top-3.5 left-3 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2 rounded-md bg-white/10 border border-white/20 outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {error && <p className="text-sm text-red-400 text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 transition duration-300 py-2 rounded-md font-semibold"
            disabled={loading}
          >
            {loading ? "Loading..." : isLogin ? "Login" : "Register"}
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

export default LoginPage;
