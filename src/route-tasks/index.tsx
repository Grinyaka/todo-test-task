import styles from './styles.module.css'

import { TaskStatus } from 'src/models/TaskModel'
import StatusColumn from './StatusColumn'
import {DragDropContext} from 'react-beautiful-dnd'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const RouteTasks = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({type: 'PROJECTS', payload: 1})
  }, [])
        const onDragEnd = (result) => {
          if (!result.destination) return

          console.log(result)
        }
  return (
    <DragDropContext onDragEnd={onDragEnd} className={styles.columnsWrapper}>
      <StatusColumn status={TaskStatus.queue} />
      <StatusColumn status={TaskStatus.development} />
      <StatusColumn status={TaskStatus.done} />
    </DragDropContext>
  )
}

export default RouteTasks
