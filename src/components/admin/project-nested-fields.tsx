"use client";

import { Plus, Trash2 } from "lucide-react";
import type {
  ProjectBeneficiary,
  ProjectCategory,
  ProjectFaq,
} from "@/types";

export const BENEFICIARY_ICON_OPTIONS = [
  "Users",
  "Droplets",
  "Heart",
  "GraduationCap",
  "Home",
  "HandHeart",
  "Utensils",
  "Stethoscope",
  "Baby",
  "TreePine",
] as const;

export type CategoryDraft = {
  id?: string;
  name: string;
  description: string;
  price: string;
  priceTo: string;
  isActive: boolean;
};

export type BeneficiaryDraft = {
  id?: string;
  title: string;
  description: string;
  icon: string;
  isActive: boolean;
};

export type FaqDraft = {
  id?: string;
  question: string;
  answer: string;
  isActive: boolean;
};

export function categoriesFromProject(categories: ProjectCategory[]): CategoryDraft[] {
  return categories.map((category) => ({
    id: category.id,
    name: category.name,
    description: category.description ?? "",
    price: category.price.toString(),
    priceTo: category.priceTo?.toString() ?? "",
    isActive: category.isActive,
  }));
}

export function beneficiariesFromProject(
  beneficiaries: ProjectBeneficiary[],
): BeneficiaryDraft[] {
  return beneficiaries.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description ?? "",
    icon: item.icon ?? "Users",
    isActive: item.isActive,
  }));
}

export function faqsFromProject(faqs: ProjectFaq[]): FaqDraft[] {
  return faqs.map((faq) => ({
    id: faq.id,
    question: faq.question,
    answer: faq.answer,
    isActive: faq.isActive,
  }));
}

export function serializeNestedData(
  categories: CategoryDraft[],
  beneficiaries: BeneficiaryDraft[],
  faqs: FaqDraft[],
) {
  return JSON.stringify({
    categories: categories
      .filter((item) => item.name.trim())
      .map((item) => ({
        id: item.id,
        name: item.name.trim(),
        description: item.description.trim() || undefined,
        price: Number(item.price),
        priceTo: item.priceTo.trim() ? Number(item.priceTo) : null,
        isActive: item.isActive,
      })),
    beneficiaries: beneficiaries
      .filter((item) => item.title.trim())
      .map((item) => ({
        id: item.id,
        title: item.title.trim(),
        description: item.description.trim() || undefined,
        icon: item.icon || undefined,
        isActive: item.isActive,
      })),
    faqs: faqs
      .filter((item) => item.question.trim() && item.answer.trim())
      .map((item) => ({
        id: item.id,
        question: item.question.trim(),
        answer: item.answer.trim(),
        isActive: item.isActive,
      })),
  });
}

type ProjectNestedFieldsProps = {
  categories: CategoryDraft[];
  beneficiaries: BeneficiaryDraft[];
  faqs: FaqDraft[];
  onCategoriesChange: (items: CategoryDraft[]) => void;
  onBeneficiariesChange: (items: BeneficiaryDraft[]) => void;
  onFaqsChange: (items: FaqDraft[]) => void;
};

