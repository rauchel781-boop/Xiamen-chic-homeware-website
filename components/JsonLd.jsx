// Reusable server component that emits a <script type="application/ld+json">.
// Pass it any plain object that conforms to schema.org and it will serialize
// safely into the page so Google can read structured data.

export default function JsonLd({ data }) {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      // Next.js passes objects through dangerouslySetInnerHTML for inline scripts.
      // We escape forward slashes inside </script> sequences just in case.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
