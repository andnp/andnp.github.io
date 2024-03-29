import * as React from 'react';
import { SidebarDefinition } from './sidebar/Sidebar';

export type RouteableComponent = React.ComponentType<{path?: string, args?: Record<string, any>}>;

export interface RouteDefinition {
  key: string;
  private?: boolean;
  args?: Record<string, unknown>;
  children?: SidebarDefinition[];
  route: () => Promise<RouteableComponent>;
}

interface RouteDescription {
  [state: string]: () => Promise<RouteableComponent>;
}

const normalizeRouteDescriptions = (defs: RouteDefinition[]): RouteDescription => {
  return defs.reduce((coll, def) => {
    coll[def.key.toLowerCase()] = def.route;
    return coll;
  }, {} as RouteDescription);
};

interface RouterState {
  routes: Record<string, RouteableComponent>;
  routeLoaders: RouteDescription;
  route: string;
  path: string;
  args?: Record<string, unknown>;
}

interface RouterProps {
  routes: RouteDefinition[];
}

class Router extends React.Component<RouterProps, RouterState> {
  constructor(props: RouterProps) {
    super(props);

    this.state = {
      path: '',
      route: 'home',
      routeLoaders: normalizeRouteDescriptions(props.routes),
      routes: {},
    };

    this.loadRoute('home');
  }

  public componentDidMount() {
    window.addEventListener('hashchange', this.onHashChange);
    this.navigateToHash(window.location.href);
  }

  public componentWillUnmount() {
    window.removeEventListener('hashchange', this.onHashChange);
  }

  public shouldComponentUpdate(nextProps: {}, nextState: RouterState) {
    const route = nextState.route;
    const changedRoute = this.state.route !== nextState.route;
    const changedPath = this.state.path !== nextState.path;
    const addedCachedRoute = this.state.routes[route] !== nextState.routes[route];
    return changedRoute || changedPath || addedCachedRoute;
  }

  public componentDidUpdate(oldProps: {}, oldState: RouterState) {
    const route = this.state.route;
    this.loadRoute(route);
  }

  public render() {
    if (!this.state.routeLoaders[this.state.route]) throw new Error('Attempted to load undefined route' + this.state.route);
    const Route = this.state.routes[this.state.route];

    if (!Route) return <span />;
    return <Route path={this.state.path} args={this.state.args} />
  }

  private loadRoute(route: string) {
    if (!this.state.routes[route]) {
      const loader = this.state.routeLoaders[route];

      loader().then(Route => {
        const routes = {
          ...this.state.routes,
          [route]: Route,
        };

        this.setState({ routes });
      });
    }
  }

  private onHashChange = (e: HashChangeEvent) => {
    const url = e.newURL;
    this.navigateToHash(url);
  }

  private navigateToHash = (url: string) => {
    const match = url.split('#/');
    if (match.length !== 2) return;
    const [ /* uri */, route ] = match;
    const [ hash, ...paths ] = route.split('/');
    const path = paths.join('/');

    // if hash is not a known route, set hash back to last known route
    if (!(hash in this.state.routeLoaders)) {
      window.location.hash = "/" + this.state.route;
      return;
    }

    const routeDef = this.props.routes.filter(route => route.key.toLowerCase() === hash);
    const child = routeDef && routeDef[0]?.children?.filter(child => child.key.toLowerCase() === path);
    const args = child && child[0]?.args;

    this.setState({
      ...this.state,
      path,
      args,
      route: hash,
    });
  }
}

export default Router;
