import './styles.css'

import {useTasks} from 'src/hooks/useTasks'
import {DateUtils} from 'src/utils/DateUtils'

const RouteTasks = () => {
  const {tasks, isLoading: isTasksLoading} = useTasks()

  return (
    <div>
      {isTasksLoading ? (
        <div>Loading...</div>
      ) : (
        tasks.map((task) => (
          <div className='card' key={task.id}>
            <div>{task.title}</div>
            <div>{task.id}</div>
            <div>{task.description}</div>
            <div>{task.priority}</div>
            <div>{task.status}</div>
            <div>{task.workTime}</div>
            <div>{DateUtils.toFormat(task.createdDate, DateUtils.DATE_FORMAT_SHORT)}</div>
          </div>
        ))
      )}
    </div>
  )
}

export default RouteTasks
