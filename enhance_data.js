const fs = require('fs');

const rawData = JSON.parse(fs.readFileSync('./pSEO_Data/ai_tools_raw.json', 'utf8'));

const enhancedData = rawData.map(tool => {
    // 1. Generate SEO-friendly slug
    const slug = tool.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    // 2. Identify Primary Use Case (simple heuristic based on categories)
    const primaryCategory = tool.categories[0] || "General AI";

    // 3. Generate "Mad Libs" Title
    // Format: "Best [Category] Tool for [Target Audience] in 2026"
    const title = `Best ${primaryCategory} Tool in 2026: ${tool.name} Review`;

    // 4. Generate "vs" Competitors (Mock logic for demo)
    // Real world: You'd use an vector embedding to find nearest neighbors
    const competitors = rawData
        .filter(t => t.name !== tool.name && t.categories.some(c => tool.categories.includes(c)))
        .map(t => t.name)
        .slice(0, 3);

    // 5. Generate "Verdict" summary
    const verdict = `${tool.name} is a top-tier choice for users looking for ${tool.categories.join(', ')}. pricing starts at ${tool.pricing_model}.`;

    return {
        ...tool,
        slug,
        seo_title: title,
        primary_category: primaryCategory,
        competitors,
        verdict,
        last_updated: new Date().toISOString().split('T')[0]
    };
});

// 6. Generate "Versus" Pairings (Bidirectional)
const comparisons = [];
enhancedData.forEach((toolA) => {
    enhancedData.forEach((toolB) => {
        // Skip self-comparison
        if (toolA.slug === toolB.slug) return;

        // Only compare if they share at least one category to make it relevant
        const sharedCats = toolA.categories.filter(c => toolB.categories.includes(c));
        if (sharedCats.length > 0) {
            comparisons.push({
                slug: `${toolA.slug}-vs-${toolB.slug}`,
                toolA: toolA.slug,
                toolB: toolB.slug,
                shared_categories: sharedCats,
                title: `${toolA.name} vs ${toolB.name}: Which AI Tool is Better in 2026?`
            });
        }
    });
});

const finalOutput = {
    tools: enhancedData,
    comparisons: comparisons
};

fs.writeFileSync('./pSEO_Data/ai_tools_ready.json', JSON.stringify(finalOutput, null, 2));

console.log(`Successfully enriched ${enhancedData.length} tools.`);
console.log(`Generated ${comparisons.length} comparison pages.`);
console.log("Sample enriched tool:", enhancedData[0]);
