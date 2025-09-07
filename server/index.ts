import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = 3010;

interface GitHubUser {
    id: number;
    login: string;
    avatar_url: string;
    html_url: string;
    public_repos: number;
}

interface GitHubSearchResponse {
    total_count: number;
    items: Array<{ id:number; login: string; avatar_url: string; html_url: string }>;
}

interface GitHubUserDetails {
    public_repos: number;
}

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.get('/api/search_github_users', async (req, res) => {
    const query = req.query.q as string;
    if (!query) return res.status(400).json({ error: 'Missing query parameter' });
    const page = parseInt(req.query.page as string) || 1;
    try {
        const searchResponse = await fetch(
            `https://api.github.com/search/users?q=${query}&per_page=12&page=${page}`,
            { headers: { 'Authorization': `Bearer ${process.env.GITHUB_API_TOKEN}` } }
        );

        if (!searchResponse.ok) {
            const errData = await searchResponse.json();
            return res.status(searchResponse.status).json({ error: errData || 'GitHub API error' });
        }

        const searchData: GitHubSearchResponse = (await searchResponse.json()) as GitHubSearchResponse;

        const users: GitHubUser[] = await Promise.all(
            searchData.items.map(async (user) => {
                const detailsResponse = await fetch(`https://api.github.com/users/${user.login}`, {
                    headers: { 'Authorization': `Bearer ${process.env.GITHUB_API_TOKEN}` },
                });

                const details = (await detailsResponse.json()) as GitHubUserDetails;

                return {
                    id: user.id,
                    login: user.login,
                    avatar_url: user.avatar_url,
                    html_url: user.html_url,
                    public_repos: details.public_repos,
                };
            })
        );

        res.json({ total_count: searchData.total_count, users });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));
