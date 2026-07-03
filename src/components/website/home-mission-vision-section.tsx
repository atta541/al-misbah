import {
  missionVisionCards,
  missionVisionSection,
} from "@/content/mission-vision";

export function HomeMissionVisionSection() {
  return (
    <section className="border-t border-border bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
            {missionVisionSection.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.5rem]">
            {missionVisionSection.heading}
          </h2>
          <p className="mt-4 text-base leading-7 text-muted sm:text-lg">
            {missionVisionSection.description}
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {missionVisionCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <article
                key={card.id}
                className="group relative overflow-hidden rounded-[1.75rem] border border-border/70 bg-white p-8 shadow-[0_18px_50px_-24px_rgba(15,92,76,0.35)] transition duration-300 hover:-translate-y-1 hover:border-brand/20 hover:shadow-[0_28px_60px_-24px_rgba(15,92,76,0.28)] sm:p-10"
              >
                <div
                  className={[
                    "pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full opacity-60 blur-3xl transition duration-300 group-hover:opacity-90",
                    index === 0 ? "bg-brand/15" : "bg-accent/20",
                  ].join(" ")}
                />

                <div className="relative flex items-start gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand-light text-white shadow-lg shadow-brand/25 transition duration-300 group-hover:scale-105">
                    <Icon className="h-7 w-7" aria-hidden />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                      {index === 0 ? "Purpose" : "Direction"}
                    </p>
                    <h3 className="mt-2 text-2xl font-bold tracking-tight text-foreground">
                      {card.title}
                    </h3>
                  </div>
                </div>

                <p className="relative mt-6 text-[15px] leading-8 text-muted">
                  {card.description}
                </p>

                <div className="relative mt-8 h-px w-full bg-gradient-to-r from-brand/30 via-accent/40 to-transparent" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
