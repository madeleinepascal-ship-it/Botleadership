#!/usr/bin/env node

import { generatePost, generatePosts, getStyles, getCorpusStats } from "./generator";
import { PostStyle } from "./corpus";

const BANNER = `
 ____        _     _                    _               _     _
| __ )  ___ | |_  | |    ___  __ _  __| | ___ _ __ ___| |__ (_)_ __
|  _ \\ / _ \\| __| | |   / _ \\/ _\` |/ _\` |/ _ \\ '__/ __| '_ \\| | '_ \\
| |_) | (_) | |_  | |__|  __/ (_| | (_| |  __/ |  \\__ \\ | | | | |_) |
|____/ \\___/ \\__| |_____\\___|\\__,_|\\__,_|\\___|_|  |___/_| |_|_| .__/
                                                                |_|
  The Aggregate Mix of Every LinkedIn Thought Leader
`;

function printHelp() {
  console.log(BANNER);
  console.log("Usage: bot-leadership [options]");
  console.log("");
  console.log("Options:");
  console.log("  --style <style>   Post style: story, listicle, hot_take, humble_brag, motivational, contrarian");
  console.log("  --count <n>       Number of posts to generate (default: 1)");
  console.log("  --styles          List all available post styles");
  console.log("  --stats           Show corpus statistics");
  console.log("  --help            Show this help message");
  console.log("");
  console.log("Examples:");
  console.log("  bot-leadership                        # Generate a random post");
  console.log("  bot-leadership --style listicle       # Generate a listicle");
  console.log("  bot-leadership --count 3              # Generate 3 random posts");
  console.log("  bot-leadership --style story --count 5");
  console.log("");
}

function parseArgs(args: string[]) {
  const parsed: { style?: PostStyle; count?: number; help?: boolean; styles?: boolean; stats?: boolean } = {};

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case "--style":
        parsed.style = args[++i] as PostStyle;
        break;
      case "--count":
        parsed.count = parseInt(args[++i], 10);
        break;
      case "--help":
      case "-h":
        parsed.help = true;
        break;
      case "--styles":
        parsed.styles = true;
        break;
      case "--stats":
        parsed.stats = true;
        break;
    }
  }

  return parsed;
}

function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    printHelp();
    return;
  }

  if (args.styles) {
    console.log("\nAvailable post styles:\n");
    for (const style of getStyles()) {
      const descriptions: Record<PostStyle, string> = {
        story: "A personal anecdote with a life-changing lesson from an unlikely source",
        listicle: "A numbered list of wisdom nuggets (5-9 items)",
        hot_take: "A spicy contrarian opinion with maximum engagement bait",
        humble_brag: "Advice that just happens to mention impressive achievements",
        motivational: "Pure inspirational energy with short punchy paragraphs",
        contrarian: "A takedown of popular trends disguised as wisdom",
      };
      console.log(`  ${style.padEnd(15)} ${descriptions[style]}`);
    }
    console.log("");
    return;
  }

  if (args.stats) {
    console.log("\nBot Leadership Corpus Statistics:\n");
    const stats = getCorpusStats();
    let total = 0;
    for (const [key, value] of Object.entries(stats)) {
      console.log(`  ${key.padEnd(20)} ${value} entries`);
      total += value;
    }
    console.log(`  ${"---".padEnd(20)} ${"---"}`);
    console.log(`  ${"TOTAL".padEnd(20)} ${total} entries`);
    console.log("");

    // Estimate combinatorial possibilities
    console.log("  Estimated unique post combinations: virtually infinite");
    console.log("");
    return;
  }

  // Validate style if provided
  if (args.style && !getStyles().includes(args.style)) {
    console.error(`Error: Unknown style "${args.style}". Use --styles to see available options.`);
    process.exit(1);
  }

  const count = args.count || 1;

  if (count < 1 || count > 50) {
    console.error("Error: Count must be between 1 and 50.");
    process.exit(1);
  }

  const posts = generatePosts({ style: args.style, count });

  for (let i = 0; i < posts.length; i++) {
    if (count > 1) {
      console.log(`\n${"=".repeat(60)}`);
      console.log(`  POST ${i + 1} of ${count}`);
      console.log(`${"=".repeat(60)}\n`);
    } else {
      console.log("");
    }
    console.log(posts[i]);
    console.log("");
  }
}

main();
