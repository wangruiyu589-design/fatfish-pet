// Standalone host integration tests: mocked OpenAI-compatible model + permission tools.
// Run: node test-standalone.mjs
import http from 'node:http';
import path from 'node:path';
import os from 'node:os';
import assert from 'node:assert/strict';
import { promises as fsp, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { startServer, runAgentTool, safePath, loadConfig } from './server.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONFIG_PATH = path.join(__dirname, 'config.json');
const originalConfig = existsSync(CONFIG_PATH) ? readFileSync(CONFIG_PATH, 'utf8') : null;
const workspace = await fsp.mkdtemp(path.join(os.tmpdir(), 'fatfish-ws-'));
await fsp.writeFile(path.join(workspace, 'package.json'), JSON.stringify({ name: 'demo', version: '1.2.3' }), 'utf8');
const results = [];
function check(name, fn) {
  try { fn(); results.push({ ok: true, name }); console.log('PASS ' + name); }
  catch (error) { results.push({ ok: false, name, error: String(error && error.message || error) }); console.log('FAIL ' + name + ' :: ' + (error && error.message || error)); }
}
async function checkAsync(name, fn) {
  try { await fn(); results.push({ ok: true, name }); console.log('PASS ' + name); }
  catch (error) { results.push({ ok: false, name, error: String(error && error.message || error) }); console.log('FAIL ' + name + ' :: ' + (error && error.message || error)); }
}

// ---- Mock OpenAI-compatible model -----------------------------------------
const responses = [];
let streamText = '你好，我是测试模型。';
const mock = http.createServer(async (req, res) => {
  if (req.method !== 'POST' || !req.url.includes('/chat/completions')) { res.writeHead(404); res.end(); return; }
  let body = '';
  req.on('data', (chunk) => { body += chunk; });
  req.on('end', () => {
    let parsed = {};
    try { parsed = JSON.parse(body); } catch { /* ignore */ }
    if (parsed.stream) {
      res.writeHead(200, { 'content-type': 'text/event-stream' });
      for (const piece of [streamText.slice(0, 4), streamText.slice(4)]) {
        res.write('data: ' + JSON.stringify({ choices: [{ delta: { content: piece } }] }) + '\n\n');
      }
      res.write('data: [DONE]\n\n');
      res.end();
      return;
    }
    const content = responses.length ? responses.shift() : '{"ok":true}';
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ choices: [{ message: { content } }] }));
  });
});
await new Promise((resolve) => mock.listen(0, '127.0.0.1', resolve));
const mockPort = mock.address().port;
writeFileSync(CONFIG_PATH, JSON.stringify({
  provider: 'mock', baseUrl: 'http://127.0.0.1:' + mockPort + '/v1', apiKey: 'test-key',
  model: 'mock-model', models: ['mock-model'], workspace,
}, null, 2), 'utf8');

