import { Flex } from "@chakra-ui/layout";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { IUser } from "../../redux/user/user.slice";
import ChangePasswordForm from "../change-password-form/change-password-form.component";
import ProfileEditForm from "../profile-edit-form/profile-edit-form.component";
import ProfileEditTabs from "../profile-edit-tabs/profile-edit-tabs.component";

interface ProfileEditCardProps {
  user: IUser;
}

const ProfileEditCard = ({ user }: ProfileEditCardProps) => {
  const activeTabId: number = useAppSelector(
    (state: RootState) => state.profileEditPage.activeTabId
  );
  return (
    <Flex
      align="center"
      bgColor="white"
      borderWidth="1px"
      borderRadius="5px"
      overflow="hidden"
      w="65%"
      h="85vh"
      position="relative"
      top="2rem"
    >
      <ProfileEditTabs />
      {activeTabId === 0 ? (
        <ProfileEditForm user={user} /> // Edit Profile
      ) : (
        <ChangePasswordForm user={user} /> // Change Password
      )}
    </Flex>
  );
};

export default ProfileEditCard;
