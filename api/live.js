export default async function handler(req, res) {
    // Fetch the secret key from Vercel
    const API_KEY = process.env.SPORTS_API_KEY;

    // The official V2 Football Live endpoint
    const apiUrl = 'https://api.sportsapipro.com/v2/football/live';

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY // Required header format
            }
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();

        // Send the JSON response to the frontend
        return res.status(200).json(data);

    } catch (error) {
        console.error("Backend fetch error (Live):", error);
        return res.status(500).json({ error: 'Failed to fetch live sports data' });
    }
}