export function ProjectNestedFields({
  categories,
  beneficiaries,
  faqs,
  onCategoriesChange,
  onBeneficiariesChange,
  onFaqsChange,
}: ProjectNestedFieldsProps) {
  return (
    <div className="space-y-10 border-t border-slate-200 pt-8">
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold text-slate-900">
              Donation categories
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Set fixed prices or ranges shown on project cards and the donate section.
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              onCategoriesChange([
                ...categories,
                {
                  name: "",
                  description: "",
                  price: "",
                  priceTo: "",
                  isActive: true,
                },
              ])
            }
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <Plus className="h-4 w-4" />
            Add category
          </button>
        </div>

        {categories.length === 0 ? (
          <p className="rounded-xl border border-dashed border-slate-200 px-4 py-6 text-sm text-slate-500">
            No donation categories yet.
          </p>
        ) : (
          <div className="space-y-4">
            {categories.map((category, index) => (
              <div
                key={category.id ?? `category-${index}`}
                className="rounded-2xl border border-slate-200 p-4"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <AdminInput
                    label="Name"
                    value={category.name}
                    onChange={(value) => {
                      const next = [...categories];
                      next[index] = { ...category, name: value };
                      onCategoriesChange(next);
                    }}
                  />
                  <AdminInput
                    label="Description (optional)"
                    value={category.description}
                    onChange={(value) => {
                      const next = [...categories];
                      next[index] = { ...category, description: value };
                      onCategoriesChange(next);
                    }}
                  />
                  <AdminInput
                    label="Price from"
                    type="number"
                    value={category.price}
                    onChange={(value) => {
                      const next = [...categories];
                      next[index] = { ...category, price: value };
                      onCategoriesChange(next);
                    }}
                  />
                  <AdminInput
                    label="Price to (optional range)"
                    type="number"
                    value={category.priceTo}
                    onChange={(value) => {
                      const next = [...categories];
                      next[index] = { ...category, priceTo: value };
                      onCategoriesChange(next);
                    }}
                  />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={category.isActive}
                      onChange={(event) => {
                        const next = [...categories];
                        next[index] = {
                          ...category,
                          isActive: event.target.checked,
                        };
                        onCategoriesChange(next);
                      }}
                      className="h-4 w-4 rounded border-slate-300 text-emerald-600"
                    />
                    Active
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      onCategoriesChange(categories.filter((_, i) => i !== index))
                    }
                    className="inline-flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold text-slate-900">
              Who benefited
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Impact cards shown on the project detail page.
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              onBeneficiariesChange([
                ...beneficiaries,
                {
                  title: "",
                  description: "",
                  icon: "Users",
                  isActive: true,
                },
              ])
            }
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <Plus className="h-4 w-4" />
            Add beneficiary
          </button>
        </div>

        {beneficiaries.length === 0 ? (
          <p className="rounded-xl border border-dashed border-slate-200 px-4 py-6 text-sm text-slate-500">
            No beneficiary cards yet.
          </p>
        ) : (
          <div className="space-y-4">
            {beneficiaries.map((item, index) => (
              <div
                key={item.id ?? `beneficiary-${index}`}
                className="rounded-2xl border border-slate-200 p-4"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <AdminInput
                    label="Title"
                    value={item.title}
                    onChange={(value) => {
                      const next = [...beneficiaries];
                      next[index] = { ...item, title: value };
                      onBeneficiariesChange(next);
                    }}
                  />
                  <label className="space-y-2">
                    <span className="text-sm font-medium text-slate-700">Icon</span>
                    <select
                      value={item.icon}
                      onChange={(event) => {
                        const next = [...beneficiaries];
                        next[index] = { ...item, icon: event.target.value };
                        onBeneficiariesChange(next);
                      }}
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
                    >
                      {BENEFICIARY_ICON_OPTIONS.map((icon) => (
                        <option key={icon} value={icon}>
                          {icon}
                        </option>
                      ))}
                    </select>
                  </label>
                  <div className="sm:col-span-2">
                    <AdminInput
                      label="Description"
                      value={item.description}
                      onChange={(value) => {
                        const next = [...beneficiaries];
                        next[index] = { ...item, description: value };
                        onBeneficiariesChange(next);
                      }}
                    />
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={item.isActive}
                      onChange={(event) => {
                        const next = [...beneficiaries];
                        next[index] = {
                          ...item,
                          isActive: event.target.checked,
                        };
                        onBeneficiariesChange(next);
                      }}
                      className="h-4 w-4 rounded border-slate-300 text-emerald-600"
                    />
                    Active
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      onBeneficiariesChange(
                        beneficiaries.filter((_, i) => i !== index),
                      )
                    }
                    className="inline-flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold text-slate-900">
              Frequently asked questions
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Shown at the bottom of the project detail page.
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              onFaqsChange([
                ...faqs,
                { question: "", answer: "", isActive: true },
              ])
            }
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <Plus className="h-4 w-4" />
            Add FAQ
          </button>
        </div>

        {faqs.length === 0 ? (
          <p className="rounded-xl border border-dashed border-slate-200 px-4 py-6 text-sm text-slate-500">
            No FAQs yet.
          </p>
        ) : (
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={faq.id ?? `faq-${index}`}
                className="rounded-2xl border border-slate-200 p-4"
              >
                <div className="space-y-4">
                  <AdminInput
                    label="Question"
                    value={faq.question}
                    onChange={(value) => {
                      const next = [...faqs];
                      next[index] = { ...faq, question: value };
                      onFaqsChange(next);
                    }}
                  />
                  <label className="block space-y-2">
                    <span className="text-sm font-medium text-slate-700">Answer</span>
                    <textarea
                      value={faq.answer}
                      rows={4}
                      onChange={(event) => {
                        const next = [...faqs];
                        next[index] = { ...faq, answer: event.target.value };
                        onFaqsChange(next);
                      }}
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
                    />
                  </label>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={faq.isActive}
                      onChange={(event) => {
                        const next = [...faqs];
                        next[index] = {
                          ...faq,
                          isActive: event.target.checked,
                        };
                        onFaqsChange(next);
                      }}
                      className="h-4 w-4 rounded border-slate-300 text-emerald-600"
                    />
                    Active
                  </label>
                  <button
                    type="button"
                    onClick={() => onFaqsChange(faqs.filter((_, i) => i !== index))}
                    className="inline-flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function AdminInput({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
      />
    </label>
  );
}
