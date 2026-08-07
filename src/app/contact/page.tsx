"use client";
import { useState, type FormEvent } from "react";

const CREW_EMAIL = "villakazijasiriscouts@gmail.com";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subject = encodeURIComponent(
      `Message from the website — ${name || "a visitor"}`,
    );
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`,
    );
    window.location.href = `mailto:${CREW_EMAIL}?subject=${subject}&body=${body}`;
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <section className="rounded-[2rem] border border-neutral-200 bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-green-700 dark:text-green-400">
          Stay connected
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-neutral-900 dark:text-white">
          Get in touch with Villakazi Jasiri Scouts
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-neutral-600 dark:text-neutral-300">
          Whether you are a parent, partner, fellow scout, or someone who wants
          to join a service project, this is the best way to reach the crew.
        </p>
      </section>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-[1.75rem] border border-neutral-200 bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
        >
          <div className="grid gap-4">
            <label className="sr-only" htmlFor="name">
              Your name
            </label>
            <input
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              className="w-full rounded-full border border-neutral-200 px-4 py-3 outline-none focus:border-green-600 dark:border-neutral-700 dark:bg-neutral-800"
              placeholder="Your name"
            />
            <label className="sr-only" htmlFor="email">
              Your email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="w-full rounded-full border border-neutral-200 px-4 py-3 outline-none focus:border-green-600 dark:border-neutral-700 dark:bg-neutral-800"
              placeholder="Your email"
            />
            <label className="sr-only" htmlFor="message">
              Your message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              required
              className="min-h-[140px] w-full rounded-[1.25rem] border border-neutral-200 px-4 py-3 outline-none focus:border-green-600 dark:border-neutral-700 dark:bg-neutral-800"
              placeholder="Tell us what you need or how you would like to support the crew."
              rows={5}
            />
            <button type="submit" className="btn-primary w-fit">
              Send message <span className="ml-1">→</span>
            </button>
            <p className="text-xs leading-6 text-neutral-500 dark:text-neutral-400">
              Submitting opens your email app with the message ready to send to
              villakazijasiriscouts@gmail.com.
            </p>
          </div>
        </form>

        <div className="rounded-[1.75rem] border border-neutral-200 bg-neutral-50 p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
            Contact details
          </h2>
          <div className="mt-5 space-y-3 text-sm leading-7 text-neutral-600 dark:text-neutral-300">
            <div>
              <span className="font-semibold text-neutral-900 dark:text-white">
                Email:
              </span>{" "}
              {CREW_EMAIL}
            </div>
            <div>
              <span className="font-semibold text-neutral-900 dark:text-white">
                Location:
              </span>{" "}
              Kasarani Sub-County, Nairobi
            </div>
            <div>
              <span className="font-semibold text-neutral-900 dark:text-white">
                WhatsApp:
              </span>{" "}
              Available on request for event updates
            </div>
          </div>
          <div className="mt-6">
            <a href={`mailto:${CREW_EMAIL}`} className="btn-secondary">
              Email the crew
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
