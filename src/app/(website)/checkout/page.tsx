import Link from "next/link";
import { redirect } from "next/navigation";
import { CheckoutForm } from "@/components/website/checkout-form";
import { decimalToNumber } from "@/lib/currency";
import { PAGE_CONTENT_OFFSET_CLASS } from "@/lib/nav-layout";
import { websiteRoutes } from "@/lib/routes";
import { projectService } from "@/services/project.service";

export const dynamic = "force-dynamic";

type CheckoutPageProps = {
  searchParams: Promise<{
    project?: string;
    category?: string;
    qty?: string;
  }>;
};

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const params = await searchParams;
  const slug = params.project?.trim();
  const categoryId = params.category?.trim();
  const qtyRaw = Number(params.qty ?? "1");
  const quantity = Number.isFinite(qtyRaw)
    ? Math.min(99, Math.max(1, Math.floor(qtyRaw)))
    : 1;

  if (!slug || !categoryId) {
    redirect(websiteRoutes.projects);
  }

  const project = await projectService.getBySlug(slug);

  if (!project) {
    redirect(websiteRoutes.projects);
  }

  const category = project.categories.find((item) => item.id === categoryId);

  if (!category || !category.isActive) {
    redirect(`${websiteRoutes.projects}/${slug}`);
  }

  const price = decimalToNumber(category.price) ?? 0;
  const priceTo =
    category.priceTo != null ? decimalToNumber(category.priceTo) : null;

  return (
    <section className={`bg-white pb-16 sm:pb-24 ${PAGE_CONTENT_OFFSET_CLASS}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href={`${websiteRoutes.projects}/${project.slug}`}
          className="mb-6 inline-flex text-sm font-medium text-muted transition hover:text-brand"
        >
          ← {project.title}
        </Link>

        <CheckoutForm
          project={{
            id: project.id,
            title: project.title,
            slug: project.slug,
            featuredImage: project.featuredImage,
            currency: project.currency,
          }}
          category={{
            id: category.id,
            name: category.name,
            description: category.description,
            price,
            priceTo,
          }}
          quantity={quantity}
        />
      </div>
    </section>
  );
}
