import {
  KSA_LAWS,
  SCOUT_PROMISE,
  PROMISE_POINTS,
  MOTTO,
  AGE_SECTIONS,
  SCOUT_METHOD,
} from "../../data/laws";

export default function LawsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <section className="relative overflow-hidden rounded-[2rem] border border-green-900 bg-gradient-to-br from-green-700 via-green-800 to-green-950 p-8 text-white shadow-sm sm:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-green-200">
          Kenya Scouts Law & structure
        </p>
        <h1 className="mt-3 max-w-2xl text-3xl font-semibold sm:text-5xl">
          The code that shapes our way of life
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-green-50">
          Scouting is grounded in a simple but powerful promise and law. They guide how we serve, how we
          lead, and how we carry ourselves in camp, at school, and in the community. Every Jasiri crew
          member lives by these ten laws.
        </p>
        <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-green-400/40 bg-green-950/40 px-6 py-3">
          <span className="text-sm font-semibold uppercase tracking-widest text-green-100">
            Motto — {MOTTO.national}
          </span>
          <span className="h-1 w-1 rounded-full bg-green-300" />
          <span className="text-sm font-semibold uppercase tracking-widest text-green-100">
            Rover call — {MOTTO.rover}
          </span>
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[1.75rem] border border-neutral-200 bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-green-700 dark:text-green-400">
            The Scout Promise
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-neutral-900 dark:text-white">
            A personal commitment
          </h2>
          <blockquote className="mt-5 border-l-4 border-green-600 pl-5 text-base italic leading-8 text-neutral-700 dark:text-neutral-200">
            {SCOUT_PROMISE}
          </blockquote>
          <ul className="mt-6 space-y-3 text-sm leading-7 text-neutral-600 dark:text-neutral-300">
            {PROMISE_POINTS.map((point) => (
              <li key={point} className="flex gap-3">
                <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-green-600" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[1.75rem] border border-neutral-200 bg-neutral-50 p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-green-700 dark:text-green-400">
            The Scout Method
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-neutral-900 dark:text-white">
            How we learn
          </h2>
          <div className="mt-5 space-y-4">
            {SCOUT_METHOD.map((item, idx) => (
              <div key={item.title} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-700 text-sm font-bold text-white">
                  {idx + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-white">{item.title}</h3>
                  <p className="mt-1 text-sm leading-7 text-neutral-600 dark:text-neutral-300">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-[1.75rem] border border-neutral-200 bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-green-700 dark:text-green-400">
          The Scout Law — Kenya
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-neutral-900 dark:text-white">
          Ten laws, one way of life
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-600 dark:text-neutral-300">
          Every Scout in Kenya promises to uphold these ten laws of the Kenya Scouts Association. They are
          simple to read and demanding to live — that is the point.
        </p>
        <ol className="mt-6 grid gap-4 md:grid-cols-2">
          {KSA_LAWS.map((law, idx) => (
            <li
              key={law.title}
              className="flex items-start gap-4 rounded-[1.25rem] border border-neutral-200 bg-neutral-50 p-5 transition-colors hover:border-green-600 hover:bg-green-50 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-green-500 dark:hover:bg-neutral-700"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-700 text-lg font-bold text-white">
                {idx + 1}
              </span>
              <div>
                <h3 className="font-semibold text-neutral-900 dark:text-white">{law.title}</h3>
                <p className="mt-1 text-sm leading-7 text-neutral-600 dark:text-neutral-300">
                  {law.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10 rounded-[1.75rem] border border-neutral-200 bg-neutral-50 p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-green-700 dark:text-green-400">
          Our sections
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-neutral-900 dark:text-white">
          The structure of Kenyan Scouting
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-600 dark:text-neutral-300">
          The Kenya Scouts Association organises its members into age-based sections. Each section builds on
          the last, from first campfire to crew leadership.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {AGE_SECTIONS.map((section) => (
            <div
              key={section.name}
              className="flex flex-col rounded-[1.25rem] border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-700 dark:bg-neutral-800"
            >
              <h3 className="font-semibold text-neutral-900 dark:text-white">{section.name}</h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-green-700 dark:text-green-400">
                {section.age}
              </p>
              <p className="mt-3 text-sm leading-7 text-neutral-600 dark:text-neutral-300">
                {section.focus}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-start gap-4 rounded-[1.25rem] border border-green-200 bg-green-50 p-5 dark:border-green-800 dark:bg-green-950/40">
          <span className="mt-1 h-3 w-3 shrink-0 rounded-full bg-green-600" />
          <p className="text-sm leading-7 text-neutral-700 dark:text-neutral-200">
            Villakazi Jasiri is a Rover crew — the <strong>Jasiri Rovers</strong> section for young adults
            aged 18 to 26. We carry the Promise and Law from our section into full community service.
          </p>
        </div>
      </section>
    </div>
  );
}
