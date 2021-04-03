import { Box, Flex, Text, VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { MIN_PASSWORD_LENGTH } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  setConfirmNewPasswordInput,
  setNewPasswordInput,
  setOldPasswordInput,
  updateUserPassword,
} from "../../redux/profile-edit-page/profile-edit-page.slice";
import { RootState } from "../../redux/store";
import { IUser } from "../../redux/user/user.slice";
import Avatar from "../avatar/avatar.component";
import ChangePasswordButton from "../change-password-button/change-password-button.component";
import ChangePasswordInput from "../change-password-input/change-password-input.component";

interface ChangePasswordFormProps {
  user: IUser;
}

const ChangePasswordForm = ({ user }: ChangePasswordFormProps) => {
  const dispatch = useAppDispatch();
  const oldPasswordInput: string = useAppSelector(
    (state: RootState) => state.profileEditPage.changePassword.oldPassword
  );
  const newPasswordInput: string = useAppSelector(
    (state: RootState) => state.profileEditPage.changePassword.newPassword
  );
  const confirmNewPasswordInput: string = useAppSelector(
    (state: RootState) =>
      state.profileEditPage.changePassword.confirmNewPassword
  );
  const token: string | null = localStorage.getItem("authToken");
  const toast = useToast();
  const changePasswordHandler = () => {
    if (
      !(!!oldPasswordInput && !!newPasswordInput && !!confirmNewPasswordInput)
    ) {
      return;
    } else if (newPasswordInput.length < MIN_PASSWORD_LENGTH) {
      toast({
        title: "Password is too small.",
        description: `Min password length is ${MIN_PASSWORD_LENGTH}`,
        status: "error",
      });
      return;
    } else if (newPasswordInput !== confirmNewPasswordInput) {
      toast({
        title: "Passwords do not match.",
        description: "Check that the data is correct.",
        status: "error",
      });
      return;
    } else if (token) {
      dispatch(
        updateUserPassword({
          oldPassword: oldPasswordInput,
          newPassword: newPasswordInput,
          token,
        })
      );
    }
  };
  return (
    <VStack w="100%" spacing="1rem">
      <Flex w="60%" align="center">
        <Avatar src={user.avatarUrl} h="2.5rem" w="2.5rem" />
        <Text ml="1.5rem" fontSize="2xl" fontWeight="400">
          {user.username}
        </Text>
      </Flex>
      <Flex pt="1rem" w="80%" align="center">
        <Text fontSize="md" fontWeight="500" w="9rem" textAlign="end">
          Old Password
        </Text>
        <ChangePasswordInput
          ml="1.5rem"
          value={oldPasswordInput}
          onChange={(event: { target: HTMLInputElement }) =>
            dispatch(setOldPasswordInput(event.target.value))
          }
        />
      </Flex>
      <Flex w="80%" align="center">
        <Text fontSize="md" fontWeight="500" w="9rem" textAlign="end">
          New Password
        </Text>
        <ChangePasswordInput
          ml="1.5rem"
          value={newPasswordInput}
          onChange={(event: { target: HTMLInputElement }) =>
            dispatch(setNewPasswordInput(event.target.value))
          }
        />
      </Flex>
      <Flex w="80%" align="center">
        <Text fontSize="md" fontWeight="500" w="9rem" textAlign="end">
          Confirm New Password
        </Text>
        <ChangePasswordInput
          ml="1.5rem"
          value={confirmNewPasswordInput}
          onChange={(event: { target: HTMLInputElement }) =>
            dispatch(setConfirmNewPasswordInput(event.target.value))
          }
        />
      </Flex>
      <Flex w="80%" align="center">
        <Box w="8rem" />
        <Box>
          <ChangePasswordButton
            isActive={
              !!oldPasswordInput &&
              !!newPasswordInput &&
              !!confirmNewPasswordInput
            }
            onClick={changePasswordHandler}
          />
          <Text
            mt="1rem"
            color="#0095f6"
            fontSize="sm"
            fontWeight="500"
            cursor="pointer"
            userSelect="none"
            sx={{ "&:active": { opacity: 0.6 } }}
          >
            Forgot Password?
          </Text>
        </Box>
      </Flex>
    </VStack>
  );
};

export default ChangePasswordForm;
