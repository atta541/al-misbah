"use client";

import Image from "next/image";
import { useActionState, useEffect, useRef, useState } from "react";
import {
  createProject,
  deleteProjectGalleryImage,
  updateProject,
  type ProjectActionState,
} from "@/actions/project";
import {
  ProjectNestedFields,
  beneficiariesFromProject,
  categoriesFromProject,
  faqsFromProject,
  serializeNestedData,
  type BeneficiaryDraft,
  type CategoryDraft,
  type FaqDraft,
} from "@/components/admin/project-nested-fields";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import {
  MAX_FEATURED_PROJECTS,
  PROJECT_FEATURED_UPLOAD_HINT,
} from "@/lib/project";
import { slugify } from "@/lib/slug";
import type {
  Project,
  ProjectBeneficiary,
  ProjectCategory,
  ProjectFaq,
  ProjectImage,
} from "@/types";

type ProjectFormProps = {
  mode: "create" | "edit";
  project?: Project & {
    images: ProjectImage[];
    categories: ProjectCategory[];
    beneficiaries: ProjectBeneficiary[];
    faqs: ProjectFaq[];
  };
};

const initialState: ProjectActionState = {};

function formatDateInput(value?: Date | string | null) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

export function ProjectForm({ mode, project }: ProjectFormProps) {
  const action =
    mode === "create"
      ? createProject
      : updateProject.bind(null, project!.id);

  const [state, formAction, isPending] = useActionState(action, initialState);
  const [slug, setSlug] = useState(project?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(project?.slug));
  const [categories, setCategories] = useState<CategoryDraft[]>(
    project ? categoriesFromProject(project.categories) : [],
  );
  const [beneficiaries, setBeneficiaries] = useState<BeneficiaryDraft[]>(
    project ? beneficiariesFromProject(project.beneficiaries) : [],
  );
  const [faqs, setFaqs] = useState<FaqDraft[]>(
    project ? faqsFromProject(project.faqs) : [],
  );
  const nestedInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!slugTouched && state.fieldErrors?.slug) {
      setSlugTouched(true);
    }
  }, [slugTouched, state.fieldErrors?.slug]);

  useEffect(() => {
    if (nestedInputRef.current) {
      nestedInputRef.current.value = serializeNestedData(
        categories,
        beneficiaries,
        faqs,
      );
    }
  }, [categories, beneficiaries, faqs]);

  return (
    <form action={formAction} className="space-y-8">
      <input ref={nestedInputRef} type="hidden" name="nestedData" defaultValue="" />

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5">
          <Field
            label="Title"
            name="title"
            defaultValue={project?.title}
            error={state.fieldErrors?.title?.[0]}
            required
            onChange={(value) => {
              if (!slugTouched) {
                setSlug(slugify(value));
              }
            }}
          />
          <Field
            label="Slug"
            name="slug"
            value={slug}
            error={state.fieldErrors?.slug?.[0]}
            required
            hint="Auto-generated from title, e.g. clean-water"
            onChange={(value) => {
              setSlugTouched(true);
              setSlug(slugify(value));
            }}
          />
          <Field
            label="Short description"
            name="shortDescription"
            defaultValue={project?.shortDescription}
            error={state.fieldErrors?.shortDescription?.[0]}
            required
            multiline
            rows={3}
            hint="Shown on project cards (1–2 lines)."
          />
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Full description
            </label>
            <RichTextEditor
              name="description"
              defaultValue={project?.description ?? ""}
            />
            {state.fieldErrors?.description?.[0] ? (
              <p className="text-sm text-red-600">
                {state.fieldErrors.description[0]}
              </p>
            ) : null}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Location"
              name="location"
              defaultValue={project?.location ?? ""}
              error={state.fieldErrors?.location?.[0]}
            />
            <Field
              label="Currency"
              name="currency"
              defaultValue={project?.currency ?? "PKR"}
              error={state.fieldErrors?.currency?.[0]}
              hint="3-letter code, e.g. PKR"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Display order"
              name="order"
              type="number"
              defaultValue={String(project?.order ?? 0)}
              error={state.fieldErrors?.order?.[0]}
            />
            <div />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Start date"
              name="startDate"
              type="date"
              defaultValue={formatDateInput(project?.startDate)}
            />
            <Field
              label="End date"
              name="endDate"
              type="date"
              defaultValue={formatDateInput(project?.endDate)}
            />
          </div>
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-3 text-sm text-slate-700">
              <input
                type="checkbox"
                name="isFeatured"
                defaultChecked={project?.isFeatured ?? false}
                className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              Featured on homepage (max {MAX_FEATURED_PROJECTS})
            </label>
            <label className="flex items-center gap-3 text-sm text-slate-700">
              <input
                type="checkbox"
                name="isPublished"
                defaultChecked={project?.isPublished ?? true}
                className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              Published
            </label>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <label htmlFor="featuredImage" className="text-sm font-medium text-slate-700">
              Featured image {mode === "create" ? "*" : "(replace optional)"}
            </label>
            <input
              id="featuredImage"
              name="featuredImage"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              className="block w-full rounded-xl border border-slate-200 px-3 py-2 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-2"
              required={mode === "create"}
            />
            <p className="text-xs text-slate-500">{PROJECT_FEATURED_UPLOAD_HINT}</p>
            {project?.featuredImage ? (
              <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-slate-200">
                <Image
                  src={project.featuredImage}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
            ) : null}
          </div>

          <div className="space-y-3">
            <label htmlFor="gallery" className="text-sm font-medium text-slate-700">
              Gallery images (carousel)
            </label>
            <input
              id="gallery"
              name="gallery"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              multiple
              className="block w-full rounded-xl border border-slate-200 px-3 py-2 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-2"
            />
            <p className="text-xs text-slate-500">
              Used in the right-to-left image carousel on the project page.
            </p>
            {project?.images?.length ? (
              <div className="grid grid-cols-2 gap-3">
                {project.images.map((image) => (
                  <div
                    key={image.id}
                    className="overflow-hidden rounded-xl border border-slate-200"
                  >
                    <div className="relative aspect-[4/3] bg-slate-100">
                      <Image
                        src={image.imageUrl}
                        alt={image.caption ?? "Gallery image"}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <form
                      action={deleteProjectGalleryImage.bind(null, image.id)}
                      className="border-t border-slate-100 p-2"
                    >
                      <button
                        type="submit"
                        className="w-full rounded-lg border border-red-200 px-2 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                      >
                        Remove
                      </button>
                    </form>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <ProjectNestedFields
        categories={categories}
        beneficiaries={beneficiaries}
        faqs={faqs}
        onCategoriesChange={setCategories}
        onBeneficiariesChange={setBeneficiaries}
        onFaqsChange={setFaqs}
      />

      {state.error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-60"
      >
        {isPending
          ? "Saving..."
          : mode === "create"
            ? "Create project"
            : "Update project"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  value,
  type = "text",
  rows,
  multiline,
  hint,
  error,
  required,
  onChange,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  value?: string;
  type?: string;
  rows?: number;
  multiline?: boolean;
  hint?: string;
  error?: string;
  required?: boolean;
  onChange?: (value: string) => void;
}) {
  const sharedClass =
    "w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="text-sm font-medium text-slate-700">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={name}
          name={name}
          rows={rows ?? 4}
          defaultValue={defaultValue}
          required={required}
          className={sharedClass}
          onChange={(event) => onChange?.(event.target.value)}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          defaultValue={value === undefined ? defaultValue : undefined}
          value={value}
          required={required}
          className={sharedClass}
          onChange={(event) => onChange?.(event.target.value)}
        />
      )}
      {hint ? <p className="text-xs text-slate-500">{hint}</p> : null}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
