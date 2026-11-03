// Drives the installed Electron app through CDP: choose a persona, save it,
// then verify the pet's soul is persisted in localStorage.
const targets = await (await fetch('http://127.0.0.1:9223/json')).json();
const page = targets.find((item) => item.type === 'page');
if (!page) { console.log('NO_PAGE'); process.exit(1); }
const ws = new WebSocket(page.webSocketDebuggerUrl);
let id = 0;
const pending = new Map();
function send(method, params) {
  return new Promise((resolve, reject) => {
    const messageId = ++id;
    pending.set(messageId, { resolve, reject });
    ws.send(JSON.stringify({ id: messageId, method, params }));
  });
}
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.id && pending.has(data.id)) {
    const { resolve, reject } = pending.get(data.id);
    pending.delete(data.id);
    if (data.error) reject(new Error(data.error.message)); else resolve(data.result);
  }
};
await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });
async function evaluate(expression) {
  const result = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
  return result && result.result ? result.result.value : undefined;
}
try {
  await send('Runtime.enable');
  console.log('TITLE', await evaluate('document.title'));
  console.log('MODAL', await evaluate("document.body.innerText.includes('你想让大肥鱼成为怎样的她')"));
  const clickedPersona = await evaluate(`(() => {
    const wanted = '傲娇嘴硬';
    const elements = Array.from(document.querySelectorAll('button, div, span, p'));
    const leaf = elements.find((element) => element.textContent && element.textContent.trim() === wanted);
    if (!leaf) return 'not_found';
    let node = leaf;
    for (let i = 0; i < 6 && node; i += 1) {
      if (node.tagName === 'BUTTON' || node.getAttribute('role') === 'button' || node.onclick) {
        node.click();
        return 'clicked_' + node.tagName;
      }
      node = node.parentElement;
    }
    leaf.click();
    return 'clicked_leaf';
  })()`);
  console.log('CLICK_PERSONA', clickedPersona);
  await new Promise((resolve) => setTimeout(resolve, 1200));
  const clickedSave = await evaluate(`(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const save = buttons.find((button) => button.textContent && button.textContent.includes('保存这个性格'));
    if (!save) return 'no_save_button';
    save.click();
    return 'clicked_save';
  })()`);
  console.log('CLICK_SAVE', clickedSave);
  await new Promise((resolve) => setTimeout(resolve, 1800));
  const state = await evaluate(`(() => {
    const raw = localStorage.getItem('dsh.fatfish-pet.state.v1');
    if (!raw) return { stored: false };
    const data = JSON.parse(raw);
    return { stored: true, configured: !!(data.soul && data.soul.configured), persona: data.soul && data.soul.persona, name: data.name || '' };
  })()`);
  console.log('STATE', JSON.stringify(state));
  const modalGone = await evaluate("!document.body.innerText.includes('你想让大肥鱼成为怎样的她')");
  console.log('MODAL_GONE', modalGone);
} catch (error) {
  console.log('CDP_ERROR', error && error.message);
  process.exitCode = 1;
} finally {
  ws.close();
}
