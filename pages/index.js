import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileText, FileSpreadsheet, Presentation, FileImage, Globe, Sparkles, ArrowRight, Check, Zap, Shield, Users, Star, Menu, X, Play } from 'lucide-react';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const documentTypes = [
    {
      id: 'powerpoint',
      name: 'PowerPoint',
      tagline: 'Stunning presentations',
      description: 'AI-powered slides with smart layouts, themes, and animations',
      icon: Presentation,
      gradient: 'from-orange-500 via-red-500 to-pink-500',
      link: '/editor/powerpoint',
      features: ['Auto layouts', '20+ themes', 'Image AI', 'Export PPTX/PDF']
    },
    {
      id: 'word',
      name: 'Documents',
      tagline: 'Professional docs',
      description: 'Rich text documents with AI writing assistance',
      icon: FileText,
      gradient: 'from-blue-500 via-indigo-500 to-purple-500',
      link: '/editor/word',
      features: ['AI writing', 'Rich formatting', 'Templates', 'Export DOCX/PDF']
    },
    {
      id: 'excel',
      name: 'Spreadsheets',
      tagline: 'Smart data',
      description: 'Intelligent spreadsheets with auto formulas and insights',
      icon: FileSpreadsheet,
      gradient: 'from-green-500 via-emerald-500 to-teal-500',
      link: '/editor/excel',
      features: ['Smart formulas', 'Auto charts', 'Data insights', 'Export XLSX']
    },
    {
      id: 'pdf',
      name: 'PDF Designer',
      tagline: 'Beautiful PDFs',
      description: 'Drag-and-drop PDF creation with professional layouts',
      icon: FileImage,
      gradient: 'from-red-500 via-rose-500 to-pink-500',
      link: '/editor/pdf',
      features: ['Drag & drop', 'Print ready', 'Interactive', 'Templates']
    },
    {
      id: 'website',
      name: 'Websites',
      tagline: 'No-code sites',
      description: 'Build responsive websites with AI components',
      icon: Globe,
      gradient: 'from-purple-500 via-violet-500 to-indigo-500',
      link: '/editor/website',
      features: ['Responsive', 'Components', 'Export code', 'Templates']
    }
  ];

  const features = [
    { icon: Sparkles, title: 'AI-Powered', desc: 'Generate entire documents from a simple prompt' },
    { icon: Zap, title: 'Lightning Fast', desc: 'Powered by Groq - fastest AI in the world' },
    { icon: Shield, title: 'Secure & Private', desc: 'Your data is encrypted and protected' },
    { icon: Users, title: 'Team Collaboration', desc: 'Work together in real-time (Pro)' }
  ];

  const howItWorks = [
    { step: 1, title: 'Choose Type', desc: 'Select document type from cards', icon: '📄' },
    { step: 2, title: 'Describe It', desc: 'Tell AI what you need to create', icon: '✨' },
    { step: 3, title: 'Edit & Export', desc: 'Customize and download instantly', icon: '⬇️' }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Gradients */}
      <div className="fixed inset-0 -z-10">
        <div 
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/20 rounded-full blur-3xl animate-float"
          style={{
            transform: `translate(${mousePosition.x / 50}px, ${mousePosition.y / 50}px)`
          }}
        />
        <div 
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-3xl animate-float"
          style={{
            animationDelay: '1s',
            transform: `translate(-${mousePosition.x / 80}px, -${mousePosition.y / 80}px)`
          }}
        />
        <div 
          className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-purple-500/15 rounded-full blur-3xl animate-float"
          style={{
            animationDelay: '2s',
            transform: `translate(${mousePosition.x / 100}px, ${mousePosition.y / 100}px)`
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/signup" className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 rounded-xl font-semibold text-lg transition shadow-xl shadow-emerald-500/30">
                Start Free Trial
              </Link>
              <Link href="/pricing" className="px-8 py-4 glass-strong rounded-xl font-semibold text-lg transition hover:scale-105">
                View Pricing
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/10 glass py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-tr from-emerald-400 to-green-500 rounded-lg"></div>
                <span className="text-lg font-bold">AI Office</span>
              </div>
              <p className="text-gray-400 text-sm">
                Professional documents, instantly generated with AI. Built for Zimbabwe.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <Link href="/templates" className="block hover:text-white transition">Templates</Link>
                <Link href="/pricing" className="block hover:text-white transition">Pricing</Link>
                <Link href="/dashboard" className="block hover:text-white transition">Dashboard</Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <a href="#" className="block hover:text-white transition">About</a>
                <a href="#" className="block hover:text-white transition">Contact</a>
                <a href="#" className="block hover:text-white transition">Support</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <a href="#" className="block hover:text-white transition">Privacy</a>
                <a href="#" className="block hover:text-white transition">Terms</a>
                <a href="#" className="block hover:text-white transition">Cookies</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 text-center text-gray-400 text-sm">
            <p>© 2024 AI Office • Built for Zimbabwe • EcoCash • OneMoney • USD & ZWL</p>
          </div>
        </div>
      </footer>
    </div>
  );
}="relative w-10 h-10">
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500 to-green-400 rounded-xl animate-glow"></div>
                <div className="absolute inset-0.5 bg-slate-950 rounded-xl"></div>
                <div className="absolute inset-2 bg-gradient-to-tr from-emerald-400 to-green-500 rounded-lg group-hover:scale-110 transition"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                AI Office
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              <Link href="/templates" className="text-gray-300 hover:text-white transition">Templates</Link>
              <Link href="/pricing" className="text-gray-300 hover:text-white transition">Pricing</Link>
              <Link href="/dashboard" className="text-gray-300 hover:text-white transition">Dashboard</Link>
              <Link href="/login" className="glass px-4 py-2 rounded-lg hover:glass-strong transition">
                Login
              </Link>
              <Link href="/signup" className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 rounded-lg font-medium transition shadow-lg shadow-emerald-500/20">
                Get Started Free
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="md:hidden glass p-2 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden py-4 space-y-3 border-t border-white/10"
            >
              <Link href="/templates" className="block glass px-4 py-2 rounded-lg">Templates</Link>
              <Link href="/pricing" className="block glass px-4 py-2 rounded-lg">Pricing</Link>
              <Link href="/dashboard" className="block glass px-4 py-2 rounded-lg">Dashboard</Link>
              <Link href="/login" className="block glass px-4 py-2 rounded-lg">Login</Link>
              <Link href="/signup" className="block bg-gradient-to-r from-emerald-600 to-green-600 px-4 py-2 rounded-lg font-medium text-center">
                Get Started Free
              </Link>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-emerald-400 mb-8">
            <Sparkles className="w-4 h-4" />
            <span>Powered by Groq AI • Fastest in the World</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Create Documents
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent">
              In Seconds, Not Hours
            </span>
          </h1>

          <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
            AI-powered presentations, documents, spreadsheets, PDFs and websites. 
            Professional results instantly. No Microsoft Office needed.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <Link href="/signup" className="group px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 rounded-xl font-semibold text-lg transition shadow-xl shadow-emerald-500/30 flex items-center gap-2">
              Start Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </Link>
            <button className="group glass-strong px-8 py-4 rounded-xl font-semibold text-lg transition flex items-center gap-2 hover:scale-105">
              <Play className="w-5 h-5" />
              Watch Demo
            </button>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-gray-400">4.9/5 rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-400" />
              <span className="text-gray-400">2,500+ users</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="text-gray-400">50,000+ docs created</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Document Type Cards */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Choose Your Document Type
            </h2>
            <p className="text-xl text-gray-400">Click any card to start creating instantly</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documentTypes.map((doc, index) => {
              const Icon = doc.icon;
              return (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={doc.link}>
                    <div className="group glass rounded-2xl p-8 hover:glass-strong transition cursor-pointer h-full border border-white/10 hover:border-white/20 relative overflow-hidden">
                      {/* Gradient Glow on Hover */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${doc.gradient} opacity-0 group-hover:opacity-10 transition duration-500`} />
                      
                      <div className="relative z-10">
                        {/* Icon */}
                        <div className={`w-16 h-16 bg-gradient-to-r ${doc.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition shadow-lg`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        
                        {/* Content */}
                        <h3 className="text-2xl font-bold mb-2">{doc.name}</h3>
                        <p className="text-emerald-400 text-sm font-medium mb-3">{doc.tagline}</p>
                        <p className="text-gray-400 mb-6">{doc.description}</p>
                        
                        {/* Features */}
                        <div className="space-y-2 mb-6">
                          {doc.features.map((feature, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                              <Check className="w-4 h-4 text-emerald-400" />
                              {feature}
                            </div>
                          ))}
                        </div>

                        {/* CTA */}
                        <div className="flex items-center gap-2 text-emerald-400 font-medium group-hover:gap-3 transition-all">
                          <span>Start Creating</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-400">Three simple steps to professional documents</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="glass rounded-2xl p-8 text-center relative overflow-hidden group hover:glass-strong transition"
              >
                <div className="absolute top-4 right-4 text-6xl font-bold text-white/5">
                  {item.step}
                </div>
                <div className="text-6xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why AI Office?</h2>
            <p className="text-xl text-gray-400">Built for professionals, designed for Zimbabwe</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass rounded-xl p-6 hover:glass-strong transition"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-green-600 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-strong rounded-3xl p-12 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Ready to Create Amazing Documents?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join 2,500+ professionals using AI Office
            </p>
            
            <div className
