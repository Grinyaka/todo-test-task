import styles from './styles.module.css'

import {useTasks} from 'src/hooks/useTasks'
import {TaskStatus} from 'src/models/TaskModel'
import TaskModal from './task-modal/TaskModal'
import {DragOverlay, useDroppable} from '@dnd-kit/core'
import { useState } from 'react'

type Props = {
  status: TaskStatus
}

const StatusColumn = ({status}: Props) => {
  const {tasks, newTaskTitle, handleChange, handleCreateTask} = useTasks(status)
  const currentTasks = tasks[status]
  const {isOver, setNodeRef} = useDroppable({
    id: status,
  })
  const style = {
    color: isOver ? 'green' : undefined,
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperHeader}>{status}</div>

      <div className={styles.wrapperContent} style={style} ref={setNodeRef}>
        {currentTasks.map((task, index) => (
          <TaskModal task={task} index={index} />
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleCreateTask(newTaskTitle)
        }}
        className={styles.createTask}
      >
        <input
          value={newTaskTitle}
          type="text"
          onChange={handleChange}
          placeholder="Task title"
        />
        <button type="submit">Create task</button>
      </form>
    </div>
  )
}


export default StatusColumn
