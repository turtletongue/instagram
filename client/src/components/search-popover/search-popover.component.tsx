import { Box, Flex, Text } from "@chakra-ui/layout";
import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/popover";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { closePopover } from "../../redux/search-input/search-input.slice";
import { IUser } from "../../redux/user/user.slice";
import Avatar from "../avatar/avatar.component";

interface SearchPopoverProps {
  searchedUsers: IUser[];
  isOpen: boolean;
  children: ReactNode;
  [propName: string]: any;
}

const SearchPopover = ({
  searchedUsers,
  isOpen,
  children,
  ...otherProps
}: SearchPopoverProps) => {
  const dispatch = useAppDispatch();
  return (
    <Popover
      autoFocus={false}
      isOpen={isOpen}
      closeOnBlur={true}
      {...otherProps}
    >
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent
        h="20rem"
        boxShadow="md"
        sx={{ "&:focus, &:active": { boxShadow: "none" } }}
      >
        <PopoverArrow />
        <PopoverBody h="100%" overflowY="scroll" p="0.5rem 0">
          {searchedUsers.map((searchedUser: IUser, index: number) => {
            return (
              <Link to={`/${searchedUser.userId}/`} key={index}>
                <Flex
                  onClick={() => dispatch(closePopover())}
                  align="center"
                  p="0.5rem"
                  w="100%"
                  cursor="pointer"
                  sx={{
                    "&:hover": { bgColor: "#fafafa" },
                    "&:active": { bgColor: "#f4f5f7" },
                  }}
                >
                  <Avatar src={searchedUser.avatarUrl} w="2.6rem" h="2.6rem" />
                  <Box ml="0.7rem">
                    <Text fontSize="sm" fontWeight="500">
                      {searchedUser.userId}
                    </Text>
                    {searchedUser.fullname ? (
                      <Text fontSize="sm" color="#929292">
                        {searchedUser.fullname}
                      </Text>
                    ) : (
                      <></>
                    )}
                  </Box>
                </Flex>
              </Link>
            );
          })}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default SearchPopover;
