import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectBeneficiariesSection } from "@/components/website/project-beneficiaries-section";
import { ProjectDetailHero } from "@/components/website/project-detail-hero";
import { ProjectFaqSection } from "@/components/website/project-faq-section";
import { ProjectGalleryCarousel } from "@/components/website/project-gallery-carousel";
import { RevealOnScroll } from "@/components/website/reveal-on-scroll";
import { RichTextContent } from "@/components/website/rich-text-content";
import { PAGE_CONTENT_OFFSET_CLASS } from "@/lib/nav-layout";
import { websiteRoutes } from "@/lib/routes";
import { projectService } from "@/services/project.service";

export const revalidate = 3600;

type ProjectDetailPageProps = {
  params: Promise<{ slug: string }>;
};

function formatDate(value?: Date | string | null) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export async function generateStaticParams() {
  const projects = await projectService.listPublishedSlugs();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = await projectService.getBySlug(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: `${project.title} | Al-Misbah Center`,
    description: project.shortDescription,
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = await projectService.getBySlug(slug);

  if (!project) {
    notFound();
  }

  const startDate = formatDate(project.startDate);
  const endDate = formatDate(project.endDate);

  // Client components cannot receive Prisma Decimal — serialize prices first.
  const categories = project.categories.map((category) => ({
    id: category.id,
    name: category.name,
    description: category.description,
    price: Number(category.price),
    priceTo: category.priceTo != null ? Number(category.priceTo) : null,
    isActive: category.isActive,
  }));

  const faqs = project.faqs.map((faq) => ({
    id: faq.id,
    question: faq.question,
    answer: faq.answer,
  }));

  const beneficiaries = project.beneficiaries.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    icon: item.icon,
  }));

  const images = project.images.map((image) => ({
    id: image.id,
    imageUrl: image.imageUrl,
    caption: image.caption,
  }));

  return (
    <article
      className={`bg-white pb-16 sm:pb-24 ${PAGE_CONTENT_OFFSET_CLASS}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ProjectDetailHero
          project={{
            id: project.id,
            title: project.title,
            slug: project.slug,
            currency: project.currency,
            featuredImage: project.featuredImage,
            shortDescription: project.shortDescription,
            location: project.location,
          }}
          categories={categories}
          startDateLabel={startDate}
          endDateLabel={endDate}
        />

        <RevealOnScroll
          className="mx-auto mt-14 max-w-3xl border-t border-border pt-12 sm:mt-16"
          target="[data-desc-block]"
          y={32}
          stagger={0.12}
        >
          <section data-desc-block>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Full description
            </h2>
            <div className="mt-6">
              <RichTextContent html={project.description} />
            </div>
          </section>
        </RevealOnScroll>

        <ProjectBeneficiariesSection beneficiaries={beneficiaries} />

        <ProjectGalleryCarousel
          images={images}
          projectTitle={project.title}
        />

        <ProjectFaqSection faqs={faqs} />

        <RevealOnScroll className="mt-14 text-center" y={16} stagger={0}>
          <Link
            href={websiteRoutes.projects}
            className="text-sm font-semibold text-brand transition hover:text-brand-light"
          >
            ← Back to all projects
          </Link>
        </RevealOnScroll>
      </div>
    </article>
  );
}
