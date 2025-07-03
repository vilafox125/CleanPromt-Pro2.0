fetch('/api/chatgpt', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ prompt: input })
})
.then(response => response.json())
.then(data => {
  outputArea.value = data.result || "Error: no response.";
})
.catch(error => {
  outputArea.value = "Error: " + error.message;
});

