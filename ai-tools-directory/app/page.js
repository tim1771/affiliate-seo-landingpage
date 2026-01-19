'use client';
import { useState, useMemo } from 'react';
import data from '../lib/data.json';
import Link from 'next/link';
import WaitlistForm from './components/WaitlistForm';

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
          <a href="https://lms.worklocal.ca/" target="_blank" className="btn icon-btn" style={{ background: '#ec4899', border: 'none' }}>🎓 AI Training Hub</a>
        </div>
      </header>

      <main>
        {/* ========== LANDING PAGE HERO SECTION ========== */}
        <section className="landing-hero">
          <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 1rem' }}>
            <h1>Stop Guessing Which AI Tools Are Right for Your Business</h1>
            <p className="hero-text">
              There are thousands of AI tools promising to save you time and money. Most won't. Some will waste both.
            </p>
            <p className="hero-text">
              The difference isn't the tool—it's the fit. The right AI tool for a restaurant isn't the right one for an accounting firm. What works for a 20-person team fails for a solo operator.
            </p>
            <p className="hero-emphasis">You don't need more options. You need the right match.</p>
          </div>

          {/* How It Works */}
          <div className="landing-section">
            <h2>How It Works</h2>

            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Tell us about your business</h3>
                <p>A short questionnaire covering your industry, team size, budget, current tech comfort level, and the specific problems eating up your time.</p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Get matched recommendations</h3>
                <p>Within 48 hours, you'll receive a personalized report with 3-5 AI tools selected specifically for your situation—not a generic list, but tools chosen because they fit how you actually operate.</p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Implement with confidence</h3>
                <p>Each recommendation includes why it fits your business, realistic expectations for results, and practical first steps to get started.</p>
              </div>
            </div>
          </div>

          {/* This Is For You If */}
          <div className="landing-section">
            <h2>This Is For You If...</h2>
            <ul className="checklist">
              <li>You know AI tools could help your business but feel overwhelmed by the options</li>
              <li>You've wasted money on subscriptions that didn't deliver</li>
              <li>You don't have time to research and test dozens of tools yourself</li>
              <li>You want honest recommendations, not affiliate-driven "best of" lists</li>
              <li>You're a small business owner or operator, not a tech company</li>
            </ul>
          </div>

          {/* CTA / Waitlist Form */}
          <WaitlistForm />
        </section>

        {/* ========== AI TOOLS DIRECTORY SECTION ========== */}
        <div className="hero" style={{ padding: '4rem 0' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Browse the AI Tools Directory</h2>
          <p style={{ color: '#a3a3a3' }}>Explore our curated collection of the top artificial intelligence software.</p>

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
        {/* Popular Comparisons Section */}
        {data.comparisons && data.comparisons.length > 0 && (
          <div style={{ marginTop: '5rem', padding: '3rem 0', borderTop: '1px solid #262626' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', textAlign: 'center' }}>Popular AI Tool Face-Offs</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
              {data.comparisons.slice(0, 15).map((comp) => (
                <Link
                  href={`/compare/${comp.slug}`}
                  key={comp.slug}
                  className="card"
                  style={{
                    padding: '1rem 1.5rem',
                    borderRadius: '50px',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = 'var(--primary)';
                    e.currentTarget.style.background = 'rgba(99, 102, 241, 0.05)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                  }}
                >
                  {comp.title.replace(': Which AI Tool is Better in 2026?', '')}
                </Link>
              ))}
              {data.comparisons.length > 15 && (
                <div style={{ width: '100%', textAlign: 'center', marginTop: '1rem' }}>
                  <p style={{ color: '#666', fontSize: '0.9rem' }}>+ thousands more deep-dive comparisons</p>
                </div>
              )}
            </div>
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
