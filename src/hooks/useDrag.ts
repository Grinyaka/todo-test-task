import { useState } from 'react'
import {useAppDispatch} from 'src/redux/hooks'

export const useDrag = () => {
  const dispatch = useAppDispatch()
const [isDropDisabled, setIsDropDisabled] = useState(false)

const handleDragStart = (task) => {
  setIsDropDisabled(task.something === 'xyz') // <= your condition goes here
} 
  const handleDragEnd = (result) => {
    if (!result.destination) return

    console.log(result)
  }
  return {
    handleDragEnd,
    handleDragStart,
  }
}
