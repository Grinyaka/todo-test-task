import React, { useState } from 'react'
import ModalPortal from 'src/components/ModalPortal'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'
import { TaskModel } from 'src/models/TaskModel'
import styles from '../styles.module.css'
import modalStyles from './modal.module.css'
type Props = {
  task: TaskModel,
  index: number
}

const TaskModal = ({task, index}: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => {
    setIsOpen(false)
  }
  const onOpen = () => {
    setIsOpen(true)
  }
  return (
    <>
      <Draggable key={task.id.toString()} draggableId={task.id.toString()} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="modal-overlay"
          >
            <div onClick={onOpen} className={styles.cardTitle}>
              {task.title} + {task.id}
            </div>
          </div>
        )}
      </Draggable>
      {isOpen && (
        <ModalPortal>
          <div className={modalStyles.modalOverlay} onClick={onClose}>
            <div className={modalStyles.modalContent} onClick={(e) => e.stopPropagation()}>
              <div className={styles.cardTitle}>{task.title}</div>
              <button onClick={onClose}>Закрыть</button>
            </div>
          </div>
        </ModalPortal>
      )}
    </>
  )
}

export default TaskModal