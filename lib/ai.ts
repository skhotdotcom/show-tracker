// lib/ai.ts — Local LLM integration via LM Studio (OpenAI-compatible API).
// Three entry points:
//   generateChatResponse   — conversational assistant with show context
//   extractShowsFromMessage — parse show names + actions from a user message (JSON mode)
//   generateRecommendations — produce personalised suggestions based on watch history

const LM_STUDIO_URL = process.env.LM_STUDIO_URL || 'http://localhost:1234';

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ExtractionResult {
  shows: Array<{
    title: string;
    action: 'add_queue' | 'mark_watching' | 'mark_completed' | 'mark_dropped';
  }>;
}

// Send a conversational message to the LLM with the user's show list as context.
// Falls back to a helpful error message if LM Studio is unreachable.
export async function generateChatResponse(
  userMessage: string,
  showsContext: string,
  chatHistory: ChatMessage[] = []
): Promise<string> {
  const systemPrompt = `You are a helpful TV and movie tracking assistant. The user will chat with you about shows they're watching, want to watch, or have finished.

Current user's tracked content:
${showsContext}

Your job is to:
1. Have natural conversations about shows and movies
2. When the user mentions shows with specific actions, acknowledge them naturally
3. Be friendly and helpful about recommendations and discussion

Actions to recognize:
- "started watching", "watching", "began" = mark_watching
- "want to watch", "add to list", "add to queue", "want to see" = add_queue  
- "finished", "completed", "done with", "watched all of" = mark_completed
- "stopped watching", "dropped", "gave up on" = mark_dropped

When you detect these actions, naturally acknowledge them in your response. For example:
- "I've added [show] to your watching list!" or "Got it, you're watching [show] now!"
- "I'll add [show] to your queue to watch later."
- "Congratulations on finishing [show]! Would you like to rate it?"

Be conversational and helpful. If the user asks for recommendations, provide thoughtful suggestions based on what they've watched.`;

  const messages: ChatMessage[] = [
    { role: 'system', content: systemPrompt },
    ...chatHistory.slice(-10),
    { role: 'user', content: userMessage },
  ];

  try {
    const response = await fetch(`${LM_STUDIO_URL}/v1/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'local-model',
        messages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      throw new Error(`LM Studio error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || "I'm here to help track your shows. What would you like to add or update?";
  } catch (error) {
    console.error('AI chat error:', error);
    return "I'm having trouble connecting to my AI backend. Please make sure LM Studio is running on " + LM_STUDIO_URL;
  }
}

// Parse a user message for show titles and their intended action (add/watch/complete/drop).
// Uses temperature=0 and strict JSON output for reliable extraction.
export async function extractShowsFromMessage(userMessage: string): Promise<ExtractionResult> {
  const extractionPrompt = `Extract TV shows or movies mentioned in the user's message and determine the action.

User message: "${userMessage}"

Respond with ONLY a JSON object (no markdown, no explanation):
{
  "shows": [
    {"title": "Show Name", "action": "add_queue" | "mark_watching" | "mark_completed" | "mark_dropped"}
  ]
}

Action rules:
- "started watching", "watching", "began", "currently on" → mark_watching
- "want to watch", "add to list", "need to watch", "want to see", "add to queue" → add_queue  
- "finished", "completed", "done with", "watched all of", "just watched" → mark_completed
- "stopped watching", "dropped", "gave up on", "quit" → mark_dropped

If no shows are mentioned, return: {"shows": []}`;

  try {
    const response = await fetch(`${LM_STUDIO_URL}/v1/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'local-model',
        messages: [{ role: 'user', content: extractionPrompt }],
        temperature: 0,
        max_tokens: 200,
      }),
    });

    if (!response.ok) {
      return { shows: [] };
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || '{"shows": []}';
    
    const cleaned = content.replace(/```json\n?|\n?```/g, '').trim();
    const parsed = JSON.parse(cleaned);
    
    return parsed;
  } catch (error) {
    console.error('Extraction error:', error);
    return { shows: [] };
  }
}

interface GenreAffinityContext {
  genre: string;
  count: number;
  avgUserRating: number | null;
  completionRate: number | null;
}

// Generate personalised show/movie recommendations based on the user's watch history.
// Returns titles that can be searched in TMDB to enrich with metadata.
export async function generateRecommendations(
  watchingShows: string[],
  completedShows: string[],
  count: number = 10,
  genreAffinities: GenreAffinityContext[] = []
): Promise<Array<{ title: string; type: 'tv' | 'movie'; reason: string }>> {
  const genreContext = genreAffinities.length > 0
    ? `\nGenre watch patterns (most-watched first):
${genreAffinities.slice(0, 8).map((g) =>
  `  - ${g.genre}: ${g.count} titles watched${g.avgUserRating != null ? `, avg rating ${g.avgUserRating.toFixed(1)}/5` : ''}${g.completionRate != null ? `, ${Math.round(g.completionRate * 100)}% finish rate` : ''}`
).join('\n')}`
    : '';

  const prompt = `Based on the user's viewing history, recommend ${count} TV shows or movies they might enjoy.

Currently watching: ${watchingShows.join(', ') || 'None'}
Completed/enjoyed: ${completedShows.join(', ') || 'None'}${genreContext}

For each recommendation, provide:
1. The exact title (accurate for searching)
2. Type: "tv" or "movie"
3. A brief reason why they'd like it based on their history and genre patterns

Respond with ONLY a JSON array:
[
  {"title": "Show Name", "type": "tv", "reason": "Because you enjoyed X..."}
]

Do not include shows they've already watched or are currently watching. Focus on accurate, searchable titles. Lean toward genres they watch and finish most.`;

  try {
    const response = await fetch(`${LM_STUDIO_URL}/v1/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'local-model',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.8,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || '[]';
    
    const cleaned = content.replace(/```json\n?|\n?```/g, '').trim();
    const parsed = JSON.parse(cleaned);
    
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Recommendation error:', error);
    return [];
  }
}