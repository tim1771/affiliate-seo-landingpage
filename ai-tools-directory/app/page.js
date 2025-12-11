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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "AI Tools Directory 2026",
              "url": "https://aitools2026.netlify.app",
              "description": "The most comprehensive directory of Artificial Intelligence software and tools.",
              "publisher": {
                "@type": "Organization",
                "name": "AI Directory"
              }
            })
          }}
        />
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
        {/* Rich SEO Content Section */}
        <div style={{ marginTop: '5rem', padding: '3rem 0', borderTop: '1px solid #262626' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Why Use Our AI Tools Directory?</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', color: 'white', marginBottom: '0.5rem' }}>🚀 Curated Selection</h3>
              <p style={{ color: '#a3a3a3' }}>We evaluate hundreds of AI applications effectively, filtering out the noise to bring you only the most capable tools for your workflow.</p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', color: 'white', marginBottom: '0.5rem' }}>⚖️ Unbiased Comparisons</h3>
              <p style={{ color: '#a3a3a3' }}>Our "Versus" engine automatically generates head-to-head comparisons (e.g., ChatGPT vs Claude), helping you decide based on features, pricing, and specific use cases.</p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', color: 'white', marginBottom: '0.5rem' }}>💰 Best Deals</h3>
              <p style={{ color: '#a3a3a3' }}>We track pricing models (Free, Freemium, Paid) and special offers to ensure you get the best ROI on your software investment.</p>
            </div>
          </div>

          <div style={{ marginTop: '3rem' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>How We Evaluate Tools</h3>
            <p style={{ color: '#a3a3a3', lineHeight: '1.6' }}>
              Our ranking methodology considers three core factors: <strong>Output Quality</strong>, <strong>Ease of Use</strong>, and <strong>Value for Money</strong>.
              Whether you are looking for <em>image generation</em>, <em>coding assistants</em>, or <em>marketing automation</em>, our directory is updated weekly to reflect the fast-paced nature of the AI industry.
            </p>
          </div>
        </div>

      </main>

      <footer style={{ padding: '2rem 0', textAlign: 'center', color: '#666', borderTop: '1px solid #262626' }}>
        <p>© 2026 AI Directory. Disclaimer: We may earn affiliate commissions from links on this page.</p>
      </footer>
    </div>
  );
}
