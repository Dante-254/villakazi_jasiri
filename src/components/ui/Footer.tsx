import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-neutral-100 dark:bg-neutral-900 border-t border-gray-200 dark:border-neutral-800 mt-12">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-700 rounded-full text-white flex items-center justify-center font-bold">
                V
              </div>
              <div>
                <div className="font-semibold">Villakazi Jasiri Scouts</div>
                <div className="text-sm text-gray-600 dark:text-neutral-400">
                  Motto: "Service and Progress"
                </div>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-700 dark:text-neutral-300">
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
              <div className="mt-2">
                Social: @villakazi_jasiri_scout (Instagram, Facebook, TikTok, X)
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            <div>
              <div className="font-semibold">Quick Links</div>
              <ul className="mt-2 text-sm">
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
              <ul className="mt-2 text-sm">
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
              <ul className="mt-2 text-sm">
                <li>
                  <a href="#">WhatsApp (placeholder)</a>
                </li>
                <li>
                  <a href="#">Volunteer</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 dark:border-neutral-800 pt-4 text-xs text-gray-600 dark:text-neutral-500">
          <div>
            © {new Date().getFullYear()} Villakazi Jasiri Scouts — In
            partnership with Kenya Scouts Association
          </div>
        </div>
      </div>
    </footer>
  );
}
