'use client';

// Print / Save-as-PDF button for blog posts.
//
// Just wraps window.print() — modern browsers (Chrome, Edge, Firefox,
// Safari) all expose "Save as PDF" in the print dialog, so we don't need
// a separate PDF library to satisfy the "print/PDF export" requirement.
//
// Companion print styles in app/globals.css hide navigation, sidebar,
// CTAs, etc. and expand the content column to full width.

export default function PrintButton({ label = 'Print / Save as PDF' }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      aria-label={label}
      className="print:hidden inline-flex items-center gap-2 rounded-full bg-white border border-brand-line px-4 py-2 text-[13px] font-semibold text-brand-ink hover:border-brand-green hover:text-brand-green transition"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="6 9 6 2 18 2 18 9" />
        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
        <rect x="6" y="14" width="12" height="8" />
      </svg>
      {label}
    </button>
  );
}
