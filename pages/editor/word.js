import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Home, Save, Download, Share2, Undo, Redo, Bold, Italic, Underline,
  AlignLeft, AlignCenter, AlignRight, AlignJustify, List, ListOrdered,
  Image as ImageIcon, Link2, Sparkles, Type, Palette, FileText, ChevronDown
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function WordEditor() {
  const [documentName, setDocumentName] = useState('Untitled Document');
  const [content, setContent] = useState('');
  const [fontSize, setFontSize] = useState('16px');
  const [fontFamily, setFontFamily] = useState('Inter');
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const editorRef = useRef(null);

  const fonts = ['Inter', 'Georgia', 'Times New Roman', 'Arial', 'Helvetica', 'Courier New', 'Roboto', 'Playfair Display'];
  const fontSizes = ['12px', '14px', '16px', '18px', '20px', '24px', '32px', '48px'];

  const templates = [
    { id: 'business', name: 'Business Letter', icon: '💼' },
    { id: 'report', name: 'Report', icon: '📊' },
    { id: 'proposal', name: 'Proposal', icon: '📝' },
    { id: 'tender', name: 'Tender Response', icon: '🏛️' },
    { id: 'zimra', name: 'ZimRA Form', icon: '📋' },
  ];

  const aiActions = [
    { id: 'improve', label: 'Improve Writing', icon: '✨' },
    { id: 'expand', label: 'Make Longer', icon: '📏' },
    { id: 'shorten', label: 'Make Shorter', icon: '✂️' },
    { id: 'simplify', label: 'Simplify', icon: '💡' },
    { id: 'professional', label: 'Make Professional', icon: '🎯' },
    { id: 'casual', label: 'Make Casual', icon: '😊' },
  ];

  const handleAIAction = async (action) => {
    if (!content) {
      toast.error('Please add some content first');
      return;
    }

    setIsGenerating(true);
    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      let newContent = content;
      switch(action) {
        case 'improve':
          newContent = content + '\n\n[AI improved version would appear here]';
          break;
        case 'expand':
          newContent = content + '\n\nAdditional context and details added by AI...';
          break;
        case 'shorten':
          newContent = content.substring(0, content.length / 2) + '...';
          break;
        default:
          newContent = content;
      }
      
      setContent(newContent);
      toast.success('Content updated!');
    } catch (error) {
      toast.error('AI action failed');
    } finally {
      setIsGenerating(false);
    }
  };

  const applyTemplate = (templateId) => {
    const templateContent = {
      business: `[Company Letterhead]

Date: ${new Date().toLocaleDateString()}

Dear Sir/Madam,

Subject: [Your Subject]

I am writing to you regarding...

[Main content]

Thank you for your time and consideration.

Yours faithfully,

[Your Name]
[Position]`,
      report: `REPORT

Title: [Report Title]
Date: ${new Date().toLocaleDateString()}
Author: [Your Name]

EXECUTIVE SUMMARY
[Brief overview]

INTRODUCTION
[Background and context]

FINDINGS
[Key findings and analysis]

RECOMMENDATIONS
[Suggested actions]

CONCLUSION
[Summary]`,
      tender: `TENDER RESPONSE

Company: [Your Company Name]
Tender Reference: [Reference Number]
Date: ${new Date().toLocaleDateString()}

EXECUTIVE SUMMARY
We are pleased to submit our response to your tender...

COMPANY PROFILE
[Company background]

TECHNICAL APPROACH
[Methodology]

PRICING
[Cost breakdown]

COMPLIANCE
✓ CR14 Registration
✓ ZimRA Tax Clearance
✓ Physical Address Verification`,
      zimra: `ZIMRA TAX RETURN FORM

Taxpayer Name: [Name]
TIN: [Tax ID Number]
Period: [Tax Period]

INCOME DECLARATION
Gross Income: $________
Deductions: $________
Taxable Income: $________

SUPPORTING DOCUMENTS
☐ Proof of Income
☐ Bank Statements
☐ Receipts`,
    };

    setContent(templateContent[templateId] || 'Template content...');
    toast.success(`${templates.find(t => t.id === templateId)?.name} template loaded`);
  };

  const updateWordCount = (text) => {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  };

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    updateWordCount(newContent);
  };

  const exportDocument = (format) => {
    toast.success(`Exporting as ${format.toUpperCase()}...`);
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
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
              className="bg-transparent text-lg font-semibold focus:outline-none focus:bg-white/5 px-3 py-1 rounded-lg transition"
            />
          </div>

          <div className="flex items-center gap-2">
            <button className="glass p-2 rounded-lg hover:glass-strong transition">
              <Undo className="w-5 h-5" />
            </button>
            <button className="glass p-2 rounded-lg hover:glass-strong transition">
              <Redo className="w-5 h-5" />
            </button>
            
            <div className="w-px h-6 bg-white/10 mx-2"></div>
            
            <button className="glass px-4 py-2 rounded-lg hover:glass-strong transition flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </button>
            
            <div className="relative group">
              <button className="glass px-4 py-2 rounded-lg hover:glass-strong transition flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
                <ChevronDown className="w-4 h-4" />
              </button>
              
              <div className="absolute right-0 top-full mt-2 glass-strong rounded-xl p-2 min-w-[160px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition z-50">
                <button onClick={() => exportDocument('docx')} className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 transition">
                  Word (.docx)
                </button>
                <button onClick={() => exportDocument('pdf')} className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 transition">
                  PDF Document
                </button>
                <button onClick={() => exportDocument('txt')} className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 transition">
                  Plain Text (.txt)
                </button>
              </div>
            </div>
            
            <button className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 rounded-lg font-medium transition shadow-lg shadow-emerald-500/20 flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save
            </button>
          </div>
        </div>

        {/* Formatting Toolbar */}
        <div className="flex items-center gap-4 flex-wrap">
          <select
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
            className="glass px-3 py-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
          >
            {fonts.map(font => (
              <option key={font} value={font}>{font}</option>
            ))}
          </select>

          <select
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className="glass px-3 py-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
          >
            {fontSizes.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>

          <div className="w-px h-6 bg-white/10"></div>

          <button className="glass p-2 rounded-lg hover:glass-strong transition">
            <Bold className="w-4 h-4" />
          </button>
          <button className="glass p-2 rounded-lg hover:glass-strong transition">
            <Italic className="w-4 h-4" />
          </button>
          <button className="glass p-2 rounded-lg hover:glass-strong transition">
            <Underline className="w-4 h-4" />
          </button>

          <div className="w-px h-6 bg-white/10"></div>

          <button className="glass p-2 rounded-lg hover:glass-strong transition">
            <AlignLeft className="w-4 h-4" />
          </button>
          <button className="glass p-2 rounded-lg hover:glass-strong transition">
            <AlignCenter className="w-4 h-4" />
          </button>
          <button className="glass p-2 rounded-lg hover:glass-strong transition">
            <AlignRight className="w-4 h-4" />
          </button>

          <div className="w-px h-6 bg-white/10"></div>

          <button className="glass p-2 rounded-lg hover:glass-strong transition">
            <List className="w-4 h-4" />
          </button>
          <button className="glass p-2 rounded-lg hover:glass-strong transition">
            <ListOrdered className="w-4 h-4" />
          </button>

          <div className="w-px h-6 bg-white/10"></div>

          <button
            onClick={() => setShowAIPanel(!showAIPanel)}
            className="ml-auto px-3 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-lg transition flex items-center gap-2 text-sm font-medium shadow-lg shadow-purple-500/20"
          >
            <Sparkles className="w-4 h-4" />
            AI Assistant
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Editor */}
        <main className="flex-1 overflow-auto p-8 bg-slate-900/20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto glass-strong rounded-2xl p-12 min-h-[842px] shadow-2xl"
          >
            <textarea
              ref={editorRef}
              value={content}
              onChange={handleContentChange}
              placeholder="Start typing your document..."
              className="w-full h-full min-h-[700px] bg-transparent text-gray-900 dark:text-white resize-none focus:outline-none"
              style={{ 
                fontFamily,
                fontSize,
                lineHeight: '1.8'
              }}
            />
          </motion.div>
        </main>

        {/* Right Panel - AI & Templates */}
        {showAIPanel && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 320, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="glass-dark border-l border-white/10 overflow-y-auto"
          >
            <div className="p-6 space-y-6">
              {/* Templates */}
              <div>
                <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  TEMPLATES
                </h3>
                <div className="space-y-2">
                  {templates.map(template => (
                    <button
                      key={template.id}
                      onClick={() => applyTemplate(template.id)}
                      className="w-full glass p-3 rounded-lg hover:glass-strong transition text-left"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{template.icon}</span>
                        <span className="text-sm font-medium">{template.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* AI Actions */}
              <div>
                <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  AI WRITING TOOLS
                </h3>
                <div className="space-y-2">
                  {aiActions.map(action => (
                    <button
                      key={action.id}
                      onClick={() => handleAIAction(action.id)}
                      disabled={isGenerating}
                      className="w-full glass p-3 rounded-lg hover:glass-strong transition text-left text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="flex items-center gap-2">
                        <span>{action.icon}</span>
                        <span>{action.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate from Prompt */}
              <div>
                <h3 className="text-sm font-semibold mb-4">GENERATE CONTENT</h3>
                <textarea
                  placeholder="Describe what you want to write..."
                  className="w-full h-24 glass p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition resize-none text-sm"
                />
                <button
                  onClick={() => handleAIAction('generate')}
                  disabled={isGenerating}
                  className="w-full mt-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 rounded-lg font-medium transition disabled:opacity-50"
                >
                  {isGenerating ? 'Generating...' : 'Generate'}
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </div>

      {/* Bottom Status Bar */}
      <footer className="glass-dark border-t border-white/10 px-4 py-2 flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center gap-4">
          <span>{wordCount} words</span>
          <span>•</span>
          <span>{content.length} characters</span>
          <span>•</span>
          <span>Last saved: Just now</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Page 1</span>
        </div>
      </footer>
    </div>
  );
}
