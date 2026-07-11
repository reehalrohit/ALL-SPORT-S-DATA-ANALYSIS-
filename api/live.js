export default async function handler(req, res) {
    // Fetch the secret key from Vercel Environment Variables
    const API_KEY = process.env.SPORTDB_API_KEY;

    // The SportDB Flashscore Live Football endpoint
    const apiUrl = 'https://api.sportdb.dev/api/flashscore/football/live';

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': API_KEY // Updated header format
            }
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();

        // Send the JSON response to the frontend
        return res.status(200).json(data);

    } catch (error) {
        console.error("Backend fetch error (Flashscore Live):", error);
        return res.status(500).json({ error: 'Failed to fetch live sports data' });
    }
}
