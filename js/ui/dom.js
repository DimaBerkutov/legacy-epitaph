export function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, '&#39;');
}

export function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [key, val] of Object.entries(attrs)) {
    if (val == null || val === false) continue;
    if (key === 'class') node.className = val;
    else if (key === 'dataset') Object.assign(node.dataset, val);
    else if (key === 'html') node.innerHTML = val;
    else if (key.startsWith('on') && typeof val === 'function') {
      node.addEventListener(key.slice(2).toLowerCase(), val);
    } else node.setAttribute(key, val);
  }
  for (const child of [].concat(children)) {
    if (child == null) continue;
    node.append(child.nodeType ? child : document.createTextNode(String(child)));
  }
  return node;
}

export function clear(container) {
  container.replaceChildren();
}

export function mount(container, node) {
  clear(container);
  container.append(...[].concat(node).filter(Boolean));
}