import { useEffect } from "react";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./components/Authentication/AuthenticationContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

import LandingPage from "./pages/LandingPage";
import MainLayout from "./layouts/MainLayout";
import SuccessPage from "./pages/SuccessPage";
import UnsuccessPage from "./pages/UnsuccessPage";
import NotFoundPage from "./pages/NotFoundPage";
import Authentication from "./components/Authentication/Authentication";
import UploadPage from "./pages/UploadPage";
import CommentPage from "./pages/CommentPage/CommentPage";
import SubmissionsPage from "./pages/SubmissionsPage";
import ReactGA from "react-ga4";

const trackingId = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;
ReactGA.initialize(trackingId || "G-96YKP5BQ1S");

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<LandingPage />} />
      <Route path="/authentication" element={<Authentication />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/unsuccess" element={<UnsuccessPage />} />
      <Route path="/essay/upload" element={<UploadPage />} />
      <Route path="/essay/comment/:id" element={<CommentPage />} />
      <Route path="/submissions" element={<SubmissionsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

const App = () => {
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);

  return (
    <GoogleOAuthProvider clientId="577083967585-e2klir9v7vt5edbn4juc7b705tjck9t0.apps.googleusercontent.com">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
