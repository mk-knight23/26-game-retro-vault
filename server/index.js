import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Helper to read/write JSON files
const readData = (file) => {
    const filePath = path.join(__dirname, 'data', file);
    if (!fs.existsSync(filePath)) return [];
    try {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (e) {
        return [];
    }
};

const writeData = (file, data) => {
    const filePath = path.join(__dirname, 'data', file);
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// === GUESTBOOK API ===
app.get('/api/guestbook', (req, res) => {
    const entries = readData('guestbook.json');
    res.json(entries.slice(-50).reverse()); // Return last 50 entries, newest first
});

app.post('/api/guestbook', (req, res) => {
    const { name, message } = req.body;
    if (!name || !message) {
        return res.status(400).json({ error: 'Name and message are required' });
    }
    const entries = readData('guestbook.json');
    const newEntry = {
        id: Date.now(),
        name,
        message,
        timestamp: new Date().toISOString()
    };
    entries.push(newEntry);
    writeData('guestbook.json', entries);
    res.status(201).json(newEntry);
});

// === LEADERBOARD API ===
app.get('/api/leaderboard/:game', (req, res) => {
    const { game } = req.params;
    const allScores = readData('leaderboard.json');
    const gameScores = allScores[game] || [];
    res.json(gameScores.sort((a, b) => b.score - a.score).slice(0, 10)); // Top 10
});

app.post('/api/leaderboard/:game', (req, res) => {
    const { game } = req.params;
    const { player, score } = req.body;
    if (!player || score === undefined) {
        return res.status(400).json({ error: 'Player and score are required' });
    }
    const allScores = readData('leaderboard.json');
    if (!allScores[game]) allScores[game] = [];
    allScores[game].push({
        player,
        score,
        timestamp: new Date().toISOString()
    });
    writeData('leaderboard.json', allScores);
    res.status(201).json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Retro Vault backend running on http://localhost:${PORT}`);
});
