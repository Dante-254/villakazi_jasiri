import KSA_LAWS from "../../data/laws";

const PROMISE_POINTS = [
  "I promise on my honour to do my best to do my duty to God and my country.",
  "To help other people at all times.",
  "To obey the Scout Law.",
];

const STRUCTURE_POINTS = [
  {
    title: "The Scout Association",
    text: "The Kenya Scouts Association provides the national framework, training, and values that guide every crew and group.",
  },
  {
    title: "The Rover Section",
    text: "Rovers are young adults who move from learning to leading, bringing service, initiative and responsibility into community life.",
  },
  {
    title: "The Crew Council",
    text: "Every crew makes decisions together, and that shared responsibility is one of the strongest lessons in Scouting.",
  },
];

export default function LawsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <section className="rounded-[2rem] border border-neutral-200 bg-gradient-to-br from-green-700 to-green-900 p-8 text-white shadow-sm dark:border-neutral-800">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-green-100">Kenya Scouts Laws & structure</p>
        <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">The code that shapes our way of life</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-green-50">
          Scouting is grounded in a simple but powerful promise and law. They guide how we serve, how we lead, and how we carry ourselves in camp, at school, and in the community.
        </p>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[1.75rem] border border-neutral-200 bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">The Scout Promise</h2>
          <ul className="mt-5 space-y-3 text-sm leading-7 text-neutral-600 dark:text-neutral-300">
            {PROMISE_POINTS.map((point) => (
              <li key={point} className="flex gap-3">
                <span className="mt-2 h-2.5 w-2.5 rounded-full bg-green-600" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[1.75rem] border border-neutral-200 bg-neutral-50 p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">How the structure works</h2>
          <div className="mt-5 space-y-4">
            {STRUCTURE_POINTS.map((item) => (
              <div key={item.title}>
                <h3 className="font-semibold text-neutral-900 dark:text-white">{item.title}</h3>
                <p className="mt-1 text-sm leading-7 text-neutral-600 dark:text-neutral-300">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-[1.75rem] border border-neutral-200 bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">The Scout Law in action</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {KSA_LAWS.map((law, idx) => (
            <details key={idx} className="rounded-[1.25rem] border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-800">
              <summary className="cursor-pointer font-semibold text-neutral-900 dark:text-white">{law.title}</summary>
              <p className="mt-3 text-sm leading-7 text-neutral-600 dark:text-neutral-300">{law.text}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
