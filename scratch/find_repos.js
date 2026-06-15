import fs from 'fs';
const content = fs.readFileSync('C:\\Users\\Urjashee Shaw\\.gemini\\antigravity\\brain\\a2d929d8-73f0-4477-be56-6b75e199d593\\.system_generated\\steps\\58\\content.md', 'utf8');
const regex = /href="\/Urjashee\/([a-zA-Z0-9_-]+)"/g;
const matches = [];
let match;
while ((match = regex.exec(content)) !== null) {
  matches.push(match[1]);
}
console.log(JSON.stringify(Array.from(new Set(matches)), null, 2));
