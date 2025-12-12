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
    'productivity': ['productivity', 'workflow', 'task', 'notion', 'sheet'],
    'marketing': ['marketing', 'ad', 'seo', 'social media', 'email', 'sales'],
    'automation': ['automate', 'automation', 'workflow', 'integrate', 'agent'],
    'design': ['design', 'ui', 'ux', 'graphic', 'logo', 'template'],
    'research': ['research', 'analysis', 'data', 'academic', 'paper'],
    'analytics': ['analytics', 'metrics', 'tracking', 'insight'],
    'customer service': ['support', 'customer', 'service', 'crm', 'help desk']
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
        "name": "Claude",
        "link": "https://anthropic.com/claude",
        "description": "The most secure and capable AI assistant from Anthropic.",
        "pricing_model": "Freemium",
        "categories": ["chatbot", "writing", "coding"]
    },
    {
        "name": "Gemini",
        "link": "https://deepmind.google/technologies/gemini/",
        "description": "Google's most capable AI model, built from the ground up to be multimodal.",
        "pricing_model": "Freemium",
        "categories": ["chatbot", "writing", "coding"]
    },
    {
        "name": "Gamma",
        "link": "https://gamma.app",
        "description": "A new medium for presenting ideas. Powered by AI.",
        "pricing_model": "Freemium",
        "categories": ["productivity", "writing", "marketing"]
    },
    {
        "name": "Canva",
        "link": "https://canva.com",
        "description": "Design for everyone. Now with powerful AI magic.",
        "pricing_model": "Freemium",
        "categories": ["image generation", "marketing", "productivity"]
    },
    {
        "name": "Grammarly",
        "link": "https://grammarly.com",
        "description": "Your AI writing partner that helps you find the words you need.",
        "pricing_model": "Freemium",
        "categories": ["writing", "productivity"]
    },
    {
        "name": "Granola",
        "link": "https://granola.so",
        "description": "The AI notepad for meetings. Take better notes with less effort.",
        "pricing_model": "Paid",
        "categories": ["productivity", "writing"]
    },
    {
        "name": "Perplexity",
        "link": "https://perplexity.ai",
        "description": "The AI search engine that gives you direct answers with citations.",
        "pricing_model": "Freemium",
        "categories": ["research", "chatbot", "productivity"]
    },
    {
        "name": "n8n",
        "link": "https://n8n.io",
        "description": "Workflow automation for technical people. Fair-code distribution.",
        "pricing_model": "Freemium",
        "categories": ["automation", "coding", "productivity"]
    },
    {
        "name": "Revmatics",
        "link": "https://revmatics.ai",
        "description": "AI-driven revenue acceleration and sales intelligence.",
        "pricing_model": "Paid",
        "categories": ["marketing", "sales", "analytics"]
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
