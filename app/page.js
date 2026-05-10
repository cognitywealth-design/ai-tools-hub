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

  if (!isMounted) return <div style={{minHeight:'100vh',background:'#FEF6EC'}} />;

  return (
    <div style={{minHeight:'100vh', background:'#FEF6EC'}}>

      {/* HEADER */}
      <header style={{background:'#0a0a0a', borderBottom:'1px solid #1f1f1f'}}>
        <div style={{maxWidth:'1280px', margin:'0 auto', padding:'12px 24px', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
            <div style={{width:'38px', height:'38px', borderRadius:'10px', background:'linear-gradient(135deg, #f97316, #f59e0b)', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'800', fontSize:'16px', color:'#000'}}>C</div>
            <div>
              <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                <span style={{color:'#fff', fontWeight:'700', fontSize:'15px'}}>CognityWealth</span>
                <span style={{color:'#f97316', fontSize:'11px', fontWeight:'600', background:'rgba(249,115,22,0.1)', padding:'2px 8px', borderRadius:'20px', border:'1px solid rgba(249,115,22,0.3)'}}>AI · Tools Hub</span>
              </div>
              <p style={{color:'#6b7280', fontSize:'11px', margin:'2px 0 0 0'}}>Discover {getTotalToolCount()}+ AI Productivity Tools</p>
            </div>
          </div>
          <a href="https://ai.cognitywealth.in" target="_blank" rel="noopener noreferrer"
            style={{color:'#f97316', fontSize:'12px', border:'1px solid rgba(249,115,22,0.4)', padding:'6px 14px', borderRadius:'8px', textDecoration:'none', fontWeight:'500'}}>
            Go to AI Chat →
          </a>
        </div>
      </header>

      {/* FILTERS */}
      <div style={{background:'#fff8f0', borderBottom:'1px solid #fde8cc', position:'sticky', top:'0', zIndex:'40'}}>
        <div style={{maxWidth:'1280px', margin:'0 auto', padding:'16px 24px'}}>
          <div style={{position:'relative', marginBottom:'14px'}}>
            <Search size={15} style={{position:'absolute', left:'12px', top:'50%', transform:'translateY(-50%)', color:'#9ca3af'}} />
            <input
              type="text"
              placeholder="Search AI tools... (e.g. ChatGPT, Midjourney)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{width:'100%', paddingLeft:'36px', paddingRight:'16px', paddingTop:'10px', paddingBottom:'10px', borderRadius:'10px', background:'#fff', border:'1.5px solid #fcd9a8', outline:'none', fontSize:'13px', color:'#1f2937', boxSizing:'border-box'}}
            />
          </div>

          <div style={{marginBottom:'10px'}}>
            <p style={{fontSize:'10px', fontWeight:'700', color:'#9ca3af', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'8px'}}>Category</p>
            <div style={{display:'flex', flexWrap:'wrap', gap:'6px'}}>
              {['All', ...categories].map(cat => (
                <button key={cat} onClick={() => setSelectedCategory(cat)}
                  style={{padding:'4px 12px', borderRadius:'20px', fontSize:'12px', fontWeight:'500', cursor:'pointer', border:'none', background: selectedCategory === cat ? '#f97316' : '#fff', color: selectedCategory === cat ? '#fff' : '#6b7280', boxShadow: selectedCategory === cat ? '0 2px 8px rgba(249,115,22,0.3)' : '0 1px 3px rgba(0,0,0,0.08)'}}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p style={{fontSize:'10px', fontWeight:'700', color:'#9ca3af', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'8px'}}>Pricing</p>
            <div style={{display:'flex', flexWrap:'wrap', gap:'6px'}}>
              {['All', 'Free', 'Free/Paid', 'Paid', 'Free/Open Source'].map(pricing => (
                <button key={pricing} onClick={() => setSelectedPricing(pricing)}
                  style={{padding:'4px 12px', borderRadius:'20px', fontSize:'12px', fontWeight:'500', cursor:'pointer', border:'none', background: selectedPricing === pricing ? '#f59e0b' : '#fff', color: selectedPricing === pricing ? '#fff' : '#6b7280', boxShadow: selectedPricing === pricing ? '0 2px 8px rgba(245,158,11,0.3)' : '0 1px 3px rgba(0,0,0,0.08)'}}>
                  {pricing}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <main style={{maxWidth:'1280px', margin:'0 auto', padding:'32px 24px'}}>
        {Object.keys(groupedResults).length === 0 ? (
          <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'80px 0'}}>
            <div style={{fontSize:'48px', marginBottom:'16px'}}>🔍</div>
            <h2 style={{fontSize:'20px', fontWeight:'700', color:'#1f2937', marginBottom:'8px'}}>No tools found</h2>
            <p style={{color:'#9ca3af', fontSize:'14px'}}>Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div style={{display:'flex', flexDirection:'column', gap:'40px'}}>
            {Object.keys(groupedResults).map(categoryName => {
              const categoryData = TOOLS_DATA[categoryName];
              const tools = groupedResults[categoryName];
              return (
                <section key={categoryName}>
                  <div style={{display:'flex', alignItems:'center', gap:'12px', marginBottom:'16px'}}>
                    <span style={{fontSize:'24px'}}>{categoryData.icon}</span>
                    <div>
                      <h2 style={{fontSize:'16px', fontWeight:'700', color:'#1f2937', margin:'0'}}>{categoryName}</h2>
                      <p style={{fontSize:'11px', color:'#9ca3af', margin:'2px 0 0 0'}}>{tools.length} tools</p>
                    </div>
                    <div style={{flex:'1', height:'1px', background:'#fde8cc', marginLeft:'8px'}} />
                  </div>
                  <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))', gap:'12px'}}>
                    {tools.map(tool => {
                      const pricingStyle = PRICING_BADGES[tool.pricing] || PRICING_BADGES['Free/Paid'];
                      return (
                        <a key={tool.name} href={tool.url} target="_blank" rel="noopener noreferrer"
                          style={{padding:'16px', borderRadius:'12px', background:'#fff', border:'1.5px solid #fde8cc', textDecoration:'none', display:'block', transition:'all 0.2s', boxShadow:'0 1px 4px rgba(249,115,22,0.06)'}}
                          onMouseEnter={e => { e.currentTarget.style.borderColor='#f97316'; e.currentTarget.style.boxShadow='0 4px 16px rgba(249,115,22,0.15)'; }}
                          onMouseLeave={e => { e.currentTarget.style.borderColor='#fde8cc'; e.currentTarget.style.boxShadow='0 1px 4px rgba(249,115,22,0.06)'; }}>
                          <h3 style={{fontSize:'13px', fontWeight:'700', color:'#1f2937', margin:'0 0 8px 0'}}>{tool.name}</h3>
                          <div style={{marginBottom:'12px'}}>
                            <span style={{fontSize:'11px', fontWeight:'600', padding:'2px 8px', borderRadius:'4px', background: tool.pricing === 'Free' ? '#dcfce7' : tool.pricing === 'Paid' ? '#dbeafe' : '#fef9c3', color: tool.pricing === 'Free' ? '#16a34a' : tool.pricing === 'Paid' ? '#1d4ed8' : '#a16207'}}>
                              {tool.pricing}
                            </span>
                          </div>
                          <div style={{width:'100%', padding:'7px 0', borderRadius:'8px', background:'#fff7ed', border:'1px solid #fed7aa', color:'#ea580c', fontSize:'12px', fontWeight:'600', textAlign:'center'}}>
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
      <footer style={{background:'#0a0a0a', borderTop:'1px solid #1f1f1f', marginTop:'40px'}}>
        <div style={{maxWidth:'1280px', margin:'0 auto', padding:'20px 24px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <p style={{color:'#6b7280', fontSize:'12px', margin:'0'}}>© 2026 <span style={{color:'#f97316', fontWeight:'600'}}>CognityWealth</span> · AI Tools Hub</p>
          <p style={{color:'#6b7280', fontSize:'12px', margin:'0'}}>Total Tools: <span style={{color:'#f97316', fontWeight:'700'}}>{getTotalToolCount()}</span></p>
        </div>
      </footer>
    </div>
  );
}
