import * as http from "http";
import { generatePost, getStyles, getCorpusStats } from "./generator";
import { PostStyle } from "./corpus";

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

const HTML_PAGE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bot Leadership - Thought Leadership Generator</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f3f2ef;
      color: #000000e6;
      min-height: 100vh;
    }

    .header {
      background: #0a66c2;
      color: white;
      padding: 20px 0;
      text-align: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .header h1 {
      font-size: 28px;
      font-weight: 700;
      letter-spacing: -0.5px;
    }

    .header p {
      font-size: 14px;
      opacity: 0.9;
      margin-top: 4px;
    }

    .container {
      max-width: 680px;
      margin: 24px auto;
      padding: 0 16px;
    }

    .controls {
      background: white;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 16px;
      box-shadow: 0 0 0 1px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.05);
      display: flex;
      gap: 12px;
      align-items: center;
      flex-wrap: wrap;
    }

    .controls label {
      font-size: 14px;
      font-weight: 600;
      color: #666;
    }

    .controls select {
      padding: 8px 12px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 14px;
      background: white;
      cursor: pointer;
    }

    .generate-btn {
      background: #0a66c2;
      color: white;
      border: none;
      padding: 10px 24px;
      border-radius: 20px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
      margin-left: auto;
    }

    .generate-btn:hover {
      background: #004182;
    }

    .generate-btn:active {
      transform: scale(0.98);
    }

    .post-card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 0 0 1px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.05);
      margin-bottom: 16px;
      overflow: hidden;
    }

    .post-header {
      display: flex;
      align-items: center;
      padding: 16px 16px 0;
      gap: 8px;
    }

    .avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: linear-gradient(135deg, #0a66c2, #004182);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 700;
      font-size: 18px;
      flex-shrink: 0;
    }

    .post-meta h3 {
      font-size: 14px;
      font-weight: 600;
      line-height: 1.3;
    }

    .post-meta p {
      font-size: 12px;
      color: #666;
      line-height: 1.3;
    }

    .post-body {
      padding: 12px 16px 16px;
      font-size: 14px;
      line-height: 1.5;
      white-space: pre-wrap;
    }

    .post-actions {
      display: flex;
      border-top: 1px solid #e0e0e0;
      padding: 4px 16px;
    }

    .action-btn {
      flex: 1;
      padding: 12px;
      text-align: center;
      font-size: 13px;
      color: #666;
      font-weight: 600;
      cursor: pointer;
      border-radius: 4px;
      transition: background 0.2s;
      border: none;
      background: none;
    }

    .action-btn:hover {
      background: #f3f2ef;
      color: #000;
    }

    .copy-btn {
      display: block;
      margin: 0 auto 24px;
      background: none;
      border: 1px solid #0a66c2;
      color: #0a66c2;
      padding: 8px 20px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    .copy-btn:hover {
      background: #0a66c2;
      color: white;
    }

    .footer {
      text-align: center;
      padding: 24px;
      color: #999;
      font-size: 12px;
    }

    @media (max-width: 480px) {
      .controls { flex-direction: column; }
      .generate-btn { margin-left: 0; width: 100%; }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Bot Leadership</h1>
    <p>The Aggregate Mix of Every LinkedIn Thought Leader</p>
  </div>

  <div class="container">
    <div class="controls">
      <label for="style">Style:</label>
      <select id="style">
        <option value="">Random</option>
        <option value="story">Story</option>
        <option value="listicle">Listicle</option>
        <option value="hot_take">Hot Take</option>
        <option value="humble_brag">Humble Brag</option>
        <option value="motivational">Motivational</option>
        <option value="contrarian">Contrarian</option>
      </select>
      <button class="generate-btn" onclick="generate()">Generate Post</button>
    </div>

    <div id="post-container">
      <div class="post-card">
        <div class="post-header">
          <div class="avatar">BL</div>
          <div class="post-meta">
            <h3>Bot Leadership</h3>
            <p>Thought Leader | Disrupting Disruption | 500+ Connections</p>
            <p>Just now &middot; 🌐</p>
          </div>
        </div>
        <div class="post-body" id="post-body">Click "Generate Post" to create your first piece of thought leadership.</div>
        <div class="post-actions">
          <button class="action-btn">👍 Like</button>
          <button class="action-btn">💬 Comment</button>
          <button class="action-btn">🔄 Repost</button>
          <button class="action-btn">📤 Send</button>
        </div>
      </div>
      <button class="copy-btn" onclick="copyPost()">Copy to Clipboard</button>
    </div>

    <div class="footer">
      Bot Leadership &mdash; No actual thought leaders were harmed in the making of this content.<br>
      Powered by an aggregate mix of every LinkedIn clich&eacute; ever written.
    </div>
  </div>

  <script>
    let currentPost = '';

    async function generate() {
      const style = document.getElementById('style').value;
      const url = style ? '/api/generate?style=' + style : '/api/generate';

      try {
        const res = await fetch(url);
        const data = await res.json();
        currentPost = data.post;
        document.getElementById('post-body').textContent = currentPost;
      } catch (err) {
        document.getElementById('post-body').textContent = 'Failed to generate. The thought leadership gods are displeased.';
      }
    }

    function copyPost() {
      if (!currentPost) return;
      navigator.clipboard.writeText(currentPost).then(() => {
        const btn = document.querySelector('.copy-btn');
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = 'Copy to Clipboard'; }, 2000);
      });
    }

    // Generate on load
    generate();
  </script>
</body>
</html>`;

function handleRequest(req: http.IncomingMessage, res: http.ServerResponse) {
  const url = new URL(req.url || "/", `http://localhost:${PORT}`);

  // API endpoint
  if (url.pathname === "/api/generate") {
    const style = url.searchParams.get("style") as PostStyle | null;
    const validStyles = getStyles();

    if (style && !validStyles.includes(style)) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: `Invalid style. Choose from: ${validStyles.join(", ")}` }));
      return;
    }

    const post = generatePost(style || undefined);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ post, style: style || "random" }));
    return;
  }

  // Stats endpoint
  if (url.pathname === "/api/stats") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(getCorpusStats()));
    return;
  }

  // Serve the web page
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(HTML_PAGE);
}

const server = http.createServer(handleRequest);

server.listen(PORT, () => {
  console.log(`\n  Bot Leadership is now disrupting on http://localhost:${PORT}\n`);
  console.log("  Endpoints:");
  console.log("    GET /              Web interface");
  console.log("    GET /api/generate  Generate a post (optional ?style=listicle)");
  console.log("    GET /api/stats     Corpus statistics");
  console.log("");
});
