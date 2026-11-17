const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

test('Full/Short toggles visibility; Copy always preserves the complete source', () => {
  const listeners = [];
  const copied = [];
  const full = {
    hidden: true,
    textContent: 'values = [1, 2, 3]\nprint(sum(values))\n# <tag>& café\u00a0',
    innerText: '',
    hasAttribute: (name) => name === 'data-code-full',
  };
  const short = { hidden: false, textContent: 'print(sum(values))' };
  const box = {
    querySelector: (selector) => selector === '[data-code-full]' ? full : short,
  };
  const attributes = {};
  const toggle = {
    textContent: 'Full',
    closest: (selector) => selector === '[data-code-toggle]' ? toggle : box,
    setAttribute: (name, value) => { attributes[name] = value; },
  };
  const copy = {
    dataset: { copyFrom: '[data-code-full]' },
    classList: { add() {}, remove() {} },
    closest: (selector) => selector === '[data-code-toggle]' ? null
      : selector === '[data-copy-scope]' ? box : copy,
  };
  const browser = {
    document: {
      addEventListener: (name, callback) => { if (name === 'click') listeners.push(callback); },
      getElementById: () => null,
    },
    navigator: { clipboard: { writeText: (text) => { copied.push(text); return Promise.resolve(); } } },
    setTimeout: () => 0,
    clearTimeout() {},
  };
  browser.window = browser;
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../assets/js/site.js'), 'utf8'), browser);
  const click = (target) => listeners.forEach((callback) => callback({ target }));

  click(copy);
  assert.equal(copied.at(-1), full.textContent);
  click(toggle);
  assert.equal(full.hidden, false);
  assert.equal(short.hidden, true);
  assert.equal(toggle.textContent, 'Short');
  assert.equal(attributes['aria-expanded'], 'true');
  click(copy);
  assert.equal(copied.at(-1), full.textContent);
  click(toggle);
  assert.equal(full.hidden, true);
  assert.equal(short.hidden, false);
  assert.equal(toggle.textContent, 'Full');
  assert.equal(attributes['aria-expanded'], 'false');
  click(copy);
  assert.deepEqual(copied, [full.textContent, full.textContent, full.textContent]);

  box.querySelector = () => ({ innerText: 'plain\u00a0text', hasAttribute: () => false });
  copy.dataset.copyFrom = 'pre';
  click(copy);
  assert.equal(copied.at(-1), 'plain text');
});
