import React, { useState } from 'react'
import ModalPortal from 'src/components/ModalPortal'

type Props = {}

const TaskModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  if (!isOpen) return null
  return (
    <>
{/*       
      <ModalPortal>
        <div className="modal-overlay" onClick={onClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {children}
            <button onClick={onClose}>Закрыть</button>
          </div>
        </div>
      </ModalPortal> */}
    </>
  )
}

export default TaskModal