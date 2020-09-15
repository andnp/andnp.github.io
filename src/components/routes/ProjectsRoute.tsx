import * as React from 'react';
import { projectReadmeUrl } from '../../services/github';
import Markdown from '../utils/Markdown';

interface ProjectsRouteProps {
  path?: string;
  user?: string;
}

class ProjectsRoute extends React.Component<ProjectsRouteProps> {
  public shouldComponentUpdate(nextProps: ProjectsRouteProps) {
    return this.props.path !== nextProps.path || this.props.user !== nextProps.user;
  }

  public render() {
    // if we don't have a path, then just give up
    if (!this.props.path) {
      return (<span />);
    }

    const githubUrl = projectReadmeUrl('andnp', this.props.path);

    return (
      <Markdown remote={githubUrl} />
    );
  }
}

export default ProjectsRoute;
