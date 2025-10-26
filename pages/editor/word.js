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
  const
