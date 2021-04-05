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
  resetUpdateAvatarUrlSuccess,
  resetUpdateUserDataStatus,
  resetUpdateUserPasswordStatus,
  resetUploadedImageUrl,
  updateAvatarUrl,
} from "../../redux/profile-edit-page/profile-edit-page.slice";
import { RootState } from "../../redux/store";
import { IUser, requestUserById } from "../../redux/user/user.slice";

const EditProfilePage = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const loggedUser: IUser = useAppSelector(
    (state: RootState) => state.user.currentUser
  ) as IUser;
  const token: string | null = localStorage.getItem("authToken");
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
      dispatch(requestUserById({ input: { userId: +loggedUser.id } }));
    } else if (removePhotoSuccess === false) {
      toast({
        title: "An error occurred while deleting the photo.",
        status: "error",
        isClosable: true,
      });
      dispatch(resetRemovePhotoStatus());
    }
  }, [dispatch, toast, removePhotoSuccess, loggedUser]);
  useEffect(() => {
    dispatch(
      initInputs({
        username: loggedUser?.username ? loggedUser.username : "",
        name: loggedUser?.name ? loggedUser.name : "",
        bio: loggedUser?.bio ? loggedUser.bio : "",
      })
    );
  }, [dispatch, loggedUser]);
  const uploadedImageUrl: string | null = useAppSelector(
    (state: RootState) => state.profileEditPage.uploadedImageUrl
  );
  const updateAvatarUrlSuccess: boolean | null = useAppSelector(
    (state: RootState) => state.profileEditPage.updateAvatarUrlSuccess
  );
  useEffect(() => {
    if (uploadedImageUrl && token) {
      dispatch(updateAvatarUrl({ avatarUrl: uploadedImageUrl, token }));
      dispatch(resetUploadedImageUrl());
    }
  }, [dispatch, uploadedImageUrl, token]);
  useEffect(() => {
    if (updateAvatarUrlSuccess) {
      toast({
        title: "Profile photo was updated.",
        status: "success",
        isClosable: true,
      });
      dispatch(resetUpdateAvatarUrlSuccess());
      dispatch(requestUserById({ input: { userId: +loggedUser.id } }));
    } else if (updateAvatarUrlSuccess === false) {
      toast({
        title: "An error occurred while updating the photo.",
        status: "error",
        isClosable: true,
      });
      dispatch(resetUpdateAvatarUrlSuccess());
    }
  }, [dispatch, loggedUser, toast, updateAvatarUrlSuccess]);
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
