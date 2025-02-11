import styles from './styles.module.css'

import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'
import { useTasks } from 'src/hooks/useTasks'
import { TaskStatus } from 'src/models/TaskModel'

type Props = {
  status: TaskStatus
}

const StatusColumn = ({status}: Props) => {
  const {taskList, loading, createTask, deleteTask, newTaskTitle, handleChange} = useTasks(status)

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperHeader}>{status}</div>
      <div  className={styles.wrapperContent}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          taskList.map((task, index) => (
            <Draggable draggableId={task.id} className={styles.card} key={task.id} index={index}>
              <div className={styles.cardTitle}>{task.title}</div>
            </Draggable>
          ))
        )}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          createTask(newTaskTitle)
        }}
        className={styles.createTask}
      >
        <input value={newTaskTitle} type="text" onChange={handleChange} placeholder="Task title" />
        <button type="submit">Create task</button>
      </form>
    </div>
  )
}

export default StatusColumn
