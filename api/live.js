// This runs securely on Vercel's backend!
export default async function handler(req, res) {
    // 1. Grab the secret API key from Vercel's Environment Variables
    const API_KEY = process.env.SPORTS_API_KEY;

    // 2. The exact URL for SportsAPI Pro
    const apiUrl = 'https://api.sportsapipro.com/v1/fixtures/live';

    try {
        // 3. Make the fetch request from the backend
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY // Securely injected!
            }
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();

        // 4. Send the data back to your frontend
        return res.status(200).json(data);

    } catch (error) {
        console.error("Backend fetch error:", error);
        return res.status(500).json({ error: 'Failed to fetch live sports data' });
    }
}
