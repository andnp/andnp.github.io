import * as React from 'react';

interface RouterState {
  routes: Record</* state */ string, /* component */ JSX.Element>;
  route: string;
}

interface RouterProps {
  children: JSX.Element[];
}

interface RouteProps {
  children: JSX.Element;
  route: string;
}

class Route extends React.Component<RouteProps> {
  public route = this.props.route;
  public render() {
    return this.props.children;
  }
}

class Router extends React.Component<RouterProps, RouterState> {
  constructor(props: RouterProps) {
    super(props);
    const routes = props.children.reduce((coll, route) => {
      if (!(route instanceof Route)) throw new Error('Expected Router children to be instances of Route'); // tslint:disable-line curly

      coll[route.route] = route;

      return coll;
    }, {} as Record<string, JSX.Element>);

    this.state = {
      route: 'index',
      routes,
    };
  }

  public componentDidMount() {
    window.addEventListener('hashchange', this.onHashChange);
  }

  public componentWillUnmount() {
    window.removeEventListener('hashchange', this.onHashChange);
  }

  public render() {
    const route = this.state.routes[this.state.route];
    if (!route) throw new Error('Attempted to load undefined route' + this.state.route); // tslint:disable-line curly
    return route;
  }

  private onHashChange = (e: HashChangeEvent) => {
    const url = e.newURL;
    const match = url.split('#');
    if (match.length !== 2) return; // tslint:disable-line curly
    const [ /* uri */, hash ] = match;
    
    if (!(hash in this.state.routes)) return // tslint:disable-line curly

    this.setState({
      route: hash,
      ...this.state,
    });
  }
}

export default Router;