import {useEffect, useState} from 'react'
import {useInject} from 'src/Injection'
import {CreateProjectInteractor} from 'src/interactors/CreateProjectInteractor'
import {DeleteProjectInteractor} from 'src/interactors/DeleteProjectInteractor'
import {GetProjectsListInteractor} from 'src/interactors/GetProjectsListInteractor'
import {ProjectModel} from 'src/models/ProjectModel'

const useProjects = () => {
  const [projects, setProjects] = useState<ProjectModel[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const getProjectsList: GetProjectsListInteractor = useInject(GetProjectsListInteractor)
  const createProject: CreateProjectInteractor = useInject(CreateProjectInteractor)
  const deleteProject: DeleteProjectInteractor = useInject(DeleteProjectInteractor)

  const [newProjectTitle, setNewProjectTitle] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewProjectTitle(event.target.value || '')
  }

  const handleDelete = async (projectId: number) => {
    try {
      await deleteProject.invoke({projectId})
      setProjects((prevProjects) => prevProjects.filter((project) => project.id !== projectId))
    } catch (error) {
      console.error('Error deleting project:', error)
    }
  }
  const handleCreate = async () => {
    try {
      const newProject = await createProject.invoke({projectTitle: newProjectTitle})
      setProjects((prevProjects) => [...prevProjects, newProject])
      setNewProjectTitle('')
    } catch (error) {
      console.error('Error creating project:', error)
    }
  }

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true)
      try {
        const projects = await getProjectsList.invoke({})
        setProjects(projects)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()

    return () => {
      setIsLoading(true)
      setProjects([])
    }
  }, [])

  return {
    projects,
    isLoading,
    newProjectTitle,
    handleCreate,
    handleDelete,
    handleChange,
  }
}

export default useProjects
