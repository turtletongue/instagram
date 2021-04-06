import { useDisclosure } from "@chakra-ui/hooks";
import { Box, Flex, Text, VStack } from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/media-query";
import { Textarea } from "@chakra-ui/textarea";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  setBioInput,
  setNameInput,
  setUsernameInput,
  updateUserData,
} from "../../redux/profile-edit-page/profile-edit-page.slice";
import { RootState } from "../../redux/store";
import { IUser } from "../../redux/user/user.slice";
import Avatar from "../avatar/avatar.component";
import ChangePhotoModal from "../change-photo-modal/change-photo-modal.component";
import ProfileEditInput from "../profile-edit-input/profile-edit-input.component";
import SubmitButton from "../submit-button/submit-button.component";

interface ProfileEditFormProps {
  user: IUser;
}

const ProfileEditForm = ({ user }: ProfileEditFormProps) => {
  const dispatch = useAppDispatch();
  const nameInput: string = useAppSelector(
    (state: RootState) => state.profileEditPage.editProfile.name
  );
  const usernameInput: string = useAppSelector(
    (state: RootState) => state.profileEditPage.editProfile.username
  );
  const bioInput: string = useAppSelector(
    (state: RootState) => state.profileEditPage.editProfile.bio
  );
  const token: string | null = localStorage.getItem("authToken");
  const submitHandler = () => {
    if (token && usernameInput) {
      dispatch(
        updateUserData({
          username: usernameInput,
          name: nameInput,
          bio: bioInput,
          token,
        })
      );
    }
  };
  const {
    isOpen: isChangePhotoModalOpen,
    onOpen: onChangePhotoModalOpen,
    onClose: onChangePhotoModalClose,
  } = useDisclosure();
  const [isLessThan820] = useMediaQuery("(max-width: 820px)");
  return (
    <>
      <ChangePhotoModal
        isOpen={isChangePhotoModalOpen}
        onClose={onChangePhotoModalClose}
      />
      <VStack w="100%" spacing="1rem" p={isLessThan820 ? "0 1rem" : 0}>
        <Flex w={isLessThan820 ? "90%" : "60%"} align="center">
          <Avatar
            src={user?.avatarUrl}
            h="2.5rem"
            w="2.5rem"
            onClick={onChangePhotoModalOpen}
          />
          <Box ml="1.5rem">
            <Text fontSize="xl" fontWeight="400">
              {user?.username}
            </Text>
            <Text
              cursor="pointer"
              color="#0095f6"
              fontSize="sm"
              fontWeight="500"
              userSelect="none"
              sx={{ "&:active": { opacity: 0.6 } }}
              onClick={onChangePhotoModalOpen}
            >
              Change Profile Photo
            </Text>
          </Box>
        </Flex>
        <Flex
          w={isLessThan820 ? "100%" : "80%"}
          align={isLessThan820 ? "" : "center"}
          direction={isLessThan820 ? "column" : "row"}
        >
          <Text
            fontSize="md"
            fontWeight="500"
            w="7rem"
            textAlign={isLessThan820 ? "unset" : "end"}
          >
            Name
          </Text>
          <ProfileEditInput
            ml={isLessThan820 ? 0 : "1.5rem"}
            value={nameInput}
            onChange={(event: { target: HTMLInputElement }) =>
              dispatch(setNameInput(event.target.value))
            }
          />
        </Flex>
        <Flex
          w={isLessThan820 ? "100%" : "80%"}
          align={isLessThan820 ? "" : "center"}
          direction={isLessThan820 ? "column" : "row"}
        >
          <Box w="8.5rem" />
          <Text
            fontSize="0.7rem"
            color="#929292"
            textAlign="justify"
            w={isLessThan820 ? "100%" : "65%"}
          >
            Help people discover your account by using the name you're known by:
            either your full name, nickname, or business name.
          </Text>
        </Flex>
        <Flex
          w={isLessThan820 ? "100%" : "80%"}
          align={isLessThan820 ? "" : "center"}
          direction={isLessThan820 ? "column" : "row"}
        >
          <Text
            fontSize="md"
            fontWeight="500"
            w="7rem"
            textAlign={isLessThan820 ? "unset" : "end"}
          >
            Username
          </Text>
          <ProfileEditInput
            ml={isLessThan820 ? 0 : "1.5rem"}
            value={usernameInput}
            onChange={(event: { target: HTMLInputElement }) =>
              dispatch(setUsernameInput(event.target.value))
            }
          />
        </Flex>
        <Flex
          w={isLessThan820 ? "100%" : "80%"}
          align={isLessThan820 ? "" : "center"}
          direction={isLessThan820 ? "column" : "row"}
        >
          <Text
            fontSize="md"
            fontWeight="500"
            w="7rem"
            textAlign={isLessThan820 ? "unset" : "end"}
          >
            Bio
          </Text>
          <Textarea
            ml={isLessThan820 ? 0 : "1.5rem"}
            w={isLessThan820 ? "100%" : "65%"}
            borderRadius={3}
            borderColor="#adadad"
            value={bioInput}
            onChange={(event: { target: HTMLTextAreaElement }) =>
              dispatch(setBioInput(event.target.value))
            }
            sx={{
              "&:focus, &:active": {
                boxShadow: "none",
                outline: "-webkit-focus-ring-color auto 5px",
                borderColor: "black",
              },
            }}
          />
        </Flex>
        <Flex w={isLessThan820 ? "100%" : "80%"} align="center" pt="1rem">
          {!isLessThan820 ? <Box w="8.5rem" /> : <></>}
          <SubmitButton isActive={!!usernameInput} onClick={submitHandler} />
        </Flex>
      </VStack>
    </>
  );
};

export default ProfileEditForm;
