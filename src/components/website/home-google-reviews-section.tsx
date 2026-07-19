"use client";

import { useEffect, useRef } from "react";
import { googleReviews, googleReviewsSection } from "@/content/google-reviews";
import { getGsap } from "@/lib/gsap";

function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <svg key={index} viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
          <path
            fill={index < rating ? "#FBBC04" : "#e5e7eb"}
            d="M12 2l2.9 6.9H22l-5.5 4.1 2.1 6.9L12 16.8 5.4 19.9l2.1-6.9L2 8.9h7.1z"
          />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({
  review,
}: {
  review: (typeof googleReviews)[number];
}) {
  return (
    <article
      data-review-card
      className="flex h-full min-w-[280px] flex-col rounded-2xl border border-border/70 bg-white p-5 shadow-[0_14px_36px_-24px_rgba(15,92,76,0.35)] sm:min-w-0 sm:p-6"
    >
      <div className="flex items-start gap-3">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
          style={{ backgroundColor: review.avatarColor }}
        >
          {review.initials}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-foreground">{review.name}</p>
          <p className="text-xs text-muted">{review.date}</p>
        </div>
        <GoogleLogo className="h-5 w-5 shrink-0" />
      </div>

      <div className="mt-3">
        <StarRating rating={review.rating} />
      </div>

      <p className="mt-4 flex-1 text-sm leading-7 text-muted">{review.text}</p>

      <p className="mt-4 text-xs text-muted/80">Posted on Google</p>
    </article>
  );
}

export function HomeGoogleReviewsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const fullStars = Math.floor(googleReviewsSection.aggregateRating);
  const hasHalfStar =
    googleReviewsSection.aggregateRating - fullStars >= 0.5;

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const summary = summaryRef.current;
    const grid = gridRef.current;
    if (!section || !header || !summary || !grid) return;

    const { gsap } = getGsap();
    const cards = grid.querySelectorAll<HTMLElement>("[data-review-card]");

    const ctx = gsap.context(() => {
      gsap.from(header.children, {
        opacity: 0,
        y: 28,
        duration: 0.65,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: header,
          start: "top 85%",
          once: true,
        },
      });

      gsap.from(summary, {
        opacity: 0,
        y: 32,
        scale: 0.97,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: summary,
          start: "top 88%",
          once: true,
        },
      });

      gsap.from(cards, {
        opacity: 0,
        y: 40,
        scale: 0.96,
        duration: 0.65,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: grid,
          start: "top 82%",
          once: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="border-t border-border bg-white py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
            {googleReviewsSection.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {googleReviewsSection.heading}
          </h2>
          <p className="mt-4 text-base leading-7 text-muted sm:text-lg">
            {googleReviewsSection.description}
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-xl">
          <div
            ref={summaryRef}
            className="flex flex-col items-center gap-4 rounded-[1.5rem] border border-border/70 bg-white px-6 py-5 text-center shadow-sm sm:flex-row sm:justify-center sm:gap-6 sm:text-left"
          >
            <GoogleLogo className="h-10 w-10" />
            <div>
              <p className="text-sm font-medium text-muted">Google Reviews</p>
              <p className="mt-1 text-lg font-bold text-foreground">
                {googleReviewsSection.businessName}
              </p>
            </div>
            <div className="hidden h-10 w-px bg-border sm:block" />
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center gap-2 sm:justify-start">
                <span className="text-3xl font-bold text-foreground">
                  {googleReviewsSection.aggregateRating.toFixed(1)}
                </span>
                <StarRating rating={fullStars + (hasHalfStar ? 1 : 0)} />
              </div>
              <p className="mt-1 text-sm text-muted">
                Based on {googleReviewsSection.totalReviews} reviews
              </p>
            </div>
          </div>
        </div>

        <div
          ref={gridRef}
          className="mt-10 flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-3 [&::-webkit-scrollbar]:hidden"
        >
          {googleReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-muted">
          Sample reviews shown for demonstration. Replace with verified Google
          reviews when available.
        </p>
      </div>
    </section>
  );
}
