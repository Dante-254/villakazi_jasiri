export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <section className="rounded-[2rem] border border-neutral-200 bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-green-700 dark:text-green-400">Stay connected</p>
        <h1 className="mt-3 text-3xl font-semibold text-neutral-900 dark:text-white">Get in touch with Villakazi Jasiri Scouts</h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-neutral-600 dark:text-neutral-300">
          Whether you are a parent, partner, fellow scout, or someone who wants to join a service project, this is the best way to reach the crew.
        </p>
      </section>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <form className="rounded-[1.75rem] border border-neutral-200 bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
          <div className="grid gap-4">
            <input className="w-full rounded-full border border-neutral-200 px-4 py-3 outline-none focus:border-green-600 dark:border-neutral-700 dark:bg-neutral-800" placeholder="Your name" />
            <input className="w-full rounded-full border border-neutral-200 px-4 py-3 outline-none focus:border-green-600 dark:border-neutral-700 dark:bg-neutral-800" placeholder="Your email" />
            <textarea className="min-h-[140px] w-full rounded-[1.25rem] border border-neutral-200 px-4 py-3 outline-none focus:border-green-600 dark:border-neutral-700 dark:bg-neutral-800" placeholder="Tell us what you need or how you would like to support the crew." rows={5} />
            <button className="btn-primary w-fit">Send message</button>
          </div>
        </form>

        <div className="rounded-[1.75rem] border border-neutral-200 bg-neutral-50 p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Contact details</h2>
          <div className="mt-5 space-y-3 text-sm leading-7 text-neutral-600 dark:text-neutral-300">
            <div><span className="font-semibold text-neutral-900 dark:text-white">Email:</span> villakazijasiriscouts@gmail.com</div>
            <div><span className="font-semibold text-neutral-900 dark:text-white">Location:</span> Kasarani Sub-County, Nairobi</div>
            <div><span className="font-semibold text-neutral-900 dark:text-white">WhatsApp:</span> Available on request for event updates</div>
          </div>
          <div className="mt-6">
            <a href="mailto:villakazijasiriscouts@gmail.com" className="btn-secondary">Email the crew</a>
          </div>
        </div>
      </div>
    </div>
  );
}
