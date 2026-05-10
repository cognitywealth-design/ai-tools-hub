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
    if (saved !== null) setDarkMode(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (isMounted) localStorage.setItem('ai-tools-hub-darkmode', JSON.stringify(darkMode));
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
    if (selectedPricing !== 'All') results = results.filter(tool => tool.pricing === selectedPricing);
    if (searchQuery) results = results.filter(tool => tool.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return results;
  }, [selectedCategory, selectedPricing, searchQuery]);

  const groupedResults = useMemo(() => {
    const grouped = {};
    filteredTools.forEach(tool => {
      const catName = Object.keys(TOOLS_DATA).find(cat => TOOLS_DATA[cat].tools.find(t => t.name === tool.name));
      if (!grouped[catName]) grouped[catName] = [];
      grouped[catName].push(tool);
    });
    return grouped;
  }, [filteredTools]);

  if (!isMounted) return <div className="min-h-screen bg-black" />;

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-black text-white">

        <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-xl border-b border-orange-500/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-xl font-bold text-black">C</div>
                <div>
                  <h1 className="text-xl font-bold text-white">CognityWealth <span className="text-orange-400">AI Tools Hub</span></h1>
                  <p className="text-xs text-gray-400">Discover 200+ AI Productivity Tools</p>
                </div>
              </div>
              <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-lg bg-gray-900 hover:bg-gray-800 border border-gray-700 transition-colors">
                {darkMode ? <Sun size={18} className="text-orange-400" /> : <Moon size={18} className="text-gray-400" />}
              </button>
            </div>

            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search AI tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-gray-900 border border-gray-700 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500/30 text-white placeholder-gray-500 text-sm transition-all"
              />
            </div>
          </div>
        </header>

        <div className="sticky top-24 z-40 bg-black/90 backdrop-blur-xl border-b border-orange-500/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Category</p>
                <div className="flex flex-wrap gap-1.5">
                  {['All', ...categories].map(cat => (
                    <button key={cat} onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${selectedCategory === cat ? 'bg-orange-500 text-black font-semibold' : 'bg-gray-900 text-gray-400 hover:bg-gray-800 border border-gray-700'}`}>
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Pricing</p>
                <div className="flex flex-wrap gap-1.5">
                  {['All', 'Free', 'Free/Paid', 'Paid', 'Free/Open Source'].map(pricing => (
                    <button key={pricing} onClick={() => setSelectedPricing(pricing)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${selectedPricing === pricing ? 'bg-amber-500 text-black font-semibold' : 'bg-gray-900 text-gray-400 hover:bg-gray-800 border border-gray-700'}`}>
                      {pricing}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {Object.keys(groupedResults).length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <h2 className="text-xl font-bold text-white mb-2">No tools found</h2>
              <p className="text-gray-500 text-sm text-center">Try adjusting your search or filters.</p>
            </div>
          ) : (
            <div className="space-y-10">
              {Object.keys(groupedResults).map(categoryName => {
                const categoryData = TOOLS_DATA[categoryName];
                const tools = groupedResults[categoryName];
                return (
                  <section key={categoryName}>
                    <div className="mb-4 flex items-center gap-3">
                      <span className="text-2xl">{categoryData.icon}</span>
                      <div>
                        <h2 className="text-lg font-bold text-white">{categoryName}</h2>
                        <p className="text-xs text-gray-500">{tools.length} tools</p>
                      </div>
                      <div className="flex-1 h-px bg-orange-500/20 ml-2" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                      {tools.map(tool => {
                        const pricingStyle = PRICING_BADGES[tool.pricing] || PRICING_BADGES['Free/Paid'];
                        return (
                          <a key={tool.name} href={tool.url} target="_blank" rel="noopener noreferrer"
                            className="group p-4 rounded-xl bg-gray-900 border border-gray-800 hover:border-orange-500/50 transition-all duration-200 hover:bg-gray-800">
                            <div className="flex items-start justify-between mb-3">
                              <h3 className="font-semibold text-white group-hover:text-orange-400 transition-colors text-sm">{tool.name}</h3>
                            </div>
                            <div className="mb-3">
                              <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${pricingStyle.bg} ${pricingStyle.text}`}>{tool.pricing}</span>
                            </div>
                            <div className="w-full py-1.5 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/20 hover:border-orange-500/50 text-orange-400 text-xs font-medium text-center transition-all">
                              Visit Tool →
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

        <footer className="border-t border-orange-500/10 mt-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
              <p>© 2026 <span className="text-orange-400">CognityWealth</span> AI Tools Hub</p>
              <p>Total Tools: <span className="text-orange-400 font-semibold">{getTotalToolCount()}</span></p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
