import './app.styles.scss'
import GetRoutes from '../src/Routes/Routes'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'

function App() {
  return (
    <div className='h-full w-full'>
      <Routes>
        {GetRoutes().map((item, key) => (
          <Route
            path={item.path}
            key={key}
            element={
              item.redirectTo ? (
                <Navigate to={item.redirectTo} />
              ) : (
                <item.element />
              )
            }
          >
            {/* {item.childRoute &&
              item.childRoute.map((subItem, key) =>
                subItem.index ? (
                  <Route key={key} index element={<subItem.element />} />
                ) : (
                  <Route
                    key={key}
                    path={subItem.path}
                    element={<subItem.element />}
                  />
                )
              )} */}
          </Route>
        ))}
      </Routes>
    </div>
  )
}

export default App
