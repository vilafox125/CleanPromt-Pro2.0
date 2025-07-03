function removeEmojis(text) {
  return text.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF]|[\uFE00-\uFE0F])/g, '');
}

function restructureText(text) {
  return text.replace(/[\#\]\[\*\$]/g, '').replace(/\s{2,}/g, ' ').trim();
}

document.getElementById("cleanBtn").addEventListener("click", () => {
  const input = document.getElementById("inputText").value;
  document.getElementById("outputText").value = removeEmojis(input);
});

document.getElementById("restructureBtn").addEventListener("click", () => {
  const input = document.getElementById("inputText").value;
  document.getElementById("outputText").value = restructureText(input);
});
