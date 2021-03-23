import { Box, Flex, Text, VStack } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  setBioInput,
  setNameInput,
  setUsernameInput,
} from "../../redux/profile-edit-page/profile-edit-page.slice";
import { RootState } from "../../redux/store";
import { IUser } from "../../redux/user/user.slice";
import Avatar from "../avatar/avatar.component";
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
  return (
    <VStack w="100%" spacing="1rem">
      <Flex w="60%" align="center">
        <Avatar src={user.avatarUrl} h="2.5rem" w="2.5rem" />
        <Box ml="1.5rem">
          <Text fontSize="xl" fontWeight="400">
            {user.userId}
          </Text>
          <Text
            cursor="pointer"
            color="#0095f6"
            fontSize="sm"
            fontWeight="500"
            userSelect="none"
            sx={{ "&:active": { opacity: 0.6 } }}
          >
            Change Profile Photo
          </Text>
        </Box>
      </Flex>
      <Flex w="80%" align="center">
        <Text fontSize="md" fontWeight="500" w="7rem" textAlign="end">
          Name
        </Text>
        <ProfileEditInput
          ml="1.5rem"
          value={nameInput}
          onChange={(event: { target: HTMLInputElement }) =>
            dispatch(setNameInput(event.target.value))
          }
        />
      </Flex>
      <Flex w="80%" align="center">
        <Box w="8.5rem" />
        <Text fontSize="0.7rem" color="#929292" textAlign="justify" w="65%">
          Help people discover your account by using the name you're known by:
          either your full name, nickname, or business name.
        </Text>
      </Flex>
      <Flex w="80%" align="center">
        <Text fontSize="md" fontWeight="500" w="7rem" textAlign="end">
          Username
        </Text>
        <ProfileEditInput
          ml="1.5rem"
          value={usernameInput}
          onChange={(event: { target: HTMLInputElement }) =>
            dispatch(setUsernameInput(event.target.value))
          }
        />
      </Flex>
      <Flex w="80%" align="center">
        <Text fontSize="md" fontWeight="500" w="7rem" textAlign="end">
          Bio
        </Text>
        <Textarea
          ml="1.5rem"
          w="65%"
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
      <Flex w="80%" align="center" pt="1rem">
        <Box w="8.5rem" />
        <SubmitButton isActive={!!usernameInput} />
      </Flex>
    </VStack>
  );
};

export default ProfileEditForm;
