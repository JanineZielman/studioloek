import { type Metadata } from "next";

import { asText, filter } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import {ProjectItems} from "@/components/ProjectItems"
import {Layout} from "@/components/Layout"

export default async function Home() {
  const client = createClient();
  const home = await client.getByUID("page", "home");
  const projects = await client.getAllByType("project");
  const navigation = await client.getSingle('navigation');
  const pages = await client.getAllByType('page', {
    filters: [filter.not("my.page.uid", "home")],
  })

  console.log(pages)

  // <SliceZone> renders the page's slices.
  return (
      <Layout nav={navigation}>
        <div className="home">
          <img className="logo" src="/studio-loek.svg"/>
          <SliceZone slices={home.data.slices} components={components} />
          <ProjectItems items={projects}/>
          {pages.map((item, i) => {
            return(
              <section id={item.uid} key={`section${i}`}>
                 <SliceZone slices={item.data.slices} components={components} />
              </section>
            )
          })}
        </div>
      </Layout>
    )
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const home = await client.getByUID("page", "home");

  return {
    title: asText(home.data.title),
    description: home.data.meta_description,
    openGraph: {
      title: home.data.meta_title ?? undefined,
      images: [{ url: home.data.meta_image.url ?? "" }],
    },
  };
}
