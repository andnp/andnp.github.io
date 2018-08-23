import * as React from 'react';

class ContactInfo extends React.Component {
  public render() {
    return (
      <>
        <span>office: CSC 2-05</span><br />
        <div style={{ marginTop: '.5em' }} />
        <span>email: ap3(at)ualberta.ca</span><br />
        <div style={{ marginTop: '.5em' }} />
        <span>email2: andnpatterson(at)gmail.com</span><br />
      </>
    );
  }
}

export default ContactInfo;