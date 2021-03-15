// import { useEffect } from "react";
import { Route } from "react-router";
import { Switch } from "react-router-dom";
import Fonts from "./components/fonts/fonts.component";
import HomePage from "./pages/homepage/homepage.component";
import SignIn from "./pages/signIn/signIn.component";
import { useAppSelector } from "./redux/hooks";
import { RootState } from "./redux/store";
// import { fetchEmojies } from "./redux/emojies/emojies.actions";
// import { fetchPosts } from "./redux/posts/posts.actions";

const App = () => {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchPosts());
  //   dispatch(fetchEmojies());
  // }, [dispatch]);
  const isAuth: boolean = useAppSelector((state: RootState) =>
    state.user.currentUser ? true : false
  );
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
          {/* <Route path="/p/:postId">
            <PostPage />
          </Route>
          <Route path="/:userId">
            <UserPage />
          </Route> */}
        </Switch>
      )}
    </>
  );
};

export default App;
