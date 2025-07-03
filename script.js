// Asistencia AI
async function professionalizePrompt() {
  const input = document.getElementById('inputText').value;
  const output = document.getElementById('outputText');

  if (!input.trim()) {
    output.value = "Por favor, escribe un prompt primero.";
    return;
  }

  output.value = "Procesando...";

  try {
    const response = await fetch('/api/chatgpt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: input })
    });

    const data = await response.json();

    if (response.ok && data.result) {
      output.value = data.result;
    } else {
      output.value = input + "\n\n⚠️ GPT no responde. Puedes editar el texto manualmente.";
    }

  } catch (error) {
    console.error("Error:", error);
    output.value = input + "\n\n⚠️ Error en la API. Puedes continuar escribiendo.";
  }
}

// Eliminar emojis
function removeEmojis() {
  const input = document.getElementById('inputText').value;
  const cleaned = input.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF]|[\u2011-\u26FF])/g, '');
  document.getElementById('outputText').value = cleaned;
}

// Reestructurar texto (placeholder)
function restructureText() {
  const input = document.getElementById('inputText').value;
  const restructured = input
    .split('. ')
    .map(s => s.trim())
    .filter(s => s.length > 0)
    .map(s => `• ${s[0].toUpperCase() + s.slice(1)}`)
    .join('\n');

  document.getElementById('outputText').value = restructured;
}

// Eventos
document.getElementById('cleanBtn').addEventListener('click', professionalizePrompt);
document.getElementById('emojiBtn').addEventListener('click', removeEmojis);
document.getElementById('restructureBtn').addEventListener('click', restructureText);

  }
}

document.getElementById('cleanBtn').addEventListener('click', professionalizePrompt);
