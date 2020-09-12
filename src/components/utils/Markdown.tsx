import * as hljs from 'highlight.js';
import * as markdownIt from 'markdown-it';
import katex from 'markdown-it-katex';
import * as React from 'react';
import { invokeProp } from '../../utils/fp';

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

md.use(katex);

const render = (data: string) => {
  const markdown = md.render(data);

  return markdown;
}

type MarkdownProps = {
  raw: string;
} | {
  remote: string;
};

interface MarkdownState {
  md: string;
  position?: number;
}

class Markdown extends React.Component<MarkdownProps, MarkdownState> {
  constructor(props: MarkdownProps) {
    super(props);
    this.state = { md: '' };

    if ('raw' in props) {
      this.state = { md: render(props.raw) };
    } else if ('remote' in props) {
      this.fetchRemote(props.remote);
    }
  }

  public componentDidUpdate(nextProps: MarkdownProps) {
    if ('raw' in nextProps) {
      this.setState({ md: render(nextProps.raw) });
    } else if ('remote' in nextProps) {
      this.fetchRemote(nextProps.remote);
    }
  }

  public render() {
    const markdown = this.state.md;
    return (
      <div className='markdown-body' style={{ width: '100%' }}>
        <span dangerouslySetInnerHTML={{ __html: markdown }} />
      </div>
    );
  }

  private fetchRemote(remote: string) {
    fetch(remote)
      .then(invokeProp('text'))
      .then(render)
      .then(md => this.setState({ md }));
  }
}

export default Markdown;
