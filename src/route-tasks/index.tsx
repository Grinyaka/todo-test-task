import styles from './styles.module.css'

import {TaskStatus} from 'src/models/TaskModel'
import StatusColumn from './StatusColumn'
import {DndContext} from '@dnd-kit/core'
import {useDrag} from 'src/hooks/useDrag'

const RouteTasks = () => {
  const {handleDragEnd} = useDrag()

  return (
    <div className={styles.columnsWrapper}>
      <DndContext  onDragEnd={handleDragEnd}>
        <StatusColumn status={TaskStatus.queue} />
        <StatusColumn status={TaskStatus.development} />
        <StatusColumn status={TaskStatus.done} />
      </DndContext>
    </div>
  )
}

export default RouteTasks
