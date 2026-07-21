import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import CandidateHistory from "./pages/CandidateHistory";
import CandidatePortal from "./pages/CandidatePortal";
import Login from "./pages/Login";
import RecruiterCandidates from "./pages/RecruiterCandidates";
import RecruiterDashboard from "./pages/RecruiterDashboard";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        <Route path="/candidate" element={
          <ProtectedRoute roles={["candidate"]}><CandidatePortal /></ProtectedRoute>
        } />
        <Route path="/candidate/history" element={
          <ProtectedRoute roles={["candidate"]}><CandidateHistory /></ProtectedRoute>
        } />

        <Route path="/recruiter" element={
          <ProtectedRoute roles={["recruiter", "admin"]}><RecruiterDashboard /></ProtectedRoute>
        } />
        <Route path="/recruiter/candidates" element={
          <ProtectedRoute roles={["recruiter", "admin"]}><RecruiterCandidates /></ProtectedRoute>
        } />

        <Route path="/admin" element={
          <ProtectedRoute roles={["admin"]}><AdminDashboard /></ProtectedRoute>
        } />
      </Routes>
    </>
  );
}
