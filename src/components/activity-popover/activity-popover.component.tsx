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
}

const ActivityPopover = ({ children }: ActivityPopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody></PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default ActivityPopover;
