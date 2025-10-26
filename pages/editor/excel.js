import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Home, Save, Download, Plus, Trash2, Sparkles, BarChart3, 
  Calculator, TrendingUp, FileSpreadsheet, ChevronDown
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function ExcelEditor() {
  const [sheetName, setSheetName] = useState('Untitled Spreadsheet');
  const [rows, setRows] = useState(
    Array(20).fill(null).map((_, i) => 
      Array(10).fill('').map((_, j) => ({
        value: i === 0 ? String.fromCharCode(65 + j) : '',
        formula: ''
      }))
    )
  );
  const [selectedCell, setSelectedCell] = useState(null);
  const [showAIPanel, setShowAIPanel] = useState(false);

  const columns = 'ABCDEFGHIJ'.split('');

  const addRow = () => {
    setRows([...rows, Array(10).fill({ value: '', formula: '' })]);
    toast.success('Row added');
  };

  const addColumn = () => {
    const newRows = rows.map(row => [...row, { value: '', formula: '' }]);
    setRows(newRows);
    toast.success('Column added');
  };

  const deleteRow = (index) => {
    if (rows.length === 1) {
      toast.error('Cannot delete the last row');
      return;
    }
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
    toast.success('Row deleted');
  };

  const updateCell = (rowIndex, colIndex, value) => {
    const newRows = [...rows];
    newRows[rowIndex][colIndex] = { value, formula: '' };
    setRows(newRows);
  };

  const generateChart = () => {
    toast.success('Chart generation coming soon!');
  };

  const aiSuggestFormula = () => {
    toast.success('AI formula suggestion: =SUM(A2:A10)');
  };

  const aiAnalyzeData = () => {
    toast.success('AI analyzing your data...');
  };

  const exportSheet = (format) => {
    toast.success(`Exporting as ${format.toUpperCase()}...`);
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
              value={sheetName}
              onChange={(e) => setSheetName(e.target.value)}
              className="bg-transparent text-lg font-semibold focus:outline-none focus:bg-white/5 px-3 py-1 rounded-lg transition"
            />
          </div>

          <div className="flex items-center gap-2">
            <button onClick={addRow} className="glass px-3 py-2 rounded-lg hover:glass-strong transition flex items-center gap-2 text-sm">
              <Plus className="w-4 h-4" />
              Add Row
            </button>
            
            <button onClick={addColumn} className="glass px-3 py-2 rounded-lg hover:glass-strong transition flex items-center gap-2 text-sm">
              <Plus className="w-4 h-4" />
              Add Column
            </button>

            <button onClick={generateChart} className="glass px-3 py-2 rounded-lg hover:glass-strong transition flex items-center gap-2 text-sm">
              <BarChart3 className="w-4 h-4" />
              Chart
            </button>
            
            <div className="relative group">
              <button className="glass px-4 py-2 rounded-lg hover:glass-strong transition flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
                <ChevronDown className="w-4 h-4" />
              </button>
              
              <div className="absolute right-0 top-full mt-2 glass-strong rounded-xl p-2 min-w-[160px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition z-50">
                <button onClick={() => exportSheet('xlsx')} className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 transition">
                  Excel (.xlsx)
                </button>
                <button onClick={() => exportSheet('csv')} className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 transition">
                  CSV (.csv)
                </button>
                <button onClick={() => exportSheet('pdf')} className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 transition">
                  PDF Document
                </button>
              </div>
            </div>
            
            <button className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 rounded-lg font-medium transition shadow-lg shadow-emerald-500/20 flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Spreadsheet */}
        <main className="flex-1 overflow-auto p-6 bg-slate-900/20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-strong rounded-2xl overflow-hidden shadow-2xl"
          >
            <table className="w-full border-collapse">
              <thead>
                <tr className="glass-dark">
                  <th className="border border-white/10 p-2 w-12 text-center text-xs font-semibold"></th>
                  {columns.slice(0, rows[0]?.length || 10).map((col, i) => (
                    <th key={i} className="border border-white/10 p-2 w-24 text-center text-xs font-semibold">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className={rowIndex === 0 ? 'glass-dark' : ''}>
                    <td className="border border-white/10 p-2 text-center text-xs font-semibold glass-dark">
                      {rowIndex === 0 ? '' : rowIndex}
                    </td>
                    {row.map((cell, colIndex) => (
                      <td key={colIndex} className="border border-white/10 p-0">
                        <input
                          type="text"
                          value={cell.value}
                          onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
                          onClick={() => setSelectedCell({ row: rowIndex, col: colIndex })}
                          className={`w-full h-10 px-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                            rowIndex === 0 ? 'font-semibold text-center' : ''
                          } ${selectedCell?.row === rowIndex && selectedCell?.col === colIndex ? 'ring-2 ring-emerald-500' : ''}`}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </main>

        {/* Right Panel - AI Tools */}
        {showAIPanel && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 320, opacity: 1 }}
            className="glass-dark border-l border-white/10 overflow-y-auto"
          >
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  AI SPREADSHEET TOOLS
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={aiSuggestFormula}
                    className="w-full glass p-3 rounded-lg hover:glass-strong transition text-left text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Calculator className="w-4 h-4" />
                      <span>Suggest Formula</span>
                    </div>
                  </button>
                  <button
                    onClick={aiAnalyzeData}
                    className="w-full glass p-3 rounded-lg hover:glass-strong transition text-left text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      <span>Analyze Data</span>
                    </div>
                  </button>
                  <button
                    onClick={generateChart}
                    className="w-full glass p-3 rounded-lg hover:glass-strong transition text-left text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      <span>Generate Chart</span>
                    </div>
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-4">QUICK TEMPLATES</h3>
                <div className="space-y-2">
                  <button className="w-full glass p-3 rounded-lg hover:glass-strong transition text-left text-sm">
                    📊 Budget Tracker
                  </button>
                  <button className="w-full glass p-3 rounded-lg hover:glass-strong transition text-left text-sm">
                    💰 Expense Report
                  </button>
                  <button className="w-full glass p-3 rounded-lg hover:glass-strong transition text-left text-sm">
                    📈 Sales Tracker
                  </button>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </div>

      {/* Bottom Status Bar */}
      <footer className="glass-dark border-t border-white/10 px-4 py-2 flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowAIPanel(!showAIPanel)}
            className="hover:text-white transition flex items-center gap-1"
          >
            <Sparkles className="w-4 h-4" />
            AI Tools
          </button>
          <span>{rows.length} rows × {rows[0]?.length || 0} columns</span>
        </div>
        <div>
          {selectedCell && (
            <span>Cell: {columns[selectedCell.col]}{selectedCell.row}</span>
          )}
        </div>
      </footer>
    </div>
  );
}
