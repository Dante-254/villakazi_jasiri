const TIMELINE = [
  {
    year: "1910",
    title: "Scouting arrives in Kenya",
    text: "The Kenya Scouts Association is established — one of the first Scout movements on the continent. A century-long legacy of disciplined, values-driven youth development begins.",
  },
  {
    year: "2016",
    title: "Villakazi is founded",
    text: "A small, community-rooted Rover Crew is founded in Kasarani, Nairobi, under the Kenya Scouts Association — built on the founding principles of voluntary, non-political and non-discriminatory youth development.",
  },
  {
    year: "2023",
    title: "The 1st Africa Rover Moot",
    text: "Kenya hosts the historic first Africa Rover Moot at Rowallan Scouts Camp — gathering 2,500+ young adults from over 40 countries. Villakazi rovers join this continental movement for service and leadership.",
  },
  {
    year: "2026",
    title: "#VILLAKAZI@10 — A decade of service",
    text: "The crew marks its 10th anniversary under the banner #VILLAKAZI@10, celebrating a decade of community transformation under the motto 'Service and Progress'.",
  },
];

const VALUES = [
  {
    title: "Character Building",
    text: "Integrity, responsibility and the Scout Promise and Law practised daily — shaping young people who are trustworthy in word and deed.",
  },
  {
    title: "Leadership Acquisition",
    text: "Real responsibility, not theory: planning camps, leading patrols, running service projects and chairing crew councils.",
  },
  {
    title: "Outdoor Survival",
    text: "Bushcraft, camping, hiking and first aid — the outdoor skills that build confidence, resilience and self-reliance.",
  },
  {
    title: "Environmental Preservation",
    text: "Tree planting, clean-ups and conservation alongside national campaigns — caring for the planet as part of active citizenship.",
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Hero */}
      <section className="text-center max-w-3xl mx-auto">
        <p className="text-xs uppercase tracking-[0.35em] text-green-700 dark:text-green-400">
          Villakazi Rover Crew · Kasarani, Nairobi
        </p>
        <h1 className="mt-4 text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
          About Villakazi Jasiri Scouts
        </h1>
        <p className="mt-5 text-lg leading-8 text-gray-600 dark:text-neutral-300">
          A community-rooted Rover Crew of the Kenya Scouts Association — turning
          young adults into responsible, adventurous citizens. Ten years of
          service, under the motto{" "}
          <span className="font-semibold text-green-700 dark:text-green-400">
            &ldquo;Service and Progress&rdquo;
          </span>
          .
        </p>
      </section>

      {/* Our Story */}
      <section className="mt-20 grid gap-10 lg:grid-cols-2 lg:items-start">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Our Story
          </h2>
          <div className="mt-5 space-y-4 text-gray-600 dark:text-neutral-300 leading-7">
            <p>
              The Villakazi Scouts — officially the{" "}
              <strong>Villakazi Rover Scouts</strong> — began in 2016 in the
              Kasarani neighbourhood of Nairobi. From the very first campfire, the
              crew held fast to Scouting&rsquo;s founding values: a voluntary,
              non-political and non-discriminatory space where young people grow
              by serving others.
            </p>
            <p>
              It is a locally rooted group, but its ambitions reach far beyond one
              neighbourhood. Villakazi is part of a national story that stretches
              back to 1910, when the Kenya Scouts Association first took root in
              the country — and of a global brotherhood that now counts millions
              of members.
            </p>
            <p>
              In May 2026 the crew celebrated{" "}
              <strong>ten years of service</strong> under the commemorative banner{" "}
              <span className="font-semibold text-green-700 dark:text-green-400">
                #VILLAKAZI@10
              </span>
              , marking a decade of community transformation led by young people,
              for young people.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 dark:border-neutral-800 dark:bg-neutral-900">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-neutral-400">
            Who we serve
          </h3>
          <p className="mt-4 text-gray-700 dark:text-neutral-200 leading-7">
            We welcome every age group, but Villakazi is best known for its{" "}
            <strong>Jasiri Scouts</strong> — the Rover section for young adults
            aged <strong>19 to 26</strong>. It is where school leavers, students
            and young professionals find a crew that takes them seriously:
            training them to lead, serve and care for the world around them.
          </p>
          <p className="mt-4 text-gray-700 dark:text-neutral-200 leading-7">
            Programmes focus intensely on character building, leadership
            acquisition, outdoor survival and environmental preservation —
            practical education that carries beyond the campsite and into civic
            life.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="mt-20">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Key Milestones
        </h2>
        <div className="mt-8 space-y-6">
          {TIMELINE.map((item) => (
            <div
              key={item.year}
              className="relative flex flex-col gap-2 rounded-xl border border-gray-200 p-6 pl-24 dark:border-neutral-800 sm:flex-row sm:items-center sm:gap-8"
            >
              <div className="absolute left-6 top-6 sm:static">
                <span className="rounded-full bg-green-700 px-4 py-1.5 text-sm font-bold text-white">
                  {item.year}
                </span>
              </div>
              <div className="sm:flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-gray-600 dark:text-neutral-300 leading-7">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Core philosophy */}
      <section className="mt-20">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          What We Stand For
        </h2>
        <p className="mt-3 max-w-2xl text-gray-600 dark:text-neutral-300 leading-7">
          Four pillars shape every programme, camp and community project the crew
          undertakes.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {VALUES.map((v) => (
            <div
              key={v.title}
              className="rounded-2xl border border-gray-200 p-7 dark:border-neutral-800"
            >
              <div className="flex items-center gap-3">
                <div className="h-2.5 w-2.5 rounded-full bg-green-600" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {v.title}
                </h3>
              </div>
              <p className="mt-3 text-gray-600 dark:text-neutral-300 leading-7">
                {v.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership */}
      <section className="mt-20 grid gap-10 lg:grid-cols-2 lg:items-start">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Guided by Scouters
          </h2>
          <div className="mt-5 space-y-4 text-gray-600 dark:text-neutral-300 leading-7">
            <p>
              None of this happens by accident. The crew is guided by dedicated
              adult Scouters who serve as{" "}
              <strong>&ldquo;shepherds&rdquo;</strong> — walking alongside young
              adults and helping them transition smoothly into responsible civic
              life.
            </p>
            <p>
              Recognised leaders such as <strong>Scout Bobo</strong> and{" "}
              <strong>Edward Gacheru</strong> bring years of scouting wisdom to
              the crew — mentoring, disciplining with kindness and ensuring every
              rover is safe, challenged and growing.
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-green-700 p-8 text-white">
          <p className="text-xs uppercase tracking-[0.3em] text-green-200">
            Our motto
          </p>
          <p className="mt-4 text-3xl font-bold leading-snug">
            &ldquo;Service and Progress&rdquo;
          </p>
          <p className="mt-4 text-green-100 leading-7">
            Everything we do — every tree planted, every camp pitched, every
            younger scout mentored — moves towards these two words: serving the
            community, and growing as people.
          </p>
        </div>
      </section>

      {/* National alignment */}
      <section className="mt-20 rounded-2xl border border-gray-200 bg-gray-50 p-8 md:p-12 dark:border-neutral-800 dark:bg-neutral-900">
        <p className="text-xs uppercase tracking-[0.3em] text-green-700 dark:text-green-400">
          National alignment
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-gray-900 dark:text-white">
          Part of Something Bigger
        </h2>
        <div className="mt-6 grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              A century of Scouting
            </h3>
            <p className="mt-2 text-gray-600 dark:text-neutral-300 leading-7">
              Villakazi operates under the Kenya Scouts Association, whose
              history in Kenya dates back to <strong>1910</strong> — one of
              Africa&rsquo;s oldest and largest Scout movements.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Service on Huduma Day
            </h3>
            <p className="mt-2 text-gray-600 dark:text-neutral-300 leading-7">
              Every October, rovers join Kenya&rsquo;s national day of service —
              cleaning public spaces, planting trees and supporting local
              communities alongside the whole country.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              The Africa Rover Moot
            </h3>
            <p className="mt-2 text-gray-600 dark:text-neutral-300 leading-7">
              Kenya hosted the <strong>historic 1st Africa Rover Moot</strong> in
              2023, welcoming 2,500+ young adults from over 40 countries. It is
              the same continental brotherhood Villakazi rovers belong to.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-16 text-center">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Ready to join the crew?
        </h2>
        <p className="mt-3 text-gray-600 dark:text-neutral-300">
          If you&rsquo;re aged 19 to 26 and ready to serve, lead and explore —
          we&rsquo;d love to meet you at our next campfire.
        </p>
        <a
          href="/contact"
          className="mt-6 inline-block rounded-full bg-green-700 px-8 py-3 text-sm font-semibold text-white transition hover:bg-green-600"
        >
          Get in touch
        </a>
      </section>
    </div>
  );
}
