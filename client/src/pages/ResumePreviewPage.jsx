import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { useResume } from '../context/ResumeContext';
import { Download, Loader2, ChevronLeft, Share2, Printer, CheckCircle2 } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import api from '../api/axios';


// Import all templates
import ModernTemplate from '../components/templates/ModernTemplate';
import ClassicTemplate from '../components/templates/ClassicTemplate';
import MinimalTemplate from '../components/templates/MinimalTemplate';
import ExecutiveTemplate from '../components/templates/ExecutiveTemplate';
import TechProTemplate from '../components/templates/TechProTemplate';
import SimpleATSTemplate from '../components/templates/SimpleATSTemplate';
import CreativeTemplate from '../components/templates/CreativeTemplate';
import DeveloperTemplate from '../components/templates/DeveloperTemplate';
import AcademicTemplate from '../components/templates/AcademicTemplate';
import RetailTemplate from '../components/templates/RetailTemplate';
import CorporateTemplate from '../components/templates/CorporateTemplate';
import ElegantTemplate from '../components/templates/ElegantTemplate';
import CompactTemplate from '../components/templates/CompactTemplate';
import HybridTemplate from '../components/templates/HybridTemplate';
import FunctionalTemplate from '../components/templates/FunctionalTemplate';

const templateMap = {
  'Modern': ModernTemplate,
  'Classic': ClassicTemplate,
  'Minimal': MinimalTemplate,
  'Executive': ExecutiveTemplate,
  'Tech Pro': TechProTemplate,
  'Simple ATS': SimpleATSTemplate,
  'Creative': CreativeTemplate,
  'Developer': DeveloperTemplate,
  'Academic': AcademicTemplate,
  'Retail': RetailTemplate,
  'Corporate': CorporateTemplate,
  'Elegant': ElegantTemplate,
  'Compact': CompactTemplate,
  'Hybrid': HybridTemplate,
  'Functional': FunctionalTemplate,
};

export default function ResumePreviewPage() {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const { resumeData, setResumeData } = useResume();
  const [isDownloading, setIsDownloading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // If resumeData is empty (e.g. refresh), try to fetch the latest resume
    const fetchLatest = async () => {
      if (!resumeData.personalInfo.firstName && !resumeData.personalInfo.email) {
        setIsLoading(true);
        try {
          const response = await api.get('/api/resumes');
          if (response.data.success && response.data.data.length > 0) {
            const latest = response.data.data[0];
            // Transform back if needed or just use as is if templates support it
            // For now, we'll assume the context state matches what we need
            // or we might need a reverse transformation. 
            // Actually, the templates expect 'personalInfo', 'experience', etc.
            // The Mongoose model has them too.
            setResumeData(latest); 
          }
        } catch (error) {
          console.error("Error fetching latest resume:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchLatest();
  }, [resumeData, setResumeData]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="animate-spin text-accent" size={48} />
        </div>
      </DashboardLayout>
    );
  }

  const SelectedTemplateComponent = templateMap[templateId] || ModernTemplate;

  const handleDownloadPdf = async () => {
    setIsDownloading(true);
    try {
      const element = document.getElementById('resume-document');
      if (!element) {
        throw new Error('Resume element not found');
      }

      const opt = {
        margin:       0,
        filename:     `${resumeData.personalInfo.firstName || 'My'}_Resume.pdf`,
        image:        { type: 'jpeg', quality: 1.0 },
        html2canvas:  { scale: 2, useCORS: true, letterRendering: true },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      await html2pdf().set(opt).from(element).save();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-8 pb-20">
        {/* Success Notification */}
        {showSuccess && (
          <div className="fixed top-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl bg-emerald-500 text-white shadow-2xl animate-in zoom-in duration-300">
            <CheckCircle2 size={24} />
            <div className="flex flex-col">
              <span className="font-display font-bold">Success!</span>
              <span className="text-xs opacity-90">Your professional resume has been downloaded.</span>
            </div>
          </div>
        )}

        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-surface/50 p-6 rounded-2xl border border-border/40 backdrop-blur-sm">
          <div className="flex flex-col gap-1">
             <button 
              onClick={() => navigate('/dashboard/templates')}
              className="flex items-center gap-2 text-xs text-muted hover:text-accent font-display font-bold uppercase tracking-wider mb-2 transition-colors"
             >
               <ChevronLeft size={14} /> Back to templates
             </button>
             <h1 className="font-display font-bold text-2xl text-text">Final Preview</h1>
             <p className="text-sm text-muted font-body">Review your {templateId} resume before downloading.</p>
          </div>
          
          <div className="flex items-center gap-3">
             <button className="p-3 rounded-xl border border-border/60 text-muted hover:text-text hover:border-accent/40 transition-all">
               <Share2 size={18} />
             </button>
             <button className="p-3 rounded-xl border border-border/60 text-muted hover:text-text hover:border-accent/40 transition-all">
               <Printer size={18} />
             </button>
             <button 
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              className="btn-primary py-3 px-8 text-sm flex items-center gap-3 shadow-accent hover:scale-105 active:scale-95 transition-all"
             >
               {isDownloading ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
               Download PDF
             </button>
          </div>
        </div>

        {/* Resume Render Area */}
        <div className="flex justify-center">
           <div className="bg-white shadow-2xl rounded-sm overflow-hidden transform transition-all duration-700 hover:shadow-accent/20">
              <SelectedTemplateComponent data={resumeData} />
           </div>
        </div>

        {/* Footer Help */}
        <div className="text-center">
          <p className="text-sm text-muted font-body">
            Need changes? <button onClick={() => navigate('/dashboard/create')} className="text-accent font-display font-bold hover:underline">Go back to form</button>
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
