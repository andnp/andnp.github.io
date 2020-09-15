import * as fs from 'fs';
import { user } from 'scholarly';

import { publicationData } from '../src/content/publications';

async function run() {
  const data = await user('jd2nCqYAAAAJ');

  let raw = data.map(article => {
    const pastPublication = publicationData.find(pub => pub.title === article.title);

    if (pastPublication) return;

    return {
      title: article.title,
      authors: article.authors,
      journal: article.journal || 'arxiv',
      year: article.year,
      url: article.url || '',
    };
  });
  raw = raw.filter(data => data !== undefined);

  const pubData = [...publicationData, ...raw];
  const pubDataStr = JSON.stringify(pubData, null, 2);

  const outStr = `export const publicationData = ${pubDataStr};\n`;

  fs.writeFileSync('src/content/publications.ts', outStr);
}

run().then(() => process.exit());
