import Link from "next/link";

export default function Footer() {
  return (
    <footer className="snap-start bg-neutral-100 dark:bg-neutral-900 border-t border-gray-200 dark:border-neutral-800 mt-12">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:justify-between">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-sky-500 text-white text-xl font-bold shadow-lg">
                ⚡
              </div>
              <div>
                <div className="font-semibold">Villakazi Jasiri Scouts</div>
                <div className="text-sm text-gray-600 dark:text-neutral-400">
                  Motto: Service, Progress, Play.
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-700 dark:text-neutral-300">
              <div>
                Contact:{" "}
                <a
                  className="underline"
                  href="mailto:villakazijasiriscouts@gmail.com"
                >
                  villakazijasiriscouts@gmail.com
                </a>
              </div>
              <div>Location: Kasarani Sub-County, Nairobi</div>
              <div className="mt-2">Social: @villakazi_jasiri_scout</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
            <div>
              <div className="font-semibold">Quick Links</div>
              <ul className="mt-2 text-sm space-y-2">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/about">About</Link>
                </li>
                <li>
                  <Link href="/patrols">Patrols</Link>
                </li>
                <li>
                  <Link href="/events">Events</Link>
                </li>
              </ul>
            </div>
            <div>
              <div className="font-semibold">Community</div>
              <ul className="mt-2 text-sm space-y-2">
                <li>
                  <Link href="/leadership">Leadership</Link>
                </li>
                <li>
                  <Link href="/gallery">Gallery</Link>
                </li>
                <li>
                  <Link href="/blog">Blog</Link>
                </li>
              </ul>
            </div>
            <div>
              <div className="font-semibold">Support</div>
              <ul className="mt-2 text-sm space-y-2">
                <li>
                  <a href="#">WhatsApp</a>
                </li>
                <li>
                  <a href="#">Volunteer</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 dark:border-neutral-800 pt-4 text-xs text-gray-600 dark:text-neutral-500">
          <div>
            © {new Date().getFullYear()} Villakazi Jasiri Scouts — In
            partnership with Kenya Scouts Association
          </div>
        </div>
      </div>
    </footer>
  );
}
