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
import { requestEmojies } from "./redux/emojies/emojies.slice";
import { requestSliceOfPosts } from "./redux/feed/feed.slice";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { RootState } from "./redux/store";

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      requestSliceOfPosts({
        testData: {
          posts: [
            {
              id: 32323,
              author: {
                userId: "alternative.disney",
                fullname: "Alternative Disney",
                avatarUrl:
                  "https://scontent-frx5-1.cdninstagram.com/v/t51.2885-19/s320x320/37180174_2128883647392391_2180509584274227200_n.jpg?tp=1&_nc_ht=scontent-frx5-1.cdninstagram.com&_nc_ohc=p-XguE5bCK8AX9v4QS1&oh=80bd6ca7e744d819747cd5253d77a6fb&oe=606DB111",
              },
              imagesUrls: [
                "https://scontent-arn2-1.cdninstagram.com/v/t51.2885-15/fr/e15/s1080x1080/155789273_770007063608934_120234005437861096_n.jpg?tp=1&_nc_ht=scontent-arn2-1.cdninstagram.com&_nc_cat=1&_nc_ohc=hSW3tHEk1GYAX8xMnU2&oh=10f1ad2d881737396eacbbc8362bc0d4&oe=606D1DB9",
              ],
              likesCount: 2454,
              isLiked: false,
              isBookmarked: false,
              isDataVisible: false,
              createdAt: new Date().toISOString(),
              comments: [
                {
                  id: 1,
                  postId: 32323,
                  authorId: "lindsayjmariiiie",
                  content: "@lindsayjmarie",
                  writedAt: new Date(2021, 2, 5).toISOString(),
                  likersIds: [],
                  isLiked: false,
                  replies: [],
                },
                {
                  id: 2,
                  postId: 32323,
                  authorId: "lindsayjmarie",
                  content: "Hello there!",
                  writedAt: new Date(2021, 2, 5).toISOString(),
                  likersIds: [],
                  isLiked: false,
                  replies: [],
                },
              ],
            },
          ],
          postsSlice: 0,
        },
      })
    );
    dispatch(
      requestEmojies({
        testData: [
          { id: 1, content: "😀" },
          { id: 2, content: "🤩" },
          { id: 3, content: "☺" },
          { id: 4, content: "👺" },
          { id: 5, content: "❤" },
        ],
      })
    );
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
