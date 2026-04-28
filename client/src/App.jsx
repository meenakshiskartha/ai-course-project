import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import Dashboard from "./Dashboard";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import Purchase from "./Purchase";
import Admin from "./Admin";
import ResetPassword from "./ResetPassword";
import CoursePanel from "./CoursePanel";

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
     <>
     <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/purchase" element={<Purchase />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/course" element={<CoursePanel />} />


        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  
  }
/>
       <Route path="/reset-password" element={<ResetPassword />} />
         
      </Routes>
      </>  
  );
}

export default App;