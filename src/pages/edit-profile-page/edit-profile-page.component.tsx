import { Center } from "@chakra-ui/layout";
import Header from "../../components/header/header.component";
import LoadingScreen from "../../components/loading-screen/loading-screen.component";
import ProfileEditCard from "../../components/profile-edit-card/profile-edit-card.component";

const EditProfilePage = () => {
  const isLoading: boolean = false;
  return (
    <>
      <Header />
      {!isLoading ? (
        <Center w="100%" minH="100vh" bgColor="#fafafa">
          <ProfileEditCard />
        </Center>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

export default EditProfilePage;
