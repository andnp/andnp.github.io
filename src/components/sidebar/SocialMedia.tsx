import * as React from 'react';

class SocialMedia extends React.Component {
  public render() {
    return (
      <>
        <a style={{ paddingTop: '.25em'}} href='https://github.com/andnp'>GitHub</a><br />
        <div style={{ marginTop: '.5em' }} />
        <a style={{ paddingTop: '.25em'}} href='https://scholar.google.ca/citations?user=jd2nCqYAAAAJ'>Google Scholar</a><br />
        <div style={{ marginTop: '.5em' }} />
        <a style={{ paddingTop: '.25em'}} href='https://www.linkedin.com/in/andy-patterson-1940b068/'>LinkedIn</a><br />
      </>
    );
  }
}

export default SocialMedia;
