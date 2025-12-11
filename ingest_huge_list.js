const fs = require('fs');
const https = require('https');

const DATA_URL = 'https://raw.githubusercontent.com/lakey009/AI-Tools-List/main/AIToolsList.json';

// Simple keyword mapping for categories
const CATEGORY_KEYWORDS = {
    'writing': ['write', 'copy', 'essay', 'blog', 'text', 'story', 'editor'],
    'image generation': ['image', 'photo', 'drawing', 'art', 'picture', 'avatar'],
    'video generation': ['video', 'movie', 'film', 'clip', 'animation'],
    'audio': ['voice', 'speech', 'music', 'sound', 'podcast', 'audio'],
    'coding': ['code', 'programming', 'developer', 'sql', 'python', 'css'],
    'chatbot': ['chat', 'bot', 'conversation', 'assistant', 'gpt'],
    'productivity': ['productivity', 'workflow', 'automate', 'task', 'notion', 'sheet'],
    'marketing': ['marketing', 'ad', 'seo', 'social media', 'email', 'sales']
};

function determineCategories(description) {
    const cats = [];
    const lowerDesc = description.toLowerCase();

    for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
        if (keywords.some(k => lowerDesc.includes(k))) {
            cats.push(cat);
        }
    }

    if (cats.length === 0) cats.push('general ai');
    return cats.slice(0, 3); // Max 3 categories
}

// Helper to capitalize handles (e.g., "scrip-ai" -> "Scrip AI")
function formatName(handle) {
    return handle
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Add our High-Quality manual tools first so they don't get lost
const PREMIUM_TOOLS = [
    {
        "name": "ChatGPT",
        "link": "https://openai.com/chatgpt",
        "description": "Research, create, and automate tasks with the leader in AI.",
        "pricing_model": "Freemium",
        "categories": ["chatbot", "writing", "productivity"]
    },
    {
        "name": "Synthesia",
        "link": "https://synthesia.io",
        "description": "Create AI videos from text in minutes.",
        "pricing_model": "Paid",
        "categories": ["video generation", "marketing"]
    },
    {
        "name": "HeyGen",
        "link": "https://heygen.com",
        "description": "Produce studio-quality AI videos with custom avatars and voice cloning.",
        "pricing_model": "Paid",
        "categories": ["video generation", "marketing"]
    }
];

console.log('Fetching massive AI dataset...');

https.get(DATA_URL, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            const allTools = JSON.parse(data);
            console.log(`Downloaded ${allTools.length} tools.`);

            // Take top 500
            const toolsToProcess = allTools.slice(0, 500);

            const formattedTools = toolsToProcess.map(t => ({
                name: formatName(t.handle),
                link: t.website,
                description: t.description || "An AI tool for modern professionals.",
                categories: determineCategories(t.description || ""),
                pricing_model: "Unknown" // Dataset doesn't have pricing
            }));

            // Merge Premium Tools at the top
            const finalRawData = [...PREMIUM_TOOLS, ...formattedTools];

            fs.writeFileSync('./pSEO_Data/ai_tools_raw.json', JSON.stringify(finalRawData, null, 2));
            console.log(`Successfully saved ${finalRawData.length} tools to Raw Data.`);

            // Now trigger the enhancer (simulation)
            console.log('Run "node enhance_data.js" next to generate the pages.');

        } catch (e) {
            console.error('Error parsing JSON:', e);
        }
    });

}).on('error', (err) => {
    console.error('Error downloading data:', err);
});
