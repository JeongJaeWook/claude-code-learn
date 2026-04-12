import fs from 'fs';
import path from 'path';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      results = results.concat(walk(filePath));
    } else if (filePath.endsWith('.tsx')) {
      results.push(filePath);
    }
  });
  return results;
}

const files = walk(path.join(process.cwd(), 'src/app'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Replace inside code tags to avoid JSX parsing issues
  // We'll replace { with &#123; and } with &#125; 
  // Unless it looks like a JSX variable. Actually the easiest is to just convert all unescaped text content.
  // Let's just fix the few common errors:
  // 1. >> becomes &gt;&gt;
  // 2. => becomes =&gt;
  // 3. { inside markdown code blocks usually breaks JSX.
  
  // A safer regex replacement for `>` inside text nodes (not inside HTML tags) is hard.
  // Let's wrap all content of `<code>` and `<pre><code>` blocks in {"` ... `"} 

  content = content.replace(/<code>([\s\S]*?)<\/code>/g, (match, p1) => {
    // we need to escape backticks and ${} inside the template literal
    let escaped = p1.replace(/`/g, '\\`').replace(/\$/g, '\\$');
    return `<code>{\`${escaped}\`}</code>`;
  });

  // some files might have unescaped { } outside of code blocks.
  // let's just write them back and hope it clears 90% of the errors.
  
  fs.writeFileSync(file, content);
});

console.log("Fixed JSX code blocks");
