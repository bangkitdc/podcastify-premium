import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
// import Register from "./pages/Register.tsx";
// import Login from "./pages/Login.tsx";
// import Episodes from "./pages/creator/Episodes.tsx";
// import CreateEpisode from "./pages/creator/CreateEpisode.tsx";
// // import CreatePodcast from "./pages/creator/CreatePodcast.tsx";
// import SubscribeReq from "./pages/admin/SubscribeReq.tsx";
import support from "./api/support.ts";
import { useAuth } from "./contexts/index.ts";
import { jwtDecode } from "jwt-decode";
import ProtectedRoute from "./ProtectedRoute.tsx";
import { useEffect, lazy, Suspense } from "react";
import EpisodeDetail from "./pages/creator/EpisodeDetail.tsx";

const SubscribeReq = lazy(() => import("./pages/admin/SubscribeReq"));
const Episodes = lazy(() => import("./pages/creator/Episodes"));
const CreateEpisode = lazy(() => import("./pages/creator/CreateEpisode"));
const SubscriberList = lazy(() => import("./pages/creator/SubscriberList"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

function App() {
  const { user, token, refreshToken } = useAuth();
  const { api } = support();

  api.interceptors.request.use(
    async (config) => {
      const accessToken = token;

      if (accessToken) {
        const { exp } = jwtDecode(accessToken);
        if (exp && exp * 1000 < Date.now()) {
          // Access token is expired, refresh it
          try {
            await refreshToken();
          } catch (error) {
            console.error("Token refresh failed:", error);
          }
        } else {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const isAuth = user ? true : false;
  const isAdmin = user?.role_id === 1;

  const currentUrl = useLocation().pathname;
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth && (currentUrl === "/login" || currentUrl === "/register")) {
      navigate("/");
    }
  }, [isAuth, currentUrl, navigate]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute
            isAuth={isAuth}
            isAdmin={isAdmin}
            currentUrl={currentUrl}
          >
            {isAdmin ? (
              <Suspense fallback={<div>Loading...</div>}>
                <SubscribeReq />
              </Suspense>
            ) : (
              <Suspense fallback={<div>Loading...</div>}>
                <Episodes />
              </Suspense>
            )}
          </ProtectedRoute>
        }
      />

      <Route
        path="/:id"
        element={
          <ProtectedRoute
            isAuth={isAuth}
            isAdmin={isAdmin}
            currentUrl={currentUrl}
          >
            {isAdmin ? (
              <Suspense fallback={<div>Loading...</div>}>
                <SubscribeReq />
              </Suspense>
            ) : (
              <Suspense fallback={<div>Loading...</div>}>
                <EpisodeDetail />
              </Suspense>
            )}
          </ProtectedRoute>
        }
      />

      <Route
        path="/create-episode"
        element={
          <ProtectedRoute
            isAuth={isAuth}
            isAdmin={isAdmin}
            currentUrl={currentUrl}
          >
            <Suspense fallback={<div>Loading...</div>}>
              <CreateEpisode />
            </Suspense>
          </ProtectedRoute>
        }
      />

      <Route
        path="/subscriber"
        element={
          <ProtectedRoute
            isAuth={isAuth}
            isAdmin={isAdmin}
            currentUrl={currentUrl}
          >
            <Suspense fallback={<div>Loading...</div>}>
              <SubscriberList />
            </Suspense>
          </ProtectedRoute>
        }
      />

      <Route
        path="/login"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Login />
          </Suspense>
        }
      />
      <Route
        path="/register"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Register />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default App;
