import * as React from 'react';
import injectSheet from 'react-jss';
import { buildStyles, styledComponent } from '../utils/jss';


const styles = buildStyles({
  firstName: {
    'color': 'lightgrey',
  },
  header: {
    'background': 'dimgrey',
    'font-size': '2em',
    'font-weight': 'bold',
    'padding': '.5em 0em .5em 1em',
    'width': '100%',
  },
  lastName: {
    'color': 'black',
  }
});

class Header extends styledComponent(styles) {
  public render() {
    return (
      <div className={this.classes.header}>
        <span className={this.classes.firstName}>Andrew</span>
        <span className={this.classes.lastName}>Patterson</span>
      </div>
    );
  }
}

export default injectSheet(styles)(Header);