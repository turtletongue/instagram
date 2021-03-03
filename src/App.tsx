import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { State } from './redux/store';
import Fonts from './components/fonts/fonts.component';
import SignIn from './pages/signIn/signIn.component';
import HomePage from './pages/homepage/homepage.component';

const App = () => {
  const isAuth: boolean = useSelector((state: State) => state.signIn.isAuth);
  return (
    <>
      <Fonts />
      <Switch>
        <Route exact path="/" render={() => isAuth ? <HomePage /> : <SignIn /> } />
      </Switch>
    </>
  );
}

export default App;
