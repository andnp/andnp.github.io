import * as React from 'react';
import Markdown from '../../utils/Markdown';
import about from './about.md';

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