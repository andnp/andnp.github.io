import * as React from 'react';

class SocialMedia extends React.Component {
  public render() {
    return (
      <>
        <a style={{ paddingTop: '.25em'}} href='https://github.com/andnp'>github</a><br />
        <div style={{ marginTop: '.5em' }} />
        <a style={{ paddingTop: '.25em'}} href='https://www.linkedin.com/in/andy-patterson-1940b068/'>LinkedIn</a><br />
        <div style={{ marginTop: '.5em' }} />
        <a style={{ paddingTop: '.25em'}} href='https://www.researchgate.net/profile/Andrew_Patterson9'>ResearchGate</a><br />
        <div style={{ marginTop: '.5em' }} />
        <a style={{ paddingTop: '.25em'}} href='https://indiana.academia.edu/AndrewPatterson'>Academia.edu</a><br />
      </>
    );
  }
}

export default SocialMedia;