import data from '../lib/data.json';

export const dynamic = 'force-static';

export default function sitemap() {
    const tools = data.tools.map((tool) => ({
        url: `https://aitools2026.netlify.app/${tool.slug}`,
        lastModified: tool.last_updated || new Date().toISOString(),
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    return [
        {
            url: 'https://aitools2026.netlify.app',
            lastModified: new Date().toISOString(),
            changeFrequency: 'daily',
            priority: 1,
        },
        ...tools,
    ];
}
