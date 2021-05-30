import { Dispatch, KeyboardEvent, SetStateAction, useContext, useEffect, useRef, useState } from "react"
import { Project, ProjectsContext } from "../../contexts/projectsContext"
import { ProjectListContainer } from "./styles"

import ProjectCard from '../ProjectCard'

type ProjectsListProps={
    initialProjects: Project[]
}

export default function Projects({initialProjects}: ProjectsListProps) {
    const { setProjects, projects } = useContext(ProjectsContext);

    useEffect(() =>{
        setProjects(initialProjects)
    },[])

    return (
        <>
        <h2>Starred Projects</h2>
        <ProjectListContainer>
            {projects?.map(project => (
                <ProjectCard project={project} key={project.id} />
            ))}
            {/*<pre>
                {JSON.stringify(projects, null, 2)}
            </pre> */}

        </ProjectListContainer>
        </>
    )
}