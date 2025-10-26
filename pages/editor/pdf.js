import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Save, Download, Type, Image as ImageIcon, Square, Circle, FileImage, Trash2, Copy } from 'lucide-react';
import toast from 'react-hot-toast';

export default function PDFEditor() {
  const [pdfName, setPdfName] = useState('Untitled PDF');
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);

  const tools = [
    { id: 'text', name: 'Text', icon: Type },
    { id: 'image', name: 'Image', icon: ImageIcon },
    { id: 'rectangle', name: 'Rectangle', icon: Square },
    { id: 'circle', name: 'Circle', icon: Circle },
  ];

  const templates = [
    { id: 'brochure', name: 'Brochure', icon: '📄' },
    { id: 'flyer', name: 'Flyer', icon: '📢' },
    { id: 'invoice', name: 'Invoice', icon: '💵' },
    { id: 'certificate', name: 'Certificate', icon: '🏆' },
  ];

  const addElement = (type) => {
    const newElement = {
      id: Date.now(),
      type,
      x: 50,
      y: 50,
      width: type === 'text' ? 200 : 150,
      height: type === 'text' ? 50 : 150,
      content: type === 'text' ? 'Double-click to edit' : '',
      color: '#10b981'
    };
    setElements([...elements, newElement]);
    setSelectedElement(newElement.id);
    toast.success(`${type} added`);
  };

  const deleteElement = (id) => {
    setElements(elements.filter(el => el.id !== id));
    setSelectedElement(null);
    toast.success('Element deleted');
  };

  const duplicateElement = (element) => {
    const newElement = { ...element, id: Date.now(), x: element.x + 20, y: element.y + 20 };
    setElements([...elements, newElement]);
    toast.success('Element duplicated');
  };

  const exportPDF = () => {
    toast.success('Exporting PDF...');
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Top Toolbar */}
      <header className="glass border-b border-white/10 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="glass p-2 rounded-lg hover:glass-strong transition">
              <Home className="w-5 h-5" />
            </Link>
            
            <input
              type="text"
              value={pdfName}
              onChange={(e) => setPdfName(e.target.value)}
              className="bg-transparent text-lg font-semibold focus:outline-none focus:bg-white/5 px-3 py-1 rounded-lg transition"
            />
          </div>

          <div className="flex items-center gap-2">
            <button className="glass px-4 py-2 rounded-lg hover:glass-strong transition flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save
            </button>
            
            <button onClick={exportPDF} className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 rounded-lg font-medium transition shadow-lg shadow-emerald-500/20 flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export PDF
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Tools */}
        <aside className="w-64 glass-dark border-r border-white/10 p-4">
          <h3 className="text-sm font-semibold mb-4">ELEMENTS</h3>
          <div className="space-y-2 mb-6">
            {tools.map(tool => {
              const Icon = tool.icon;
              return (
                <button
                  key={tool.id}
                  onClick={() => addElement(tool.id)}
                  className="w-full glass p-3 rounded-lg hover:glass-strong transition text-left flex items-center gap-3"
                >
                  <Icon className="w-5 h-5" />
                  <span>{tool.name}</span>
                </button>
              );
            })}
          </div>

          <h3 className="text-sm font-semibold mb-4">TEMPLATES</h3>
          <div className="space-y-2">
            {templates.map(template => (
              <button
                key={template.id}
                className="w-full glass p-3 rounded-lg hover:glass-strong transition text-left"
              >
                <span className="text-xl mr-2">{template.icon}</span>
                <span className="text-sm">{template.name}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Main Canvas */}
        <main className="flex-1 overflow-auto p-8 bg-slate-900/20 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-[595px] h-[842px] bg-white rounded-lg shadow-2xl relative overflow-hidden"
          >
            {/* PDF Canvas */}
            <div className="w-full h-full relative">
              {elements.length === 0 ? (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <FileImage className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium mb-2">Empty Canvas</p>
                    <p className="text-sm">Add elements from the left panel</p>
                  </div>
                </div>
              ) : (
                elements.map(element => (
                  <div
                    key={element.id}
                    onClick={() => setSelectedElement(element.id)}
                    className={`absolute cursor-move ${
                      selectedElement === element.id ? 'ring-2 ring-emerald-500' : ''
                    }`}
                    style={{
                      left: element.x,
                      top: element.y,
                      width: element.width,
                      height: element.height
                    }}
                  >
                    {element.type === 'text' && (
                      <div className="w-full h-full flex items-center justify-center text-black p-2">
                        {element.content}
                      </div>
                    )}
                    {element.type === 'rectangle' && (
                      <div className="w-full h-full border-2 border-gray-400" style={{ backgroundColor: element.color + '40' }} />
                    )}
                    {element.type === 'circle' && (
                      <div className="w-full h-full rounded-full border-2 border-gray-400" style={{ backgroundColor: element.color + '40' }} />
                    )}
                    {element.type === 'image' && (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                        <ImageIcon className="w-12 h-12" />
                      </div>
                    )}
                    
                    {selectedElement === element.id && (
                      <div className="absolute -top-10 left-0 glass-strong rounded-lg p-1 flex gap-1">
                        <button
                          onClick={(e) => { e.stopPropagation(); duplicateElement(element); }}
                          className="p-1 hover:bg-white/20 rounded"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); deleteElement(element.id); }}
                          className="p-1 hover:bg-red-500/20 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </main>

        {/* Right Panel - Properties */}
        {selectedElement && (
          <aside className="w-64 glass-dark border-l border-white/10 p-4">
            <h3 className="text-sm font-semibold mb-4">PROPERTIES</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-400 mb-2 block">Width</label>
                <input
                  type="number"
                  className="w-full glass px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  defaultValue={elements.find(el => el.id === selectedElement)?.width}
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-2 block">Height</label>
                <input
                  type="number"
                  className="w-full glass px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  defaultValue={elements.find(el => el.id === selectedElement)?.height}
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-2 block">Color</label>
                <input
                  type="color"
                  className="w-full h-10 glass rounded-lg cursor-pointer"
                  defaultValue={elements.find(el => el.id === selectedElement)?.color}
                />
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* Bottom Status Bar */}
      <footer className="glass-dark border-t border-white/10 px-4 py-2 flex items-center justify-between text-xs text-gray-400">
        <span>{elements.length} element{elements.length !== 1 ? 's' : ''}</span>
        <span>A4 (595 × 842 px)</span>
      </footer>
    </div>
  );
}
