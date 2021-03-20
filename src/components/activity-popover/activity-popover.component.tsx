import { Text } from "@chakra-ui/layout";
import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/popover";
import { ReactNode } from "react";
import { IActivity } from "../../redux/activities/activities.slice";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import Activity from "../activity/activity.component";

interface ActivityPopoverProps {
  children: ReactNode;
  [propName: string]: any;
}

const ActivityPopover = ({ children, ...otherProps }: ActivityPopoverProps) => {
  const lastActivities: IActivity[] = useAppSelector(
    (state: RootState) => state.activities.lastActivities
  );
  return (
    <Popover {...otherProps}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent minH="15rem" sx={{ "&:focus": { boxShadow: "none" } }}>
        <PopoverArrow />
        <PopoverHeader>
          <Text fontWeight="500" fontSize="sm">
            This Month
          </Text>
        </PopoverHeader>
        <PopoverBody w="100%">
          {lastActivities.map((activity: IActivity, index: number) => {
            return <Activity key={index} data={activity} />;
          })}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default ActivityPopover;
