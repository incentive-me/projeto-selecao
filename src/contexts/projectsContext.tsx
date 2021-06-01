import axios from 'axios';
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

export type Project = {
    id: number
    full_name: string
    html_url: string
    description: string
    labels: string[]
}

interface ProjectsContextData {
    projects: Project[],
    setProjects: Dispatch<SetStateAction<Project[]>>,
    addLabel: (projectId: number, labels: string[]) => Promise<boolean>
    deleteLabel: (projectId: number, labels: string[], labelIndex: number) => Promise<boolean>
}

interface ProjectsProviderProps {
    children: ReactNode;
}

export const ProjectsContext = createContext({} as ProjectsContextData);

export function ProjectsProvider({ children }: ProjectsProviderProps) {

    const [projects, setProjects] = useState<Project[]>([]);

    function setProject(projectId: number, labels: string[]) {
        setProjects(prevState => {
            const newProjects = [...prevState]
            const newProjectIndex = newProjects.findIndex(project => project.id === projectId)
            newProjects[newProjectIndex].labels = labels
            return newProjects
        })
    }

    async function addLabel(projectId: number, labels: string[]): Promise<boolean> {
        const newProjectLabels = await axios.patch(`/api/projects/${projectId}`, {
            projectId,
            labels
        })
        const updated = newProjectLabels.data
        if (updated) {
            setProject(projectId, updated.labels)
        }
        return updated
    }

    async function deleteLabel(projectId: number, labels: string[], labelIndex: number): Promise<boolean> {
        labels.splice(labelIndex, 1)
        const newProjectLabels = await axios.patch(`/api/projects/${projectId}`, {
            projectId,
            labels
        })
        const updated = newProjectLabels.data
        if (updated) {
            setProject(projectId, updated.labels)
        }
        return updated
    }

    return (
        <ProjectsContext.Provider
            value={{
                projects,
                setProjects,
                addLabel,
                deleteLabel
            }}
        >
            {children}
        </ProjectsContext.Provider>
    )
}

