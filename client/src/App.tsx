import { lazy, Suspense, useEffect } from "react";
import { Route } from "react-router";
import { Switch } from "react-router-dom";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";
import Fonts from "./components/fonts/fonts.component";
import LoadingScreen from "./components/loading-screen/loading-screen.component";
import { requestLastActivities } from "./redux/activities/activities.slice";
import { incrementPostSlice } from "./redux/feed/feed.slice";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { RootState } from "./redux/store";
import { checkIsLogged, requestUserById } from "./redux/user/user.slice";
const HomePage = lazy(() => import("./pages/homepage/homepage.component"));
const PostPage = lazy(() => import("./pages/post-page/post-page.component"));
const EditProfilePage = lazy(
  () => import("./pages/profile-edit-page/profile-edit-page.component")
);
const SignIn = lazy(() => import("./pages/signIn/signIn.component"));
const SignUpPage = lazy(
  () => import("./pages/signup-page/signup-page.component")
);
const UserPage = lazy(() => import("./pages/user-page/user-page.component"));

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
      <ErrorBoundary>
        <Suspense fallback={<LoadingScreen />}>
          {!isAuth ? (
            <Switch>
              <Route path="/accounts/emailsignup">
                <SignUpPage />
              </Route>
              <Route path="/">
                <SignIn />
              </Route>
            </Switch>
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
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default App;
