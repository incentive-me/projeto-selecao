import { KeyboardEvent, useContext, useEffect, useRef, useState } from "react"
import { Project, ProjectsContext } from "../../contexts/projectsContext"
import { ProjectListContainer, SearchContainer } from "./styles"

import ProjectCard from '../ProjectCard'

type ProjectsListProps = {
    initialProjects: Project[]
}

export default function Projects({ initialProjects }: ProjectsListProps) {
    const { setProjects, projects } = useContext(ProjectsContext);
    const [filteredProjects, setFilteredProjects] = useState<Project[]>()
    const searchInputRef = useRef<HTMLInputElement>();

    useEffect(() => {
        setProjects(initialProjects)
        setFilteredProjects(initialProjects)

        searchInputRef.current.focus()
    }, [])

    function handleSearch(event: KeyboardEvent<HTMLInputElement>) {
        if (searchInputRef.current.value === '') {
            showAllProjects();
            return;
        }
        const filtered = projects.filter(project => {
            return project.labels.some(item => item.includes(searchInputRef.current.value))
        })
        setFilteredProjects(filtered)
    }

    function showAllProjects() {
        searchInputRef.current.value = ''
        setFilteredProjects(projects)
    }

    return (
        <div>
            <ProjectListContainer>
                <h2>Starred Projects</h2>
                <SearchContainer>
                    <input
                        name="search"
                        placeholder="🔎 Search by Label"
                        type="text"
                        ref={searchInputRef}
                        onKeyUp={handleSearch}
                    />
                    <button onClick={showAllProjects}>≣ Show all</button>
                </SearchContainer>
                {filteredProjects?.map(project => (
                    <ProjectCard project={project} key={project.id} />
                ))}
            </ProjectListContainer>
        </div>
    )
}