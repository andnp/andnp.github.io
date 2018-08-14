import * as React from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/sidebar/Sidebar';
import Markdown from './components/utils/Markdown';
import { projectReadme } from './services/github';

class App extends React.Component<{}, { md: string }> {
  constructor(props: {}) {
    super(props);
    this.state = {
      md: '',
    };

    projectReadme('andnp', 'validtyped').then(readme => this.setState({
      md: readme,
    }));
  }
  public render() {
    return (
      <div className="App">
        <Header />
        <div style={{ display: 'flex', height: '100%' }}>
          <Sidebar />
          <Markdown raw={this.state.md} />
          <p className="App-intro">
            To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        </div>
      </div>
    );
  }
}

export default App;
