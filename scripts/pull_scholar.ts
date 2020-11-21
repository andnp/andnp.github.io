import * as fs from 'fs';
import { user } from 'scholarly';

import { publicationData } from '../src/content/publications';

const cleanAuthor = (author: string) => {
  if (author[0] === ' ') author = author.substr(1);
  return author;
};

async function run() {
  const data = await user('jd2nCqYAAAAJ');

  let raw = data.map(article => {
    const pastPublication = publicationData.find(pub => pub.title === article.title);

    if (pastPublication) return;

    return {
      title: article.title,
      authors: article.authors.map(cleanAuthor),
      journal: article.journal || 'arxiv',
      year: article.year,
      url: article.url || '',
    };
  });
  raw = raw.filter(data => data !== undefined);

  const pubData = [...raw, ...publicationData];
  const pubDataStr = JSON.stringify(pubData, null, 2);

  const outStr = `export const publicationData = ${pubDataStr};\n`;

  fs.writeFileSync('src/content/publications.ts', outStr);
}

run().then(() => process.exit());
