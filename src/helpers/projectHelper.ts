import axios from "axios";
import prisma from "../lib/prisma";

type FetchedProject = {
    id: number
    full_name: string
    html_url: string
    description: string
}

type SavedProject = {
    id: number
    userId: number
    labels: string[]
}

class ProjectHelper {

    async fetchStarredProjects(userToken: string) {
        const fetchedProjects: FetchedProject[] = await axios.get('https://api.github.com/user/starred', {
            headers: {
                Authorization: `token ${userToken}`,
                Accept: 'application/vnd.github.v3+json'
            }
        }).then(response => response.data)

        return fetchedProjects
    }

    async saveStarredProjects(fetchedStarredProjects: FetchedProject[], userId: number) {
        const toSaveProjects = fetchedStarredProjects.map(project => ({
            userId,
            id: project.id,
        }))

        await prisma.project.createMany({
            skipDuplicates: true,
            data: toSaveProjects,
        })
    }

    async deleteUnstarredProjects(fetchedStarredProjects: FetchedProject[], userId: number) {
        const savedProjects: SavedProject[] = await prisma.project.findMany({
            where: {
                userId: userId,
            }
        })
    
        const toDeleteProjects = savedProjects.filter(project => {
            let isStarred = false

            for (let index = 0; index < fetchedStarredProjects.length; index++) {
                if (project.id === fetchedStarredProjects[index].id) {
                    isStarred = true
                    break;
                }
            }
            return !isStarred
        })

        await Promise.all(
            toDeleteProjects.map(async project => {
                await prisma.project.delete({
                    where: {
                        id_userId: { userId: userId, id: project.id }
                    }
                })
            })
        )
    }
}

export default ProjectHelper