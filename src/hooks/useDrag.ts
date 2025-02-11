import {useState} from 'react'
import {useParams} from 'react-router-dom'
import {useInject} from 'src/Injection'
import {ChangeTaskInteractor} from 'src/interactors/ChangeTaskInteractor'
import {TaskStatus} from 'src/models/TaskModel'
import {changeTask} from 'src/redux/actions/taskActions'
import {useAppDispatch} from 'src/redux/hooks'

export const useDrag = () => {
  const dispatch = useAppDispatch();
  const { id: projectId } = useParams();
  const changeTaskInteractor = useInject<ChangeTaskInteractor>(ChangeTaskInteractor);

  const handleTaskUpdate = async (taskId: number, currentStatus: TaskStatus, newStatus: TaskStatus) => {
    const updatedTask = await changeTaskInteractor.invoke({
      projectId: Number(projectId),
      request: { id: taskId, status: newStatus },
    });
    dispatch(changeTask({task: updatedTask, taskStatus: currentStatus}))
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const taskId = parseInt(result.draggableId);
    const sourceStatus: TaskStatus = result.source.droppableId;
    const destinationStatus: TaskStatus = result.destination.droppableId;

    if (sourceStatus === destinationStatus) return;

    handleTaskUpdate(taskId, sourceStatus, destinationStatus);
  };

  return { handleDragEnd };
};
