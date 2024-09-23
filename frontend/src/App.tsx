import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./components/Authentication/AuthenticationContext";

import LandingPage from "./pages/LandingPage";
import MainLayout from "./layouts/MainLayout";
import SuccessPage from "./pages/SuccessPage";
import UnsuccessPage from "./pages/UnsuccessPage";
import NotFoundPage from "./pages/NotFoundPage";
import Authentication from "./components/Authentication/Authentication";
import UploadPage from "./pages/UploadPage";
import SubmissionsPage from "./pages/SubmissionsPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<LandingPage />} />
      <Route path="/authentication" element={<Authentication />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/unsuccess" element={<UnsuccessPage />} />
      <Route path="/essay/upload" element={<UploadPage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/submissions" element={<SubmissionsPage />} />
    </Route>
  )
);

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
