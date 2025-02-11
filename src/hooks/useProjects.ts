import {useEffect, useState} from 'react'
import {useInject} from 'src/Injection'
import {CreateProjectInteractor} from 'src/interactors/CreateProjectInteractor'
import {DeleteProjectInteractor} from 'src/interactors/DeleteProjectInteractor'
import {GetProjectsListInteractor} from 'src/interactors/GetProjectsListInteractor'
import {addProject, deleteProject, setProjects} from 'src/redux/actions/projectActions'
import {useAppDispatch, useAppSelector} from 'src/redux/hooks'

const useProjects = () => {
  const {projects} = useAppSelector((state) => state.projects)
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const getProjectsListInteractor: GetProjectsListInteractor = useInject(GetProjectsListInteractor)
  const createProjectInteractor: CreateProjectInteractor = useInject(CreateProjectInteractor)
  const deleteProjectInteractor: DeleteProjectInteractor = useInject(DeleteProjectInteractor)

  const [newProjectTitle, setNewProjectTitle] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewProjectTitle(event.target.value || '')
  }

  const handleDelete = async (projectId: number) => {
    try {
      await deleteProjectInteractor.invoke({projectId})
      dispatch(deleteProject({projectId}))
    } catch (error) {
      console.error('Error deleting project:', error)
    }
  }
  const handleCreate = async () => {
    try {
      const newProject = await createProjectInteractor.invoke({projectTitle: newProjectTitle})
      dispatch(addProject({project: newProject}))
      setNewProjectTitle('')
    } catch (error) {
      console.error('Error creating project:', error)
    }
  }

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true)
      try {
        await getProjectsListInteractor.invoke({}).then((response) => {
          dispatch(setProjects({projects: response}))
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()

    return () => {
      setIsLoading(true)
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
