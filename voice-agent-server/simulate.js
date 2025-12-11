import readline from 'readline';
import { SYSTEM_PROMPT } from './system_prompt.js';

// MOCK INTELLIGENCE (Since we don't have an OpenAI Key in env yet)
// This simulates how the "Brain" processes the conversation state.
class MockBrain {
    constructor() {
        this.history = [];
        this.state = 'GREETING'; // GREETING, ORDERING, UPSELL, CONFIRM
        this.order = [];
    }

    async process(input) {
        const text = input.toLowerCase();

        // 1. Greeting Phase
        if (this.state === 'GREETING') {
            this.state = 'ORDERING';
            return "Thanks for calling Antigravity Pizza, this is Leo! What can I make for you?";
        }

        // 2. Ordering Logic (Regex-based for demo)
        if (text.includes('pepperoni')) {
            this.order.push({ name: 'Pepperoni Pizza', price: 14 });
            this.state = 'UPSELL';
            return "One Pepperoni coming up. Would you like our famous Garlic Knots with that for just $5?";
        }

        if (text.includes('cheese')) {
            this.order.push({ name: 'Cheese Pizza', price: 12 });
            this.state = 'UPSELL';
            return "Got a Cheese Pizza. Would you like to add some Garlic Knots for $5?";
        }

        // 3. Upsell Response
        if (this.state === 'UPSELL') {
            if (text.includes('yes') || text.includes('sure') || text.includes('ok')) {
                this.order.push({ name: 'Garlic Knots', price: 5 });
                this.state = 'CONFIRM';
                return "Awesome, I threw those knots in. Anything else to drink maybe?";
            }
            if (text.includes('no')) {
                this.state = 'CONFIRM';
                return "No worries! Anything else to drink?";
            }
        }

        // 4. Closing
        if (this.state === 'CONFIRM' || text.includes('that\'s it') || text.includes('done')) {
            const total = this.order.reduce((sum, item) => sum + item.price, 0);
            const json = JSON.stringify({ items: this.order, total });
            return `Alright! I have that order locked in, total is $${total}. It'll be about 20 mins.
<ORDER_CONFIRMED>
${json}
</ORDER_CONFIRMED>`;
        }

        return "Sorry, I missed that. Could you say it again? (Try ordering a 'Pepperoni Pizza')";
    }
}

// TERMINAL INTERFACE
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const brain = new MockBrain();

console.log("\n--- VOICE AGENT SIMULATOR (Text Mode) ---");
console.log("Type 'start' to call the pizza shop...\n");

rl.on('line', async (line) => {
    const response = await brain.process(line);
    console.log(`\nLeo (AI): ${response}\n`);

    if (response.includes('<ORDER_CONFIRMED>')) {
        console.log("--- CALL ENDED: ORDER SENT TO POS SYSTEM ---");
        process.exit(0);
    }
});

// Kickoff
brain.process('start').then(res => console.log(`Leo (AI): ${res}\n`));
