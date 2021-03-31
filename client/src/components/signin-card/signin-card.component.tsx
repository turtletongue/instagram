import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { MouseEvent, useEffect } from "react";
import { AiFillFacebook } from "react-icons/ai";
import { MIN_PASSWORD_LENGTH } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  changeLoginInput,
  changePasswordInput,
  hidePassword,
  showPassword,
} from "../../redux/signin/signin.slice";
import { RootState } from "../../redux/store";
import { requestSignIn } from "../../redux/user/user.slice";
import CardContainer from "../card-container/card-container.component";
import Logo from "../logo/logo.component";

const SignInCard = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const login: string = useAppSelector(
    (state: RootState) => state.signIn.login
  );
  const password: string = useAppSelector(
    (state: RootState) => state.signIn.password
  );
  const isPasswordVisible: boolean = useAppSelector(
    (state: RootState) => state.signIn.isPasswordVisible
  );
  const errorMessage: string | null = useAppSelector(
    (state: RootState) => state.user.errorMessage
  );
  const isSignInPending: boolean = useAppSelector(
    (state: RootState) => state.user.signInLoading === "loading"
  );
  const isFormDataValid: boolean =
    (login && password.length) >= MIN_PASSWORD_LENGTH;

  const submitHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    if (!isFormDataValid) return;
    dispatch(requestSignIn({ input: { username: login, password } }));
  };

  useEffect(() => {
    if (errorMessage) {
      toast({
        title: "Sign In error",
        status: "error",
        description: "Check that your username and password are correct.",
      });
    }
  }, [dispatch, toast, errorMessage]);

  useEffect(() => {
    const listener: EventListener = (event: any) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        if (!isFormDataValid) return;
        dispatch(requestSignIn({ input: { username: login, password } }));
      }
    };

    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [dispatch, isFormDataValid, login, password]);

  return (
    <CardContainer>
      <Logo fontSize="5xl" />
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
              "&:focus": {
                boxShadow: "none",
                borderColor: "gray.500",
                bgColor: "#fafafa",
              },
            }}
          />
        </FormControl>
        <FormControl id="password" mt="0.5rem">
          <InputGroup>
            <Input
              value={password}
              onChange={(event) =>
                dispatch(changePasswordInput(event.target.value))
              }
              p="0.5rem"
              bgColor="#fafafa"
              fontSize="xs"
              focusBorderColor="gray.600"
              borderRadius={2}
              borderColor="gray.300"
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Password"
              sx={{
                "&:focus": {
                  boxShadow: "none",
                  borderColor: "gray.500",
                  bgColor: "#fafafa",
                },
              }}
            />
            {password.length > 0 ? (
              <InputRightElement>
                <Text
                  userSelect="none"
                  mr="0.5rem"
                  cursor="pointer"
                  onClick={() =>
                    dispatch(
                      isPasswordVisible ? hidePassword() : showPassword()
                    )
                  }
                  fontWeight="500"
                  fontSize="sm"
                  sx={{
                    "&:active": {
                      opacity: 0.6,
                    },
                  }}
                >
                  {isPasswordVisible ? "Hide" : "Show"}
                </Text>
              </InputRightElement>
            ) : (
              <></>
            )}
          </InputGroup>
        </FormControl>
        <Button
          type="submit"
          cursor={isFormDataValid ? "pointer" : "default"}
          onClick={(event: MouseEvent) => {
            submitHandler(event);
          }}
          borderRadius="3px"
          mt="1rem"
          h="2rem"
          w="100%"
          bgColor={isFormDataValid ? "#0095f6" : "#b2dffc"}
          color="white"
          fontSize="sm"
          sx={{
            "&:hover": {
              bgColor: isFormDataValid ? "#0095f6" : "#b2dffc",
            },
            "&:active": {
              bgColor: "#b2dffc",
            },
            "&:focus": {
              boxShadow: "none",
            },
          }}
        >
          {!isSignInPending ? "Log In" : <Spinner size="xs" />}
        </Button>
        <Flex mt="1rem" w="100%" align="center">
          <Divider borderColor="gray.400" />
          <Text
            fontSize="xs"
            fontWeight="semibold"
            color="gray.500"
            ml="1rem"
            mr="1rem"
          >
            OR
          </Text>
          <Divider borderColor="gray.400" />
        </Flex>
        <Flex
          mt="1rem"
          w="100%"
          align="center"
          justify="center"
          cursor="pointer"
          sx={{
            "&:active": {
              opacity: 0.6,
            },
          }}
        >
          <Icon as={AiFillFacebook} color="#385185" h={5} w={5} />
          <Text ml="0.5rem" color="#385185" fontWeight="semibold" fontSize="sm">
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
            "&:active": {
              opacity: 0.6,
            },
          }}
        >
          Forgot password?
        </Text>
      </Box>
    </CardContainer>
  );
};

export default SignInCard;
