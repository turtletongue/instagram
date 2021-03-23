import { Center } from "@chakra-ui/layout";
import Header from "../../components/header/header.component";
import LoadingScreen from "../../components/loading-screen/loading-screen.component";
import ProfileEditCard from "../../components/profile-edit-card/profile-edit-card.component";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { IUser } from "../../redux/user/user.slice";

const EditProfilePage = () => {
  const loggedUser: IUser = useAppSelector(
    (state: RootState) => state.user.currentUser
  ) as IUser;
  const isLoading: boolean = false;
  return (
    <>
      <Header />
      {!isLoading ? (
        <Center w="100%" minH="100vh" bgColor="#fafafa">
          <ProfileEditCard user={loggedUser} />
        </Center>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

export default EditProfilePage;
