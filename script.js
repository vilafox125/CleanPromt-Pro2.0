function removeEmojis(text) {
  return text.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF]|\u2600-\u26FF|\u200D|\uFE0F)/g, '');
}

function restructureText(text) {
  return text.replace(/[#\]\[\*\$%&<>]/g, '');
}

document.getElementById('cleanBtn').addEventListener('click', () => {
  const input = document.getElementById('inputText').value;
  document.getElementById('outputText').value = removeEmojis(input);
});

document.getElementById('restructureBtn').addEventListener('click', () => {
  const input = document.getElementById('inputText').value;
  document.getElementById('outputText').value = restructureText(input);
});

document.getElementById('copyBtn').addEventListener('click', () => {
  const output = document.getElementById('outputText');
  output.select();
  document.execCommand('copy');
  alert('Texto copiado al portapapeles.');
});

document.getElementById('aiBtn').addEventListener('click', () => {
  document.getElementById('outputText').value = "🤖 Work in process... Coming soon.";
});
