import { redirect } from 'next/navigation';
import data from '../../../lib/data.json';

export async function GET(request, { params }) {
    const { slug } = await params;

    // Find the tool by slug
    const tool = data.tools.find(t => t.slug === slug);

    if (tool && tool.link) {
        // Logic: If we had an affiliateID, we would append it here.
        // e.g. const finalLink = `${tool.link}?ref=my_affiliate_id`;
        return redirect(tool.link);
    }

    // Fallback if not found
    return redirect('/');
}
