import React, {useState} from 'react'
import ModalPortal from 'src/components/ModalPortal'
import {useDraggable} from '@dnd-kit/core'
import {TaskModel} from 'src/models/TaskModel'
import styles from '../styles.module.css'
import modalStyles from './modal.module.css'

type Props = {
  task: TaskModel
  index: number
}

const TaskModal = ({task, index}: Props) => {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: task.id,
    
  })
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => {
    setIsOpen(false)
  }
  const onOpen = () => {
    setIsOpen(true)
  }
  return (
    <div
      ref={setNodeRef}
      className={styles.card}
      style={style}
      {...listeners}
      {...attributes}
    >
      <div onClick={onOpen} className={styles.cardTitle}>
        {task.title} + {task.id}
      </div>
      {isOpen && (
        <ModalPortal>
          <div className={modalStyles.modalOverlay} onClick={onClose}>
            <div
              className={modalStyles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.cardTitle}>{task.title}</div>
              <button onClick={onClose}>Закрыть</button>
            </div>
          </div>
        </ModalPortal>
      )}
    </div>
  )
}

export default TaskModal
