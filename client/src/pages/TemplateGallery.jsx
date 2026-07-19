import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { useResume } from '../context/ResumeContext';
import { templates } from '../constants/templates';
import { Check, ArrowRight, Star, Sparkles, Layout } from 'lucide-react';

export default function TemplateGallery() {
  const navigate = useNavigate();
  const { selectedTemplate, setSelectedTemplate } = useResume();

  const handleSelectTemplate = (templateId) => {
    setSelectedTemplate(templateId);
  };

  const handleUseTemplate = () => {
    navigate(`/dashboard/preview/${selectedTemplate}`);
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8 pb-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 text-accent font-display font-bold uppercase tracking-widest text-[10px]">
              <Star size={12} className="fill-current" />
              Step 2 of 3: Choose Design
            </div>
            <h1 className="font-display font-bold text-3xl text-text">Template Gallery</h1>
            <p className="text-sm text-muted mt-1 font-body">Select an ATS-optimized template that best fits your career level.</p>
          </div>
          <button 
            onClick={handleUseTemplate}
            className="btn-primary py-3 px-8 text-sm flex items-center gap-2 shadow-accent hover:scale-105 active:scale-95 transition-all"
          >
            Use {selectedTemplate} <ArrowRight size={16} />
          </button>
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {templates.map((template) => (
            <div 
              key={template.id}
              onClick={() => handleSelectTemplate(template.id)}
              className={`group relative card overflow-hidden border-2 transition-all cursor-pointer ${
                selectedTemplate === template.id 
                  ? 'border-accent ring-4 ring-accent/10 shadow-accent-sm' 
                  : 'border-border/40 hover:border-accent/40 bg-surface/30'
              }`}
            >
              {/* Badges */}
              <div className="absolute top-3 left-3 flex gap-2 z-10">
                {template.popular && (
                  <span className="flex items-center gap-1 text-[8px] font-display font-black bg-emerald-500 text-white px-2 py-0.5 rounded-full uppercase tracking-tighter shadow-sm">
                    <Star size={8} className="fill-current" /> Popular
                  </span>
                )}
                {template.isNew && (
                  <span className="flex items-center gap-1 text-[8px] font-display font-black bg-accent text-white px-2 py-0.5 rounded-full uppercase tracking-tighter shadow-sm">
                    <Sparkles size={8} /> New
                  </span>
                )}
              </div>

              {/* Checkmark for selection */}
              {selectedTemplate === template.id && (
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center z-10 shadow-lg scale-110">
                  <Check size={14} />
                </div>
              )}

              {/* Template Mockup (Visual placeholder) */}
              <div className="aspect-[1/1.414] bg-white p-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-border/5 to-transparent group-hover:opacity-0 transition-opacity" />
                
                {/* Simulated content structure */}
                <div className={`w-full h-full border border-border/20 rounded shadow-sm p-3 space-y-3 ${selectedTemplate === template.id ? 'opacity-100' : 'opacity-60'}`}>
                   <div className="flex justify-between">
                      <div className="space-y-1 w-2/3">
                        <div className="h-3 bg-zinc-900/10 rounded-sm w-full" />
                        <div className="h-1.5 bg-zinc-900/5 rounded-sm w-3/4" />
                      </div>
                      <div className="w-8 h-8 bg-zinc-900/5 rounded-full" />
                   </div>
                   <div className="h-[1px] bg-border/40 w-full" />
                   <div className="space-y-2">
                      <div className="h-2 bg-zinc-900/10 rounded-sm w-1/4" />
                      <div className="space-y-1">
                        <div className="h-1 bg-zinc-900/5 rounded-sm w-full" />
                        <div className="h-1 bg-zinc-900/5 rounded-sm w-full" />
                        <div className="h-1 bg-zinc-900/5 rounded-sm w-2/3" />
                      </div>
                   </div>
                   <div className="space-y-2 pt-2">
                      <div className="h-2 bg-zinc-900/10 rounded-sm w-1/4" />
                      <div className="space-y-3">
                         {[1,2,3].map(i => (
                           <div key={i} className="flex gap-2">
                              <div className="w-1.5 h-1.5 bg-accent/20 rounded-full shrink-0" />
                              <div className="space-y-1 w-full">
                                <div className="h-1 bg-zinc-900/5 rounded-sm w-1/2" />
                                <div className="h-1 bg-zinc-900/5 rounded-sm w-full" />
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-accent/80 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px]">
                   <Layout className="text-white mb-2" size={32} />
                   <p className="text-white font-display font-bold text-sm">Preview {template.name}</p>
                </div>
              </div>

              {/* Info Footer */}
              <div className="p-4 bg-card border-t border-border/40">
                <h3 className="font-display font-bold text-sm text-text leading-tight">{template.name}</h3>
                <p className="text-xs text-muted mt-1 leading-relaxed line-clamp-2">{template.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
