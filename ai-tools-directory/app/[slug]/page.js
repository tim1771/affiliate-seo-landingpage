import data from '../../lib/data.json';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    return data.tools.map((tool) => ({
        slug: tool.slug,
    }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const tool = data.tools.find((t) => t.slug === slug);
    if (!tool) return {};

    return {
        title: `${tool.seo_title} | AI Directory`,
        description: tool.verdict,
        keywords: [tool.name, tool.primary_category, 'AI tools', 'reviews'],
        openGraph: {
            title: tool.seo_title,
            description: tool.description,
            type: 'website',
        }
    };
}

export default async function ToolPage({ params }) {
    const { slug } = await params;
    const tool = data.tools.find((t) => t.slug === slug);

    if (!tool) {
        notFound();
    }

    // JSON-LD Structured Data
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: tool.name,
        applicationCategory: tool.primary_category,
        operatingSystem: 'Cloud/Web',
        description: tool.description,
        offers: {
            '@type': 'Offer',
            price: '0', // Dynamic pricing would go here
            priceCurrency: 'USD',
        }
    };

    return (
        <div className="container">
            {/* Inject JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

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
                        <a href={`/go/${tool.slug}`} target="_blank" rel="noopener noreferrer" className="btn btn-gradient" style={{ padding: '1rem 2rem', fontSize: '1.2rem' }}>
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

                    {/* Similar Tools Links */}
                    <div style={{ marginTop: '2rem' }}>
                        <h3>Explore Similar AI Tools</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
                            {data.tools
                                .filter(t => tool.competitors.includes(t.name) || (t.primary_category === tool.primary_category && t.slug !== tool.slug))
                                .slice(0, 6)
                                .map(similar => (
                                    <Link key={similar.slug} href={`/${similar.slug}`} className="tag" style={{ textDecoration: 'none', border: '1px solid #333' }}>
                                        {similar.name}
                                    </Link>
                                ))
                            }
                        </div>
                    </div>

                    {/* Direct Comparison "Versus" Links */}
                    <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #333' }}>
                        <h3>Compare {tool.name} vs Others</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', marginTop: '1rem' }}>
                            {data.tools
                                .filter(t => t.slug !== tool.slug && t.primary_category === tool.primary_category)
                                .slice(0, 8)
                                .map(competitor => (
                                    <Link key={competitor.slug} href={`/compare/${tool.slug}-vs-${competitor.slug}`}
                                        style={{ fontSize: '0.8rem', color: '#a3a3a3', textDecoration: 'underline' }}>
                                        {tool.name} vs {competitor.name}
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                </section>

                <section className="section" style={{ background: '#171717', padding: '3rem', borderRadius: '12px', textAlign: 'center' }}>
                    <h2>Ready to try {tool.name}?</h2>
                    <p>Join thousands of professionals using {tool.name} to streamline their workflow.</p>
                    <br />
                    <a href={`/go/${tool.slug}`} target="_blank" rel="noopener noreferrer" className="btn btn-gradient">
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
