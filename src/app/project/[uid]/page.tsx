import { Metadata } from "next";
import { notFound } from "next/navigation";

import { asText } from "@prismicio/client";
import { PrismicRichText, SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import {Layout} from "@/components/Layout"

type Params = { uid: string };

export default async function Page({ params }: { params: Promise<Params> }) {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("project", uid).catch(() => notFound());
  const navigation = await client.getSingle('navigation');

  console.log(page.data.slices[0]?.slice_type == 'hero_slider')

  // <SliceZone> renders the page's slices.
  return (
    <Layout nav={navigation}>
      <div className="project-page">
        {page.data.meegewerkt_aan && (
          <div className="label">Meegewerkt Aan</div>
        )}
        <PrismicRichText field={page.data.title}/>
        {page.data.slices[0]?.slice_type != 'hero_slider' &&
          <div className="empty-hero"></div>
        }
        <SliceZone slices={page.data.slices} components={components} />
      </div>
    </Layout>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("project", uid).catch(() => notFound());

  return {
    title: asText(page.data.title),
    description: page.data.meta_description,
    openGraph: {
      title: page.data.meta_title ?? undefined,
      images: [{ url: page.data.meta_image.url ?? "" }],
    },
  };
}

export async function generateStaticParams() {
  const client = createClient();

  // Get all pages from Prismic, except the homepage.
  const pages = await client.getAllByType("project");

  return pages.map((page) => ({ uid: page.uid }));
}
