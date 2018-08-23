import * as React from 'react';

export type RouteableComponent = React.ComponentClass<{path?: string}>;

export interface RouteDefinition {
  key: string;
  route: RouteableComponent;
}

interface RouteDescription {
  [state: string]: RouteableComponent;
}

const normalizeRouteDescriptions = (defs: RouteDefinition[]): RouteDescription => {
  return defs.reduce((coll, def) => {
    coll[def.key.toLowerCase()] = def.route;
    return coll;
  }, {} as RouteDescription);
};

interface RouterState {
  routes: RouteDescription;
  route: string;
  path: string;
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
      routes: normalizeRouteDescriptions(props.routes),
    };
  }

  public componentDidMount() {
    window.addEventListener('hashchange', this.onHashChange);
    this.navigateToHash(window.location.href);
  }

  public componentWillUnmount() {
    window.removeEventListener('hashchange', this.onHashChange);
  }

  public shouldComponentUpdate(nextProps: {}, nextState: RouterState) {
    return this.state.route !== nextState.route || this.state.path !== nextState.path;
  }

  public render() {
    const Route = this.state.routes[this.state.route];
    if (!Route) throw new Error('Attempted to load undefined route' + this.state.route);
    return <Route path={this.state.path} />
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
    if (!(hash in this.state.routes)) {
      window.location.hash = this.state.route;
      return;
    }

    this.setState({
      ...this.state,
      path,
      route: hash,
    });
  }
}

export default Router;