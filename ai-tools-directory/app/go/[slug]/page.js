'use client';

import { useEffect } from 'react';
import { notFound } from 'next/navigation';
import data from '../../../lib/data.json';

export default function RedirectPage({ params }) {
    // Unwrapping params for Next.js 15+ is async usually, but in client component we might need to be careful.
    // Actually simplest way is to find the slug from data matching the path or pass it in.
    // But strictly speaking, static export needs params prop.

    useEffect(() => {
        // We need to resolve the promise of params or access it directly if provided by layout
        // For safety in 'use client', let's parse window.location or assume params is passed.

        const resolveRedirect = async () => {
            const resolvedParams = await params;
            const slug = resolvedParams.slug;
            const tool = data.tools.find(t => t.slug === slug);

            if (tool && tool.link) {
                window.location.href = tool.link;
            } else {
                window.location.href = '/';
            }
        };

        resolveRedirect();
    }, [params]);

    return (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a', color: 'white' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>Redirecting to official site...</h2>
                <p>Please wait.</p>
            </div>
        </div>
    );
}

// We MUST generate static params for every tool for this to work in 'export' mode
export async function generateStaticParams() {
    return data.tools.map((tool) => ({
        slug: tool.slug,
    }));
}
