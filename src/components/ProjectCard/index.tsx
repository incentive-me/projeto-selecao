import axios from "axios"
import { KeyboardEvent, useContext, useRef, useState } from "react"
import { Project, ProjectsContext } from "../../contexts/projectsContext"
import { ProjectCardContainer } from "./styles"

type ProjectCardProps = {
    project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const inputLabelRef = useRef<HTMLInputElement>()
    const inputLabelErrorRef = useRef<HTMLSpanElement>()
    const { setProject } = useContext(ProjectsContext);

    const [uploadingLabel, setUploadingLabel] = useState(false)
    const [deletingLabel, setDeletingLabel] = useState(false)

    async function handleLabelInput(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            const newLabel = inputLabelRef.current.value;
            const labels = [...project.labels]

            if (labels.indexOf(newLabel) !== -1) {
                inputLabelErrorRef.current.textContent = 'This label alread exists'
                setTimeout(() => {
                    inputLabelErrorRef.current.textContent = ''
                }, 3000);
                return;
            }
            labels.push(inputLabelRef.current.value)
            const apiupdatecll = await axios.patch('/api/projects/update', {
                projectId: project.id,
                labels
            })
            if (apiupdatecll.data) {
                inputLabelRef.current.value = ''
                setProject(project.id, apiupdatecll.data.labels)
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
                    <span key={index}>{label}</span>
                ))}
                <label htmlFor="label">Novo Label</label>
                <input name="label" type="text" ref={inputLabelRef} onKeyDown={handleLabelInput} />
                <span ref={inputLabelErrorRef}></span>
            </div>
        </ProjectCardContainer>
    )
}