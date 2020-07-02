import React from 'react';
import { Provider } from 'react-redux';
import { Container } from 'reactstrap';

import store from './store';
import { loadUser } from './actions/authActions';
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/ItemModal';
// import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends React.Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <AppNavbar />
        <Container>
          <ItemModal />
          <ShoppingList />
        </Container>
        {/* <Footer /> */}
      </Provider>
    );
  }
}

export default App;
