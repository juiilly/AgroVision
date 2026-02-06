import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../services/auth";
import AuthLayout from "./AuthLayout";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await registerUser(email, password);
      alert(res.message || "Registered successfully");
    } catch {
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 font-medium">
            Login
          </Link>
        </>
      }
    >
      <form onSubmit={submit} className="space-y-4">
        <input
          type="email"
          required
          placeholder="Email address"
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-400 outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          required
          placeholder="Password"
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-400 outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </AuthLayout>
  );
}
