import axios from 'axios';
import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/client'
import Head from 'next/head'
import prisma from '../lib/prisma';

type Project = {
    id: any
    name: string
    url: string
    description: string
}

interface HomeProps {
    projects: Project[]
}

export default function Home({ projects }: HomeProps) {
    const [session] = useSession();

    return (
        <>
            <Head>
                <title>Labeled Github Stars</title>
            </Head>
            {projects.map(project => (
                <article key={project.id}>
                    <h2>{project.id}</h2>
                    <p>{project.name}</p>
                    <p>{project.url}</p>
                    <p>{project.description}</p>
                </article>
            ))}
            {/*<pre>
                {JSON.stringify(projects, null, 2)}
            </pre> */}
        </>
    )
}

type DatabaseProject = {
    userId: number
    id: number
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

    let fetchedProjects = [];

    if (session.accessToken) {
        fetchedProjects = await axios.get('https://api.github.com/user/starred', {
            headers: {
                Authorization: `token ${session.accessToken}`,
                Accept: 'application/vnd.github.v3+json'
            }
        }).then(response => response.data)
    }

    let projects: Project[] = [];
    let databaseProjects: DatabaseProject[] = [];

    fetchedProjects.forEach(project => {
        projects.push({
            id: project.id,
            name: 'project.full_name',
            url: project.html_url,
            description: project.description,    
        })

        databaseProjects.push({
            userId: user.id,
            id: project.id
        })
    })

    await prisma.project.createMany({
        skipDuplicates: true,
        data: databaseProjects,
    })

    return {
        props: {
            projects
        }
    }
}
