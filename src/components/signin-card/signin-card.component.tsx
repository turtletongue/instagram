import {
  Flex,
  Box,
  Text,
  FormControl,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  Divider,
  Icon
} from '@chakra-ui/react';
import { AiFillFacebook } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import CardContainer from '../card-container/card-container.component';
import { State } from '../../redux/store';
import { changeLoginInput, changePasswordInput, togglePasswordVisibility } from '../../redux/signin/signin.actions';
import { MIN_PASSWORD_LENGTH } from '../../constants';

const SignInCard = () => {
  const dispatch = useDispatch();
  const login = useSelector((state: State) => state.signIn.login);
  const password = useSelector((state: State) => state.signIn.password);
  const isPasswordVisible = useSelector((state: State) => state.signIn.isPasswordVisible);
  return (
    <CardContainer>
      <Text
        userSelect="none"
        fontSize="5xl"
        textAlign="center"
        fontFamily="Grand Hotel"
        color="#262626"
      >Instagram</Text>
      <Box w="85%" mt="1.5rem">
        <FormControl id="login">
          <Input
            value={login}
            onChange={(event) => dispatch(changeLoginInput(event.target.value))}
            textOverflow="ellipsis"
            p="0.5rem"
            bgColor="#fafafa"
            fontSize="xs"
            borderRadius={2}
            borderColor="gray.300"
            type="text"
            placeholder="Phone, number, username, or email"
            sx={{
              '&:focus': {
                boxShadow: "none",
                borderColor: "gray.500",
                bgColor: "#fafafa"
              }
            }}
          />
        </FormControl>
        <FormControl id="password" mt="0.5rem">
          <InputGroup>
            <Input
              value={password}
              onChange={(event) => dispatch(changePasswordInput(event.target.value))}
              p="0.5rem"
              bgColor="#fafafa"
              fontSize="xs"
              focusBorderColor="gray.600"
              borderRadius={2}
              borderColor="gray.300"
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Password"
              sx={{
                '&:focus': {
                  boxShadow: "none",
                  borderColor: "gray.500",
                  bgColor: "#fafafa"
                }
              }}
            />
            {
              password.length > 0 ? (
                <InputRightElement >
                  <Text
                    userSelect="none"
                    mr="0.5rem"
                    cursor="pointer"
                    onClick={() => dispatch(togglePasswordVisibility())}
                    fontWeight="500"
                    fontSize="sm"
                    sx={{
                      '&:active': {
                        opacity: 0.6
                      }
                    }}
                  >{ isPasswordVisible ? "Hide" : "Show" }</Text>
                </InputRightElement>
              ) : <></>
            }
          </InputGroup>
        </FormControl>
        <Button
          borderRadius="3px"
          mt="1rem"
          h="2rem"
          w="100%"
          bgColor={login && password.length >= MIN_PASSWORD_LENGTH ? "#0095f6": "#b2dffc"}
          color="white"
          fontSize="sm"
          sx={{
            '&:hover': {
              bgColor: login && password.length >= MIN_PASSWORD_LENGTH ? "#0095f6": "#b2dffc"
            },
            '&:active': {
              bgColor: '#b2dffc'
            },
            '&:focus': {
              boxShadow: 'none'
            }
          }}
        >Log In</Button>
        <Flex mt="1rem" w="100%" align="center">
          <Divider borderColor="gray.400" />
          <Text fontSize="xs" fontWeight="semibold" color="gray.500" ml="1rem" mr="1rem">OR</Text>
          <Divider borderColor="gray.400" />
        </Flex>
        <Flex
          mt="1rem"
          w="100%"
          align="center"
          justify="center"
          cursor="pointer"
          sx={{
            '&:active': {
              opacity: 0.6
            }
          }}
        >
          <Icon
            as={AiFillFacebook}
            color="#385185"
            h={5}
            w={5}
          />
          <Text
            ml="0.5rem"
            color="#385185"
            fontWeight="semibold"
            fontSize="sm"
          >
            Log in with Facebook
          </Text>
        </Flex>
        <Text
          mt="1rem"
          textAlign="center"
          fontSize="xs"
          color="#385185"
          cursor="pointer"
          sx={{
            '&:active': {
              opacity: 0.6
            }
          }}
        >
          Forgot password?
        </Text>
      </Box>
    </CardContainer>
  );
}

export default SignInCard;