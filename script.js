const input = document.getElementById('inputText');
const output = document.getElementById('outputText');

function callAPI(mode) {
  fetch('/api/chatgpt', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ prompt: input.value, mode: mode })
  })
  .then(res => res.json())
  .then(data => {
    output.value = data.result || "GPT no respondió.";
  })
  .catch(err => {
    output.value = "Error: " + err.message;
  });
}

document.getElementById('cleanBtn').addEventListener('click', () => callAPI('clean'));
document.getElementById('restructureBtn').addEventListener('click', () => callAPI('restructure'));
document.getElementById('professionalizeBtn').addEventListener('click', () => callAPI('professionalize'));

