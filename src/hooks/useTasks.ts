import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useInject} from 'src/Injection'
import {CreateTaskInteractor} from 'src/interactors/CreateTaskInteractor'
import {DeleteTaskInteractor} from 'src/interactors/DeleteTaskInteractor'
import {GetTasksListInteractor} from 'src/interactors/GetTasksListInteractor'
import {TaskModel, TaskPriority, TaskStatus} from 'src/models/TaskModel'
import {TaskPOSTRequest} from 'src/models/TaskPOSTRequest'
import {addTask, deleteTask, setTaskList} from 'src/redux/actions/taskActions'
import {useAppDispatch, useAppSelector} from 'src/redux/hooks'

export const useTasks = (taskStatus: TaskStatus) => {
  const {done, queue, development} = useAppSelector((state) => state.tasks)
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(true)
  const createTaskInteractor = useInject<CreateTaskInteractor>(CreateTaskInteractor)
  const deleteTaskInteractor = useInject<DeleteTaskInteractor>(DeleteTaskInteractor)
  const getTasksInteractor = useInject<GetTasksListInteractor>(GetTasksListInteractor)

  const [newTaskTitle, setNewTaskTitle] = useState('')

  const {id} = useParams()
  const projectId = Number(id)
  const tasks = {
    [TaskStatus.done]: done,
    [TaskStatus.queue]: queue,
    [TaskStatus.development]: development,
  } 
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(event.target.value || '')
  }
  const handleCreateTask = async (taskName: string) => {
    const request = new TaskPOSTRequest(taskName, taskStatus, projectId)
    try {
      const newTask = await createTaskInteractor.invoke({
        projectId,
        request,
        currentTaskAmount: Object.values(tasks).length,
      })
      dispatch(addTask({task: newTask, taskStatus}))
    } catch (error) {
      console.error('Error creating task:', error)
    }
  }

  const handleDeleteTask = async (task: TaskModel) => {
    try {
      await deleteTaskInteractor.invoke({
        projectId,
        taskId: task.id,
        currentTaskAmount: Object.values(tasks).length,
      })
      dispatch(deleteTask({task, taskStatus}))
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true)
      try {
        const tasks = await getTasksInteractor.invoke({projectId, taskStatus})
        dispatch(setTaskList({tasks, taskStatus}))
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()

    return () => {
      setLoading(true)
    }
  }, [projectId, taskStatus])

  return {
    tasks,
    loading,
    newTaskTitle,
    handleChange,
    handleCreateTask,
    handleDeleteTask,
  }
}
