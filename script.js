function createHeader() {
  const header = document.createElement('header');
  header.classList.add('header');
  const title = document.createElement('h1');
  title.classList.add('header__title');
  title.innerText = 'RSS Virtual Keyboard';

  document.body.appendChild(header);
  header.appendChild(title);
}

function createMain() {
  const main = document.createElement('main');
  main.classList.add('main');
  const textarea = document.createElement('textarea');
  textarea.classList.add('main__textarea');

  document.body.appendChild(main);
  main.appendChild(textarea);

  return main;
}

function createKey(value, additionalClass) {
  const keyboardKey = document.createElement('div');
  keyboardKey.classList.add('keyboard__key');

  if (additionalClass !== undefined) {
    keyboardKey.classList.add(additionalClass);
  }

  keyboardKey.textContent = value;

  return keyboardKey;
}

function createLine(keys) {
  const line = document.createElement('div');
  line.classList.add('keyboard__line');
  keys.forEach((k) => line.appendChild(k));

  return line;
}

function createLine1() {
  const keys = ['`', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '=']
    .map((k) => createKey(k));
  keys.push(createKey('Backspace', 'keyboard__key_backspace'));

  return createLine(keys);
}

function createLine2() {
  const keys = [];
  keys.push(createKey('Tab', 'keyboard__key_tab'));
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\']
    .map(createKey)
    .forEach((k) => keys.push(k));
  keys.push(createKey('Del', 'keyboard__key_del'));

  return createLine(keys);
}

function createLine3() {
  const keys = [];
  keys.push(createKey('CapsLock', 'keyboard__key_caps'));
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'']
    .map(createKey)
    .forEach((k) => keys.push(k));
  keys.push(createKey('Enter', 'keyboard__key_enter'));

  return createLine(keys);
}

function createLine4() {
  const keys = [];
  keys.push(createKey('Shift', 'keyboard__key_shift'));
  ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/']
    .map(createKey)
    .forEach((k) => keys.push(k));
  keys.push(createKey('Shift', 'keyboard__key_shift'));

  return createLine(keys);
}

function createLine5() {
  const keys = [];
  keys.push(createKey('Fn', 'keyboard__key_fn'));
  keys.push(createKey('Ctrl', 'keyboard__key_ctrl'));
  keys.push(createKey('Opt', 'keyboard__key_opt'));
  keys.push(createKey('Cmd', 'keyboard__key_cmd'));
  keys.push(createKey('', 'keyboard__key_space'));
  keys.push(createKey('Cmd', 'keyboard__key_cmd'));
  keys.push(createKey('Opt', 'keyboard__key_opt'));
  keys.push(createKey('\u2190'));
  const arrows = document.createElement('div');
  arrows.classList.add('keyboard__arrows');
  arrows.appendChild(createKey('\u2191'));
  arrows.appendChild(createKey('\u2193'));
  keys.push(arrows);
  keys.push(createKey('\u2192'));

  return createLine(keys);
}

function createKeyboard() {
  const main = document.querySelector('main');

  const keyboard = document.createElement('div');
  keyboard.classList.add('main__keyboard', 'keyboard');

  main.appendChild(keyboard);
  keyboard.appendChild(createLine1());
  keyboard.appendChild(createLine2());
  keyboard.appendChild(createLine3());
  keyboard.appendChild(createLine4());
  keyboard.appendChild(createLine5());
}

function createDescription() {
  const main = document.querySelector('main');

  const description = document.createElement('p');
  description.classList.add('main__description');
  description.innerText = 'The keyboard was created on Mac OS';
  main.appendChild(description);

  const language = document.createElement('p');
  language.classList.add('main__language');
  language.innerText = 'Change language: Ctrl + Space';
  main.appendChild(language);
}

createHeader();
createMain();
createKeyboard();
createDescription();

const keys = document.querySelectorAll('.keyboard__key');
const textarea = document.querySelector('.main__textarea');

let symbols = [];

keys.forEach((k) => {
  k.addEventListener('click', () => {
    if (k.matches('.keyboard__key_backspace')) {
      symbols.pop();
      textarea.value = symbols.join('');
    } else if (k.matches('.keyboard__key_space')) {
      symbols.push(' ');
      textarea.value = symbols.join('');
    } else if (k.matches('.keyboard__key_enter')) {
      symbols.push('\n');
      textarea.value = symbols.join('');
    } else if (k.matches('.keyboard__key_tab')) {
      symbols.push('  ');
      textarea.value = symbols.join('');
    } else if (k.matches('.keyboard__key_cmd, .keyboard__key_shift, .keyboard__key_ctrl, .keyboard__key_fn, .keyboard__key_opt, .keyboard__key_del')) {
      symbols.push('');
      textarea.value = symbols.join('');
    } else if (k.matches('.keyboard__key_caps')) {
      k.classList.toggle('active');
      symbols.push('');
      textarea.value = symbols.join('');
    } else {
      textarea.value += k.innerText;
      symbols = textarea.value.split('');
    }
  });
});
