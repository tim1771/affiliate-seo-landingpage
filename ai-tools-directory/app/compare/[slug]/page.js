import data from '../../../lib/data.json';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    if (!data.comparisons) return [];
    return data.comparisons.map((comp) => ({
        slug: comp.slug,
    }));
}

export default async function ComparisonPage({ params }) {
    const { slug } = await params;

    if (!data.comparisons) {
        notFound();
    }

    const comparison = data.comparisons.find((c) => c.slug === slug);

    if (!comparison) {
        notFound();
    }

    // Find the full tool objects
    const toolA = data.tools.find(t => t.slug === comparison.toolA);
    const toolB = data.tools.find(t => t.slug === comparison.toolB);

    return (
        <div className="container">
            <header>
                <div className="nav">
                    <Link href="/" className="logo">AI Directory</Link>
                    <Link href="/" className="btn" style={{ background: 'transparent', border: '1px solid #333' }}>Back to Home</Link>
                </div>
            </header>

            <main>
                <div className="hero">
                    <div style={{ display: 'flex', alignItems: 'center', justifyItems: 'center', gap: '2rem', justifyContent: 'center' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{toolA.name}</div>
                        <div style={{ fontSize: '1.5rem', color: '#666' }}>VS</div>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{toolB.name}</div>
                    </div>

                    <h1 style={{ marginTop: '2rem' }}>{comparison.title}</h1>
                    <p style={{ color: '#a3a3a3' }}>Compare pricing, features, and reviews.</p>
                </div>

                <section className="section">
                    <table className="comparison-table">
                        <thead>
                            <tr>
                                <th>Feature</th>
                                <th>{toolA.name}</th>
                                <th>{toolB.name}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Pricing Model</td>
                                <td>{toolA.pricing_model}</td>
                                <td>{toolB.pricing_model}</td>
                            </tr>
                            <tr>
                                <td>Primary Use Case</td>
                                <td>{toolA.primary_category}</td>
                                <td>{toolB.primary_category}</td>
                            </tr>
                            <tr>
                                <td>Description</td>
                                <td style={{ fontSize: '0.9rem' }}>{toolA.description}</td>
                                <td style={{ fontSize: '0.9rem' }}>{toolB.description}</td>
                            </tr>
                            <tr>
                                <td>Link</td>
                                <td><a href={toolA.link} className="btn btn-primary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}>Visit Website</a></td>
                                <td><a href={toolB.link} className="btn btn-primary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}>Visit Website</a></td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                <section className="section" style={{ textAlign: 'center' }}>
                    <h2>Our Verdict</h2>
                    <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.2rem', lineHeight: '1.8' }}>
                        If you are looking for <strong>{comparison.shared_categories[0]}</strong>, both {toolA.name} and {toolB.name} are excellent choices.
                        However, {toolA.name} stands out for its specific focus on {toolA.categories[1] || toolA.primary_category}, while {toolB.name}
                        might be better if you need {toolB.categories[1] || "general capabilities"}.
                    </p>
                </section>

            </main>

            <footer style={{ padding: '2rem 0', textAlign: 'center', color: '#666', borderTop: '1px solid #262626' }}>
                <p>© 2025 AI Directory. All rights reserved.</p>
            </footer>
        </div>
    );
}
