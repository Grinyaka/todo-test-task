import styles from './styles.module.css'

import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'
import {useTasks} from 'src/hooks/useTasks'
import {TaskStatus} from 'src/models/TaskModel'

type Props = {
  status: TaskStatus
}

const StatusColumn = ({status}: Props) => {
  const {
    tasks,
    loading,
    newTaskTitle,
    handleChange,
    handleCreateTask,
    handleDeleteTask,
  } = useTasks(status)
  const currentTasks = tasks[status]
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperHeader}>{status}</div>
        <Droppable droppableId={status}>
          {(provided) => (
            <div
              className={styles.wrapperContent}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {currentTasks.map((task, index) => (
                <Draggable
                  key={task.id.toString()}
                  draggableId={task.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className={styles.cardTitle}>{task.title}</div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
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
