import * as hljs from 'highlight.js';
import * as markdownIt from 'markdown-it';
import katex from 'markdown-it-katex';
import * as React from 'react';
import { cachedFetch } from '../../utils/cache';

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
  }

  public componentDidMount() {
    if ('raw' in this.props) {
      this.setState({ md: render(this.props.raw) });
    } else if ('remote' in this.props) {
      this.fetchRemote(this.props.remote);
    }
  }

  public shouldComponentUpdate(nextProps: MarkdownProps, nextState: MarkdownState) {
    const changedRemote = ('remote' in nextProps) && ('remote' in this.props) && (this.props.remote !== nextProps.remote);
    const changedRaw = ('raw' in nextProps) && ('raw' in this.props) && (this.props.raw !== nextProps.raw);
    const changedState = this.state.md !== nextState.md;

    return changedRemote || changedRaw || changedState;
  }

  public componentDidUpdate(lastProps: MarkdownProps) {
    if ('raw' in this.props) {
      this.setState({ md: render(this.props.raw) });
    } else if ('remote' in this.props) {
      this.fetchRemote(this.props.remote);
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
    cachedFetch(remote)
      .then(render)
      .then(md => this.setState({ md }));
  }
}

export default Markdown;
