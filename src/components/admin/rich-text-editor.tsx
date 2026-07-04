"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Undo2,
  Redo2,
} from "lucide-react";
import { useEffect, useState } from "react";

type RichTextEditorProps = {
  name: string;
  defaultValue?: string;
  placeholder?: string;
};

function ToolbarButton({
  onClick,
  active,
  label,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={[
        "inline-flex h-8 w-8 items-center justify-center rounded-lg border text-slate-600 transition",
        active
          ? "border-emerald-300 bg-emerald-50 text-emerald-700"
          : "border-slate-200 bg-white hover:bg-slate-50",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

export function RichTextEditor({
  name,
  defaultValue = "",
  placeholder = "Write the full project description...",
}: RichTextEditorProps) {
  const [html, setHtml] = useState(defaultValue);

  const editor = useEditor({
    extensions: [StarterKit],
    content: defaultValue,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "min-h-[220px] px-4 py-3 text-sm leading-7 text-slate-700 focus:outline-none [&_h2]:mb-2 [&_h2]:mt-4 [&_h2]:text-lg [&_h2]:font-bold [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:my-2 [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-5",
      },
    },
  });

  useEffect(() => {
    if (!editor) return;

    const syncHtml = () => setHtml(editor.getHTML());
    syncHtml();
    editor.on("update", syncHtml);

    return () => {
      editor.off("update", syncHtml);
    };
  }, [editor]);

  useEffect(() => {
    if (editor && defaultValue && editor.isEmpty) {
      editor.commands.setContent(defaultValue);
      setHtml(defaultValue);
    }
  }, [defaultValue, editor]);

  if (!editor) {
    return (
      <div className="min-h-[280px] animate-pulse rounded-xl border border-slate-200 bg-slate-50" />
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="flex flex-wrap gap-2 border-b border-slate-200 bg-slate-50 px-3 py-2">
        <ToolbarButton
          label="Bold"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Italic"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Heading"
          active={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <Heading2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Bullet list"
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Numbered list"
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Undo"
          onClick={() => editor.chain().focus().undo().run()}
        >
          <Undo2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Redo"
          onClick={() => editor.chain().focus().redo().run()}
        >
          <Redo2 className="h-4 w-4" />
        </ToolbarButton>
      </div>

      <EditorContent editor={editor} />
      {!editor.getText().trim() ? (
        <p className="pointer-events-none -mt-[220px] px-4 py-3 text-sm text-slate-400">
          {placeholder}
        </p>
      ) : null}

      <input type="hidden" name={name} value={html} readOnly />
    </div>
  );
}
