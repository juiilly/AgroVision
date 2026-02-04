import { useState } from "react";
import { registerUser } from "../services/auth";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    const res = await registerUser(email, password);
    alert(res.message || "Registered");
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-white p-8 shadow rounded w-96">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <input className="border p-2 w-full mb-3" placeholder="Email"
          onChange={e => setEmail(e.target.value)} />
        <input className="border p-2 w-full mb-3" placeholder="Password" type="password"
          onChange={e => setPassword(e.target.value)} />
        <button onClick={submit} className="bg-green-600 text-white w-full p-2">
          Register
        </button>
      </div>
    </div>
  );
}
