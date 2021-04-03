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
import { incrementPostSlice } from "./redux/feed/feed.slice";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { RootState } from "./redux/store";
import { checkIsLogged, requestUserById } from "./redux/user/user.slice";

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(checkIsLogged());
  }, [dispatch]);
  const isAuth: boolean = useAppSelector(
    (state: RootState) => state.user.isLoggedIn
  );
  const userId: number | null = useAppSelector(
    (state: RootState) => state.user.userId
  );
  const token: string | null = localStorage.getItem("authToken");
  const isUnfollowLoading: boolean = useAppSelector(
    (state: RootState) => state.userPage.unfollowLoading === "loading"
  );
  const isFollowLoading: boolean = useAppSelector(
    (state: RootState) => state.userPage.followLoading === "loading"
  );
  useEffect(() => {
    if (isAuth && !!userId && token) {
      dispatch(requestUserById({ input: { userId: Number(userId) } }));
    }
  }, [dispatch, isAuth, userId, token, isUnfollowLoading, isFollowLoading]);
  useEffect(() => {
    dispatch(incrementPostSlice());
  }, [dispatch]);
  useEffect(() => {
    if (token) {
      dispatch(requestLastActivities(token));
    }
  }, [dispatch, token]);
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
          <Route path="/:username">
            <UserPage />
          </Route>
        </Switch>
      )}
    </>
  );
};

export default App;
