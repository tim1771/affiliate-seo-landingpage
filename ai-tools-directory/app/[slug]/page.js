import data from '../../lib/data.json';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    return data.map((tool) => ({
        slug: tool.slug,
    }));
}

export default async function ToolPage({ params }) {
    const { slug } = await params;
    const tool = data.find((t) => t.slug === slug);

    if (!tool) {
        notFound();
    }

    return (
        <div className="container">
            <header>
                <div className="nav">
                    <Link href="/" className="logo">AI Directory</Link>
                    <Link href="/" className="btn" style={{ background: 'transparent', border: '1px solid #333' }}>Back to Home</Link>
                </div>
            </header>

            <main>
                <section className="hero">
                    <p style={{ color: 'var(--accent)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px' }}>
                        {tool.primary_category}
                    </p>
                    <h1>{tool.seo_title}</h1>
                    <p style={{ fontSize: '1.2rem', color: '#a3a3a3', maxWidth: '600px', margin: '0 auto' }}>
                        {tool.verdict}
                    </p>
                    <div style={{ marginTop: '2rem' }}>
                        <a href={tool.link} target="_blank" rel="noopener noreferrer" className="btn">
                            Visit {tool.name} Website →
                        </a>
                    </div>
                </section>

                <section className="section">
                    <h2>Why Choose {tool.name}?</h2>
                    <p style={{ fontSize: '1.1rem' }}>{tool.description}</p>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        {tool.categories.map(cat => (
                            <span key={cat} className="tag">{cat}</span>
                        ))}
                    </div>
                </section>

                <section className="section">
                    <h2>{tool.name} vs Competitors</h2>
                    <p>See how {tool.name} stacks up against other top {tool.primary_category} tools.</p>

                    <table className="comparison-table">
                        <thead>
                            <tr>
                                <th>Feature</th>
                                <th>{tool.name}</th>
                                {tool.competitors.length > 0 ? (
                                    <th>{tool.competitors[0]}</th>
                                ) : (
                                    <th>Standard Alternative</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Pricing Start</td>
                                <td>{tool.pricing_model}</td>
                                <td>Varies</td>
                            </tr>
                            <tr>
                                <td>Category</td>
                                <td>{tool.primary_category}</td>
                                <td>{tool.primary_category}</td>
                            </tr>
                            <tr>
                                <td>AI Engine</td>
                                <td>Advanced</td>
                                <td>Standard</td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                <section className="section" style={{ background: '#171717', padding: '3rem', borderRadius: '12px', textAlign: 'center' }}>
                    <h2>Ready to try {tool.name}?</h2>
                    <p>Join thousands of professionals using {tool.name} to streamline their workflow.</p>
                    <br />
                    <a href={tool.link} target="_blank" rel="noopener noreferrer" className="btn">
                        Get Started with {tool.name}
                    </a>
                </section>
            </main>

            <footer style={{ padding: '2rem 0', textAlign: 'center', color: '#666', borderTop: '1px solid #262626' }}>
                <p>© 2025 AI Directory. All rights reserved.</p>
            </footer>
        </div>
    );
}
