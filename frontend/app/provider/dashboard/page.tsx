/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const BASE_URL = "http://localhost:4000/api";

export default function ProviderDashboard() {
  const [slot, setSlot] = useState({ startTime: "", endTime: "" });
  // get provider id from JWT stored in localStorage
  const getToken = () => (typeof window !== "undefined" ? localStorage.getItem("token") : null);
  const getUserIdFromToken = () => {
    const token = getToken();
    if (!token) return null;
    try {
      const payload = token.split(".")[1];
      const b64 = payload.replace(/-/g, "+").replace(/_/g, "/");
      const json = decodeURIComponent(atob(b64).split("").map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`).join(""));
      return JSON.parse(json).id as string;
    } catch {
      return null;
    }
  };

  const { data: slots, refetch } = useQuery({
    queryKey: ["slots"],
    queryFn: async () => {
      const all = (await axios.get(`${BASE_URL}/slots`)).data as any[];
      const pid = getUserIdFromToken();
      if (!pid) return [];
      return all.filter(s => s.providerId === pid);
    }
  });

  const validateSlot = (start: string, end: string) => {
    if (!start || !end) return { ok: false, message: "Start and end time are required" };
    const s = new Date(start);
    const e = new Date(end);
    if (!isFinite(s.getTime()) || !isFinite(e.getTime())) return { ok: false, message: "Invalid date format" };
    if (e.getTime() <= s.getTime()) return { ok: false, message: "End time must be after start time" };
    return { ok: true };
  };

  const createSlot = async () => {
    const v = validateSlot(slot.startTime, slot.endTime);
    if (!v.ok) {
      alert(v.message);
      return;
    }

    const token = getToken();
    await axios.post(`${BASE_URL}/slots`, {
      startTime: new Date(slot.startTime).toISOString(),
      endTime: new Date(slot.endTime).toISOString()
    }, { headers: { Authorization: `Bearer ${token}` } });
    setSlot({ startTime: "", endTime: "" });
    refetch();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Provider Dashboard</h1>

      <div className="flex gap-2 mb-6">
        <input className="border p-2 rounded" type="datetime-local"
          value={slot.startTime} onChange={e => setSlot({ ...slot, startTime: e.target.value })} />
        <input className="border p-2 rounded" type="datetime-local"
          value={slot.endTime} onChange={e => setSlot({ ...slot, endTime: e.target.value })} />
        <button className="bg-blue-600 text-white px-4 rounded" onClick={createSlot}>Add Slot</button>
      </div>

      <div>
        <h2 className="text-xl mb-2">Your Slots</h2>
        {slots?.map((s: any) => (
          <div key={s.id} className="border p-2 rounded mb-2 flex justify-between">
            <span>{new Date(s.startTime).toLocaleString()} - {new Date(s.endTime).toLocaleString()}</span>
            <span className={`px-2 py-1 rounded ${s.status === 'booked' ? 'bg-red-300' : 'bg-green-300'}`}>
              {s.status}
            </span>
          </div>
        ))}
      </div>
      <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded" onClick={() => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        window.location.href = "/login";
      }}>
        Logout
      </button>
    </div>
  );
}
