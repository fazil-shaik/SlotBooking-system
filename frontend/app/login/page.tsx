"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:4000/api/auth/login", form);
    // backend returns { token, user }
    const token = res.data.token;
    const role = res.data.user?.role;
    localStorage.setItem("token", token);
    if (role) localStorage.setItem("role", role);

    if (role === "provider") router.push("/provider/dashboard");
    else router.push("/client/dashboard");
  };
  
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <form onSubmit={handleLogin} className="p-6 bg-gray-100 rounded-lg shadow-lg w-96 space-y-4">
        <h2 className="text-2xl font-semibold text-center">Login</h2>
        <input className="w-full p-2 border rounded" placeholder="Email"
          value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <input className="w-full p-2 border rounded" type="password" placeholder="Password"
          value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
        <button className="w-full bg-green-600 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
}
