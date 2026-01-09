interface WebSiteProps {
  url: string;
  name: string;
  description: string;
}

export function WebSiteJsonLd({ url, name, description }: WebSiteProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url,
    name,
    description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${url}/workflows?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface OrganizationProps {
  url: string;
  logo: string;
  name: string;
  description: string;
}

export function OrganizationJsonLd({ url, logo, name, description }: OrganizationProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    url,
    logo,
    name,
    description,
    sameAs: [
      "https://github.com/suwenge-game/location-n8n", // 替换为您的实际社交媒体链接
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface ProductProps {
  workflow: {
    id: string;
    title: string;
    slug: string;
    description: string;
    thumbnail: string;
    price?: number;
    isFree: boolean;
    rating: number;
    downloads: number;
    author: {
      name: string;
    };
  };
  url: string;
}

export function ProductJsonLd({ workflow, url }: ProductProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: workflow.title,
    description: workflow.description,
    url: `${url}/workflows/${workflow.slug}`,
    image: workflow.thumbnail,
    applicationCategory: "BusinessApplication",
    operatingSystem: "N8N",
    offers: workflow.isFree
      ? {
          "@type": "Offer",
          price: "0",
          priceCurrency: "CNY",
        }
      : {
          "@type": "Offer",
          price: workflow.price?.toString(),
          priceCurrency: "CNY",
          availability: "https://schema.org/InStock",
        },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: workflow.rating,
      reviewCount: Math.floor(workflow.downloads / 10), // 假设10%的下载者会评论
    },
    author: {
      "@type": "Person",
      name: workflow.author.name,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface BreadcrumbListProps {
  items: { name: string; url: string }[];
}

export function BreadcrumbListJsonLd({ items }: BreadcrumbListProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
