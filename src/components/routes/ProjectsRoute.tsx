import * as React from 'react';
import { projectReadme, projectUrl } from '../../services/github';
import Markdown from '../utils/Markdown';

interface ProjectsRouteProps {
  path?: string;
  args?: Record<string, string>;
}

interface ProjectsRouteState {
  readme: string | undefined;
}

class ProjectsRoute extends React.Component<ProjectsRouteProps, ProjectsRouteState> {
  constructor(props: ProjectsRouteProps) {
    super(props);

    this.state = { readme: undefined };
  }

  public shouldComponentUpdate(nextProps: ProjectsRouteProps, nextState: ProjectsRouteState) {
    return this.props.path !== nextProps.path || this.props.args?.owner !== nextProps.args?.owner || this.state.readme !== nextState.readme;
  }

  public async updateState() {
    if (!this.props.path) {
      return;
    }
    const owner = this.props.args?.owner || 'andnp';
    const path = this.props.path;
    const readme = await projectReadme(owner, path);

    this.setState({ readme });
  }

  public componentDidUpdate() {
    this.updateState();
  }

  public componentDidMount() {
    this.updateState();
  }

  public render() {
    // if we don't have a path, then just give up
    if (!this.props.path || !this.state.readme) {
      return (<span />);
    }

    const owner = this.props.args?.owner || 'andnp';
    const githubUrl = projectUrl(owner, this.props.path);

    return (
      <>
        <div><a href={githubUrl}>{owner}/{this.props.path}</a></div>
        <Markdown raw={this.state.readme} />
      </>
    );
  }
}

export default ProjectsRoute;
