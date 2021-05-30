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
    setProject: (projectId: number, labels: string[]) => void,
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

    return (
        <ProjectsContext.Provider
            value={{
                projects,
                setProjects,
                setProject
            }}
        >
            {children}
        </ProjectsContext.Provider>
    )
}

