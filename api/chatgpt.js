
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // Asegúrate de que esta variable esté configurada en Vercel
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;

  if (!prompt || prompt.trim().length === 0) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-4', // Puedes usar 'gpt-3.5-turbo' si quieres ahorrar
      messages: [
        {
          role: 'system',
          content: 'Reescribe este prompt de forma clara, profesional y precisa, manteniendo su intención original.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    const result = chatCompletion.choices[0]?.message?.content?.trim();

    if (!result) {
      return res.status(500).json({ error: 'No response from OpenAI.' });
    }

    return res.status(200).json({ result });

  } catch (error) {
    console.error('API Error:', error.message);
    return res.status(500).json({ error: 'Failed to fetch completion from OpenAI.' });
  }
}
