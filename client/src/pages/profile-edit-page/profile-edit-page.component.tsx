import { Center } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Header from "../../components/header/header.component";
import LoadingScreen from "../../components/loading-screen/loading-screen.component";
import ProfileEditCard from "../../components/profile-edit-card/profile-edit-card.component";
import { useAppSelector } from "../../redux/hooks";
import {
  initInputs,
  resetPasswordInputs,
  resetRemovePhotoStatus,
  resetUpdateUserDataStatus,
  resetUpdateUserPasswordStatus,
} from "../../redux/profile-edit-page/profile-edit-page.slice";
import { RootState } from "../../redux/store";
import { IUser } from "../../redux/user/user.slice";

const EditProfilePage = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const loggedUser: IUser = useAppSelector(
    (state: RootState) => state.user.currentUser
  ) as IUser;
  const isLoading: boolean = useAppSelector(
    (state: RootState) => state.user.userLoading === "loading"
  );
  const isUpdateUserDataSuccess: boolean | null = useAppSelector(
    (state: RootState) => state.profileEditPage.updateUserDataSuccess
  );
  const isUpdateUserPasswordSuccess: boolean | null = useAppSelector(
    (state: RootState) => state.profileEditPage.updateUserPasswordSuccess
  );
  const removePhotoSuccess: boolean | null = useAppSelector(
    (state: RootState) => state.profileEditPage.removePhotoSuccess
  );
  useEffect(() => {
    if (isUpdateUserDataSuccess) {
      toast({
        title: "Data was updated.",
        description: "Changes have been made.",
        status: "success",
        isClosable: true,
      });
      dispatch(resetUpdateUserDataStatus());
    } else if (isUpdateUserDataSuccess === false) {
      toast({
        title: "Some error occured.",
        description: "Check that the data is correct.",
        status: "error",
        isClosable: true,
      });
      dispatch(resetUpdateUserDataStatus());
    }
    if (isUpdateUserPasswordSuccess) {
      toast({
        title: "Password was updated.",
        description: "Changes have been made.",
        status: "success",
        isClosable: true,
      });
      dispatch(resetUpdateUserPasswordStatus());
      dispatch(resetPasswordInputs());
    } else if (isUpdateUserPasswordSuccess === false) {
      toast({
        title: "Some error occured.",
        description: "Check that the password is correct.",
        status: "error",
        isClosable: true,
      });
      dispatch(resetUpdateUserPasswordStatus());
    }
  }, [dispatch, toast, isUpdateUserDataSuccess, isUpdateUserPasswordSuccess]);
  useEffect(() => {
    if (removePhotoSuccess) {
      toast({
        title: "Profile photo was deleted.",
        status: "success",
        isClosable: true,
      });
      dispatch(resetRemovePhotoStatus());
    } else if (removePhotoSuccess === false) {
      toast({
        title: "An error occurred while deleting a photo.",
        status: "error",
        isClosable: true,
      });
      dispatch(resetRemovePhotoStatus());
    }
  }, [dispatch, toast, removePhotoSuccess]);
  useEffect(() => {
    dispatch(
      initInputs({
        username: loggedUser?.username ? loggedUser.username : "",
        name: loggedUser?.name ? loggedUser.name : "",
        bio: loggedUser?.bio ? loggedUser.bio : "",
      })
    );
  }, [dispatch, loggedUser]);
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