let host = null;
try {
  host = await startServer(0);
  const base = host.url;
  const json = async (method, pathname, body) => {
    const response = await fetch(base + pathname, { method, headers: body ? { 'content-type': 'application/json' } : {}, body: body ? JSON.stringify(body) : undefined });
    return { status: response.status, data: await response.json() };
  };

  await checkAsync('health reports ai true', async () => {
    const { status, data } = await json('GET', '/fatfish-pet/health');
    assert.equal(status, 200); assert.equal(data.ok, true); assert.equal(data.ai, true);
  });
  await checkAsync('models returns configured model', async () => {
    const { status, data } = await json('GET', '/fatfish-pet/models');
    assert.equal(status, 200); assert.equal(data.providers[0].models[0].id, 'mock-model');
  });
  await checkAsync('chat streams meta/delta/done', async () => {
    const response = await fetch(base + '/fatfish-pet/chat', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ message: 'hi', pet: { name: '大肥鱼' } }) });
    assert.equal(response.status, 200);
    const text = await response.text();
    assert.match(text, /"type":"meta"/);
    assert.match(text, /"type":"delta"/);
    assert.match(text, /"type":"done"/);
    assert.ok(text.includes('你好'));
  });
  await checkAsync('brain returns structured reflection', async () => {
    responses.push(JSON.stringify({ emotion: 'happy', action: 'nod', intent: 'none', line: '测试台词', moodDelta: { valence: 2, stress: 0 }, memory: '测试记忆' }));
    const { status, data } = await json('POST', '/fatfish-pet/brain', { profile: { name: 'x' }, event: { type: 'test' } });
    assert.equal(status, 200); assert.equal(data.ok, true); assert.equal(data.brain.emotion, 'happy');
  });
  await checkAsync('reflect returns trait deltas', async () => {
    responses.push(JSON.stringify({ traitDeltas: { O: 1, C: 0, E: 0, A: 1, N: -1 }, moodNudge: { valence: 2, stress: -2 }, beliefs: ['测试'], selfNarrative: '测试', behaviorHints: [] }));
    const { status, data } = await json('POST', '/fatfish-pet/reflect', { profile: { name: 'x' }, recent: [] });
    assert.equal(status, 200); assert.equal(data.ok, true); assert.equal(data.reflection.selfNarrative, '测试');
  });
  await checkAsync('agent says then finishes', async () => {
    responses.push(JSON.stringify({ thought: 'greet', tool: 'say', args: { text: '测试回复', emotion: 'happy' } }));
    responses.push(JSON.stringify({ thought: 'done', tool: 'finish', args: { summary: 'ok' } }));
    const { status, data } = await json('POST', '/fatfish-pet/agent', { goal: '打个招呼', permission: 0, workspace, state: {} });
    assert.equal(status, 200); assert.equal(data.ok, true);
    assert.ok(Array.isArray(data.actions));
    assert.ok(data.actions.some((item) => item.kind === 'say'));
  });

  // ---- Permission tools ---------------------------------------------------
  await checkAsync('read_file allowed at permission 1', async () => {
    const actions = [];
    const result = await runAgentTool({ tool: 'read_file', args: { path: 'package.json' } }, actions, { permission: 1, root: workspace });
    assert.equal(result.ok, true); assert.ok(result.content.includes('demo'));
  });
  await checkAsync('write_file denied at permission 1', async () => {
    const result = await runAgentTool({ tool: 'write_file', args: { path: 'a.txt', content: 'x' } }, [], { permission: 1, root: workspace });
    assert.equal(result.ok, false); assert.equal(result.error, 'permission_denied');
  });
  await checkAsync('write_file allowed at permission 2', async () => {
    const actions = [];
    const result = await runAgentTool({ tool: 'write_file', args: { path: 'nested/a.txt', content: 'hello' } }, actions, { permission: 2, root: workspace });
    assert.equal(result.ok, true);
    assert.equal(await fsp.readFile(path.join(workspace, 'nested', 'a.txt'), 'utf8'), 'hello');
  });
  await checkAsync('run_command denied at permission 2', async () => {
    const result = await runAgentTool({ tool: 'run_command', args: { command: 'echo hi' } }, [], { permission: 2, root: workspace });
    assert.equal(result.ok, false); assert.equal(result.error, 'permission_denied');
  });
  await checkAsync('run_command allowed at permission 3', async () => {
    const actions = [];
    const result = await runAgentTool({ tool: 'run_command', args: { command: 'echo fatfish' } }, actions, { permission: 3, root: workspace });
    assert.equal(result.ok, true); assert.ok(String(result.stdout).includes('fatfish'));
  });
  await checkAsync('path traversal rejected', async () => {
    assert.equal(safePath(workspace, '../outside.txt'), null);
    const result = await runAgentTool({ tool: 'read_file', args: { path: '../outside.txt' } }, [], { permission: 1, root: workspace });
    assert.equal(result.ok, false); assert.equal(result.error, 'path_outside_workspace');
  });
  await checkAsync('workspace missing -> tools unavailable', async () => {
    const result = await runAgentTool({ tool: 'read_file', args: { path: 'package.json' } }, [], { permission: 1, root: '' });
    assert.equal(result.ok, false); assert.equal(result.error, 'workspace_not_configured');
  });
} catch (error) {
  console.log('FATAL ' + (error && error.stack || error));
  results.push({ ok: false, name: 'fatal', error: String(error && error.message || error) });
} finally {
  if (host && host.server) host.server.close();
  mock.close();
  if (originalConfig !== null) writeFileSync(CONFIG_PATH, originalConfig, 'utf8');
  else { try { await fsp.unlink(CONFIG_PATH); } catch { /* ignore */ } }
  await fsp.rm(workspace, { recursive: true, force: true }).catch(() => {});
}

const passed = results.filter((item) => item.ok).length;
console.log('\nSUMMARY ' + passed + '/' + results.length + ' passed');
if (passed !== results.length) process.exitCode = 1;
