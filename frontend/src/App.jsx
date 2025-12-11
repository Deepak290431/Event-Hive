import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import EventsPage from "./pages/EventsPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import CheckinPage from "./pages/CheckinPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import BookingSuccessPage from "./pages/BookingSuccessPage.jsx";
import NavBar from "./components/NavBar.jsx";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

const AppRoutes = () => (
  <>
    <NavBar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/events" element={<div className="container"><EventsPage /></div>} />
      <Route
        path="/booking-success/:eventId"
        element={
          <PrivateRoute>
            <BookingSuccessPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <div className="container"><DashboardPage /></div>
          </PrivateRoute>
        }
      />
      <Route
        path="/checkin"
        element={
          <PrivateRoute>
            <div className="container"><CheckinPage /></div>
          </PrivateRoute>
        }
      />
    </Routes>
  </>
);

const App = () => (
  <AuthProvider>
    <AppRoutes />
  </AuthProvider>
);

export default App;

