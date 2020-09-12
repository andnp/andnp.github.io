import * as React from 'react';
import './App.css';
import Header from './components/Header';
import Router from './components/Router';

import Sidebar from './components/sidebar/Sidebar';
import { onLargeScreen, onSmallScreen } from './components/utils/resizeWatcher';
import { appDefinition } from './content/layout';

interface AppState {
  orientation: 'row' | 'column';
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = { orientation: 'row' };
  }

  public componentDidMount() {
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
      <div className="App" style={{ height }}>
        <Header />
        <div style={{ display: 'flex', flex: 1, overflowY: 'auto', flexDirection: this.state.orientation }}>
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
