import clsx from 'clsx';
import { InferGetStaticPropsType } from 'next';
import * as React from 'react';

import { getAllFilesFrontmatter } from '@/lib/mdx';
import { sortByDate } from '@/lib/mdx-client';
import useLoaded from '@/hooks/useLoaded';

import ProjectCard from '@/components/content/projects/ProjectCard';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function ProjectsPage({
  projects,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const isLoaded = useLoaded();

  return (
    <Layout>
      <Seo
        templateTitle='Projects'
        description="Projects I've been fortunate enough to work on."
      />

      <main>
        <section className={clsx(isLoaded && 'fade-in-start')}>
          <div className='layout py-12'>
            <h1 className='text-3xl md:text-5xl' data-fade='0'>
              Projects
            </h1>
            <p data-fade='1' className='mt-2 text-gray-600 dark:text-gray-300'>
              Projects I've been fortunate enough to work on.
            </p>

            <ul
              data-fade='2'
              className='mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3'
            >
              {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </ul>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  const files = await getAllFilesFrontmatter('projects');
  const projects = sortByDate(files);

  return { props: { projects } };
}
