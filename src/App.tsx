import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Fonts from "./components/fonts/fonts.component";
import HomePage from "./pages/homepage/homepage.component";
import PostPage from "./pages/post-page/post-page.component";
import SignIn from "./pages/signIn/signIn.component";
import { State } from "./redux/store";

const App = () => {
  const isAuth: boolean = useSelector((state: State) => state.signIn.isAuth);
  return (
    <>
      <Fonts />
      <Switch>
        <Route
          exact
          path="/"
          render={() => (isAuth ? <HomePage /> : <SignIn />)}
        />
        <Route path="/p/:postId">
          <PostPage />
        </Route>
      </Switch>
    </>
  );
};

export default App;
