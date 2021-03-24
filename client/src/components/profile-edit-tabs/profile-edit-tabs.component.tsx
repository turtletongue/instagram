import { VStack } from "@chakra-ui/layout";
import { useAppSelector } from "../../redux/hooks";
import { ITab } from "../../redux/profile-edit-page/profile-edit-page.slice";
import { RootState } from "../../redux/store";
import ProfileEditTab from "../profile-edit-tab/profile-edit-tab.component";

const ProfileEditTabs = () => {
  const tabs: ITab[] = useAppSelector(
    (state: RootState) => state.profileEditPage.tabs
  );
  const activeTabId: number = useAppSelector(
    (state: RootState) => state.profileEditPage.activeTabId
  );
  return (
    <VStack
      spacing={0}
      bgColor="white"
      w="20rem"
      h="100%"
      borderRightWidth="1px"
    >
      {tabs.map((tab: ITab, index: number) => {
        return (
          <ProfileEditTab
            key={index}
            id={tab.id}
            title={tab.title}
            isActive={tab.id === activeTabId}
          />
        );
      })}
    </VStack>
  );
};

export default ProfileEditTabs;
