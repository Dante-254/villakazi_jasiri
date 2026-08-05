import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { isAdminUser } from "@/lib/adminClaims";
import { getAdminEmails } from "@/lib/env";

function formatEventDate(value: string | null) {
  if (!value) return "TBD";
  return new Date(`${value}T00:00:00`).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function isPastEvent(value: string | null) {
  if (!value) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const eventDate = new Date(`${value}T00:00:00`);
  eventDate.setHours(0, 0, 0, 0);
  return eventDate < today;
}

function isNewEvent(value: string | null) {
  if (!value) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const eventDate = new Date(`${value}T00:00:00`);
  eventDate.setHours(0, 0, 0, 0);
  const diffDays = Math.round(
    (eventDate.getTime() - today.getTime()) / 86400000,
  );
  return diffDays >= 0 && diffDays <= 7;
}

export default async function EventCard({ event }: { event: any }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isAdmin = !!user && isAdminUser(user, getAdminEmails());
  const eventDate = formatEventDate(event.date);
  const past = isPastEvent(event.date);
  const newEvent = isNewEvent(event.date);
  const href = `/events/${event.slug || event.id}`;

  return (
    <article className="group relative overflow-hidden rounded-[1.75rem] border border-neutral-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl dark:border-neutral-800 dark:bg-neutral-900">
      <Link
        href={href}
        aria-label={`Open ${event.title}`}
        className="absolute inset-0 z-10"
      />
      <div className="relative h-56 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        {event.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={event.image_url}
            alt={event.title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-neutral-500">
            No image
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
        <div className="absolute left-4 top-4 z-20 flex flex-wrap gap-2">
          <span
            className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] ${past ? "bg-neutral-900/80 text-white" : "bg-green-700/90 text-white"}`}
          >
            {past ? "Past event" : newEvent ? "New event" : "Upcoming"}
          </span>
        </div>
      </div>

      <div className="relative z-20 p-5">
        <div className="flex items-center justify-between gap-3 text-sm text-neutral-500 dark:text-neutral-400">
          <span>{eventDate}</span>
          <span className="font-medium text-green-700 dark:text-green-400">
            Tap to explore
          </span>
        </div>
        <h3 className="mt-3 text-lg font-semibold text-neutral-900 dark:text-white">
          {event.title}
        </h3>
        <p className="mt-2 text-sm leading-7 text-neutral-600 dark:text-neutral-300">
          {event.description?.slice(0, 120)}
          {event.description && event.description.length > 120 ? "..." : ""}
        </p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="inline-flex items-center text-sm font-semibold text-green-700 dark:text-green-400">
            Read more <span className="ml-1">→</span>
          </span>
          {isAdmin ? (
            <Link
              href={`/admin/events/${event.slug || event.id}/edit`}
              className="btn-ghost z-20"
            >
              Edit
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
