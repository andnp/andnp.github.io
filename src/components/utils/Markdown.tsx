import * as hljs from 'highlight.js';
import * as markdownIt from 'markdown-it';
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

type MarkdownProps = {
  raw: string;
} | {
  remote: string;
};

interface MarkdownState {
  md: string;
}

class Markdown extends React.Component<MarkdownProps, MarkdownState> {
  constructor(props: MarkdownProps) {
    super(props);
    this.state = { md: '' };

    if ('raw' in props) {
      this.state = { md: md.render(props.raw) };
    } else if ('remote' in props) {
      this.fetchRemote(props.remote);
    }
  }

  public componentWillReceiveProps(nextProps: MarkdownProps) {
    if ('raw' in nextProps) {
      this.setState({ md: md.render(nextProps.raw) });
    } else if ('remote' in nextProps) {
      this.fetchRemote(nextProps.remote);
    }
  }

  public render() {
    const markdown = this.state.md;
    return (
      <div className='markdown-body'>
        <span dangerouslySetInnerHTML={{ __html: markdown }} />
      </div>
    );
  }

  private fetchRemote(remote: string) {
    fetch(remote)
      .then(invokeProp('text'))
      .then(md.render.bind(md))
      .then(md => this.setState({ md }));
  }
}

export default Markdown;