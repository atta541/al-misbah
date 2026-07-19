"use client";

import Image from "next/image";
import { useState } from "react";
import {
  collaborationPartners,
  collaborationsSection,
  type CollaborationPartner,
} from "@/content/collaborations";

function PartnerSlide({ partner }: { partner: CollaborationPartner }) {
  return (
    <div className="flex h-20 w-52 shrink-0 items-center justify-center px-6 sm:h-24 sm:w-60">
      {partner.logoUrl ? (
        <Image
          src={partner.logoUrl}
          alt={partner.name}
          width={180}
          height={64}
          className="max-h-12 w-auto object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 sm:max-h-14"
        />
      ) : (
        <span className="text-center text-sm font-semibold tracking-wide text-muted transition duration-300 hover:text-brand-dark sm:text-base">
          {partner.name}
        </span>
      )}
    </div>
  );
}

export function HomeCollaborationsSection() {
  const [paused, setPaused] = useState(false);

  if (collaborationPartners.length === 0) {
    return null;
  }

  const loop = [...collaborationPartners, ...collaborationPartners];

  return (
    <section className="border-t border-border bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-[90rem] px-3 sm:px-5 lg:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="hidden h-px w-16 bg-accent sm:block sm:w-20" />
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
              {collaborationsSection.eyebrow}
            </p>
            <span className="hidden h-px w-16 bg-accent sm:block sm:w-20" />
          </div>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-brand-dark sm:text-3xl">
            {collaborationsSection.title}
          </h2>
        </div>
      </div>

      <div
        className="relative mt-10 overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        aria-label={collaborationsSection.title}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-28"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-28"
        />

        <div
          className={[
            "flex w-max items-center gap-2 sm:gap-4",
            "animate-collaborations-marquee-rtl",
            paused ? "[animation-play-state:paused]" : "",
            "motion-reduce:animate-none",
          ].join(" ")}
        >
          {loop.map((partner, index) => (
            <PartnerSlide
              key={`${partner.id}-${index}`}
              partner={partner}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
