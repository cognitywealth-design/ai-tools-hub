'use client';

import { useState, useMemo, useEffect } from 'react';
import { Search } from 'lucide-react';
import { TOOLS_DATA, PRICING_BADGES, getAllCategories, getTotalToolCount } from '@/lib/toolsData';

export default function AIToolsHub() {
  const [isMounted, setIsMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPricing, setSelectedPricing] = useState('All');

  useEffect(() => { setIsMounted(true); }, []);

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

  if (!isMounted) return <div className="min-h-screen bg-white" />;

  return (
    <div className="min-h-screen bg-white">

      {/* TOP HEADER - Dark like CognityWealth */}
      <header className="bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-black font-bold text-sm">C</div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold text-base">CognityWealth</span>
                  <span className="text-orange-400 text-xs font-medium bg-orange-400/10 px-2 py-0.5 rounded-full border border-orange-400/20">AI · Tools Hub</span>
                </div>
                <p className="text-gray-500 text-xs">Discover {getTotalToolCount()}+ AI Productivity Tools</p>
              </div>
            </div>
            <a href="https://ai.cognitywealth.in" target="_blank" rel="noopener noreferrer" className="text-xs text-orange-400 hover:text-orange-300 border border-orange-400/30 hover:border-orange-400/60 px-3 py-1.5 rounded-lg transition-all">
              Go to AI Chat →
            </a>
          </div>
        </div>
      </header>

      {/* SEARCH + FILTERS - Light background */}
      <div className="bg-gray-50 border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="relative mb-4">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search AI tools... (e.g. ChatGPT, Midjourney)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white border border-gray-300 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-gray-800 placeholder-gray-400 text-sm transition-all"
            />
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Category</p>
              <div className="flex flex-wrap gap-1.5">
                {['All', ...categories].map(cat => (
                  <button key={cat} onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${selectedCategory === cat ? 'bg-orange-500 text-white shadow-sm' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Pricing</p>
              <div className="flex flex-wrap gap-1.5">
                {['All', 'Free', 'Free/Paid', 'Paid', 'Free/Open Source'].map(pricing => (
                  <button key={pricing} onClick={() => setSelectedPricing(pricing)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${selectedPricing === pricing ? 'bg-amber-500 text-white shadow-sm' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}>
                    {pricing}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {Object.keys(groupedResults).length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">No tools found</h2>
            <p className="text-gray-500 text-sm">Try adjusting your search or filters.</p>
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
                      <h2 className="text-base font-bold text-gray-900">{categoryName}</h2>
                      <p className="text-xs text-gray-400">{tools.length} tools</p>
                    </div>
                    <div className="flex-1 h-px bg-gray-200 ml-2" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {tools.map(tool => {
                      const pricingStyle = PRICING_BADGES[tool.pricing] || PRICING_BADGES['Free/Paid'];
                      return (
                        <a key={tool.name} href={tool.url} target="_blank" rel="noopener noreferrer"
                          className="group p-4 rounded-xl bg-white border border-gray-200 hover:border-orange-400 hover:shadow-md transition-all duration-200">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-gray-800 group-hover:text-orange-500 transition-colors text-sm">{tool.name}</h3>
                          </div>
                          <div className="mb-3">
                            <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${pricingStyle.bg} ${pricingStyle.text}`}>{tool.pricing}</span>
                          </div>
                          <div className="w-full py-1.5 rounded-lg bg-orange-50 hover:bg-orange-100 border border-orange-200 hover:border-orange-400 text-orange-500 text-xs font-medium text-center transition-all">
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

      {/* FOOTER */}
      <footer className="bg-black border-t border-gray-800 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <p className="text-gray-500">© 2026 <span className="text-orange-400 font-medium">CognityWealth</span> · AI Tools Hub</p>
            <p className="text-gray-500">Total Tools: <span className="text-orange-400 font-semibold">{getTotalToolCount()}</span></p>
          </div>
        </div>
      </footer>
    </div>
  );
}
