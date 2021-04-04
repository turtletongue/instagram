import { Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import CardContainer from "../card-container/card-container.component";

const SignUpRefCard = () => {
  return (
    <CardContainer mt="0.5rem">
      <Box>
        <Text display="inline" fontSize="sm">
          Don't have an account?
        </Text>
        <Link to="/accounts/emailsignup">
          <Text
            display="inline"
            ml="0.5rem"
            fontSize="sm"
            fontWeight="600"
            color="blue.400"
            cursor="pointer"
            sx={{
              "&:active": {
                opacity: 0.6,
              },
            }}
          >
            Sign Up
          </Text>
        </Link>
      </Box>
    </CardContainer>
  );
};

export default SignUpRefCard;
