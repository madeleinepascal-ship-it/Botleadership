# Bot Leadership

The aggregate mix of every LinkedIn thought leader. Generates realistic-looking thought leadership posts by remixing the patterns, phrases, and structures found across LinkedIn's most prolific posters.

## Features

- **298-entry corpus** of LinkedIn thought leadership patterns including opening hooks, humble brags, buzzwords, punchy one-liners, hashtags, and more
- **6 post styles**: story, listicle, hot take, humble brag, motivational, contrarian
- **CLI** for quick terminal generation
- **Web interface** styled like a LinkedIn feed
- **JSON API** for integration with other tools

## Quick Start

```bash
npm install
npm run build
```

### Generate from the command line

```bash
# Random post
npm run generate

# Pick a style
npm run generate -- --style listicle
npm run generate -- --style humble_brag
npm run generate -- --style story

# Multiple posts
npm run generate -- --count 5

# See all styles
npm run generate -- --styles

# Corpus stats
npm run generate -- --stats
```

### Web interface

```bash
npm run serve
# Open http://localhost:3000
```

### API

```
GET /api/generate            → random post
GET /api/generate?style=story → specific style
GET /api/stats               → corpus statistics
```

## Post Styles

| Style | Description |
|-------|-------------|
| `story` | A personal anecdote with a life-changing lesson from an unlikely source |
| `listicle` | A numbered list of wisdom nuggets |
| `hot_take` | A spicy opinion with maximum engagement bait |
| `humble_brag` | Advice that just happens to mention impressive achievements |
| `motivational` | Pure inspirational energy with short punchy paragraphs |
| `contrarian` | A takedown of popular trends disguised as wisdom |

## Use as a library

```typescript
import { generatePost, generatePosts, getStyles } from "bot-leadership";

// Single post
const post = generatePost("listicle");

// Multiple posts
const posts = generatePosts({ style: "story", count: 3 });
```

## How it works

Bot Leadership maintains a curated corpus of LinkedIn thought leadership patterns organized into categories:

- **Opening hooks** — scroll-stopping first lines
- **Vulnerable pivots** — the "but here's what I learned" moment
- **Insights** — buzzword-laden wisdom
- **Humble brags** — advice wrapped in achievements
- **Punchy lines** — short sentences that demand engagement
- **Listicle items** — numbered wisdom nuggets
- **Story elements** — subjects and lessons for anecdotes
- **Buzzwords** — corporate jargon
- **Hashtags** — engagement-optimized tags
- **Closing CTAs** — calls to action

The generator picks a post style, then assembles phrases from each category into the classic LinkedIn format: one sentence per paragraph, maximum vulnerability, and a call to action at the end.

No actual thought leaders were harmed in the making of this content.
