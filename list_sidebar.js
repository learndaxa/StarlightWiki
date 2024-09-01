import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';

async function walkDocsRecursive(dir) {
  const files = fs.readdirSync(dir);
  let result = [];
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      result.push({
        label: /^\d/.test(file) ? file.slice(file.indexOf(' ') + 1) : file,
        _order: /^\d/.test(file) ? parseInt(file.slice(0, file.indexOf(' '))) : 0,
        items: await walkDocsRecursive(filePath)
      });
    } else {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const parsedContent = matter(fileContent);
      const slug = parsedContent.data.slug || '';
      result.push({
        _order: /^\d/.test(file) ? parseInt(file.slice(0, file.indexOf(' '))) : 0,
        slug: slug
      });
    }
  }
  return result
    .sort((a, b) => a._order - b._order)
    .map((item) => {
      delete item._order;
      return item;
    });
}

export const sidebar = await walkDocsRecursive('src/content/docs/');
