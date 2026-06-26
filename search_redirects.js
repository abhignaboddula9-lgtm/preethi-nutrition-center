const fs = require('fs');
const path = require('path');

const walk = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      if (!file.includes('node_modules') && !file.includes('.git')) {
        results = results.concat(walk(file));
      }
    } else {
      if (file.endsWith('.js') || file.endsWith('.html')) {
        results.push(file);
      }
    }
  });
  return results;
};

const files = walk(__dirname);
const patterns = [
  /window\.location/,
  /location\.href/,
  /location\.replace/,
  /useNavigate/,
  /router\.push/,
  /setTimeout/
];

console.log(`Scanning ${files.length} files for redirect loop culprits...`);
files.forEach((file) => {
  const content = fs.readFileSync(file, 'utf8');
  patterns.forEach((pattern) => {
    let match;
    const regex = new RegExp(pattern, 'g');
    while ((match = regex.exec(content)) !== null) {
      // Find line number
      const lines = content.substring(0, match.index).split('\n');
      const lineNum = lines.length;
      console.log(`Found pattern ${pattern} in ${path.relative(__dirname, file)} at line ${lineNum}:`);
      console.log(`  ${lines[lineNum - 1] || ''}`);
    }
  });
});
