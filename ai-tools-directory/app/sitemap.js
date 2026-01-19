import data from '../lib/data.json';

export default function sitemap() {
    const tools = data.tools.map((tool) => ({
        url: `https://aitools2026.netlify.app/${tool.slug}`,
        lastModified: tool.last_updated || new Date().toISOString(),
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    const comparisons = (data.comparisons || []).map((comp) => ({
        url: `https://aitools2026.netlify.app/compare/${comp.slug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.6,
    }));

    return [
        {
            url: 'https://aitools2026.netlify.app',
            lastModified: new Date().toISOString(),
            changeFrequency: 'daily',
            priority: 1,
        },
        ...tools,
        ...comparisons,
    ];
}
