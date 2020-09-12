import * as React from 'react';
import { projectReadmeUrl } from '../../services/github';
import Markdown from '../utils/Markdown';

interface ProjectsRouteProps {
  path: string;
  user?: string;
}

class ProjectsRoute extends React.Component<ProjectsRouteProps> {
  public shouldComponentUpdate(nextProps: ProjectsRouteProps) {
    return this.props.path !== nextProps.path || this.props.user !== nextProps.user;
  }

  public render() {
    const githubUrl = projectReadmeUrl('andnp', this.props.path);

    return (
      <Markdown remote={githubUrl} />
    );
  }
}

export default ProjectsRoute;
