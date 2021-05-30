import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client'
import Head from 'next/head'
import ProjectHelper from '../helpers/projectHelper';
import prisma from '../lib/prisma';

import { Project, ProjectsProvider } from '../contexts/projectsContext'
import Projects from '../components/projectsList';

import { HomePageContainer } from '../styles/pages/index'
import Navbar from '../components/Navbar';

interface HomeProps {
    projects: Project[]
}

export default function Home({ projects }: HomeProps) {
    return (
        <>
            <Head>
                <title>Labeled Github Stars</title>
            </Head>
            <ProjectsProvider>
                <HomePageContainer>
                    <Navbar />
                    {projects.length > 0 && (
                        <Projects initialProjects={projects} />
                    )}
                </HomePageContainer>
            </ProjectsProvider>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getSession({ ctx })

    if (!session)
        return {
            props: {
                projects: []
            }
        }

        const user = await prisma.user.findFirst({
        where: {
            email: session.user.email,
        },
    })

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
        return ({
            id: starredProject.id,
            full_name: starredProject.full_name,
            html_url: starredProject.html_url,
            description: starredProject.description,
            labels: savedProject.labels,
        })
    });

    return {
        props: {
            projects
        }
    }
}
