import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {TaskModel, TaskPriority, TaskStatus} from 'src/models/TaskModel'

export const useTasks = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [tasks, setTasks] = useState<TaskModel[]>([])

  const {id} = useParams()
  // take project data by id from store

  useEffect(() => {
    const getTasks = () => {
      //use tasksRepository
      return [
        new TaskModel(1, 'Task 1', new Date(), '1h', new Date(), TaskPriority.low, [], TaskStatus.queue, [], []),
        new TaskModel(2, 'Task 2', new Date(), '2h', new Date(), TaskPriority.high, [], TaskStatus.development, [], []),
        new TaskModel(3, 'Task 3', new Date(), '3h', new Date(), TaskPriority.medium, [], TaskStatus.done, [], []),
      ]
    }
    setTasks(getTasks())
    setIsLoading(false)
  }, [])

  return {
    tasks,
    isLoading,
  }
}
