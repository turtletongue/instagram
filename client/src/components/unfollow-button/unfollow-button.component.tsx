import BorderButton from "../border-button/border-button.component";

interface UnfollowButtonProps {
  onUnfollowModalOpen: () => void;
}

const UnfollowButton = ({ onUnfollowModalOpen }: UnfollowButtonProps) => {
  return (
    <BorderButton
      onClick={onUnfollowModalOpen}
      bgColor="white"
      sx={{
        "&:hover, &:focus": {
          bgColor: "white",
          boxShadow: "none",
        },
        "&:active": {
          boxShadow: "none",
          opacity: 0.6,
        },
      }}
    >
      Following
    </BorderButton>
  );
};

export default UnfollowButton;
