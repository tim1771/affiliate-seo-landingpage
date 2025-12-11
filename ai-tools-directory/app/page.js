'use client';
import { useState, useMemo } from 'react';
import data from '../lib/data.json';
import Link from 'next/link';

export default function Home() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Extract unique categories
  const categories = useMemo(() => {
    const allCats = data.tools.flatMap(t => t.categories);
    const uniqueCats = ['All', ...new Set(allCats)];
    return uniqueCats.sort();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 24;

  // Filter tools
  const filteredTools = useMemo(() => {
    // Reset to page 1 when search/filter changes
    setCurrentPage(1);
    return data.tools.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(search.toLowerCase()) ||
        tool.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || tool.categories.includes(selectedCategory);

      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  // Pagination Logic
  const paginatedTools = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTools.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredTools, currentPage]);

  const totalPages = Math.ceil(filteredTools.length / ITEMS_PER_PAGE);

  return (
    <div className="container">
      <header>
        <div className="nav">
          <div className="logo">AI Directory</div>
          <a href="#" className="btn icon-btn" style={{ background: '#262626' }}>Subscribe</a>
        </div>
      </header>

      <main>
        <div className="hero" style={{ padding: '4rem 0' }}>
          <h1>Find the Best AI Tools in 2026</h1>
          <p style={{ color: '#a3a3a3' }}>Curated directory of the top artificial intelligence software.</p>

          {/* Search & Filter UI */}
          <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
            <input
              type="text"
              placeholder="Search tools (e.g., 'avatar', 'video')..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                background: '#171717',
                border: '1px solid #333',
                padding: '1rem 1.5rem',
                borderRadius: '999px',
                color: 'white',
                width: '100%',
                maxWidth: '500px',
                fontSize: '1rem',
                outline: 'none',
                boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
              }}
            />

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', maxWidth: '800px' }}>
              {categories.slice(0, 10).map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className="tag"
                  style={{
                    cursor: 'pointer',
                    background: selectedCategory === cat ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                    color: selectedCategory === cat ? 'white' : '#a3a3a3',
                    border: selectedCategory === cat ? '1px solid var(--primary)' : '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  {cat}
                </button>
              ))}
              {categories.length > 10 && (
                <span style={{ fontSize: '0.8rem', color: '#666', alignSelf: 'center' }}>+ {categories.length - 10} more</span>
              )}
            </div>
          </div>
        </div>

        <div className="grid">
          {paginatedTools.map((tool) => (
            <Link href={`/${tool.slug}`} key={tool.slug} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.5rem' }}>{tool.name}</h2>
                <span style={{ fontSize: '0.8rem', background: '#333', padding: '2px 8px', borderRadius: '4px' }}>
                  {tool.pricing_model}
                </span>
              </div>
              <p style={{ color: '#a3a3a3', marginBottom: '1.5rem', minHeight: '3rem' }}>
                {tool.description}
              </p>
              <div style={{ marginBottom: '1rem' }}>
                {tool.categories.slice(0, 2).map(cat => (
                  <span key={cat} className="tag">{cat}</span>
                ))}
              </div>
              <div style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.9rem' }}>
                Read Review →
              </div>
            </Link>
          ))}
          {filteredTools.length === 0 && (
            <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '3rem', color: '#666' }}>
              <h3>No tools found matching your search.</h3>
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem', marginBottom: '4rem' }}>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
              className="btn"
              style={{ background: currentPage === 1 ? '#333' : 'var(--primary)', opacity: currentPage === 1 ? 0.5 : 1, cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
            >
              Previous
            </button>
            <span style={{ alignSelf: 'center', color: '#666' }}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
              className="btn"
              style={{ background: currentPage === totalPages ? '#333' : 'var(--primary)', opacity: currentPage === totalPages ? 0.5 : 1, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
            >
              Next
            </button>
          </div>
        )}
      </main>

      <footer style={{ padding: '2rem 0', textAlign: 'center', color: '#666', borderTop: '1px solid #262626' }}>
        <p>© 2025 AI Directory. Discalimer: We may earn affiliate commissions from links on this page.</p>
      </footer>
    </div>
  );
}
