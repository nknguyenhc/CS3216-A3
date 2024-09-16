import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import MainLayout from "./layouts/MainLayout";
import SuccessPage from "./pages/SuccessPage";
import FailedPage from "./pages/UnsuccessPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<LandingPage />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/unsuccess" element={<FailedPage />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;