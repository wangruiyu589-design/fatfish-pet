// Tiny OpenAI-compatible mock used by tests/screenshots. Streams a fixed reply.
import http from 'node:http';
const port = Number(process.env.MOCK_PORT || 8799);
http.createServer((req, res) => {
  if (req.method !== 'POST' || !req.url.includes('/chat/completions')) {
    res.writeHead(404); res.end(); return;
  }
  let body = '';
  req.on('data', (chunk) => { body += chunk; });
  req.on('end', () => {
    let parsed = {};
    try { parsed = JSON.parse(body); } catch { /* ignore */ }
    if (parsed.stream) {
      res.writeHead(200, { 'content-type': 'text/event-stream' });
      res.write('data: ' + JSON.stringify({ choices: [{ delta: { content: '你好呀，' } }] }) + '\n\n');
      res.write('data: ' + JSON.stringify({ choices: [{ delta: { content: '我是本地测试模型。' } }] }) + '\n\n');
      res.write('data: [DONE]\n\n');
      res.end();
      return;
    }
    const content = JSON.stringify({ emotion: 'happy', action: 'nod', intent: 'none', line: '本地测试回复', moodDelta: { valence: 1, stress: 0 }, memory: '' });
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ choices: [{ message: { content } }] }));
  });
}).listen(port, '127.0.0.1', () => console.log('mock llm on ' + port));
