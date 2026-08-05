import LEADERS from "../../data/leadership";

export default function LeadershipPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <section className="rounded-[2rem] border border-neutral-200 bg-gradient-to-br from-neutral-900 to-neutral-700 p-8 text-white shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-green-200">Leadership & crew council</p>
        <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">The people who guide, mentor and challenge the crew</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-neutral-200">
          Leadership in Villakazi is practical. Our advisors, elected leaders and mentors create structure without losing the spirit of youth-led service.
        </p>
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        {LEADERS.map((leader) => (
          <div key={leader.id} className="rounded-[1.75rem] border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <div className="flex gap-4">
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full border border-neutral-200 bg-neutral-100 dark:border-neutral-700">
                {leader.image ? (
                  <img src={leader.image} alt={leader.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-lg font-semibold text-green-700">{leader.name.charAt(0)}</div>
                )}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">{leader.name}</h2>
                <p className="mt-1 text-sm font-medium text-green-700 dark:text-green-400">{leader.role}</p>
                <p className="mt-3 text-sm leading-7 text-neutral-600 dark:text-neutral-300">{leader.bio}</p>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="mt-10 rounded-[1.75rem] border border-neutral-200 bg-neutral-50 p-8 dark:border-neutral-800 dark:bg-neutral-900">
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">What good leadership looks like here</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-[1.25rem] bg-white p-5 shadow-sm dark:bg-neutral-800">
            <h3 className="font-semibold text-neutral-900 dark:text-white">Mentorship</h3>
            <p className="mt-2 text-sm leading-7 text-neutral-600 dark:text-neutral-300">Experienced adults help rovers grow without taking over their responsibility.</p>
          </div>
          <div className="rounded-[1.25rem] bg-white p-5 shadow-sm dark:bg-neutral-800">
            <h3 className="font-semibold text-neutral-900 dark:text-white">Shared decision-making</h3>
            <p className="mt-2 text-sm leading-7 text-neutral-600 dark:text-neutral-300">The crew council helps young people learn how to plan, discuss and act together.</p>
          </div>
          <div className="rounded-[1.25rem] bg-white p-5 shadow-sm dark:bg-neutral-800">
            <h3 className="font-semibold text-neutral-900 dark:text-white">Service-first leadership</h3>
            <p className="mt-2 text-sm leading-7 text-neutral-600 dark:text-neutral-300">Every role is ultimately about making the community stronger and safer.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
