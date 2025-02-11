import React, {useEffect} from 'react'
import ReactDOM from 'react-dom'

const ModalPortal = ({children}) => {
  const modalRootEl = document.getElementById('modal-root')
  const modalContainerEl = document.createElement('div')

  useEffect(() => {
    if (modalRootEl) {
      modalRootEl.appendChild(modalContainerEl)
    }
    return () => {
      if (modalRootEl) {
        modalRootEl.removeChild(modalContainerEl)
      }
    }
  }, [modalContainerEl, modalRootEl])

  return ReactDOM.createPortal(children, modalContainerEl)
}

export default ModalPortal
