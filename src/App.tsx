import {BrowserRouter, Route, Routes} from 'react-router-dom'
import RouteProjects from './route-projects'
import RouteTasks from './route-tasks'
import RouteNotFound from './route-404'

function App() {
  return (
    <BrowserRouter>
      <div className="page-container">
        <Routes>
          <Route path="/" element={<RouteProjects />} />
          <Route path="tasks/:id" element={<RouteTasks />} />
          {/* 
          <Route path="*" element={<RouteNotFound />} />  

          Не уверен, надо ли добавлять 404 с редиректом. 2 страницы по ТЗ
        */}
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
