import { Metadata } from "next";

const defaultMetadataValues: Metadata = {
  title: "Apotek Management",
  description: "Apotek Management",
  icons: {
    icon: "/images/favicon.ico",
  },
};

export const defineMetadata = (metadata?: Metadata) => {
  const title = metadata?.title
    ? `${metadata.title} | Apotek Management`
    : defaultMetadataValues.title;
  return {
    ...defaultMetadataValues,
    ...metadata,
    title,
  };
};
