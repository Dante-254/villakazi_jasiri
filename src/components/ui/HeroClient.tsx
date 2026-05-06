"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroClient() {
  return (
    <section className="snap-start min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.17),transparent_25%)] text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <div className="absolute inset-x-1/4 top-10 h-40 rounded-full bg-emerald-500/10 blur-3xl" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[2rem] border border-slate-200/70 bg-white/90 p-10 shadow-2xl shadow-slate-900/10 backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-900/95"
        >
          <span className="inline-flex rounded-full bg-emerald-600/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.32em] text-emerald-800 dark:text-emerald-200">
            Scout Spotlight
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
            Service, progress and playful leadership
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
            Villakazi Jasiri Scouts brings together adventure, community service
            and modern scouting values for youth across Nairobi.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/events"
              className="inline-flex rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-500"
            >
              Explore events
            </Link>
            <Link
              href="/gallery"
              className="inline-flex rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:hover:border-slate-500"
            >
              View gallery
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
