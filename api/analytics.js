export default async function handler(req, res) {
    const API_KEY = process.env.SPORTDB_API_KEY;

    // The SportDB Transfermarkt Player Stats endpoint (e.g., 28003 is Lionel Messi)
    const apiUrl = 'https://api.sportdb.dev/api/transfermarkt/players/28003/stats';

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': API_KEY 
            }
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        return res.status(200).json(data);

    } catch (error) {
        console.error("Backend fetch error (Transfermarkt):", error);
        return res.status(500).json({ error: 'Failed to fetch player stats' });
    }
}
