import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import logoVermillion from "../assets/logovermiloren.png";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });
      console.log("LOGIN RESPONSE:", response.data);
      const user = response.data.user;
      console.log("ROLE:", user.role);
      console.log("USER:", user);
      localStorage.setItem("user", JSON.stringify(user));

      switch (user.role.toLowerCase()) {
        case "host":
          navigate("/dashboard-host");
          break;

        case "finance":
          navigate("/dashboard-finance");
          break;

        case "procurement":
          navigate("/dashboard-procurement");
          break;

        case "hr":
          navigate("/dashboard-hr");
          break;

        case "technician":
          navigate("/dashboard-tech");
          break;

        case "performance":
          navigate("/dashboard-performance");
          break;

        default:
          alert("Role tidak dikenali");
      }
    } catch (error) {
  console.error("LOGIN ERROR:", error);

  const message =
    error.response?.data?.message ||
    "Terjadi kesalahan saat login";

  alert(message);
}
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#FF8000] to-white p-5">
      {/* Wrapper (Card) */}
      <div className="w-full max-w-[420px] bg-white/65 backdrop-blur-xl border border-orange-100 rounded-[20px] p-8 shadow-2xl animate-slide-up">
        <div className="flex flex-col items-center mb-8 animate-fade-in">
          <div className="mb-6 animate-fade-in">
            <img src={logoVermillion} alt="Logo" className="h-16 w-auto" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 text-center mb-1">
            Login
          </h2>
          <p className="text-sm text-gray-500 text-center mb-8">
            Silahkan login untuk akses sistem
          </p>
        </div>
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          {/* Input Email */}
          <div className="relative group">
            <input
              type="text"
              placeholder="Email"
              className="w-full h-12 bg-orange-50/50 border-2 border-orange-100 rounded-xl px-5 pr-12 outline-none focus:border-orange-400 focus:bg-orange-50 transition-all"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-400/60 w-5 h-5" />
          </div>

          {/* Input Password */}
          <div className="relative group">
            <input
              type="password"
              placeholder="Password"
              className="w-full h-12 bg-orange-50/50 border-2 border-orange-100 rounded-xl px-5 pr-12 outline-none focus:border-orange-400 focus:bg-orange-50 transition-all"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-400/60 w-5 h-5" />
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center cursor-pointer text-gray-700 hover:opacity-70">
              <input
                type="checkbox"
                className="mr-2 accent-orange-500 w-4 h-4"
              />
              Remember Me
            </label>
            <Link
              to="/contact"
              className="text-orange-500 font-medium hover:underline"
            >
              Forgot Password
            </Link>
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-orange-400 to-orange-500 text-white font-bold rounded-xl shadow-lg shadow-orange-200 hover:scale-[1.02] active:scale-95 transition-all"
          >
            Login
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-600">
          <p>
            Don't have an account?{" "}
            <Link
              to="/contact"
              className="text-orange-500 font-bold hover:underline"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
