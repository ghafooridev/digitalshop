import { Image } from '@prisma/client';
import { Metadata } from 'next';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';

type ProductMetadata = {
  title?: string;
  description?: string | null;
  keywords?: string[];
  images?: Image[] | null;
};

export default function customMetadataGenerator({
  title = 'digital shop',
  description = 'a digital shop for ...',
  keywords = ['digital', 'laptop', 'mobile'],
  images = undefined,
}: ProductMetadata): Metadata {
  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      type: 'website',
      url: `http://localhost:3000/${title}`,
      images,
    } as OpenGraph,
  };
}
