"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About the Crew" },
  { href: "/patrols", label: "Patrols" },
  { href: "/rovering", label: "Rovering Explained" },
  { href: "/laws", label: "Kenya Scouts Laws & Structure" },
  { href: "/gallery", label: "Gallery" },
  { href: "/leadership", label: "Leadership / Crew Council" },
  { href: "/events", label: "Events" },
  { href: "/blog", label: "Blog / Announcements" },
  { href: "/contact", label: "Contact" },
  { href: "/admin", label: "Admin" },
];

export default function Header() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement | null>(null);

  // show compact primary: first 4 links; rest go into More
  const primary = NAV_LINKS.slice(0, 4);
  const more = NAV_LINKS.slice(4);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!moreRef.current) return;
      if (!moreRef.current.contains(e.target as Node)) setMoreOpen(false);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-black/60 backdrop-blur-md border-b border-gray-200 dark:border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
            <Image
            src="/jasiri_logo.webp"
            alt="Villakazi Jasiri Scouts Logo"
            width={48}
            height={48}
            className="rounded-full"
            />
          <div className="min-w-[220px]">
            <div className="text-lg font-semibold">Villakazi Jasiri Scouts</div>
            <div className="text-xs text-gray-600 dark:text-neutral-400">
              Kasarani | Kenya Scouts Association
            </div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-3">
          {primary.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-3 py-2 rounded-md text-sm hover:scale-105 transition ${
                isActive(l.href)
                  ? "bg-green-700 text-white"
                  : "text-gray-700 dark:text-neutral-200"
              }`}
            >
              <span className="hidden lg:inline">{l.label}</span>
              <span className="inline lg:hidden">{l.label.split(" ")[0]}</span>
            </Link>
          ))}

          <div className="relative" ref={moreRef}>
            <button
              onClick={() => setMoreOpen((s) => !s)}
              onKeyDown={(e) => e.key === "Escape" && setMoreOpen(false)}
              className="px-3 py-2 rounded-md text-sm text-gray-700 dark:text-neutral-200 hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
              aria-expanded={moreOpen}
            >
              More ▾
            </button>

            {moreOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded shadow-md z-50">
                {more.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={`block px-3 py-2 text-sm ${
                      isActive(l.href)
                        ? "bg-green-700 text-white"
                        : "text-gray-700 dark:text-neutral-200"
                    }`}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <ThemeToggle />
        </nav>

        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            aria-label="menu"
            onClick={() => setOpen(!open)}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-neutral-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white dark:bg-black border-t border-gray-200 dark:border-neutral-800">
          <div className="px-4 py-3 flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`px-3 py-2 rounded-md text-sm ${
                  isActive(l.href)
                    ? "bg-green-700 text-white"
                    : "text-gray-700 dark:text-neutral-200"
                }`}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
