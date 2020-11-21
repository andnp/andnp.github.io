import fetch from 'node-fetch';
import * as fs from 'fs';
import * as v from 'validtyped';
import { invokeProp } from '../src/utils/fp';

import { blogData } from '../src/content/blogs';

const githubFile = v.object({
  name: v.string(),
  type: v.string(['file' as const, 'dir' as const]),
  download_url: v.string().orNull(),
})
const githubFiles = v.array(githubFile);

async function run() {
  const data = await fetch('https://api.github.com/repos/andnp/blogs/contents/')
    .then(invokeProp('json'));

  if (!githubFiles.isValid(data)) throw 'uh oh, looks like the files did not match';

  const today = new Date().toLocaleDateString();

  const newBlogs = [] as typeof blogData;
  for (const blog of data) {
    if (blog.type === 'dir') continue;
    if (!blog.download_url) continue;
    if (!blog.name.endsWith('.md')) continue;

    const key = blog.name.replace('.md', '');

    const pastBlog = blogData.find(b => b.key === key);
    if (pastBlog) continue;

    const blogText = await fetch(blog.download_url)
      .then(invokeProp('text'));

    const nonEmptyLines = blogText
      .split('\n')
      .filter(line => line !== '');

    const paragraphs = blogText.split('\n\n');

    const title = nonEmptyLines[0].replace(/#+\W+/, '');
    const previewText = paragraphs[1];

    newBlogs.push({
      key,
      title,
      previewText,
      date: today,
      medium: '',
    })
  }

  const allBlogs = [...newBlogs, ...blogData];
  const allBlogsStr = JSON.stringify(allBlogs, null, 2);

  const outStr = `export const blogData = ${allBlogsStr};\n`;

  fs.writeFileSync('src/content/blogs.ts', outStr);
}

run().then(() => process.exit());
