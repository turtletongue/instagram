import { Box, Text } from "@chakra-ui/layout";
import { useAppDispatch } from "../../redux/hooks";
import { activateTab } from "../../redux/profile-edit-page/profile-edit-page.slice";

interface ProfileEditTabProps {
  id: number;
  title: string;
  isActive: boolean;
}

const ProfileEditTab = ({ id, title, isActive }: ProfileEditTabProps) => {
  const dispatch = useAppDispatch();
  return (
    <Box
      onClick={() => dispatch(activateTab(id))}
      p="1rem 2rem"
      w="100%"
      fontWeight={isActive ? "500" : ""}
      borderLeftWidth="0.15rem"
      borderLeftColor={isActive ? "black" : "transparent"}
      cursor="pointer"
      sx={
        isActive
          ? {}
          : {
              "&:hover": {
                bgColor: "#fafafa",
                borderLeftColor: "#dbdbdb",
              },
            }
      }
    >
      <Text fontSize="md" userSelect="none">
        {title}
      </Text>
    </Box>
  );
};

export default ProfileEditTab;
