import { getSupabaseServer } from "@/lib/supabaseServer";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { isAdminUser } from "@/lib/adminClaims";
import { getAdminEmails } from "@/lib/env";

function formatEventDate(value: string | null) {
  if (!value) return "TBD";
  return new Date(`${value}T00:00:00`).toLocaleDateString(undefined, {
    month: "long",
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

export default async function EventDetail({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("slug", resolvedParams.slug)
    .limit(1)
    .single();

  if (error || !data) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-2xl font-semibold">Event not found</h1>
        <p className="mt-4 text-gray-600">
          We could not find the event you requested.
        </p>
      </div>
    );
  }

  const event = data;
  const eventDate = formatEventDate(event.date);
  const past = isPastEvent(event.date);
  const adminClient = await createClient();
  const {
    data: { user },
  } = await adminClient.auth.getUser();
  const isAdmin = !!user && isAdminUser(user, getAdminEmails());

  return (
    <div className="mx-auto max-w-7xl px-0 py-0 sm:px-0">
      <section className="relative isolate overflow-hidden">
        <div className="relative min-h-[640px] overflow-hidden lg:rounded-b-[2rem]">
          {event.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={event.image_url}
              alt={event.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-green-800 via-green-900 to-neutral-900" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-black/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />

          <div className="relative flex min-h-[640px] items-end px-6 py-8 sm:px-8 lg:px-10">
            <div className="w-full max-w-3xl rounded-[2rem] border border-white/20 bg-black/25 p-6 backdrop-blur-md sm:p-8">
              <Link
                href="/events"
                className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-green-100 transition hover:text-white"
              >
                <span aria-hidden="true" className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10">
                  ←
                </span>
                <span>Back to events</span>
              </Link>
              <div className="flex flex-wrap gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] ${past ? "bg-neutral-900/80 text-white" : "bg-green-700/90 text-white"}`}
                >
                  {past ? "Past event" : "Upcoming event"}
                </span>
                <span className="rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/90">
                  {eventDate}
                </span>
              </div>
              <h1 className="mt-6 text-4xl font-bold leading-tight text-white md:text-5xl">
                {event.title}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-white/90 md:text-lg">
                {event.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={`/gallery?event=${event.slug}`}
                  className="btn-primary"
                >
                  Open gallery
                </Link>
                {isAdmin ? (
                  <Link
                    href={`/admin/events/${event.slug}/edit`}
                    className="btn-secondary"
                  >
                    Edit event
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="rounded-[2rem] border border-neutral-200 bg-neutral-50 p-8 dark:border-neutral-800 dark:bg-neutral-900">
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">
            Why this event matters
          </h2>
          <p className="mt-3 text-base leading-8 text-neutral-600 dark:text-neutral-300">
            This space is designed to keep the crew informed, prepared and
            connected. Whether it is a service day, camp or special meeting, the
            details here help everyone know what is coming and how to take part.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700 dark:border-green-900 dark:bg-green-950/40 dark:text-green-300">
              {past ? "Reflecting on past learning" : "Planning ahead together"}
            </span>
            <span className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200">
              {event.location || "Community-based activity"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
