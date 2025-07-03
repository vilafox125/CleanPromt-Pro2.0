import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt, mode } = req.body;

  if (!prompt || prompt.trim().length === 0) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  const systemInstructions = {
    restructure: 'Reestructura este prompt de forma clara y ordenada, sin modificar su intención.',
    clean: 'Elimina todos los emojis y símbolos innecesarios del siguiente prompt sin alterar su significado.',
    professionalize: 'Reescribe este prompt de forma clara, profesional y precisa, manteniendo su intención original.',
  };

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: systemInstructions[mode] || systemInstructions['professionalize'],
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    res.status(200).json({ result: chatCompletion.choices[0].message.content });
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

