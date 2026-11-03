// Standalone renderer bootstrap: provides the Harness client-module contract
// (window.__ModuleLoader__ + a minimal ctx) so we can reuse the built client.js.
import React from 'react'
import { createRoot } from 'react-dom/client'

class Boundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null } }
  static getDerivedStateFromError(error) { return { error } }
  componentDidCatch(error, info) {
    const text = 'BOUNDARY: ' + (error && error.message) + '\n' + String(info && info.componentStack || '').slice(0, 1200)
    console.error(text)
    const pre = document.getElementById('boot-log')
    if (pre) pre.textContent = text
  }
  render() { return this.state.error ? null : this.props.children }
}

window.React = React
window.__STANDALONE_REACT__ = React

window.__ModuleLoader__ = {
  load({ id, factory }) {
    const requireShim = (name) => {
      if (name === 'react') return React
      throw new Error('Unknown standalone module: ' + name)
    }
    const mounts = []
    const ctx = {
      get() { return undefined },
      effect(fn) {
        try {
          const value = fn()
          return typeof value === 'function' ? value : () => {}
        } catch { return () => {} }
      },
      slots: {
        inject(_name, fn) { try { return fn() } catch { return () => {} } },
        register(_name, options, component) {
          const Component = typeof options === 'function' ? options : component
          const host = document.createElement('div')
          host.id = 'fatfish-standalone-slot'
          host.style.position = 'fixed'
          host.style.inset = '0'
          host.style.zIndex = '2147483000'
          host.style.pointerEvents = 'auto'
          document.body.appendChild(host)
          const root = createRoot(host)
          root.render(React.createElement(Boundary, null, React.createElement(Component, {})))
          mounts.push(root)
          return () => { try { root.unmount() } catch { /* ignore */ } }
        },
      },
    }
    try {
      const mod = factory(requireShim)
      window.__FATFISH_STANDALONE__ = { id, module: mod, ctx, mounts }
      mod.apply(ctx)
    } catch (error) {
      console.error('[fatfish] standalone apply failed', error)
    }
  },
}

// ---------------------------------------------------------------------------
// Desktop-overlay shell: dock, click-through, and window controls.
// Only active in the Electron overlay window, not in the setup window.
// ---------------------------------------------------------------------------
function installDesktopShell() {
  const bridge = window.fatfishPet
  if (!bridge || bridge.windowKind !== 'overlay') return
  bridge.ready()

  const dock = document.createElement('div')
  dock.id = 'fatfish-dock'
  dock.setAttribute('data-ffish-ui', 'dock')
  dock.innerHTML = `
    <div class="ffish-dock-brand" title="大肥鱼">
      <img src="/icon.png" alt="" draggable="false" />
      <span>大肥鱼</span>
    </div>
    <div class="ffish-dock-actions">
      <button type="button" data-action="setup">模型设置</button>
      <button type="button" data-action="hide">隐藏</button>
      <button type="button" data-action="quit">退出</button>
    </div>
  `
  document.body.appendChild(dock)

  const interactiveSelector = [
    '#fatfish-dock',
    '.ffish-hit',
    '.ffish-toolbar',
    '.ffish-tool',
    '.ffish-menu',
    '.ffish-chat',
    '.ffish-agent-ask',
    '.ffish-settings',
    '.ffish-actions-panel',
    '.ffish-bubble',
    '.ffish-help',
    '.ffish-lock',
    '.ffish-persona-modal',
    '.ffish-soul',
    'button',
    'input',
    'textarea',
    'select',
    'a',
    '[role="button"]',
    '[data-ffish-ui]',
  ].join(',')

  let ignoring = true
  let lastCheck = 0
  function setIgnoring(next) {
    if (next === ignoring) return
    ignoring = next
    bridge.setClickThrough(next)
  }
  function interactiveAt(x, y) {
    const el = document.elementFromPoint(x, y)
    if (!el) return false
    return !!el.closest(interactiveSelector)
  }
  function onMove(event) {
    const now = performance.now()
    if (now - lastCheck < 45) return
    lastCheck = now
    setIgnoring(!interactiveAt(event.clientX, event.clientY))
  }
  window.addEventListener('pointermove', onMove, { passive: true })
  window.addEventListener('mousemove', onMove, { passive: true })
  window.addEventListener('pointerleave', () => setIgnoring(true), { passive: true })
  window.addEventListener('blur', () => setIgnoring(true), { passive: true })

  dock.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-action]')
    if (!button) return
    event.preventDefault()
    event.stopPropagation()
    const action = button.getAttribute('data-action')
    if (action === 'setup') bridge.openSetup()
    else if (action === 'hide') bridge.hideOverlay()
    else if (action === 'quit') bridge.quit()
  })
  bridge.setClickThrough(true)
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', installDesktopShell)
} else {
  installDesktopShell()
}
