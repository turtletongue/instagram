import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import { IPost } from "../../redux/feed/feed.slice";
import PostContainer from "../post-container/post-container.component";

interface PostPageModalProps {
  post: IPost;
  isOpen: boolean;
  onClose: () => void;
  page?: string;
}

const PostPageModal = ({ post, isOpen, onClose, page }: PostPageModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="5xl">
      <ModalOverlay />
      <ModalContent
        overflow="hidden"
        borderRadius="3px"
        p={0}
        w="60rem"
        h="46.3rem"
        bgColor="transparent"
      >
        <ModalBody p={0} m="auto">
          <PostContainer post={post} full page={page} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PostPageModal;
