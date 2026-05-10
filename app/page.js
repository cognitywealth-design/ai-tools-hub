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
    <div style={{minHeight:'100vh', background:'#FEF6EC', fontFamily:'-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif'}}>

      {/* HEADER */}
      <header style={{background:'#0D1B2A', borderBottom:'2px solid #1f3a52'}}>
        <div style={{maxWidth:'1280px', margin:'0 auto', padding:'16px 28px', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <div style={{display:'flex', alignItems:'center', gap:'16px'}}>
            <img
              src="/logo.jpeg"
              alt="CognityWealth Logo"
              style={{width:'52px', height:'52px', borderRadius:'50%', border:'2px solid #C9A84C', objectFit:'cover'}}
              onError={(e) => { e.target.style.display='none'; }}
            />
            <div>
              <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                <span style={{color:'#fff', fontWeight:'800', fontSize:'20px', letterSpacing:'-0.3px'}}>CognityWealth</span>
                <span style={{color:'#C9A84C', fontSize:'13px', fontWeight:'700', background:'rgba(201,168,76,0.15)', padding:'4px 12px', borderRadius:'20px', border:'1px solid rgba(201,168,76,0.4)'}}>AI Tools Hub</span>
              </div>
              <p style={{color:'#8fa3b8', fontSize:'13px', margin:'3px 0 0 0'}}>Discover {getTotalToolCount()}+ AI Productivity Tools</p>
            </div>
          </div>
          <a href="https://ai.cognitywealth.in" target="_blank" rel="noopener noreferrer"
            style={{color:'#C9A84C', fontSize:'14px', fontWeight:'700', border:'1.5px solid rgba(201,168,76,0.5)', padding:'8px 18px', borderRadius:'9px', textDecoration:'none'}}>
            Go to AI Chat →
          </a>
        </div>
      </header>

      {/* FILTERS */}
      <div style={{background:'#FFF3E0', borderBottom:'2px solid #E8C4A0', position:'sticky', top:'0', zIndex:'40'}}>
        <div style={{maxWidth:'1280px', margin:'0 auto', padding:'16px 28px'}}>
          <div style={{position:'relative', marginBottom:'14px'}}>
            <Search size={18} style={{position:'absolute', left:'14px', top:'50%', transform:'translateY(-50%)', color:'#9ca3af'}} />
            <input
              type="text"
              placeholder="Search AI tools... (e.g. ChatGPT, Midjourney)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{width:'100%', paddingLeft:'44px', paddingRight:'16px', paddingTop:'12px', paddingBottom:'12px', borderRadius:'10px', background:'#fff', border:'2px solid #D4B86A', outline:'none', fontSize:'15px', color:'#1f2937', boxSizing:'border-box', fontFamily:'inherit'}}
            />
          </div>

          <div style={{marginBottom:'12px'}}>
            <p style={{fontSize:'12px', fontWeight:'700', color:'#7a5c3a', letterSpacing:'0.06em', textTransform:'uppercase', marginBottom:'8px'}}>Category</p>
            <div style={{display:'flex', flexWrap:'wrap', gap:'7px'}}>
              {['All', ...categories].map(cat => (
                <button key={cat} onClick={() => setSelectedCategory(cat)}
                  style={{padding:'7px 16px', borderRadius:'22px', fontSize:'13px', fontWeight:'600', cursor:'pointer', fontFamily:'inherit', background: selectedCategory === cat ? '#C9A84C' : '#fff', color: selectedCategory === cat ? '#fff' : '#5d4e37', border: selectedCategory === cat ? '2px solid #C9A84C' : '2px solid #D4B86A', boxShadow: selectedCategory === cat ? '0 2px 10px rgba(201,168,76,0.3)' : 'none', transition:'all 0.2s'}}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p style={{fontSize:'12px', fontWeight:'700', color:'#7a5c3a', letterSpacing:'0.06em', textTransform:'uppercase', marginBottom:'8px'}}>Pricing</p>
            <div style={{display:'flex', flexWrap:'wrap', gap:'7px'}}>
              {['All', 'Free', 'Free/Paid', 'Paid', 'Free/Open Source'].map(pricing => (
                <button key={pricing} onClick={() => setSelectedPricing(pricing)}
                  style={{padding:'7px 16px', borderRadius:'22px', fontSize:'13px', fontWeight:'600', cursor:'pointer', fontFamily:'inherit', background: selectedPricing === pricing ? '#E8A020' : '#fff', color: selectedPricing === pricing ? '#fff' : '#5d4e37', border: selectedPricing === pricing ? '2px solid #E8A020' : '2px solid #D4B86A', boxShadow: selectedPricing === pricing ? '0 2px 10px rgba(232,160,32,0.3)' : 'none', transition:'all 0.2s'}}>
                  {pricing}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <main style={{maxWidth:'1280px', margin:'0 auto', padding:'32px 28px'}}>
        {Object.keys(groupedResults).length === 0 ? (
          <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'80px 0'}}>
            <div style={{fontSize:'52px', marginBottom:'16px'}}>🔍</div>
            <h2 style={{fontSize:'22px', fontWeight:'800', color:'#1a2a3a', marginBottom:'8px'}}>No tools found</h2>
            <p style={{color:'#8fa3b8', fontSize:'16px'}}>Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div style={{display:'flex', flexDirection:'column', gap:'40px'}}>
            {Object.keys(groupedResults).map(categoryName => {
              const categoryData = TOOLS_DATA[categoryName];
              const tools = groupedResults[categoryName];
              return (
                <section key={categoryName}>
                  <div style={{display:'flex', alignItems:'center', gap:'12px', marginBottom:'18px'}}>
                    <span style={{fontSize:'26px'}}>{categoryData.icon}</span>
                    <div>
                      <h2 style={{fontSize:'19px', fontWeight:'800', color:'#1a2a3a', margin:'0'}}>{categoryName}</h2>
                      <p style={{fontSize:'13px', color:'#8fa3b8', margin:'3px 0 0 0'}}>{tools.length} tools</p>
                    </div>
                    <div style={{flex:'1', height:'2px', background:'linear-gradient(to right, #D4B86A, transparent)', marginLeft:'8px'}} />
                  </div>
                  <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))', gap:'14px'}}>
                    {tools.map(tool => (
                      <a key={tool.name} href={tool.url} target="_blank" rel="noopener noreferrer"
                        style={{padding:'18px', borderRadius:'13px', background:'#FFF8EC', border:'2px solid #E8D5A3', textDecoration:'none', display:'block', transition:'all 0.2s', boxShadow:'0 2px 6px rgba(201,168,76,0.1)'}}
                        onMouseEnter={e => { e.currentTarget.style.borderColor='#C9A84C'; e.currentTarget.style.boxShadow='0 6px 20px rgba(201,168,76,0.2)'; e.currentTarget.style.transform='translateY(-2px)'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor='#E8D5A3'; e.currentTarget.style.boxShadow='0 2px 6px rgba(201,168,76,0.1)'; e.currentTarget.style.transform='translateY(0)'; }}>
                        <h3 style={{fontSize:'16px', fontWeight:'800', color:'#1a2a3a', margin:'0 0 10px 0'}}>{tool.name}</h3>
                        <div style={{marginBottom:'14px'}}>
                          <span style={{fontSize:'12px', fontWeight:'700', padding:'3px 10px', borderRadius:'5px',
                            background: tool.pricing === 'Free' ? '#dcfce7' : tool.pricing === 'Paid' ? '#dbeafe' : '#fef9c3',
                            color: tool.pricing === 'Free' ? '#166534' : tool.pricing === 'Paid' ? '#1e40af' : '#a16207'}}>
                            {tool.pricing}
                          </span>
                        </div>
                        <div style={{width:'100%', padding:'9px 0', borderRadius:'8px', background:'#FFF3D0', border:'1.5px solid #C9A84C', color:'#7a4e0a', fontSize:'14px', fontWeight:'700', textAlign:'center'}}>
                          Visit Tool →
                        </div>
                      </a>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer style={{background:'#0D1B2A', borderTop:'2px solid #1f3a52', marginTop:'40px'}}>
        <div style={{maxWidth:'1280px', margin:'0 auto', padding:'20px 28px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
            <img src="/logo.jpeg" alt="CognityWealth" style={{width:'28px', height:'28px', borderRadius:'50%', border:'1px solid #C9A84C', objectFit:'cover'}} onError={(e) => { e.target.style.display='none'; }} />
            <p style={{color:'#8fa3b8', fontSize:'14px', margin:'0'}}>© 2026 <span style={{color:'#C9A84C', fontWeight:'700'}}>CognityWealth</span> · AI Tools Hub</p>
          </div>
          <p style={{color:'#8fa3b8', fontSize:'14px', margin:'0'}}>Total Tools: <span style={{color:'#C9A84C', fontWeight:'700'}}>{getTotalToolCount()}</span></p>
        </div>
      </footer>
    </div>
  );
}
