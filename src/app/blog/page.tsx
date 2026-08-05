const ANNOUNCEMENTS = [
  {
    title: "Upcoming service and camp updates",
    text: "We will share new plans, reminders and field reports here as the crew prepares for each activity.",
  },
  {
    title: "Leadership reflections",
    text: "Short pieces from rovers and adults on lessons from camp, service and community engagement.",
  },
];

export default function BlogIndex() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <section className="rounded-[2rem] border border-neutral-200 bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-green-700 dark:text-green-400">Updates & announcements</p>
        <h1 className="mt-3 text-3xl font-semibold text-neutral-900 dark:text-white">A simple home for the crew’s stories and notices</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-neutral-600 dark:text-neutral-300">
          This space is being shaped as a living journal for crew news, field updates, and lessons from the road.
        </p>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        {ANNOUNCEMENTS.map((item) => (
          <div key={item.title} className="rounded-[1.75rem] border border-neutral-200 bg-neutral-50 p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-neutral-600 dark:text-neutral-300">{item.text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
