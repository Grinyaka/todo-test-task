import styles from './styles.module.css'

import { Droppable } from 'react-beautiful-dnd'
import { useTasks } from 'src/hooks/useTasks'
import { TaskStatus } from 'src/models/TaskModel'
import TaskModal from './task-modal/TaskModal'

type Props = {
  status: TaskStatus
}

const StatusColumn = ({status}: Props) => {
  const {tasks, loading, newTaskTitle, handleChange, handleCreateTask, handleDeleteTask} =
    useTasks(status)
  const currentTasks = tasks[status]
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperHeader}>{status}</div>
      <Droppable droppableId={status}>
        {(provided) => (
          <>
            <div
              className={styles.wrapperContent}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {currentTasks.map((task, index) => (
                <TaskModal task={task} index={index} />
              ))}
            </div>
            {provided.placeholder}
          </>
        )}
      </Droppable>

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
