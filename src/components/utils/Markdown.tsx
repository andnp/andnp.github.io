import * as hljs from 'highlight.js';
import * as markdownIt from 'markdown-it';
import * as React from 'react';

const md = markdownIt({
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (e) { /* stub */ }
    }
    return '';
  },
});

interface MarkdownProps {
  raw: string;
}

class Markdown extends React.Component<MarkdownProps> {
  public render() {
    const markdown = md.render(this.props.raw);
    return (
      <div className='markdown-body'>
        <span dangerouslySetInnerHTML={{ __html: markdown }} />
      </div>
    );
  }
}

export default Markdown;