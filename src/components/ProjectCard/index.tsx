import axios from "axios"
import { KeyboardEvent, useContext, useRef } from "react"
import { Project, ProjectsContext } from "../../contexts/projectsContext"
import { ProjectCardContainer } from "./styles"

type ProjectCardProps = {
    project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const inputLabelRef = useRef<HTMLInputElement>()
    const { setProject } = useContext(ProjectsContext);

    async function handleLabelInput(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            const newProject = { ...project }
            const labels = [...newProject.labels]
            labels.push(inputLabelRef.current.value)
            project.labels.push(inputLabelRef.current.value)

            const apiupdatecll = await axios.patch('/api/projects/update', {
                projectId: project.id,
                labels
            })
            console.log(apiupdatecll.data)
            if (apiupdatecll.data) {
                setProject(project.id, newProject)
            }
        }
    }

    return (
        <ProjectCardContainer>
            <h3>{project.id}</h3>
            <a href={project.html_url}>
                <span>{project.full_name}</span>
            </a>
            <p>{project.description}</p>
            <div>
                {project.labels.map((label, index) => (
                    <p key={index}>{label}</p>
                ))}
                <label htmlFor="label">Novo Label</label>
                <input name="label" type="text" ref={inputLabelRef} onKeyDown={handleLabelInput} />
            </div>
        </ProjectCardContainer>
    )
}