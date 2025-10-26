import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Home, Save, Download, Monitor, Tablet, Smartphone, Eye, Code,
  Layout, Type, Image as ImageIcon, Square, Plus, Trash2
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function WebsiteEditor() {
  const [siteName, setSiteName] = useState('My Website');
  const [viewport, setViewport] = useState('desktop');
  const [components, setComponents] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [showCode, setShowCode] = useState(false);

  const viewports = [
    { id: 'desktop', name: 'Desktop', icon: Monitor, width: '100%' },
    { id: 'tablet', name: 'Tablet', icon: Tablet, width: '768px' },
    { id: 'mobile', name: 'Mobile', icon: Smartphone, width: '375px' },
  ];

  const componentLibrary = [
    { id: 'header', name: 'Header', icon: '🎯', preview: 'Navigation bar' },
    { id: 'hero', name: 'Hero Section', icon: '🚀', preview: 'Large banner with CTA' },
    { id: 'features', name: 'Features Grid', icon: '⭐', preview: '3-column features' },
    { id: 'testimonial', name: 'Testimonials', icon: '💬', preview: 'Customer quotes' },
    { id: 'cta', name: 'CTA Banner', icon: '📢', preview: 'Call-to-action' },
    { id: 'footer', name: 'Footer', icon: '📄', preview: 'Site footer' },
  ];

  const addComponent = (type) => {
    const newComponent = {
      id: Date.now(),
      type,
      content: `${type} content`,
      styles: {}
    };
    setComponents([...components, newComponent]);
    toast.success(`${type} added`);
  };

  const deleteComponent = (id) => {
    setComponents(components.filter(c => c.id !== id));
    setSelectedComponent(null);
    toast.success('Component deleted');
  };

  const exportCode = () => {
    const htmlCode = generateHTML();
    toast.success('Code exported!');
    console.log(htmlCode);
  };

  const generateHTML = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${siteName}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: system-ui; }
  </style>
</head>
<body>
  ${components.map(c => `<div class="${c.type}">${c.content}</div>`).join('\n  ')}
