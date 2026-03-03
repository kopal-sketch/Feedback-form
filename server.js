/**
 * Simple server to store feedback for analysis.
 * Saves each submission to data/feedback.json (append).
 * Run: node server.js
 * Serves the website at http://localhost:3000
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'feedback.json');

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]', 'utf8');
}

function readFeedback() {
  ensureDataFile();
  const raw = fs.readFileSync(DATA_FILE, 'utf8');
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function appendFeedback(payload) {
  const list = readFeedback();
  list.push({ id: Date.now().toString(36) + Math.random().toString(36).slice(2, 9), ...payload });
  fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2), 'utf8');
  return list.length;
}

const MIMES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.ico': 'image/x-icon',
  '.json': 'application/json'
};

const server = http.createServer((req, res) => {
  const url = req.url === '/' ? '/index.html' : req.url;
  const isApi = url === '/api/feedback' && req.method === 'POST';

  if (isApi) {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        appendFeedback(payload);
        res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify({ ok: true }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify({ ok: false, error: 'Invalid JSON' }));
      }
    });
    return;
  }

  const filePath = path.join(__dirname, url.split('?')[0]);
  const ext = path.extname(filePath);
  if (!path.resolve(filePath).startsWith(__dirname) || !fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    res.writeHead(404);
    res.end('Not found');
    return;
  }
  const mime = MIMES[ext] || 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': mime });
  res.end(fs.readFileSync(filePath));
});

ensureDataFile();
server.listen(PORT, () => {
  console.log(`POP Feedback running at http://localhost:${PORT}`);
  console.log(`Submissions saved to ${DATA_FILE}`);
});
