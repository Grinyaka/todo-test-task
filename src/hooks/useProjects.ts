import {useEffect, useState} from 'react'
import {useInject} from 'src/Injection'
import {CreateProjectInteractor} from 'src/interactors/CreateProjectInteractor'
import {GetProjectsListInteractor} from 'src/interactors/GetProjectsListInteractor'
import {ProjectModel} from 'src/models/ProjectModel'

const useProjects = () => {
  const [projects, setProjects] = useState<ProjectModel[]>([])
  const [isLoading, setIsLoading] = useState(projects.length === 0)
  const getProjectsInteractor: GetProjectsListInteractor = useInject(GetProjectsListInteractor)
  const createProjectInteractor: CreateProjectInteractor = useInject(CreateProjectInteractor)

  const createProject = (projectTitle: string) => {
    createProjectInteractor.invoke({projectTitle}).then((response) => {
      setProjects([...projects, response])
    })
  }

  useEffect(() => {
    const getProjects = () => {
      setIsLoading(true)
      getProjectsInteractor.invoke({}).then((projects) => {
        setProjects(projects)
        setIsLoading(false)
      })
    }
    getProjects()
  }, [])

  return {
    projects,
    isLoading,
    createProject,
  }
}

export default useProjects
