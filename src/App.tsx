import * as React from 'react';
import './App.css';
import Header from './components/Header';
import Router, { RouteDefinition } from './components/Router';
import AboutRoute from './components/routes/about/AboutRoute';
import HomeRoute from './components/routes/home/HomeRoute';
import PapersRoute from './components/routes/papers/PapersRoute';
import ProjectsRoute from './components/routes/ProjectsRoute';
import Sidebar, { SidebarDefinition } from './components/sidebar/Sidebar';
import { onLargeScreen, onSmallScreen } from './components/utils/resizeWatcher';

interface AppDefinition extends RouteDefinition, SidebarDefinition {}

const appDefinition: AppDefinition[] = [
  { key: 'Home', route: HomeRoute },
  { key: 'Papers', route: PapersRoute },
  {
    key: 'Projects',
    route: ProjectsRoute,
    children: [
      { key: 'validtyped' },
      { key: 'simplytyped' },
      { key: 'maybetyped' },
    ]
  },
  { key: 'About', route: AboutRoute },
];

interface AppState {
  orientation: 'row' | 'column';
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = { orientation: 'row' };
  }

  public componentWillMount() {
    onSmallScreen(() => this.setState({ orientation: 'column' }));
    onLargeScreen(() => this.setState({ orientation: 'row' }));
  }

  public render() {
    const height = this.state.orientation === 'column'
      ? undefined
      : '100%';

    const overflowY = this.state.orientation === 'column'
      ? undefined
      : 'auto';

    return (
      <div className="App">
        <Header />
        <div style={{ display: 'flex', height, flexDirection: this.state.orientation }}>
          <Sidebar routes={appDefinition} />
          <div style={{overflowY, flex: '5 1 0', paddingRight: '2em', paddingTop: '1em', paddingLeft: '2em' }}>
            <Router routes={appDefinition} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
