import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import support from "@/api/support.ts";
import { useAuth } from "./contexts/index.ts";
import { jwtDecode } from "jwt-decode";
import ProtectedRoute from "./ProtectedRoute.tsx";
import { useEffect, lazy, Suspense } from "react";
import EpisodeDetail from "@/pages/creator/EpisodeDetail.tsx";
import Loading from "@/components/shares/loadings/Primary.tsx";

function delay<T>(promise: Promise<T>): Promise<T> {
  return new Promise<T>((resolve) => {
    setTimeout(resolve, 1000);
  }).then(() => promise);
}

const SubscribeReq = lazy(() => delay(import("./pages/admin/SubscribeReq")));
const Episodes = lazy(() => delay(import("./pages/creator/Episodes")));
const CreateEpisode = lazy(() => delay(import("./pages/creator/CreateEpisode")));
const SubscriberList = lazy(() => delay(import("./pages/creator/SubscriberList")));
const Login = lazy(() => delay(import("./pages/Login")));
const Register = lazy(() => delay(import("./pages/Register")));

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
              <Suspense fallback={<Loading />}>
                <SubscribeReq />
              </Suspense>
            ) : (
              <Suspense fallback={<Loading />}>
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
              <Suspense fallback={<Loading />}>
                <SubscribeReq />
              </Suspense>
            ) : (
              <Suspense fallback={<Loading />}>
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
            <Suspense fallback={<Loading />}>
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
            <Suspense fallback={<Loading />}>
              <SubscriberList />
            </Suspense>
          </ProtectedRoute>
        }
      />

      <Route
        path="/login"
        element={
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        }
      />
      <Route
        path="/register"
        element={
          <Suspense fallback={<Loading />}>
            <Register />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default App;
