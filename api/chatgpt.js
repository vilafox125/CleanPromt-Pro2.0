
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { prompt } = req.body;
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "Missing OpenAI API Key" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: `Improve the following prompt professionally:

${prompt}` }],
        temperature: 0.7
      })
    });

    const result = await response.json();
    res.status(200).json({ result: result.choices[0].message.content.trim() });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch from OpenAI API." });
  }
}
