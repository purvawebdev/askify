import React, { useState } from "react";
import { Link} from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const { register, loading, error } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(formData); // <--- Just call the function!
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-light p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-brand/10">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Create Account
        </h2>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm text-center border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            name="username"
            type="text"
            placeholder="John Doe"
            required
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-brand focus:ring-2 outline-none"
          />
          <input
            name="email"
            type="email"
            placeholder="john@example.com"
            required
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-brand focus:ring-2 outline-none"
          />
          <input
            name="password"
            type="password"
            placeholder="••••••••"
            required
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-brand focus:ring-2 outline-none"
          />

          <button
            type="submit"
            disabled={loading} // <--- Disable while loading
            className={`w-full text-white font-bold py-3 rounded-lg transition transform shadow-lg ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-brand hover:bg-brand-dark hover:-translate-y-0.5"
            }`}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-brand font-semibold hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
