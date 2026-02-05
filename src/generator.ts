import {
  openingHooks,
  vulnerablePivots,
  insights,
  humbleBrags,
  punchyLines,
  listicleItems,
  storySubjects,
  storyLessons,
  buzzwords,
  hashtags,
  closingCTAs,
  postStyles,
  PostStyle,
} from "./corpus";

/** Pick a random element from an array */
function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Pick N unique random elements from an array */
function pickN<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(n, arr.length));
}

/** Format text in the classic LinkedIn style: one sentence per paragraph */
function linkedInFormat(lines: string[]): string {
  return lines.join("\n\n");
}

/** Generate a hashtag block */
function generateHashtags(count: number = 5): string {
  return pickN(hashtags, count).join(" ");
}

/** Generate a story-style post */
function generateStory(): string {
  const subject = pick(storySubjects);
  const lesson = pick(storyLessons);

  const lines = [
    pick(openingHooks),
    `I met ${subject} last week.`,
    `We talked for 10 minutes.`,
    pick(vulnerablePivots),
    `This person ${lesson}.`,
    pick(insights),
    pick(punchyLines),
    pick(closingCTAs),
    "",
    generateHashtags(),
  ];

  return linkedInFormat(lines);
}

/** Generate a listicle-style post */
function generateListicle(): string {
  const count = Math.floor(Math.random() * 5) + 5; // 5-9 items
  const items = pickN(listicleItems, count);
  const numberedList = items.map((item, i) => `${i + 1}. ${item}`).join("\n");

  const lines = [
    `${count} things I wish someone told me ${Math.floor(Math.random() * 10) + 5} years ago:`,
    numberedList,
    "",
    pick(punchyLines),
    pick(closingCTAs),
    "",
    generateHashtags(),
  ];

  return linkedInFormat(lines);
}

/** Generate a hot take post */
function generateHotTake(): string {
  const lines = [
    pick(["Unpopular opinion:", "Hot take:", "Controversial take:", "I said what I said:"]),
    pick(insights),
    pick(punchyLines),
    pick(vulnerablePivots),
    pick(insights),
    pick(punchyLines),
    "",
    pick(closingCTAs),
    "",
    generateHashtags(),
  ];

  return linkedInFormat(lines);
}

/** Generate a humble brag post */
function generateHumbleBrag(): string {
  const lines = [
    pick(openingHooks),
    `${pick(humbleBrags)}: the most important thing in business isn't ${pick(buzzwords)}.`,
    `It's ${pick(buzzwords)}.`,
    pick(vulnerablePivots),
    pick(insights),
    pick(punchyLines),
    pick(punchyLines),
    "",
    pick(closingCTAs),
    "",
    generateHashtags(),
  ];

  return linkedInFormat(lines);
}

/** Generate a motivational post */
function generateMotivational(): string {
  const lines = [
    pick(openingHooks),
    pick(vulnerablePivots),
    pick(insights),
    "",
    "Here's the truth:",
    "",
    pick(insights),
    pick(punchyLines),
    "",
    "You are one decision away from a completely different life.",
    "",
    pick(punchyLines),
    pick(closingCTAs),
    "",
    generateHashtags(),
  ];

  return linkedInFormat(lines);
}

/** Generate a contrarian post */
function generateContrarian(): string {
  const target = pick([
    "hustle culture", "morning routines", "networking events",
    "business school", "remote work", "return to office",
    "personal branding", "thought leadership", "growth hacking",
    "productivity hacks", "side hustles", "passive income",
    "corporate culture", "startup culture", "meetings",
  ]);

  const lines = [
    `Stop glorifying ${target}.`,
    pick(punchyLines),
    pick(vulnerablePivots),
    `I spent years chasing ${target}. It nearly destroyed me.`,
    pick(insights),
    "",
    `The real secret? ${pick(insights)}`,
    pick(punchyLines),
    "",
    pick(closingCTAs),
    "",
    generateHashtags(),
  ];

  return linkedInFormat(lines);
}

/** Map of post style to generator function */
const generators: Record<PostStyle, () => string> = {
  story: generateStory,
  listicle: generateListicle,
  hot_take: generateHotTake,
  humble_brag: generateHumbleBrag,
  motivational: generateMotivational,
  contrarian: generateContrarian,
};

export interface GenerateOptions {
  style?: PostStyle;
  count?: number;
}

/** Generate a single thought leadership post */
export function generatePost(style?: PostStyle): string {
  const chosenStyle = style || pick(postStyles);
  return generators[chosenStyle]();
}

/** Generate multiple posts */
export function generatePosts(options: GenerateOptions = {}): string[] {
  const { style, count = 1 } = options;
  return Array.from({ length: count }, () => generatePost(style));
}

/** Get available post styles */
export function getStyles(): PostStyle[] {
  return [...postStyles];
}

/** Get corpus statistics */
export function getCorpusStats() {
  return {
    openingHooks: openingHooks.length,
    vulnerablePivots: vulnerablePivots.length,
    insights: insights.length,
    humbleBrags: humbleBrags.length,
    punchyLines: punchyLines.length,
    listicleItems: listicleItems.length,
    storySubjects: storySubjects.length,
    storyLessons: storyLessons.length,
    buzzwords: buzzwords.length,
    hashtags: hashtags.length,
    closingCTAs: closingCTAs.length,
    postStyles: postStyles.length,
  };
}
