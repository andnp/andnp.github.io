import { invokeProp } from "../utils/fp";

export const projectRawFilesUrl = (username: string, project: string, branch: string = 'master') => {
  return `https://raw.githubusercontent.com/${username}/${project}/${branch}`;
};

export const projectReadmeUrl = (username: string, project: string) => {
  return `${projectRawFilesUrl(username, project)}/README.md`;
};

export const projectUrl = (username: string, project: string) => {
  return `https://github.com/${username}/${project}`;
};

export const projectFilesUrl = (username: string, project: string, branch: string = 'master') => {
  return `${projectUrl(username, project)}/tree/${branch}`;
}

const changeLocalLinks = (url: string, imageUrl: string) => (markdown: string) => {
  const m = markdown.match(/\[.+\]\(.+\)/g);
  if (!m) return markdown;
  const links = m.filter(match => {
    const link = match.match(/\(.+\)/g);
    if (!link) return false;

    const unwrapped = link[0].replace(/[\(\)]/g, '');

    return !unwrapped.startsWith('#') && !unwrapped.startsWith('https://');
  });

  let processed = markdown;
  for (const link of links) {
    const part = link.match(/\(.+\)/g);
    if (!part) continue;
    const unwrapped = part[0].replace(/[\(\)]/g, '');

    let newlink = link;
    if (link.endsWith('.png)')) {
      newlink = link.replace(`(${unwrapped})`, `(${imageUrl}/${unwrapped})`);
    } else {
      newlink = link.replace(`(${unwrapped})`, `(${url}/${unwrapped})`);
    }

    processed = processed.replace(link, newlink);
  }

  return processed;
};

export const loadMarkdown = (username: string, project: string, file: string) => {
  const url = `${projectRawFilesUrl(username, project)}/${file}`;
  const projUrl = projectFilesUrl(username, project);
  const imageUrl = projectRawFilesUrl(username, project);

  return fetch(url)
    .then(invokeProp('text'))
    .then(changeLocalLinks(projUrl, imageUrl));
}

export const projectReadme = (username: string, project: string) => {
  return loadMarkdown(username, project, 'README.md');
};
