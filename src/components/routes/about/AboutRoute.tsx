import * as React from 'react';
import about from '../../../content/routes/about.md';
import Markdown from '../../utils/Markdown';

class AboutRoute extends React.Component {
  public render() {
    return (
      <div style={{ maxWidth: '800px' }}>
        <Markdown remote={about} />
      </div>
    );
  }
}

export default AboutRoute;
