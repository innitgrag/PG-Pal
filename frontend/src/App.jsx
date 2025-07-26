import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/Owner/Dashboard";
import Profile from "./pages/Owner/Profile";
import AddProperty from "./pages/Owner/AddProperty";
import Home from "./pages/seeker/Home";
import Me from "./pages/seeker/Me";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ProtectedRoute from "./Context/ProtectedRoute";

function App() {
  return (

    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/owner/dashboard" element={<ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>} />
        <Route path="/owner/profile" element={ <ProtectedRoute>
              <Profile />
            </ProtectedRoute>} />
        <Route path="/owner/addProperty" element={ <ProtectedRoute>
              <AddProperty />
            </ProtectedRoute>} />
        <Route path="/seeker/home" element={ <ProtectedRoute>
              <Home />
            </ProtectedRoute>} />
        <Route path="/seeker/me" element={ <ProtectedRoute>
              <Me />
            </ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
    <ToastContainer/>
    </>
  );
}

export default App;
