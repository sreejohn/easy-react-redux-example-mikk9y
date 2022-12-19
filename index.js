import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import Counter from './components/counter';
import './style.css';
import { PersistGate } from 'redux-persist/integration/react';
import UsersTable from './components/UsersTable';
import UniversityList from './components/Universities';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
const { store, persistor } = configureStore();

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={UniversityList} />
            <Route exact path="/counter" component={Counter} />
            <Route exact path="/users" component={UsersTable} />
            <Route exact path="/universities" component={UniversityList} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const App1 = () => {
  return <div>sfd</div>;
};
const AppWithStore = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}></PersistGate>
  </Provider>
);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// render(<AppWithStore />, document.getElementById('root'));
