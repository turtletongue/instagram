import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Fonts from "./components/fonts/fonts.component";
import HomePage from "./pages/homepage/homepage.component";
import PostPage from "./pages/post-page/post-page.component";
import SignIn from "./pages/signIn/signIn.component";
import UserPage from "./pages/user-page/user-page.component";
import { fetchEmojies } from "./redux/emojies/emojies.actions";
import { fetchPosts } from "./redux/posts/posts.actions";
import { State } from "./redux/store";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchEmojies());
  }, [dispatch]);
  const isAuth: boolean = useSelector((state: State) => state.signIn.isAuth);
  return (
    <>
      <Fonts />
      {!isAuth ? (
        <SignIn />
      ) : (
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/p/:postId">
            <PostPage />
          </Route>
          <Route path="/:userId">
            <UserPage />
          </Route>
        </Switch>
      )}
    </>
  );
};

export default App;
