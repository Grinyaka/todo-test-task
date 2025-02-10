import {Link} from 'react-router-dom'

const RouteNotFound = () => {
  // check if user is logged in
  return (
    <div>
      There is no such page. <Link to="/">Return to main page</Link>
    </div>
  )
}

export default RouteNotFound
