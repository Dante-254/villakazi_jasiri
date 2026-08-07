"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroClient() {
  return (
    <section className="relative flex h-screen snap-start items-center justify-center overflow-hidden bg-gradient-to-br from-green-950 via-green-800 to-emerald-950 text-white">
      <div className="pointer-events-none absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-green-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 right-1/4 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.35)_100%)]" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-xs font-semibold uppercase tracking-[0.4em] text-green-300"
        >
          Kenya Scouts · Jasiri Rover Crew
        </motion.p>
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mt-5 text-4xl font-bold sm:text-6xl"
        >
          Service and Progress
        </motion.h1>
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-4 max-w-2xl text-lg text-green-100/90 sm:text-2xl"
        >
          Villakazi Rover Crew — Kasarani Scouts Local Association. Adventure,
          service and leadership for Kenya&apos;s youth.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Link href="/about" className="btn-primary">
            Learn about the crew
          </Link>
          <Link href="/contact" className="btn-secondary">
            Join us <span className="ml-1">→</span>
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-green-200/70">
          <span className="text-[10px] font-semibold uppercase tracking-[0.35em]">
            Scroll
          </span>
          <span className="h-8 w-px bg-gradient-to-b from-green-200/70 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
