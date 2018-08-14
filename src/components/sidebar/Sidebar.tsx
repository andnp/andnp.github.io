import Menu from 'antd/lib/menu';
import * as React from 'react';
import injectSheet from 'react-jss';
import { buildStyles, styledComponent } from '../../utils/jss';


const styles = buildStyles({
  'sidebar-wrapper': {
    'background': 'black',
    'flex': '1 1 0',
    'margin-right': '2em',
    'max-width': '300px',
    'text-align': 'center',
  },
});

const menuStyles = {
  'background': styles["sidebar-wrapper"].background,
};

class Sidebar extends styledComponent(styles) {
  public render() {
    return (
      <div className={this.classes["sidebar-wrapper"]}>
        <Menu style={menuStyles} theme='dark'>
          <Menu.Item>Hey</Menu.Item>
          <Menu.Item>Hey</Menu.Item>
          <Menu.Item>Hey</Menu.Item>
          <Menu.Item>Hey</Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default injectSheet(styles)(Sidebar);