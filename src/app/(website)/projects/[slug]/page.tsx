import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import { ProjectBeneficiariesSection } from "@/components/website/project-beneficiaries-section";
import { ProjectDonateSection } from "@/components/website/project-donate-section";
import { ProjectFaqSection } from "@/components/website/project-faq-section";
import { ProjectGalleryCarousel } from "@/components/website/project-gallery-carousel";
import { RichTextContent } from "@/components/website/rich-text-content";
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

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = await projectService.getBySlug(slug);

  if (!project) {
    notFound();
  }

  const startDate = formatDate(project.startDate);
  const endDate = formatDate(project.endDate);

  return (
    <article className="bg-white pb-16 sm:pb-24">
      <div className="relative aspect-[21/9] min-h-[16rem] w-full overflow-hidden bg-brand-dark sm:min-h-[22rem]">
        <Image
          src={project.featuredImage}
          alt={project.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
          <Link
            href={websiteRoutes.projects}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            <ArrowLeft className="h-4 w-4" />
            All projects
          </Link>
          <h1 className="mt-4 max-w-4xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {project.title}
          </h1>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-white/90">
            {project.location ? (
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {project.location}
              </span>
            ) : null}
            {startDate ? (
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {startDate}
                {endDate ? ` – ${endDate}` : ""}
              </span>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl pt-10">
          <p className="text-lg leading-8 text-foreground">{project.shortDescription}</p>
          <div className="mt-8">
            <RichTextContent html={project.description} />
          </div>
        </div>

        <ProjectDonateSection
          project={project}
          categories={project.categories}
        />

        <ProjectBeneficiariesSection beneficiaries={project.beneficiaries} />

        <ProjectGalleryCarousel
          images={project.images}
          projectTitle={project.title}
        />

        <ProjectFaqSection faqs={project.faqs} />
      </div>
    </article>
  );
}