</body>
</html>`;
  };

  const renderComponent = (component) => {
    const componentStyles = {
      header: 'bg-slate-900 text-white p-6 flex items-center justify-between',
      hero: 'bg-gradient-to-r from-emerald-600 to-green-600 text-white p-20 text-center',
      features: 'grid grid-cols-3 gap-6 p-12',
      testimonial: 'bg-slate-50 p-12 text-center',
      cta: 'bg-emerald-600 text-white p-12 text-center',
      footer: 'bg-slate-900 text-white p-8 text-center text-sm',
    };

    const componentContent = {
      header: (
        <div className={componentStyles.header}>
          <div className="text-xl font-bold">{siteName}</div>
          <nav className="flex gap-6 text-sm">
            <a href="#" className="hover:text-emerald-400">Home</a>
            <a href="#" className="hover:text-emerald-400">About</a>
            <a href="#" className="hover:text-emerald-400">Contact</a>
          </nav>
        </div>
      ),
      hero: (
        <div className={componentStyles.hero}>
          <h1 className="text-5xl font-bold mb-4">Welcome to {siteName}</h1>
          <p className="text-xl mb-8">Create amazing websites with AI</p>
          <button className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
            Get Started
          </button>
        </div>
      ),
      features: (
        <div className={componentStyles.features}>
          {[1, 2, 3].map(i => (
            <div key={i} className="text-center p-6 glass rounded-xl">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-bold mb-2">Feature {i}</h3>
              <p className="text-gray-600">Description of feature {i}</p>
            </div>
          ))}
        </div>
      ),
      testimonial: (
        <div className={componentStyles.testimonial}>
          <div className="text-6xl mb-4">💬</div>
          <p className="text-xl italic mb-4">"This is an amazing product!"</p>
          <p className="font-semibold">- Happy Customer</p>
        </div>
      ),
      cta: (
        <div className={componentStyles.cta}>
          <h2 className="text-4xl font-bold mb-4">Ready to get started?</h2>
          <button className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
            Sign Up Now
          </button>
        </div>
      ),
      footer: (
        <div className={componentStyles.footer}>
          <p>© 2024 {siteName}. All rights reserved.</p>
        </div>
      ),
    };

    return componentContent[component.type] || <div>Unknown component</div>;
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Top Toolbar */}
      <header className="glass border-b border-white/10 px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <Link href="/" className="glass p-2 rounded-lg hover:glass-strong transition">
              <Home className="w-5 h-5" />
            </Link>
            
            <input
              type="text"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="bg-transparent text-lg font-semibold focus:outline-none focus:bg-white/5 px-3 py-1 rounded-lg transition"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCode(!showCode)}
              className="glass px-3 py-2 rounded-lg hover:glass-strong transition flex items-center gap-2 text-sm"
            >
              <Code className="w-4 h-4" />
              {showCode ? 'Design' : 'Code'}
            </button>

            <button className="glass px-3 py-2 rounded-lg hover:glass-strong transition flex items-center gap-2 text-sm">
              <Eye className="w-4 h-4" />
              Preview
            </button>
            
            <button onClick={exportCode} className="glass px-3 py-2 rounded-lg hover:glass-strong transition flex items-center gap-2 text-sm">
              <Download className="w-4 h-4" />
              Export
            </button>
            
            <button className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 rounded-lg font-medium transition shadow-lg shadow-emerald-500/20 flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save
            </button>
          </div>
        </div>

        {/* Viewport Selector */}
        <div className="flex items-center gap-2">
          {viewports.map(vp => {
            const Icon = vp.icon;
            return (
              <button
                key={vp.id}
                onClick={() => setViewport(vp.id)}
                className={`glass p-2 rounded-lg hover:glass-strong transition ${
                  viewport === vp.id ? 'ring-2 ring-emerald-500' : ''
                }`}
                title={vp.name}
              >
                <Icon className="w-5 h-5" />
              </button>
            );
          })}
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Components */}
        <aside className="w-64 glass-dark border-r border-white/10 p-4 overflow-y-auto">
          <h3 className="text-sm font-semibold mb-4">COMPONENTS</h3>
          <div className="space-y-2">
            {componentLibrary.map(comp => (
              <button
                key={comp.id}
                onClick={() => addComponent(comp.id)}
                className="w-full glass p-3 rounded-lg hover:glass-strong transition text-left group"
              >
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-2xl">{comp.icon}</span>
                  <span className="font-medium text-sm">{comp.name}</span>
                </div>
                <p className="text-xs text-gray-400">{comp.preview}</p>
              </button>
            ))}
          </div>
        </aside>

        {/* Main Canvas */}
        <main className="flex-1 overflow-auto p-8 bg-slate-900/20">
          {showCode ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-4xl mx-auto glass-strong rounded-2xl p-6"
            >
              <pre className="text-sm text-emerald-400 overflow-auto">
                {generateHTML()}
              </pre>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mx-auto transition-all duration-300"
              style={{ 
                width: viewports.find(v => v.id === viewport)?.width,
                maxWidth: '100%'
              }}
            >
              <div className="bg-white rounded-lg shadow-2xl overflow-hidden min-h-[600px]">
                {components.length === 0 ? (
                  <div className="h-[600px] flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <Layout className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-medium mb-2">Empty Canvas</p>
                      <p className="text-sm">Add components from the left panel</p>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    {components.map(component => (
                      <div
                        key={component.id}
                        onClick={() => setSelectedComponent(component.id)}
                        className={`relative group ${
                          selectedComponent === component.id ? 'ring-2 ring-emerald-500' : ''
                        }`}
                      >
                        {renderComponent(component)}
                        
                        {selectedComponent === component.id && (
                          <div className="absolute top-2 right-2 glass-strong rounded-lg p-1 flex gap-1 z-10">
                            <button
                              onClick={(e) => { e.stopPropagation(); deleteComponent(component.id); }}
                              className="p-1 hover:bg-red-500/20 rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </main>

        {/* Right Panel - Properties */}
        {selectedComponent && !showCode && (
          <aside className="w-64 glass-dark border-l border-white/10 p-4 overflow-y-auto">
            <h3 className="text-sm font-semibold mb-4">PROPERTIES</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-400 mb-2 block">Background</label>
                <input
                  type="color"
                  className="w-full h-10 glass rounded-lg cursor-pointer"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-2 block">Padding</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-2 block">Text Align</label>
                <div className="flex gap-2">
                  <button className="flex-1 glass p-2 rounded hover:glass-strong transition">Left</button>
                  <button className="flex-1 glass p-2 rounded hover:glass-strong transition">Center</button>
                  <button className="flex-1 glass p-2 rounded hover:glass-strong transition">Right</button>
                </div>
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* Bottom Status Bar */}
      <footer className="glass-dark border-t border-white/10 px-4 py-2 flex items-center justify-between text-xs text-gray-400">
        <span>{components.length} component{components.length !== 1 ? 's' : ''}</span>
        <span>{viewport} view</span>
      </footer>
    </div>
  );
}
