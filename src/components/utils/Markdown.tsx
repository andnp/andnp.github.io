import katex from '@neilsustc/markdown-it-katex';
import * as hljs from 'highlight.js';
import * as markdownIt from 'markdown-it';
import * as React from 'react';
import { macros } from '../../content/katex-macros';
import { cachedFetch } from '../../utils/cache';

// -----------------------
// Build markdown compiler
// -----------------------

const katexOptions = {
  throwOnError: false,
  macros,
};

const md: markdownIt = markdownIt({
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<div>${hljs.highlight(lang, str, true).value}</div>`;
      }
      catch (error) { /* do nothing */ }
    }
    return `<code><div>${md.utils.escapeHtml(str)}</div></code>`;
  },
})
  .use(katex, katexOptions)
  .set({ linkify: true });

const render = (data: string) => {
  const markdown = md.render(data);

  return markdown;
}

// ------------------------
// Build markdown component
// ------------------------

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
  private disposed = false;

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

  public componentWillUnmount() {
    this.disposed = true;
  }

  public render() {
    const markdown = this.state.md;
    return (
      <span className='markdown-body' style={{ width: '100%' }}>
        <span dangerouslySetInnerHTML={{ __html: markdown }} />
      </span>
    );
  }

  private fetchRemote(remote: string) {
    cachedFetch(remote)
      .then(render)
      .then(md => !this.disposed && this.setState({ md }));
  }
}

export default Markdown;
