# Personal AI Chatbot

Live: https://ai-chat-bot-silk-six.vercel.app/

A Next.js chatbot powered by **Google Gemini 2.5 Flash** via the Vercel AI SDK. Answers questions about a specific person using injected personal data (RAG-lite via system prompt), while also handling general questions.

---

## Tech stack

- [Next.js 14+](https://nextjs.org/) (App Router)
- [Vercel AI SDK](https://ai-sdk.dev/) — `ai` + `@ai-sdk/google`
- [Google Gemini 2.5 Flash](https://aistudio.google.com/)
- TypeScript
- CSS Modules

---

## Getting started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2. Install dependencies

```bash
npm install
```

### 3. Get a Gemini API key

1. Go to [https://aistudio.google.com/apikey](https://aistudio.google.com/apikey)
2. Click **Create API key**
3. Copy the key — you will not be able to view it again

> Free tier available — no credit card required.

### 4. Set up environment variables

Create a `.env.local` file in the root of the project:

```bash
# .env.local
GOOGLE_GENERATIVE_AI_API_KEY=AIzaSy...
```

> **Important:** Do not add quotes around the key and do not prefix it with `NEXT_PUBLIC_`.
> The key is only used server-side and must never be exposed to the browser.

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project structure

```
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # API route — Gemini call happens here (server-side only)
│   ├── favicon.ico
│   ├── globals.css               # Global reset + CSS custom properties (light & dark)
│   ├── Home.module.css           # Page-level layout styles (wrapper + container)
│   ├── layout.tsx                # Root layout — applies global font and metadata
│   └── page.tsx                  # Entry page — renders <Chatbot />
├── components/
│   └── Chatbot/
│       ├── Chatbot.tsx           # Chat UI component
│       ├── Chatbot.module.css    # Chatbot styles (bubbles, input bar, typing indicator)
│       └── Chatbot.types.ts      # Shared types: Message, UseGeminiReturn
├── constants/
│   └── index.ts                  # SUGGESTED_QUESTIONS — built from personalData
├── data/
│   └── personalData.ts           # Personal profile object fed to the model
├── hooks/
│   ├── useChatScroll.ts          # Auto-scrolls to latest message on update
│   ├── useGemini.ts              # Manages messages, loading, error — calls /api/chat
│   └── useSessionStorage.ts      # Persists state in sessionStorage across refreshes
├── lib/
│   └── buildSystemPrompt.ts      # Converts personalData into a system prompt string
├── types/
│   └── interface.ts              # UseGeminiReturn interface (imports Message from Chatbot.types)
├── public/                       # Static assets
├── .env                          # Local environment variables (not committed)
├── .gitignore
├── environment.d.ts              # Extends NodeJS.ProcessEnv with typed GOOGLE_GENERATIVE_AI_API_KEY
├── next.config.ts                # Next.js configuration
├── postcss.config.mjs            # PostCSS configuration
├── tsconfig.json                 # TypeScript configuration
├── AGENTS.md                     # AI agent instructions
├── CLAUDE.md                     # Claude-specific project context
└── README.md
```

---

## Hooks

### `useGemini`
The main hook for the chatbot. Manages the message list, loading state, and error state. Sends user messages to `/api/chat` and appends bot responses. Uses `useSessionStorage` to persist the conversation across page refreshes.

```ts
const { messages, loading, error, sendMessage, clearMessages } = useGemini();
```

### `useSessionStorage`
A generic drop-in replacement for `useState` that syncs state with `sessionStorage`. Accepts the same API as `useState` — including functional updates — so it works transparently wherever you'd use `useState`.

```ts
const [value, setValue] = useSessionStorage<Message[]>("chat", []);
```

Conversation history persists through browser refreshes but is cleared when the tab is closed (session-scoped by design). To persist across sessions, swap `sessionStorage` for `localStorage`.

### `useChatScroll`
Automatically scrolls the chat window to the latest message whenever `messages` or `loading` changes. Returns a ref to attach to a sentinel `<div>` at the bottom of the message list.

```ts
const bottomRef = useChatScroll(messages, loading);
// ...
<div ref={bottomRef} />
```

---

## Types

### `types/interface.ts`
Holds the `UseGeminiReturn` interface — the return shape of the `useGemini` hook:

```ts
export interface UseGeminiReturn {
  messages: Message[];
  loading: boolean;
  error: string | null;
  sendMessage: (input: string) => Promise<void>;
  clearMessages: () => void;
}
```

`Message` itself lives in `components/Chatbot/Chatbot.types.ts` and is imported here to keep the hook's contract in one place.

### `environment.d.ts`
Extends the global `NodeJS.ProcessEnv` interface so `process.env.GOOGLE_GENERATIVE_AI_API_KEY` is fully typed as `string` throughout the project — no `string | undefined` casts needed:

```ts
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GOOGLE_GENERATIVE_AI_API_KEY: string;
    }
  }
}
```

This is a type-only file — it has no runtime effect.

---

## How it works

This project uses a technique called **RAG-lite via system prompt**. Instead of a full vector database pipeline, personal data is injected directly into the model's system prompt on every request. The model has two modes:

- **Personal mode** — answers questions about the person using only the injected profile
- **General mode** — answers any other question using its own knowledge

```
Browser (useGemini hook)
    │
    │  POST /api/chat  { prompt }
    ▼
Next.js API route (route.ts)
    │
    │  Injects personalData as system prompt
    │  Calls Gemini via Vercel AI SDK
    │  GOOGLE_GENERATIVE_AI_API_KEY read here only
    ▼
Google Gemini API
    │
    │  Returns { text }
    ▼
Browser renders response
```

The API key **never reaches the browser**. All AI calls are made server-side inside `app/api/chat/route.ts`.

---

## Customising the personal data

Edit `data/personalData.ts` to change the profile the model answers questions about:

```ts
export const personalData = {
  name: "Alex Johnson",
  age: 28,
  occupation: "Frontend Developer",
  // ...
};
```

The `buildSystemPrompt()` function in `lib/buildSystemPrompt.ts` converts this object into a system prompt string automatically.

The suggested questions shown on the welcome screen are generated from the same data object in `constants/index.ts`:

```ts
export const SUGGESTED_QUESTIONS = [
  `What are ${personalData.name.split(" ")[0]}'s skills?`,
  "What are their current projects?",
  // ...
];
```

---

## Page layout

`app/page.tsx` renders a centred, full-height wrapper around `<Chatbot />`. Layout styles live in `app/Home.module.css` — edit `.wrapper` and `.container` there to adjust max-width, padding, or background.

---

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `GOOGLE_GENERATIVE_AI_API_KEY` | Yes | Gemini API key from [aistudio.google.com](https://aistudio.google.com/apikey) |

---

## Available scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Deployment

This project is ready to deploy on [Vercel](https://vercel.com/):

1. Push to GitHub
2. Import the repo on Vercel
3. Add `GOOGLE_GENERATIVE_AI_API_KEY` in **Project Settings → Environment Variables**
4. Deploy

The API key is automatically available to API routes as `process.env.GOOGLE_GENERATIVE_AI_API_KEY` — no extra configuration needed.

---

## Taking it further

The system prompt injection approach works well for small, stable datasets. For larger or dynamic datasets, consider upgrading to full RAG:

1. **Embeddings** — convert data chunks to vectors with `@ai-sdk/google` embeddings
2. **Vector store** — store in [Pinecone](https://pinecone.io/), [pgvector](https://github.com/pgvector/pgvector), or [Upstash Vector](https://upstash.com/docs/vector/overall/getstarted)
3. **Retrieval** — search for relevant chunks at query time
4. **Injection** — inject only the relevant chunks into the system prompt

See the [Vercel AI SDK RAG guide](https://ai-sdk.dev/cookbook/guides/rag-chatbot) for a full walkthrough.

---

## License

MIT
