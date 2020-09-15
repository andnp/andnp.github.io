import Menu from 'antd/lib/menu';
import { MenuInfo } from 'rc-menu/lib/interface';
import * as React from 'react';
import injectSheet from 'react-jss';
import { buildStyles, styledComponent } from '../../utils/jss';
import { HorizontalRule } from '../utils/HorizontalRule';
import { onLargeScreen, onSmallScreen } from '../utils/resizeWatcher';
import ContactInfo from './Contact';
import SocialMedia from './SocialMedia';

const styles = buildStyles({
  'sidebar-wrapper': {
    'background': 'black',
    'flex': '1 1 0',
    'color': 'rgba(255, 255, 255, 0.65)',
    'padding-top': '1em',
  },
  'menu-title': {
    'font-size': '1.25em',
    'font-weight': 'bold',
  },
  'menu': {
    'flex': '1 1 0',
  },
  'social-media': {
    'flex': '1 1 0',
    'color': 'white',
    'padding-left': '1.1em',
    'text-decoration': 'none',
  },
  'contact-info': {
    'flex': '1 1 0',
    'color': 'white',
    'padding-left': '1.1em',
    'padding-right': '1.1em',
    'font-size': '.75em'
  },
});

const menuStyles = {
  'background': styles["sidebar-wrapper"].background,
};

export interface SidebarDefinition {
  key: string;
  children?: SidebarDefinition[];
}

interface SidebarDescription {
  key: string;
  title: string;
  children?: SidebarDescription[];
}

const normalizeDefinition = (definition: SidebarDefinition, parent?: string): SidebarDescription => {
  const lowerKey = definition.key.toLowerCase();

  const children = definition.children
    ? definition.children.map(child => normalizeDefinition(child, lowerKey))
    : undefined;

  const key = parent
    ? `${parent}/${lowerKey}`
    : lowerKey;

  return {
    children,
    key,
    title: definition.key,
  }
}

class Sidebar extends styledComponent(styles) {
  public state = {
    mode: 'inline' as 'inline' | 'horizontal',
    smallScreen: false,
  };
  public props: { routes: SidebarDefinition[] } = { routes: [] };

  private sidebarDescription = this.props.routes.map(def => normalizeDefinition(def));

  public componentDidMount() {
    onSmallScreen(() => this.setState({ mode: 'horizontal', smallScreen: true }));
    onLargeScreen(() => this.setState({ mode: 'inline', smallScreen: false }));
  }

  public shouldComponentUpdate(nextProps: {}, nextState: this['state']) {
    return this.state.mode !== nextState.mode;
  }

  public render() {
    return (
      <div className={this.classes["sidebar-wrapper"]}>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div className={this.classes.menu}>
            <Menu style={menuStyles} theme='dark' mode={this.state.mode} onClick={this.onClick}>
              { this.sidebarDescription.map(this.buildSidebarPanels) }
            </Menu>
          </div>
          { !this.state.smallScreen &&
            <>
              <h5 style={{ color: 'white', textAlign: 'center', marginBottom: '0' }}>Social Media</h5>
              <HorizontalRule />
              <div className={this.classes["social-media"]}><SocialMedia /></div>

              <h5 style={{ color: 'white', textAlign: 'center', marginBottom: '0' }}>Contact Info</h5>
              <HorizontalRule />
              <div className={this.classes["contact-info"]}><ContactInfo /></div>
            </>
          }
        </div>
      </div>
    );
  }

  private onClick = ({ key }: MenuInfo) => {
    window.location.hash = '/' + key;
  }

  private buildSidebarPanels = (descriptor: SidebarDescription): JSX.Element => {
    const title = this.wrapMenuTitle(descriptor.title);

    if (!descriptor.children) return <Menu.Item key={descriptor.key}>{title}</Menu.Item>;

    return (
      <Menu.SubMenu key={descriptor.key} title={title}>
        { descriptor.children.map(this.buildSidebarPanels) }
      </Menu.SubMenu>
    );
  }

  private wrapMenuTitle(title: string) {
    return (
      <span className={this.classes['menu-title']}>
        {title}
      </span>
    )
  }
}

export default injectSheet(styles)(Sidebar);
