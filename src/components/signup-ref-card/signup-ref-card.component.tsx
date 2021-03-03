import { Text, Box } from '@chakra-ui/react';
import CardContainer from '../card-container/card-container.component';

const SignUpRefCard = () => {
  return (
    <CardContainer mt="0.5rem">
      <Box>
        <Text display="inline" fontSize="sm">Don't have an account?</Text>
        <Text
          display="inline"
          ml="0.5rem"
          fontSize="sm"
          fontWeight="600"
          color="blue.400"
          cursor="pointer"
          sx={{
            '&:active': {
              opacity: 0.6
            }
          }}
        >Sign Up</Text>
      </Box>
    </CardContainer>
  );
}

export default SignUpRefCard;