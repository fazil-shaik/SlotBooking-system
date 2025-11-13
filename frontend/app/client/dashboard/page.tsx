/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const BASE_URL = "http://localhost:4000/api";

export default function ClientDashboard() {
  // get auth token and parse JWT payload when needed
  const getToken = () => (typeof window !== "undefined" ? localStorage.getItem("token") : null);
  // (If you need the decoded user id, parse the JWT here.)

  const { data: slots, refetch } = useQuery({
    queryKey: ["available-slots"],
    // backend exposes GET /api/slots for available slots
    queryFn: async () => (await axios.get(`${BASE_URL}/slots`)).data
  });

  const bookSlot = async (slotId: number) => {
    const token = getToken();
    await axios.post(`${BASE_URL}/bookings`, { slotId }, { headers: { Authorization: `Bearer ${token}` } });
    refetch();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Available Slots</h1>
      {slots?.map((s: any) => (
        <div key={s.id} className="border p-2 rounded mb-2 flex justify-between">
          <div>
            <p>{new Date(s.startTime).toLocaleString()} - {new Date(s.endTime).toLocaleString()}</p>
            <p className="text-sm text-gray-500">Provider ID: {s.providerId}</p>
          </div>
          <button
            className="bg-green-600 text-white px-3 py-1 rounded"
            onClick={() => bookSlot(s.id)}
          >
            Book
          </button>
        </div>
      ))}
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded" onClick={() => refetch()}>
        Refresh Slots
      </button>
      <button className="mt-4 ml-4 bg-red-600 text-white px-4 py-2 rounded" onClick={() => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        window.location.href = "/login";
      }}>
        Logout
      </button>
    </div>
  );
}
