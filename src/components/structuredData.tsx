export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Muhammad Fadhlan Aziz",
    jobTitle: "Fullstack Web Developer",
    url: "https://yourdomain.com",
    sameAs: [
      "https://linkedin.com/in/muhammad-fadhlan-aziz",
      "https://github.com/Fadhlan54",
    ],
    worksFor: {
      "@type": "Organization",
      name: "PT Telkom Indonesia",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Your University Name",
    },
    knowsAbout: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Golang",
      "Express.js",
      "PostgreSQL",
      "Redis",
      "Docker",
      "AWS",
    ],
    description:
      "Fullstack Web Developer specializing in React.js, Next.js, Golang, and Express.js",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bogor",
      addressRegion: "West Java",
      addressCountry: "ID",
    },
    email: "muhammadfadhlan0011@gmail.com",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
