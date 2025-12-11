# AI Voice Agent (Leo - Pizza Shop Employee)

This is a real-time AI voice agent built with **Fastify**, **Twilio Media Streams**, and **OpenAI's Realtime API (GPT-4o Audio)**.

It acts as "Leo", an efficient pizza shop employee who takes orders, upsells Garlic Knots, and processes the final order into JSON format.

## Prerequisites

1.  **Node.js** (v18+)
2.  **OpenAI API Key** (Must have access to `gpt-4o-realtime-preview` model).
3.  **Twilio Account** & Phone Number.
4.  **Ngrok** (for local testing).

## Setup & Installation

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Configure Environment:**
    Rename the `.env.example` file (if present) or create a `.env` file with:
    ```env
    OPENAI_API_KEY=sk-proj-...  <-- Your Actual OpenAI Key
    PORT=5050
    ```

## Running Locally

1.  **Start the Server:**
    ```bash
    npm start
    # Server runs on http://localhost:5050
    ```

2.  **Expose to Internet (Ngrok):**
    In a separate terminal:
    ```bash
    ngrok http 5050
    ```
    Copy the forwarding URL (e.g., `https://a1b2-c3d4.ngrok-free.app`).

3.  **Configure Twilio:**
    - Go to your Twilio Console -> Phone Numbers -> Manage -> Active Numbers.
    - Click your phone number.
    - Under **Voice & Fax** -> **A Call Comes In**:
        - Select `Webhook`.
        - Paste your Ngrok URL appended with `/incoming-call`.
        - *Example:* `https://a1b2-c3d4.ngrok-free.app/incoming-call`
    - Save.

## Testing

Call your Twilio phone number. You should hear "Leo" greet you.

**Simulation Mode (No Cost):**
If you want to test the logic without spending money on calls:
```bash
npm run simulate
```
This runs a text-based version of the brain in your terminal.

## Project Structure

- `index.js`: Main server entry point. Handles WebSocket connections for Twilio and OpenAI.
- `system_prompt.js`: Defines the personality (Leo), menu, and business rules.
- `simulate.js`: A text-based mock for testing logic without audio.
