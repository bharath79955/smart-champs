import { Navigate, Route, Routes } from "react-router-dom";

import { AuthProvider, useAuth } from "./context/AuthContext";
import { LearningProvider } from "./context/LearningContext";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import MyLearning from "./pages/MyLearning";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

// Only logged-in users can access protected pages.
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

// Logged-in users should not see Login or Register.
function GuestRoute({ children }) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Navigate to="/my-learning" replace />
  ) : (
    children
  );
}

function AppRoutes() {
  return (
    <Routes>
      {/* Shared navbar and footer */}
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="courses" element={<Courses />} />
        <Route path="courses/:id" element={<CourseDetails />} />

        <Route
          path="my-learning"
          element={
            <ProtectedRoute>
              <MyLearning />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Standalone authentication pages */}
      <Route
        path="/login"
        element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        }
      />

      <Route
        path="/register"
        element={
          <GuestRoute>
            <Register />
          </GuestRoute>
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <LearningProvider>
        <AppRoutes />
      </LearningProvider>
    </AuthProvider>
  );
}