"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "client", hourlyRate: "" });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post("http://localhost:4000/api/auth/register", form);
    router.push("/login");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <form onSubmit={handleSubmit} className="p-6 bg-gray-100 rounded-lg shadow-lg w-96 space-y-4">
        <h2 className="text-2xl font-semibold text-center">Register</h2>
        <input className="w-full p-2 border rounded" placeholder="Name"
          value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input className="w-full p-2 border rounded" placeholder="Email"
          value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <input className="w-full p-2 border rounded" type="password" placeholder="Password"
          value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
        <select className="w-full p-2 border rounded" value={form.role}
          onChange={e => setForm({ ...form, role: e.target.value })}>
          <option value="client">Client</option>
          <option value="provider">Provider</option>
        </select>
        {form.role === "provider" && (
          <input className="w-full p-2 border rounded" placeholder="Hourly Rate"
            value={form.hourlyRate} onChange={e => setForm({ ...form, hourlyRate: e.target.value })} />
        )}
        <button className="w-full bg-blue-600 text-white py-2 rounded">Register</button>
      </form>
    </div>
  );
}
