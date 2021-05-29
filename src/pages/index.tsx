import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client'
import Head from 'next/head'
import ProjectHelper from '../helpers/projectHelper';
import prisma from '../lib/prisma';

import { Project, ProjectsProvider } from '../contexts/projectsContext'
import Projects from '../components/projectsList';

interface HomeProps {
    initialProjects: Project[]
}

export default function Home({ initialProjects }: HomeProps) {
    return (
        <>
            <Head>
                <title>Labeled Github Stars</title>
            </Head>
            <ProjectsProvider>
                <Projects initialProjects={initialProjects} />
            </ProjectsProvider>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getSession({ ctx })
    const user = await prisma.user.findFirst({
        where: {
            email: session.user.email,
        },
    })
    if (!session || !user) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    }

    const projectHelper = new ProjectHelper();
    const starredProjects = await projectHelper.fetchStarredProjects(String(session.accessToken));
    Promise.all([
        await projectHelper.deleteUnstarredProjects(starredProjects, user.id),
        await projectHelper.saveStarredProjects(starredProjects, user.id)
    ]);
    const savedLabeledProjects = await prisma.project.findMany({
        where: {
            userId: user.id,
        }
    })
    const projects: Project[] = starredProjects.map(starredProject => {
        const savedProject = savedLabeledProjects.find(savedLabeledProject => savedLabeledProject.id === starredProject.id)
        return({
            id: starredProject.id,
            full_name: starredProject.full_name,
            html_url: starredProject.html_url,
            description: starredProject.description,
            labels: savedProject.labels,
        })
    });

    return {
        props: {
            initialProjects: projects
        }
    }
}
