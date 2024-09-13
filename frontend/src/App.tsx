import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import MainLayout from './layouts/MainLayout';

const router = createBrowserRouter(
  createRoutesFromElements(
  <Route path="/" element={<MainLayout />}>
    <Route index element={<LandingPage />} />
  </Route>
  )
)

const App = () => {
  return (
    <RouterProvider router={router}/>
  )
}

export default App