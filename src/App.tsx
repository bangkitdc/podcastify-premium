import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/index.ts";
import ProtectedRoute from "./ProtectedRoute.tsx";
import { useEffect, lazy, Suspense } from "react";
import Loading from "@/components/shares/loadings/Primary.tsx";

function delay<T>(promise: Promise<T>): Promise<T> {
  return new Promise<T>((resolve) => {
    setTimeout(resolve, 1250);
  }).then(() => promise);
}

const SubscribeReq = lazy(() => delay(import("@/pages/admin/SubscribeReq")));
const Episodes = lazy(() => delay(import("@/pages/creator/Episodes")));
const EpisodeDetail = lazy(() => delay(import("@/pages/creator/EpisodeDetail")));
const CreateEpisode = lazy(() => delay(import("@/pages/creator/CreateEpisode")));
const SubscriberList = lazy(() => delay(import("@/pages/creator/SubscriberList")));
const Login = lazy(() => delay(import("@/pages/Login")));
const Register = lazy(() => delay(import("@/pages/Register")));

function App() {
  const { user } = useAuth();

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
