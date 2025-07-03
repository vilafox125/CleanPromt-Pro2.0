
document.getElementById("cleanBtn").addEventListener("click", async () => {
  const input = document.getElementById("inputText").value;
  const outputField = document.getElementById("outputText");
  outputField.value = "Loading...";

  try {
    const response = await fetch("/api/chatgpt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: input })
    });
    const data = await response.json();
    outputField.value = data.result || "No response.";
  } catch (error) {
    outputField.value = "Error: " + error.message;
  }
});
