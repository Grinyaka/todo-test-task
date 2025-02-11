import styles from './styles.module.css'
import {Link} from 'react-router-dom'
import Spinner from 'src/components/Spinner'
import useProjects from 'src/hooks/useProjects'

const RouteProjects = () => {
  const {projects, isLoading, newProjectTitle, handleCreate, handleDelete, handleChange} = useProjects()

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleCreate()
        }}
        className={styles.createProject + ' ' + styles.card}
      >
        <input value={newProjectTitle} type="text" onChange={handleChange} placeholder="Project title" />
        <button type="submit">Create project</button>
      </form>
      <div className={styles.wrapper}>
        {projects.map((project) => (
          <Link className={styles.card} to={`/tasks/${project.id}`} key={project.id}>
            <div>{project.title}</div>
            <div>{project.id}</div>
            <button
              className={styles.deleteButton}
              onClick={(e) => {
                e.preventDefault()
                handleDelete(project.id)
              }}
            >
              Delete
            </button>
          </Link>
        ))}
      </div>
    </>
  )
}

export default RouteProjects
