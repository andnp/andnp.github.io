import * as React from 'react';
import { loadMarkdown } from 'src/services/github';
import { blogData } from '../../content/blogs';
import { HorizontalRule } from '../utils/HorizontalRule';
import Markdown from '../utils/Markdown';

const changeRoute = (key: string) => () => window.location.hash = `/blogs/${key}`;
const goBack = () => window.location.hash = '/blogs';

const blogElements = blogData.map(blog => {
  const key = blog.key;
  return (
    <div key={key} onClick={changeRoute(key)} style={{ cursor: 'pointer', borderStyle: "solid", borderWidth: "thin", borderColor: "rgba(0, 0, 0, 0.05)", maxWidth: "600px", marginBottom: "1em", padding: "1em", boxShadow: "1px 1px 1px 1px rgba(0,0,0,0.1)" }}>
      <div style={{ maxHeight: '200px', overflow: "hidden", position: "relative" }}>

        <div style={{ fontSize: '0.75em', paddingBottom: "5px" }}>{blog.date}</div>
        <div style={{ fontSize: '1.25em' }}>{blog.title}</div>
        <HorizontalRule color='rgba(0, 0, 0, 0.2)' align="left" verticalSpacing="0.5em" />
        <Markdown raw={blog.previewText} />

        <span style={{backgroundImage: "linear-gradient(to bottom, transparent, white)", height: "100px", position: "absolute", bottom: 0, top: 100, width: "100%" }}/>
      </div>
    </div>
  );
});

const BlogList = () => (<>{blogElements}</>);

interface BlogsRouteProps {
  path?: string;
  args?: Record<string, string>;
}

interface BlogsRouteState {
  blog: string | undefined;
}

class BlogsRoute extends React.Component<BlogsRouteProps, BlogsRouteState> {
  constructor(props: BlogsRouteProps) {
    super(props);

    this.state = { blog: undefined };
  }

  public shouldComponentUpdate(nextProps: BlogsRouteProps, nextState: BlogsRouteState) {
    return this.props.path !== nextProps.path || this.state.blog !== nextState.blog;
  }

  public async updateState() {
    if (!this.props.path) {
      this.setState({ blog: undefined });
      return;
    }
    const path = this.props.path;
    const blog = await loadMarkdown('andnp', 'blogs', `${path}.md`);

    // well this is just gross..
    if (blog !== '404: Not Found') this.setState({ blog });
    else goBack();
  }

  public componentDidUpdate() {
    this.updateState();
  }

  public componentDidMount() {
    this.updateState();
  }

  public render() {
    if (!this.props.path) return <BlogList />;
    if (!this.state.blog) return <span />;

    return (
      <>
        <div>
          <a onClick={goBack}>blogs</a>/{this.props.path}
        </div>
        <div style={{ maxWidth: "700px" }}>
          <Markdown raw={this.state.blog} />
        </div>
      </>
    );
  }
}

export default BlogsRoute;
