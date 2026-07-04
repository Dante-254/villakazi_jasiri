"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroClient() {
  return (
    <section className="snap-start h-screen flex items-center justify-center bg-gradient-to-br from-green-600 via-purple-600 to-yellow-400 text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-6xl font-bold"
        >
          Service and Progress
        </motion.h1>
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-lg sm:text-2xl"
        >
          Villakazi Rover Crew — Kasarani Scouts Local Association. Adventure,
          service and leadership for Kenya's youth.
        </motion.p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            href="/about"
            className="px-4 py-2 bg-white text-green-700 rounded-md font-semibold"
          >
            Learn More
          </Link>
          <Link
            href="/contact"
            className="px-4 py-2 border border-white/80 text-white rounded-md"
          >
            Join Us
          </Link>
        </div>
      </div>
    </section>
  );
}
