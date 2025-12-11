import data from '../../../lib/data.json';
import RedirectClient from './RedirectClient';

// Server Component for Static Export
export async function generateStaticParams() {
    return data.tools.map((tool) => ({
        slug: tool.slug,
    }));
}

export default async function RedirectPage({ params }) {
    const { slug } = await params;
    const tool = data.tools.find((t) => t.slug === slug);
    const destination = tool ? tool.link : '/';

    return <RedirectClient destination={destination} />;
}
