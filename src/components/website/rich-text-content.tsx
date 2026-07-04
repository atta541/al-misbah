import { sanitizeRichText } from "@/lib/sanitize-html";

type RichTextContentProps = {
  html: string;
  className?: string;
};

export function RichTextContent({ html, className = "" }: RichTextContentProps) {
  const safeHtml = sanitizeRichText(html);

  if (!safeHtml.trim()) {
    return null;
  }

  return (
    <div
      className={[
        "max-w-none text-muted [&_a]:text-brand [&_a]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-brand/30 [&_blockquote]:pl-4 [&_h2]:mb-3 [&_h2]:mt-6 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_li]:my-1 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:my-4 [&_p]:leading-8 [&_strong]:font-semibold [&_strong]:text-foreground [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6",
        className,
      ].join(" ")}
      dangerouslySetInnerHTML={{ __html: safeHtml }}
    />
  );
}
