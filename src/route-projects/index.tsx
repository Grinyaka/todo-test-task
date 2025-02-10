import { Link } from 'react-router-dom'
import useProjects from 'src/hooks/useProjects'

const RouteProjects = () => {
  const {projects, isLoading: isProjectsLoading} = useProjects()

  if (isProjectsLoading) {
    return <div>Loading...</div>
  }
  
  return (
    <div style={{
      display: 'flex',
      flexFlow: 'row wrap',
      gap: '10px'
    }}>
      {projects.map((project) => (
        <Link className='card' to={`/tasks/${project.id}`} key={project.id}>
          <div>{project.title}</div>
          <div>{project.id}</div>
        </Link>
      ))}
    </div>
  )
}

export default RouteProjects
