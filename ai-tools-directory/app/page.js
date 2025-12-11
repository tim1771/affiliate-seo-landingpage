import data from '../lib/data.json';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container">
      <header>
        <div className="nav">
          <div className="logo">AI Directory</div>
          <a href="#" className="btn" style={{ background: '#262626' }}>Subscribe</a>
        </div>
      </header>

      <main>
        <div className="hero" style={{ padding: '4rem 0' }}>
          <h1>Find the Best AI Tools in 2025</h1>
          <p style={{ color: '#a3a3a3' }}>Curated directory of the top artificial intelligence software.</p>
        </div>

        <div className="grid">
          {data.map((tool) => (
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
        </div>
      </main>

      <footer style={{ padding: '2rem 0', textAlign: 'center', color: '#666', borderTop: '1px solid #262626' }}>
        <p>© 2025 AI Directory. Discalimer: We may earn affiliate commissions from links on this page.</p>
      </footer>
    </div>
  );
}
