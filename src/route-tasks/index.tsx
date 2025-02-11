import styles from './styles.module.css'

import {TaskStatus} from 'src/models/TaskModel'
import StatusColumn from './StatusColumn'
import {DragDropContext} from 'react-beautiful-dnd'
import {useDrag} from 'src/hooks/useDrag'

const RouteTasks = () => {
  const {handleDragEnd} = useDrag()

  return (
    <div className={styles.columnsWrapper}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <StatusColumn status={TaskStatus.queue} />
        <StatusColumn status={TaskStatus.development} />
        <StatusColumn status={TaskStatus.done} />
      </DragDropContext>
    </div>
  )
}

export default RouteTasks
