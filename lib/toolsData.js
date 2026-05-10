export const TOOLS_DATA = {
  'AI Chatbots': {
    icon: '🤖',
    tools: [
      { name: 'ChatGPT', url: 'https://chat.openai.com', pricing: 'Free/Paid' },
      { name: 'Claude', url: 'https://claude.ai', pricing: 'Free/Paid' },
      { name: 'Gemini', url: 'https://gemini.google.com', pricing: 'Free/Paid' },
      { name: 'Perplexity', url: 'https://perplexity.ai', pricing: 'Free/Paid' },
      { name: 'DeepSeek', url: 'https://deepseek.com', pricing: 'Free' },
    ],
  },
  'AI Coding': {
    icon: '💻',
    tools: [
      { name: 'GitHub Copilot', url: 'https://github.com/features/copilot', pricing: 'Paid' },
      { name: 'Cursor', url: 'https://cursor.sh', pricing: 'Free/Paid' },
      { name: 'Tabnine', url: 'https://tabnine.com', pricing: 'Free/Paid' },
      { name: 'Replit', url: 'https://replit.com', pricing: 'Free/Paid' },
      { name: 'Continue', url: 'https://continue.dev', pricing: 'Free' },
    ],
  },
  'AI Writing': {
    icon: '✍️',
    tools: [
      { name: 'Grammarly', url: 'https://grammarly.com', pricing: 'Free/Paid' },
      { name: 'Jasper', url: 'https://jasper.ai', pricing: 'Paid' },
      { name: 'Writesonic', url: 'https://writesonic.com', pricing: 'Free/Paid' },
      { name: 'Quillbot', url: 'https://quillbot.com', pricing: 'Free/Paid' },
      { name: 'Rytr', url: 'https://rytr.me', pricing: 'Free/Paid' },
    ],
  },
  'AI Image': {
    icon: '🎨',
    tools: [
      { name: 'DALL-E', url: 'https://openai.com/dall-e', pricing: 'Paid' },
      { name: 'Midjourney', url: 'https://midjourney.com', pricing: 'Paid' },
      { name: 'Stable Diffusion', url: 'https://stability.ai', pricing: 'Free/Paid' },
      { name: 'Leonardo AI', url: 'https://leonardo.ai', pricing: 'Free/Paid' },
      { name: 'Canva AI', url: 'https://canva.com', pricing: 'Free/Paid' },
    ],
  },
  'AI Video': {
    icon: '🎬',
    tools: [
      { name: 'Descript', url: 'https://descript.com', pricing: 'Free/Paid' },
      { name: 'Runway', url: 'https://runwayml.com', pricing: 'Free/Paid' },
      { name: 'Pika', url: 'https://pika.art', pricing: 'Free/Paid' },
      { name: 'Synthesia', url: 'https://synthesia.io', pricing: 'Free/Paid' },
      { name: 'HeyGen', url: 'https://heygen.com', pricing: 'Free/Paid' },
    ],
  },
  'AI Design': {
    icon: '🎯',
    tools: [
      { name: 'Figma AI', url: 'https://figma.com', pricing: 'Free/Paid' },
      { name: 'Adobe Firefly', url: 'https://firefly.adobe.com', pricing: 'Free/Paid' },
      { name: 'Framer', url: 'https://framer.com', pricing: 'Free/Paid' },
      { name: 'Gamma', url: 'https://gamma.app', pricing: 'Free/Paid' },
      { name: 'Pitch', url: 'https://pitch.com', pricing: 'Free/Paid' },
    ],
  },
  'AI Productivity': {
    icon: '⚡',
    tools: [
      { name: 'Notion AI', url: 'https://notion.so', pricing: 'Free/Paid' },
      { name: 'Zapier', url: 'https://zapier.com', pricing: 'Free/Paid' },
      { name: 'Make', url: 'https://make.com', pricing: 'Free/Paid' },
      { name: 'Calendly', url: 'https://calendly.com', pricing: 'Free/Paid' },
      { name: 'Otter AI', url: 'https://otter.ai', pricing: 'Free/Paid' },
    ],
  },
  'AI Audio': {
    icon: '🎙️',
    tools: [
      { name: 'ElevenLabs', url: 'https://elevenlabs.io', pricing: 'Free/Paid' },
      { name: 'Suno', url: 'https://suno.com', pricing: 'Free/Paid' },
      { name: 'Murf AI', url: 'https://murf.ai', pricing: 'Free/Paid' },
      { name: 'Udio', url: 'https://udio.com', pricing: 'Free/Paid' },
      { name: 'PlayHT', url: 'https://playht.com', pricing: 'Free/Paid' },
    ],
  },
};

export const PRICING_BADGES = {
  'Free': { bg: 'bg-green-100 dark:bg-green-900', text: 'text-green-700 dark:text-green-200' },
  'Paid': { bg: 'bg-blue-100 dark:bg-blue-900', text: 'text-blue-700 dark:text-blue-200' },
  'Free/Paid': { bg: 'bg-amber-100 dark:bg-amber-900', text: 'text-amber-700 dark:text-amber-200' },
};

export const getAllCategories = () => Object.keys(TOOLS_DATA);

export const getTotalToolCount = () => Object.values(TOOLS_DATA).reduce((sum, cat) => sum + cat.tools.length, 0);

export const searchTools = (query) => {
  if (!query.trim()) return [];
  const results = [];
  Object.entries(TOOLS_DATA).forEach(([categoryName, categoryData]) => {
    categoryData.tools.forEach(tool => {
      if (tool.name.toLowerCase().includes(query.toLowerCase())) {
        results.push({ ...tool, category: categoryName });
      }
    });
  });
  return results;
};
