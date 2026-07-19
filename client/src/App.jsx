import { Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import CreateResume from './pages/CreateResume'
import AnalyzeResume from './pages/AnalyzeResume'
import JobRecommendations from './pages/JobRecommendations'
import Login from './pages/Login'
import Signup from './pages/Signup'
import TemplateGallery from './pages/TemplateGallery'
import ResumePreviewPage from './pages/ResumePreviewPage'
import InterviewGenerator from './pages/InterviewGenerator'
import RecruiterPortal from './pages/RecruiterPortal'
import HiringAnalytics from './pages/HiringAnalytics'
import MicrosoftCloud from './pages/MicrosoftCloud'
import CandidatePortal from './pages/CandidatePortal'
import { ResumeProvider } from './context/ResumeContext'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <AuthProvider>
      <ResumeProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/dashboard/candidate" element={<ProtectedRoute><CandidatePortal /></ProtectedRoute>} />
          <Route path="/dashboard/create" element={<ProtectedRoute><CreateResume /></ProtectedRoute>} />
          <Route path="/dashboard/templates" element={<ProtectedRoute><TemplateGallery /></ProtectedRoute>} />
          <Route path="/dashboard/preview/:templateId" element={<ProtectedRoute><ResumePreviewPage /></ProtectedRoute>} />
          <Route path="/dashboard/analyze" element={<ProtectedRoute><AnalyzeResume /></ProtectedRoute>} />
          <Route path="/dashboard/jobs" element={<ProtectedRoute><JobRecommendations /></ProtectedRoute>} />
          <Route path="/dashboard/interview" element={<ProtectedRoute><InterviewGenerator /></ProtectedRoute>} />
          <Route path="/dashboard/recruiter" element={<ProtectedRoute><RecruiterPortal /></ProtectedRoute>} />
          <Route path="/dashboard/analytics" element={<ProtectedRoute><HiringAnalytics /></ProtectedRoute>} />
          <Route path="/dashboard/microsoft" element={<ProtectedRoute><MicrosoftCloud /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ResumeProvider>
    </AuthProvider>
  )
}

