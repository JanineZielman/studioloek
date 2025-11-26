import { Metadata } from "next";
import { notFound } from "next/navigation";

import { asText } from "@prismicio/client";
import { PrismicRichText, SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { Layout } from "@/components/Layout";

type Params = { uid: string };

export default async function Page({ params }: { params: Promise<Params> }) {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("project", uid).catch(() => notFound());
  const navigation = await client.getSingle("navigation");

  // Fetch all projects in some order. Adjust field if needed.
  const allProjects = await client.getAllByType("project", {
    orderings: [{ field: "my.project.date", direction: "desc" }],
  });

  const index = allProjects.findIndex((p) => p.uid === uid);

  // Wrap-around logic
  const previousProject =
    allProjects[index - 1] || allProjects[allProjects.length - 1];

  const nextProject =
    allProjects[index + 1] || allProjects[0];

  return (
    <Layout nav={navigation}>
      <div className="project-page">
        {page.data.meegewerkt_aan && <div className="label">Meegewerkt Aan</div>}

        {page.data.slices[0]?.slice_type !== "hero_slider" ? 
          <div className="empty-hero">
            <PrismicRichText field={page.data.title} />
          </div>
          :
           <PrismicRichText field={page.data.title} />
        }

        <SliceZone slices={page.data.slices} components={components} />

        <div className="project-nav">
          <a href={`/project/${previousProject.uid}`} className="prev">
            <img src="/SVG/left-arrow.svg"/>
          </a>
          <a href={`/project/${nextProject.uid}`} className="next">
             <img src="/SVG/right-arrow.svg"/>
          </a>
        </div>
      </div>
      <iframe src="https://studioloek.cdn.prismic.io/studioloek/aScLXGGnmrmGqWiA_ThesisproposalYmkeMoes_6871631.pdf"/>
    </Layout>
  );
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
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
  const pages = await client.getAllByType("project");
  return pages.map((page) => ({ uid: page.uid }));
}
