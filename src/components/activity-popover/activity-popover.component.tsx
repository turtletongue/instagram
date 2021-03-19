import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/popover";
import { ReactNode } from "react";

interface ActivityPopoverProps {
  children: ReactNode;
  [propName: string]: any;
}

const ActivityPopover = ({ children, ...otherProps }: ActivityPopoverProps) => {
  return (
    <Popover {...otherProps}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent sx={{ "&:focus": { boxShadow: "none" } }}>
        <PopoverArrow />
        <PopoverBody></PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default ActivityPopover;
