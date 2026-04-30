import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import About from "./components/About";
import Box from "./components/Box";
import Builder from "./components/Builder";
import CallToAction from "./components/CallToAction";
import Cards from "./components/Cards";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Recruiter from "./components/Recruiter";
import Student from "./components/Student";
import Login from "./components/login";
import List from "./components/List";
import Profile from "./components/Profile";
import VideoRoom from "./components/VideoRoom";

const ProtectedRoute = ({ children, allowedRole }) => {
  const userName = sessionStorage.getItem("userName");
  const userRole = sessionStorage.getItem("userRole");

  if (!userName || !userRole) {
    return <Navigate to="/login" replace />;
  }
  if (allowedRole && userRole !== allowedRole) {
    return <Navigate to={`/${userRole}`} replace />;
  }
  return children;
};

function Home() {
  return (
    <>
      <List />
      <Navbar />
      <Hero />
      <About />
      <Builder />
      <CallToAction />
      <Footer />
    </>
  );
}

function App() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#010409]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRole="student">
              <Student />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRole="student">
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter"
          element={
            <ProtectedRoute allowedRole="recruiter">
              <Recruiter />
            </ProtectedRoute>
          }
        />
        <Route
          path="/meeting/:roomId"
          element={
            <ProtectedRoute>
              <VideoRoom />
            </ProtectedRoute>
          }
        />
      </Routes>
      {/* <List name="Sourabh Singh" role="Machine Learning" /> */}
    </div>
  );
}

export default App;
