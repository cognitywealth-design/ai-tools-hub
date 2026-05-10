'use client';

import { useState, useMemo, useEffect } from 'react';
import { Search, Moon, Sun } from 'lucide-react';
import { TOOLS_DATA, PRICING_BADGES, getAllCategories, getTotalToolCount } from '@/lib/toolsData';

export default function AIToolsHub() {
  const [darkMode, setDarkMode] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPricing, setSelectedPricing] = useState('All');

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem('ai-tools-hub-darkmode');
    if (saved !== null) {
      setDarkMode(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('ai-tools-hub-darkmode', JSON.stringify(darkMode));
    }
  }, [darkMode, isMounted]);

  const categories = getAllCategories();

  const filteredTools = useMemo(() => {
    let results = [];
    if (selectedCategory === 'All') {
      Object.values(TOOLS_DATA).forEach(cat => {
        results.push(...cat.tools.map(tool => ({ ...tool, category: cat })));
      });
    } else {
      const catData = TOOLS_DATA[selectedCategory];
      results = catData.tools.map(tool => ({ ...tool, category: catData }));
    }
    if (selectedPricing !== 'All') {
      results = results.filter(tool => tool.pricing === selectedPricing);
    }
    if (searchQuery) {
      results = results.filter(tool => tool.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return results;
  }, [selectedCategory, selectedPricing, searchQuery]);

  const groupedResults = useMemo(() => {
    const grouped = {};
    filteredTools.forEach(tool => {
      const catName = Object.keys(TOOLS_DATA).find(cat => TOOLS_DATA[cat].tools.find(t => t.name === tool.name));
      if (!grouped[catName]) {
        grouped[catName] = [];
      }
      grouped[catName].push(tool);
    });
    return grouped;
  }, [filteredTools]);

  if (!isMounted) {
    return <div className="min-h-screen bg-slate-900" />;
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/80 dark:bg-slate-950/80 border-b border-slate-700/50 dark:border-slate-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="text-3xl">🚀</div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">AI Tools Hub</h1>
                  <p className="text-xs text-slate-400 dark:text-slate-500">Discover 200+ AI Productivity Tools</p>
                </div>
              </div>
              <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-lg bg-slate-800 dark:bg-slate-700 hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors">
                {darkMode ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} className="text-slate-600" />}
              </button>
            </div>
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400" />
              <input type="text" placeholder="Search tools..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-800 dark:bg-slate-700 border border-slate-700 dark:border-slate-600 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 text-slate-100 placeholder-slate-500 transition-all" />
            </div>
          </div>
        </header>

        <div className="sticky top-20 z-40 backdrop-blur-xl bg-slate-900/80 dark:bg-slate-950/80 border-b border-slate-700/50 dark:border-slate-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-2">Category</p>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${selectedCategory === cat ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/20' : 'bg-slate-800 dark:bg-slate-700 text-slate-300 dark:text-slate-400 hover:bg-slate-700 dark:hover:bg-slate-600'}`}>
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-2">Pricing</p>
                <div className="flex flex-wrap gap-2">
                  {['All', 'Free', 'Free/Paid', 'Paid', 'Free/Open Source'].map(pricing => (
                    <button key={pricing} onClick={() => setSelectedPricing(pricing)} className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${selectedPricing === pricing ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-slate-800 dark:bg-slate-700 text-slate-300 dark:text-slate-400 hover:bg-slate-700 dark:hover:bg-slate-600'}`}>
                      {pricing}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {Object.keys(groupedResults).length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-2xl font-bold text-slate-100 mb-2">No tools found</h2>
              <p className="text-slate-400 dark:text-slate-500 text-center max-w-md">Try adjusting your search or filters to find the perfect AI tool for you.</p>
            </div>
          ) : (
            <div className="space-y-12">
              {Object.keys(groupedResults).map(categoryName => {
                const categoryData = TOOLS_DATA[categoryName];
                const tools = groupedResults[categoryName];
                return (
                  <section key={categoryName}>
                    <div className="mb-6 flex items-center gap-3">
                      <span className="text-3xl">{categoryData.icon}</span>
                      <div>
                        <h2 className="text-2xl font-bold text-slate-100">{categoryName}</h2>
                        <p className="text-sm text-slate-400 dark:text-slate-500">{tools.length} tools</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {tools.map(tool => {
                        const pricingStyle = PRICING_BADGES[tool.pricing];
                        return (
                          <a key={tool.name} href={tool.url} target="_blank" rel="noopener noreferrer" className="group relative p-4 rounded-xl bg-gradient-to-br from-slate-800 to-slate-700/50 dark:from-slate-800 dark:to-slate-900 border border-slate-700 dark:border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 transition-all duration-300" />
                            <div className="relative z-10">
                              <h3 className="font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors line-clamp-2 mb-3">{tool.name}</h3>
                              <div className="mb-4">
                                <span className={`inline-block px-2 py-1 rounded-md text-xs font-medium ${pricingStyle.bg} ${pricingStyle.text}`}>{tool.pricing}</span>
                              </div>
                              <button className="w-full py-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/40 hover:to-blue-500/40 border border-cyan-500/30 hover:border-cyan-500/60 text-cyan-300 hover:text-cyan-200 text-sm font-medium transition-all">Visit Tool →</button>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </section>
                );
              })}
            </div>
          )}
        </main>

        <footer className="border-t border-slate-700/50 dark:border-slate-800/50 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400 dark:text-slate-500">
              <p>© 2026 AI Tools Hub. Curated collection of productivity tools.</p>
              <p>Total Tools: <span className="font-semibold text-slate-300 dark:text-slate-400">{getTotalToolCount()}</span></p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
