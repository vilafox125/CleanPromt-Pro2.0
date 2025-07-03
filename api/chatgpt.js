export default async function handler(req, res) {
    const { prompt } = req.body;
    const apiKey = process.env.OPENAI_API_KEY;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a helpful assistant that rewrites prompts to be more professional and clear." },
                { role: "user", content: prompt }
            ]
        })
    });

    const data = await response.json();
    res.status(200).json({ result: data.choices[0].message.content });
}