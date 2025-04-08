"use client";

import { usePathname, useRouter } from "next/navigation";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";

const AuthPage = () => {
  const pathname = usePathname();
  const router = useRouter();

  const isLogin = pathname === "/login";

  const toggleAuthMode = () => {
    router.push(isLogin ? "/register" : "/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Welcome Back" : "Create an Account"}
        </h2>

        <form className="space-y-5">
          {!isLogin && (
            <div className="relative">
              <FaUser className="absolute top-3.5 left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Full Name"
                className="w-full pl-10 pr-4 py-2 rounded-md bg-white/10 border border-white/20 outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          )}

          <div className="relative">
            <FaEnvelope className="absolute top-3.5 left-3 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-2 rounded-md bg-white/10 border border-white/20 outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="relative">
            <FaLock className="absolute top-3.5 left-3 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-2 rounded-md bg-white/10 border border-white/20 outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 transition duration-300 py-2 rounded-md font-semibold"
          >
            {isLogin ? "Login" : "Register"}
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

export default AuthPage;
