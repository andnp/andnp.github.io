import * as React from 'react';
import Markdown from 'src/components/utils/Markdown';
import { publicationData } from '../../../content/publications';

const joinElements = (elements: JSX.Element[], joiner: JSX.Element | string) => {
  const out: Array<JSX.Element | string> = [];

  if (elements.length === 0) return elements;

  out.push(elements[0]);
  for (let i = 1; i < elements.length; i++) {
    out.push(joiner);
    out.push(elements[i]);
  }

  return out;
}

const bibElements = publicationData.map(entry => {
  const authorList = entry.authors.map(author => {
    if (author.startsWith(' ')) author = author.substr(1);
    // if (author === 'A Patterson') author = `*${author}*`;
    if (author === '...') author = 'et al.';
    return author;
  });
  const authors = authorList.join(', ');

  const bottomLine: JSX.Element[] = [];
  if (entry.code) {
    bottomLine.push(<a href={entry.code}>code</a>);
  }

  if (entry.url) {
    bottomLine.push(<a href={entry.url}>paper</a>)
  }

  return (
    <>
      <strong>{entry.title}</strong><br/>
      {authors}<br/>
      <em>{entry.journal}</em>, {entry.year}<br/>
      {joinElements(bottomLine, ' | ')}
    </>
  );
});

class PapersRoute extends React.Component {
  public render() {
    const elements = bibElements.map((element, i) => (
      <div key={i} className='markdown-body' style={{ paddingTop: '1.25em' }}>
        {element}
      </div>
    ));
    return (
      <>
        <Markdown raw='## Papers' />
        <div style={{ maxWidth: '800px' }}>
          {elements}
        </div>
      </>
    );
  }
}

export default PapersRoute;
