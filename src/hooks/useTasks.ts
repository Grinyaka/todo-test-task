import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useInject} from 'src/Injection'
import {CreateTaskInteractor} from 'src/interactors/CreateTaskInteractor'
import {DeleteTaskInteractor} from 'src/interactors/DeleteTaskInteractor'
import {GetTasksListInteractor} from 'src/interactors/GetTasksListInteractor'
import {TaskModel, TaskPriority, TaskStatus} from 'src/models/TaskModel'
import {TaskPOSTRequest} from 'src/models/TaskPOSTRequest'

export const useTasks = (taskStatus: TaskStatus) => {
  const [loading, setLoading] = useState(true)
  const [taskList, setTaskList] = useState<TaskModel[]>([])
  const createTaskInteractor = useInject<CreateTaskInteractor>(CreateTaskInteractor)
  const deleteTaskInteractor = useInject<DeleteTaskInteractor>(DeleteTaskInteractor)
  const getTasksInteractor = useInject<GetTasksListInteractor>(GetTasksListInteractor)

  const [newTaskTitle, setNewTaskTitle] = useState('')

  const {id} = useParams()
  const projectId = Number(id)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(event.target.value || '')
  }
  const createTask = async (taskName: string) => {
    const request = new TaskPOSTRequest(taskName, taskStatus, projectId)
    try {
      const newTask = await createTaskInteractor.invoke({
        projectId,
        request,
        currentTaskAmount: taskList.length,
      })
      setTaskList((prevTasks) => [...prevTasks, newTask])
    } catch (error) {
      console.error('Error creating task:', error)
    }
  }

  const deleteTask = async (taskId: number) => {
    try {
      await deleteTaskInteractor.invoke({
        projectId,
        taskId,
        currentTaskAmount: taskList.length,
      })
      setTaskList((prevTasks) => prevTasks.filter((task) => task.id !== taskId))
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true)
      try {
        const tasks = await getTasksInteractor.invoke({projectId, taskStatus})
        setTaskList(tasks)
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()

    return () => {
      setLoading(true)
      setTaskList([])
    }
  }, [projectId, taskStatus])

  return {
    taskList,
    loading,
    newTaskTitle,
    handleChange,
    createTask,
    deleteTask,
  }
}
