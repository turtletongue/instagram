import { useEffect } from "react";
import { Route } from "react-router";
import { Switch } from "react-router-dom";
import Fonts from "./components/fonts/fonts.component";
import HomePage from "./pages/homepage/homepage.component";
import PostPage from "./pages/post-page/post-page.component";
import EditProfilePage from "./pages/profile-edit-page/profile-edit-page.component";
import SignIn from "./pages/signIn/signIn.component";
import UserPage from "./pages/user-page/user-page.component";
import { requestLastActivities } from "./redux/activities/activities.slice";
import {
  incrementPostSlice,
  requestSliceOfPosts,
} from "./redux/feed/feed.slice";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { RootState } from "./redux/store";
import { checkIsLogged, requestUserById } from "./redux/user/user.slice";

const App = () => {
  const dispatch = useAppDispatch();
  const slice: number = useAppSelector(
    (state: RootState) => state.feed.lastPostsSlice
  );
  useEffect(() => {
    dispatch(checkIsLogged());
    dispatch(
      requestLastActivities({
        testData: [
          {
            author: {
              userId: "alternative.disney",
              avatarUrl:
                "https://scontent-frx5-1.cdninstagram.com/v/t51.2885-19/s320x320/37180174_2128883647392391_2180509584274227200_n.jpg?tp=1&_nc_ht=scontent-frx5-1.cdninstagram.com&_nc_ohc=p-XguE5bCK8AX9v4QS1&oh=80bd6ca7e744d819747cd5253d77a6fb&oe=606DB111",
              fullname: "Alternative Disney",
            },
            type: "LIKE",
            activityReceiverContent: "nice",
            postId: 32323,
          },
        ],
      })
    );
  }, [dispatch]);
  const isAuth: boolean = useAppSelector(
    (state: RootState) => state.user.isLoggedIn
  );
  const userId: number | null = useAppSelector(
    (state: RootState) => state.user.userId
  );
  const token: string | null = localStorage.getItem("authToken");
  useEffect(() => {
    if (isAuth && !!userId && token) {
      dispatch(requestUserById({ input: { userId } }));
    }
  }, [dispatch, isAuth, userId, token]);
  useEffect(() => {
    dispatch(incrementPostSlice());
  }, [dispatch]);
  useEffect(() => {
    dispatch(requestSliceOfPosts({ input: { slice, token } }));
  }, [dispatch, slice, token]);
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
          <Route path="/accounts/edit">
            <EditProfilePage />
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
