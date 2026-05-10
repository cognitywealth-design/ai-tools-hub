'use client';

import { useState, useMemo, useEffect } from 'react';
import { Search } from 'lucide-react';
import { TOOLS_DATA, PRICING_BADGES, getAllCategories, getTotalToolCount } from '@/lib/toolsData';

const LOGO_BASE64 = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAyADIDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD3+iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/2Q==';

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

      {/* HEADER - Deep Navy */}
      <header style={{background:'#0D1B2A', borderBottom:'1px solid #1f3a52'}}>
        <div style={{maxWidth:'1280px', margin:'0 auto', padding:'14px 24px', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <div style={{display:'flex', alignItems:'center', gap:'14px'}}>
            <img src={LOGO_BASE64} alt="CognityWealth" style={{width:'44px', height:'44px', borderRadius:'8px'}} />
            <div>
              <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                <span style={{color:'#fff', fontWeight:'700', fontSize:'15px'}}>CognityWealth</span>
                <span style={{color:'#C9A84C', fontSize:'10px', fontWeight:'600', background:'rgba(201,168,76,0.12)', padding:'3px 9px', borderRadius:'20px', border:'1px solid rgba(201,168,76,0.3)'}}>AI · Tools Hub</span>
              </div>
              <p style={{color:'#8fa3b8', fontSize:'10px', margin:'2px 0 0 0'}}>Discover {getTotalToolCount()}+ AI Productivity Tools</p>
            </div>
          </div>
          <a href="https://ai.cognitywealth.in" target="_blank" rel="noopener noreferrer" style={{color:'#C9A84C', fontSize:'11px', fontWeight:'600', border:'1px solid rgba(201,168,76,0.45)', padding:'6px 12px', borderRadius:'8px', textDecoration:'none'}}>
            Go to AI Chat →
          </a>
        </div>
      </header>

      {/* FILTERS - Light cream with gold accents */}
      <div style={{background:'#FFF3E0', borderBottom:'1px solid #E8C4A0', position:'sticky', top:'0', zIndex:'40'}}>
        <div style={{maxWidth:'1280px', margin:'0 auto', padding:'14px 24px'}}>
          <div style={{position:'relative', marginBottom:'12px'}}>
            <Search size={14} style={{position:'absolute', left:'12px', top:'50%', transform:'translateY(-50%)', color:'#9ca3af'}} />
            <input
              type="text"
              placeholder="Search AI tools... (e.g. ChatGPT, Midjourney)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{width:'100%', paddingLeft:'36px', paddingRight:'14px', paddingTop:'8px', paddingBottom:'8px', borderRadius:'9px', background:'#fff', border:'1.5px solid #D4B86A', outline:'none', fontSize:'12px', color:'#1f2937', boxSizing:'border-box', fontFamily:'inherit'}}
            />
          </div>

          <div style={{marginBottom:'10px'}}>
            <p style={{fontSize:'9px', fontWeight:'700', color:'#8B7355', letterSpacing:'0.06em', textTransform:'uppercase', marginBottom:'7px'}}>Category</p>
            <div style={{display:'flex', flexWrap:'wrap', gap:'5px'}}>
              {['All', ...categories].map(cat => (
                <button key={cat} onClick={() => setSelectedCategory(cat)}
                  style={{padding:'5px 12px', borderRadius:'18px', fontSize:'11px', fontWeight:'600', cursor:'pointer', border:'none', background: selectedCategory === cat ? '#C9A84C' : 'rgba(201,168,76,0.08)', color: selectedCategory === cat ? '#fff' : '#5d4e37', transition:'all 0.2s', boxShadow: selectedCategory === cat ? '0 2px 8px rgba(201,168,76,0.25)' : 'none'}}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p style={{fontSize:'9px', fontWeight:'700', color:'#8B7355', letterSpacing:'0.06em', textTransform:'uppercase', marginBottom:'7px'}}>Pricing</p>
            <div style={{display:'flex', flexWrap:'wrap', gap:'5px'}}>
              {['All', 'Free', 'Free/Paid', 'Paid', 'Free/Open Source'].map(pricing => (
                <button key={pricing} onClick={() => setSelectedPricing(pricing)}
                  style={{padding:'5px 12px', borderRadius:'18px', fontSize:'11px', fontWeight:'600', cursor:'pointer', border:'none', background: selectedPricing === pricing ? '#E8A020' : 'rgba(232,160,32,0.08)', color: selectedPricing === pricing ? '#fff' : '#5d4e37', transition:'all 0.2s', boxShadow: selectedPricing === pricing ? '0 2px 8px rgba(232,160,32,0.25)' : 'none'}}>
                  {pricing}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <main style={{maxWidth:'1280px', margin:'0 auto', padding:'28px 24px'}}>
        {Object.keys(groupedResults).length === 0 ? (
          <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'60px 0'}}>
            <div style={{fontSize:'44px', marginBottom:'12px'}}>🔍</div>
            <h2 style={{fontSize:'18px', fontWeight:'700', color:'#1a2a3a', marginBottom:'6px'}}>No tools found</h2>
            <p style={{color:'#8fa3b8', fontSize:'13px'}}>Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div style={{display:'flex', flexDirection:'column', gap:'32px'}}>
            {Object.keys(groupedResults).map(categoryName => {
              const categoryData = TOOLS_DATA[categoryName];
              const tools = groupedResults[categoryName];
              return (
                <section key={categoryName}>
                  <div style={{display:'flex', alignItems:'center', gap:'10px', marginBottom:'14px'}}>
                    <span style={{fontSize:'20px'}}>{categoryData.icon}</span>
                    <div>
                      <h2 style={{fontSize:'14px', fontWeight:'700', color:'#1a2a3a', margin:'0'}}>{categoryName}</h2>
                      <p style={{fontSize:'10px', color:'#8fa3b8', margin:'2px 0 0 0'}}>{tools.length} tools</p>
                    </div>
                    <div style={{flex:'1', height:'1.5px', background:'#D4B86A', marginLeft:'8px'}} />
                  </div>
                  <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))', gap:'10px'}}>
                    {tools.map(tool => {
                      const pricingStyle = PRICING_BADGES[tool.pricing] || PRICING_BADGES['Free/Paid'];
                      return (
                        <a key={tool.name} href={tool.url} target="_blank" rel="noopener noreferrer"
                          style={{padding:'14px', borderRadius:'11px', background:'#FFF8EC', border:'1.5px solid #D4B86A', textDecoration:'none', display:'block', transition:'all 0.2s', boxShadow:'0 1px 3px rgba(201,168,76,0.08)', cursor:'pointer'}}
                          onMouseEnter={e => { e.currentTarget.style.borderColor='#C9A84C'; e.currentTarget.style.boxShadow='0 4px 12px rgba(201,168,76,0.18)'; e.currentTarget.style.transform='translateY(-2px)'; }}
                          onMouseLeave={e => { e.currentTarget.style.borderColor='#D4B86A'; e.currentTarget.style.boxShadow='0 1px 3px rgba(201,168,76,0.08)'; e.currentTarget.style.transform='translateY(0)'; }}>
                          <h3 style={{fontSize:'12px', fontWeight:'700', color:'#1a2a3a', margin:'0 0 7px 0'}}>{tool.name}</h3>
                          <div style={{marginBottom:'10px'}}>
                            <span style={{fontSize:'10px', fontWeight:'600', padding:'2px 7px', borderRadius:'4px', background: tool.pricing === 'Free' ? '#dcfce7' : tool.pricing === 'Paid' ? '#dbeafe' : '#fef9c3', color: tool.pricing === 'Free' ? '#166534' : tool.pricing === 'Paid' ? '#1e40af' : '#a16207'}}>
                              {tool.pricing}
                            </span>
                          </div>
                          <div style={{width:'100%', padding:'6px 0', borderRadius:'7px', background:'#FFF3D0', border:'1px solid #E8C4A0', color:'#92670a', fontSize:'11px', fontWeight:'700', textAlign:'center', transition:'all 0.2s'}}>
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
      <footer style={{background:'#0D1B2A', borderTop:'1px solid #1f3a52', marginTop:'32px'}}>
        <div style={{maxWidth:'1280px', margin:'0 auto', padding:'16px 24px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <p style={{color:'#8fa3b8', fontSize:'11px', margin:'0'}}>© 2026 <span style={{color:'#C9A84C', fontWeight:'700'}}>CognityWealth</span> · AI Tools Hub</p>
          <p style={{color:'#8fa3b8', fontSize:'11px', margin:'0'}}>Total Tools: <span style={{color:'#C9A84C', fontWeight:'700'}}>{getTotalToolCount()}</span></p>
        </div>
      </footer>
    </div>
  );
}
