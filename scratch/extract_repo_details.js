import fs from 'fs';
const content = fs.readFileSync('C:\\Users\\Urjashee Shaw\\.gemini\\antigravity\\brain\\a2d929d8-73f0-4477-be56-6b75e199d593\\.system_generated\\steps\\58\\content.md', 'utf8');

// We can look for divs or list items.
// On GitHub, each repository in the tab page is usually inside an <li itemprop="owns" ...>
// Let's split by '<li' and process each chunk.
const chunks = content.split('<li');
const repos = [];

for (const chunk of chunks) {
  if (!chunk.includes('itemprop="owns"')) continue;
  
  // Extract name: href="/Urjashee/name"
  const nameMatch = chunk.match(/href="\/Urjashee\/([a-zA-Z0-9_-]+)"/);
  if (!nameMatch) continue;
  const name = nameMatch[1];
  
  // Extract description: <p itemprop="description">desc</p>
  // Sometimes it's inside itemprop="description"
  let description = '';
  const descMatch = chunk.match(/itemprop="description"[^>]*>([\s\S]*?)<\/p>/);
  if (descMatch) {
    description = descMatch[1].trim();
  } else {
    // maybe check other formats
    const pMatch = chunk.match(/<p class="col-9 d-inline-block[^>]*>([\s\S]*?)<\/p>/);
    if (pMatch) {
      description = pMatch[1].trim();
    }
  }
  
  // Extract language: itemprop="programmingLanguage"
  let language = '';
  const langMatch = chunk.match(/itemprop="programmingLanguage"[^>]*>([^<]+)/);
  if (langMatch) {
    language = langMatch[1].trim();
  }
  
  repos.push({ name, description, language });
}

console.log(JSON.stringify(repos, null, 2));
