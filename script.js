async function professionalizePrompt() {
  const input = document.getElementById('inputText').value;
  const output = document.getElementById('outputText');

  if (!input.trim()) {
    output.value = "Please enter a prompt first.";
    return;
  }

  output.value = "Professionalizing...";

  try {
    const response = await fetch('/api/chatgpt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt: input })
    });

    const data = await response.json();

    if (data.result) {
      output.value = data.result;
    } else {
      output.value = "No response from API.";
    }

  } catch (error) {
    console.error("API Error:", error);
    output.value = "Error: " + error.message;
  }
}

document.getElementById('cleanBtn').addEventListener('click', professionalizePrompt);
