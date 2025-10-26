import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { 
  Home, Save, Download, Share2, Undo, Redo, Plus, Trash2, 
  Copy, Image as ImageIcon, Type, Palette, Layout, Sparkles, 
  StopCircle, Play, ChevronDown, Settings, Eye, Grid, Layers,
  AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function PowerPointEditor() {
  const [slides, setSlides] = useState([
    { 
      id: '1', 
      title: 'Welcome to AI Office', 
      subtitle: 'Create stunning presentations in seconds',
      layout: 'title',
      theme: 'ocean',
      notes: ''
    }
  ]);
  
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [showLayoutPicker, setShowLayoutPicker] = useState(false);
  const [editingElement, setEditingElement] = useState(null);
  const [presentationName, setPresentationName] = useState('Untitled Presentation');

  const themes = [
    { id: 'ocean', name: 'Ocean Blue', primary: 'from-blue-600 via-cyan-500 to-teal-500', accent: 'blue' },
    { id: 'sunset', name: 'Sunset', primary: 'from-orange-500 via-red-500 to-pink-600', accent: 'orange' },
    { id: 'forest', name: 'Forest', primary: 'from-green-600 via-emerald-500 to-teal-600', accent: 'green' },
    { id: 'royal', name: 'Royal Purple', primary: 'from-purple-600 via-violet-500 to-indigo-600', accent: 'purple' },
    { id: 'minimal', name: 'Minimal Gray', primary: 'from-gray-800 via-slate-700 to-zinc-800', accent: 'gray' },
    { id: 'candy', name: 'Candy Pop', primary: 'from-pink-500 via-rose-400 to-red-500', accent: 'pink' },
    { id: 'midnight', name: 'Midnight', primary: 'from-slate-900 via-blue-900 to-indigo-900', accent: 'blue' },
    { id: 'autumn', name: 'Autumn', primary: 'from-amber-600 via-orange-500 to-red-600', accent: 'orange' },
  ];

  const layouts = [
    { id: 'title', name: 'Title Slide', icon: '📄', description: 'Large title with subtitle' },
    { id: 'title-content', name: 'Title & Content', icon: '📝', description: 'Title with text below' },
    { id: 'two-column', name: 'Two Columns', icon: '📊', description: 'Split content layout' },
    { id: 'image-left', name: 'Image Left', icon: '🖼️', description: 'Image on left, text on right' },
    { id: 'image-right', name: 'Image Right', icon: '🎨', description: 'Text on left, image on right' },
    { id: 'blank', name: 'Blank', icon: '⬜', description: 'Empty canvas' },
  ];

  const activeSlide = slides[activeSlideIndex];
  const activeTheme = themes.find(t => t.id === activeSlide?.theme) || themes[0];

  // AI Generation with Progress
  const handleAIGenerate = async (prompt) => {
    setIsGenerating(true);
    setGenerationProgress(0);
    
    const progressInterval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return 95;
        }
        return prev + 5;
      });
    }, 100);

    try {
      // Simulate AI generation (replace with actual Groq API call)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newSlides = [
        { id: Date.now().toString(), title: 'Introduction', subtitle: 'AI generated content', layout: 'title', theme: activeSlide.theme, notes: '' },
        { id: (Date.now() + 1).toString(), title: 'Key Points', subtitle: 'Main ideas', layout: 'title-content', theme: activeSlide.theme, notes: '' },
        { id: (Date.now() + 2).toString(), title: 'Conclusion', subtitle: 'Summary', layout: 'title', theme: activeSlide.theme, notes: '' },
      ];
      
      setSlides([...slides, ...newSlides]);
      setGenerationProgress(100);
      toast.success('Slides generated successfully!');
      
      setTimeout(() => {
        setIsGenerating(false);
        setGenerationProgress(0);
      }, 500);
    } catch (error) {
      toast.error('Generation failed. Please try again.');
      setIsGenerating(false);
      setGenerationProgress(0);
    }
    
    clearInterval(progressInterval);
  };

  const stopGeneration = () => {
    setIsGenerating(false);
    setGenerationProgress(0);
    toast.success('Generation stopped');
  };

  const addSlide = (layout = 'title-content') => {
    const newSlide = {
      id: Date.now().toString(),
      title: 'New Slide',
      subtitle: 'Click to edit',
      layout,
      theme: activeSlide.theme,
      notes: ''
    };
    setSlides([...slides, newSlide]);
    setActiveSlideIndex(slides.length);
    toast.success('Slide added');
  };

  const duplicateSlide = (index) => {
    const slideToDuplicate = { ...slides[index], id: Date.now().toString() };
    const newSlides = [...slides];
    newSlides.splice(index + 1, 0, slideToDuplicate);
    setSlides(newSlides);
    setActiveSlideIndex(index + 1);
    toast.success('Slide duplicated');
  };

  const deleteSlide = (index) => {
    if (slides.length === 1) {
      toast.error('Cannot delete the last slide');
      return;
    }
    const newSlides = slides.filter((_, i) => i !== index);
    setSlides(newSlides);
    setActiveSlideIndex(Math.max(0, index - 1));
    toast.success('Slide deleted');
  };

  const changeTheme = (themeId) => {
    const newSlides = [...slides];
    newSlides[activeSlideIndex].theme = themeId;
    setSlides(newSlides);
    setShowThemePicker(false);
    toast.success(`Theme changed to ${themes.find(t => t.id === themeId)?.name}`);
  };

  const changeLayout = (layoutId) => {
    const newSlides = [...slides];
    newSlides[activeSlideIndex].layout = layoutId;
    setSlides(newSlides);
    setShowLayoutPicker(false);
    toast.success(`Layout changed to ${layouts.find(l => l.id === layoutId)?.name}`);
  };

  const updateSlideContent = (field, value) => {
    const newSlides = [...slides];
    newSlides[activeSlideIndex][field] = value;
    setSlides(newSlides);
  };

  const exportPresentation = (format) => {
    toast.success(`Exporting as ${format.toUpperCase()}...`);
    // Implement actual export logic here
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Top Toolbar */}
      <header className="glass border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="glass p-2 rounded-lg hover:glass-strong transition">
            <Home className="w-5 h-5" />
          </Link>
          
          <input
            type="text"
            value={presentationName}
            onChange={(e) => setPresentationName(e.target.value)}
            className="bg-transparent text-lg font-semibold focus:outline-none focus:bg-white/5 px-3 py-1 rounded-lg transition"
          />
        </div>

        <div className="flex items-center gap-2">
          <button className="glass p-2 rounded-lg hover:glass-strong transition" title="Undo">
            <Undo className="w-5 h-5" />
          </button>
          <button className="glass p-2 rounded-lg hover:glass-strong transition" title="Redo">
            <Redo className="w-5 h-5" />
          </button>
          
          <div className="w-px h-6 bg-white/10 mx-2"></div>
          
          <button className="glass px-4 py-2 rounded-lg hover:glass-strong transition flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            <span className="hidden md:inline">Share</span>
          </button>
          
          <div className="relative group">
            <button className="glass px-4 py-2 rounded-lg hover:glass-strong transition flex items-center gap-2">
              <Download className="w-4 h-4" />
              <span className="hidden md:inline">Export</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            
            <div className="absolute right-0 top-full mt-2 glass-strong rounded-xl p-2 min-w-[160px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition z-50">
              <button onClick={() => exportPresentation('pptx')} className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 transition">
                PowerPoint (.pptx)
              </button>
              <button onClick={() => exportPresentation('pdf')} className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 transition">
                PDF Document
              </button>
              <button onClick={() => exportPresentation('web')} className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 transition">
                Web Link
              </button>
            </div>
          </div>
          
          <button className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 rounded-lg font-medium transition shadow-lg shadow-emerald-500/20 flex items-center gap-2">
            <Save className="w-4 h-4" />
            <span className="hidden md:inline">Save</span>
          </button>
        </div>
      </header>

      {/* Secondary Toolbar */}
      <div className="glass-dark border-b border-white/10 px-4 py-2 flex items-center gap-4 overflow-x-auto">
        <button
          onClick={() => setShowThemePicker(!showThemePicker)}
          className="glass px-3 py-1.5 rounded-lg hover:glass-strong transition flex items-center gap-2 text-sm"
        >
          <Palette className="w-4 h-4" />
          Theme
        </button>
        
        <button
          onClick={() => setShowLayoutPicker(!showLayoutPicker)}
          className="glass px-3 py-1.5 rounded-lg hover:glass-strong transition flex items-center gap-2 text-sm"
        >
          <Layout className="w-4 h-4" />
          Layout
        </button>
        
        <div className="w-px h-6 bg-white/10"></div>
        
        <button className="glass px-3 py-1.5 rounded-lg hover:glass-strong transition flex items-center gap-2 text-sm">
          <Type className="w-4 h-4" />
          Text
        </button>
        
        <button className="glass px-3 py-1.5 rounded-lg hover:glass-strong transition flex items-center gap-2 text-sm">
          <ImageIcon className="w-4 h-4" />
          Image
        </button>
        
        <div className="w-px h-6 bg-white/10"></div>
        
        <button className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-lg transition flex items-center gap-2 text-sm font-medium shadow-lg shadow-purple-500/20">
          <Sparkles className="w-4 h-4" />
          AI Generate
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Slides */}
        <AnimatePresence>
          {leftPanelOpen && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 280, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="glass-dark border-r border-white/10 flex flex-col"
            >
              <div className="p-4 border-b border-white/10">
                <button
                  onClick={() => addSlide()}
                  className="w-full glass px-4 py-3 rounded-xl hover:glass-strong transition flex items-center justify-center gap-2 font-medium"
                >
                  <Plus className="w-5 h-5" />
                  New Slide
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                <Reorder.Group axis="y" values={slides} onReorder={setSlides} className="space-y-3">
                  {slides.map((slide, index) => {
                    const theme = themes.find(t => t.id === slide.theme) || themes[0];
                    return (
                      <Reorder.Item key={slide.id} value={slide}>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          onClick={() => setActiveSlideIndex(index)}
                          className={`group relative glass rounded-xl overflow-hidden cursor-pointer transition ${
                            activeSlideIndex === index ? 'ring-2 ring-emerald-500' : ''
                          }`}
                        >
                          {/* Slide Preview */}
                          <div className={`aspect-video bg-gradient-to-br ${theme.primary} p-4 flex flex-col justify-center items-center text-center`}>
                            <div className="text-xs font-bold text-white/90 line-clamp-2">{slide.title}</div>
                            {slide.subtitle && (
                              <div className="text-[10px] text-white/70 line-clamp-1 mt-1">{slide.subtitle}</div>
                            )}
                          </div>

                          {/* Slide Number */}
                          <div className="absolute top-2 left-2 glass-strong px-2 py-0.5 rounded text-xs font-medium">
                            {index + 1}
                          </div>

                          {/* Actions on Hover */}
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                            <button
                              onClick={(e) => { e.stopPropagation(); duplicateSlide(index); }}
                              className="glass p-2 rounded-lg hover:glass-strong transition"
                              title="Duplicate"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); deleteSlide(index); }}
                              className="glass p-2 rounded-lg hover:bg-red-500/50 transition"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </motion.div>
                      </Reorder.Item>
                    );
                  })}
                </Reorder.Group>
              </div>

              <div className="p-4 border-t border-white/10 text-xs text-gray-400 text-center">
                {slides.length} slide{slides.length !== 1 ? 's' : ''} • Drag to reorder
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Canvas */}
        <main className="flex-1 flex flex-col items-center justify-center p-8 overflow-auto relative">
          {/* AI Generation Progress */}
          <AnimatePresence>
            {isGenerating && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-4 left-1/2 -translate-x-1/2 glass-strong rounded-xl p-4 min-w-[300px] z-50"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Generating slides...</span>
                  </div>
                  <button
                    onClick={stopGeneration}
                    className="glass p-1.5 rounded-lg hover:bg-red-500/20 transition"
                  >
                    <StopCircle className="w-4 h-4 text-red-400" />
                  </button>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-emerald-500 to-green-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${generationProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <div className="text-xs text-gray-400 mt-2 text-right">{generationProgress}%</div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Slide Canvas */}
          <motion.div
            key={activeSlideIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-5xl"
          >
            <div className={`aspect-video bg-gradient-to-br ${activeTheme.primary} rounded-2xl shadow-2xl overflow-hidden relative`}>
              {/* Title Slide Layout */}
              {activeSlide?.layout === 'title' && (
                <div className="h-full flex flex-col justify-center items-center p-16 text-center">
                  <input
                    type="text"
                    value={activeSlide.title}
                    onChange={(e) => updateSlideContent('title', e.target.value)}
                    className="w-full bg-transparent text-5xl md:text-6xl font-bold text-white mb-6 text-center focus:outline-none focus:bg-white/10 px-4 py-2 rounded-lg transition"
                    placeholder="Main Title"
                  />
                  <input
                    type="text"
                    value={activeSlide.subtitle}
                    onChange={(e) => updateSlideContent('subtitle', e.target.value)}
                    className="w-full bg-transparent text-2xl md:text-3xl text-white/90 text-center focus:outline-none focus:bg-white/10 px-4 py-2 rounded-lg transition"
                    placeholder="Subtitle"
                  />
                </div>
              )}

              {/* Title & Content Layout */}
              {activeSlide?.layout === 'title-content' && (
                <div className="h-full flex flex-col p-16">
                  <input
                    type="text"
                    value={activeSlide.title}
                    onChange={(e) => updateSlideContent('title', e.target.value)}
                    className="w-full bg-transparent text-4xl font-bold text-white mb-8 focus:outline-none focus:bg-white/10 px-4 py-2 rounded-lg transition"
                    placeholder="Slide Title"
                  />
                  <textarea
                    value={activeSlide.subtitle}
                    onChange={(e) => updateSlideContent('subtitle', e.target.value)}
                    className="flex-1 w-full bg-transparent text-xl text-white/90 focus:outline-none focus:bg-white/10 px-4 py-2 rounded-lg transition resize-none"
                    placeholder="Add your content here..."
                  />
                </div>
              )}

              {/* Other layouts... */}
              {!['title', 'title-content'].includes(activeSlide?.layout) && (
                <div className="h-full flex items-center justify-center text-white/50">
                  Layout: {activeSlide?.layout}
                </div>
              )}

              {/* Slide Number */}
              <div className="absolute bottom-4 right-4 glass-strong px-3 py-1 rounded-lg text-sm">
                {activeSlideIndex + 1} / {slides.length}
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={() => setActiveSlideIndex(Math.max(0, activeSlideIndex - 1))}
              disabled={activeSlideIndex === 0}
              className="glass px-4 py-2 rounded-lg hover:glass-strong disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Previous
            </button>
            <span className="text-sm text-gray-400">
              Slide {activeSlideIndex + 1} of {slides.length}
            </span>
            <button
              onClick={() => setActiveSlideIndex(Math.min(slides.length - 1, activeSlideIndex + 1))}
              disabled={activeSlideIndex === slides.length - 1}
              className="glass px-4 py-2 rounded-lg hover:glass-strong disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Next
            </button>
          </div>
        </main>

        {/* Right Panel - Properties */}
        <AnimatePresence>
          {rightPanelOpen && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 320, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="glass-dark border-l border-white/10 overflow-y-auto"
            >
              <div className="p-6 space-y-6">
                {/* Theme Picker */}
                <div>
                  <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                    <Palette className="w-4 h-4" />
                    THEMES
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {themes.map(theme => (
                      <button
                        key={theme.id}
                        onClick={() => changeTheme(theme.id)}
                        className={`aspect-video bg-gradient-to-br ${theme.primary} rounded-lg transition ${
                          activeSlide?.theme === theme.id ? 'ring-2 ring-emerald-500 scale-105' : 'hover:scale-105'
                        }`}
                        title={theme.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Layout Picker */}
                <div>
                  <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                    <Layout className="w-4 h-4" />
                    LAYOUTS
                  </h3>
                  <div className="space-y-2">
                    {layouts.map(layout => (
                      <button
                        key={layout.id}
                        onClick={() => changeLayout(layout.id)}
                        className={`w-full glass p-3 rounded-lg hover:glass-strong transition text-left ${
                          activeSlide?.layout === layout.id ? 'ring-2 ring-emerald-500' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{layout.icon}</span>
                          <div>
                            <div className="text-sm font-medium">{layout.name}</div>
                            <div className="text-xs text-gray-400">{layout.description}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* AI Tools */}
                <div>
                  <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    AI TOOLS
                  </h3>
                  <div className="space-y-2">
                    <button 
                      onClick={() => handleAIGenerate('sample prompt')}
                      className="w-full glass p-3 rounded-lg hover:glass-strong transition text-left text-sm"
                    >
                      ✨ Generate More Slides
                    </button>
                    <button className="w-full glass p-3 rounded-lg hover:glass-strong transition text-left text-sm">
                      🖼️ Generate Image
                    </button>
                    <button className="w-full glass p-3 rounded-lg hover:glass-strong transition text-left text-sm">
                      ✍️ Improve Text
                    </button>
                    <button className="w-full glass p-3 rounded-lg hover:glass-strong transition text-left text-sm">
                      🎨 Suggest Design
                    </button>
                  </div>
                </div>

                {/* Presenter Notes */}
                <div>
                  <h3 className="text-sm font-semibold mb-4">NOTES</h3>
                  <textarea
                    value={activeSlide?.notes || ''}
                    onChange={(e) => updateSlideContent('notes', e.target.value)}
                    placeholder="Add presenter notes..."
                    className="w-full h-32 glass p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition resize-none text-sm"
                  />
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Status Bar */}
      <footer className="glass-dark border-t border-white/10 px-4 py-2 flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setLeftPanelOpen(!leftPanelOpen)}
            className="hover:text-white transition"
          >
            <Layers className="w-4 h-4" />
          </button>
          <button
            onClick={() => setRightPanelOpen(!rightPanelOpen)}
            className="hover:text-white transition"
          >
            <Settings className="w-4 h-4" />
          </button>
          <span>Last saved: Just now</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="hover:text-white transition flex items-center gap-1">
            <Eye className="w-4 h-4" />
            Present
          </button>
          <span>100% zoom</span>
        </div>
      </footer>
    </div>
  );
}
