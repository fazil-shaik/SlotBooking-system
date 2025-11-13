"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, DollarSign } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-blue-50">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold text-gray-900 mb-4"
        >
          Schedule Smarter. Connect Faster.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg text-gray-600 max-w-2xl"
        >
          A seamless platform for professionals and clients to book and manage
          video meeting slots — all in one place.
        </motion.p>

        <div className="flex gap-4 mt-8">
          <Link href="/register?role=provider">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-3 rounded-xl shadow-md">
              Join as Provider
            </Button>
          </Link>
          <Link href="/register?role=client">
            <Button variant="outline" className="text-lg px-6 py-3 rounded-xl">
              Join as Client
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-900 mb-10">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-2xl shadow-md border bg-gray-50"
            >
              <Calendar className="mx-auto text-blue-600 w-10 h-10 mb-3" />
              <h3 className="font-semibold text-lg mb-2">Easy Slot Management</h3>
              <p className="text-gray-600">
                Providers can easily publish their available slots with start and end times.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-2xl shadow-md border bg-gray-50"
            >
              <Clock className="mx-auto text-blue-600 w-10 h-10 mb-3" />
              <h3 className="font-semibold text-lg mb-2">Instant Bookings</h3>
              <p className="text-gray-600">
                Clients can instantly book any available slot with transparent pricing.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-2xl shadow-md border bg-gray-50"
            >
              <DollarSign className="mx-auto text-blue-600 w-10 h-10 mb-3" />
              <h3 className="font-semibold text-lg mb-2">Automatic Cost Calculation</h3>
              <p className="text-gray-600">
                Costs are dynamically calculated based on the provider’s hourly rate.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-blue-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-900 mb-10">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-10 text-left">
            {[
              {
                step: "1",
                title: "Sign Up",
                desc: "Create an account as a Provider or Client — it takes less than a minute.",
              },
              {
                step: "2",
                title: "Create or Browse Slots",
                desc: "Providers add availability, clients browse and pick suitable times.",
              },
              {
                step: "3",
                title: "Book & Connect",
                desc: "Booking confirms instantly — both sides get meeting details.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="p-6 bg-white rounded-2xl shadow-md border"
              >
                <div className="text-blue-600 text-4xl font-bold mb-3">{item.step}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <footer className="py-16 bg-gray-900 text-center text-white">
        <h2 className="text-3xl font-semibold mb-4">Start Scheduling Smarter Today</h2>
        <p className="text-gray-300 mb-6">
          Join now and streamline your booking experience.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/register?role=provider">
            <Button className="bg-blue-600 hover:bg-blue-700 text-lg px-6 py-3 rounded-xl">
              Get Started
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" className="text-lg px-6 py-3 rounded-xl border-gray-400">
              Login
            </Button>
          </Link>
        </div>
      </footer>
    </div>
  );
}
