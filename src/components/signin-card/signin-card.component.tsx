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
} from "@chakra-ui/react";
import { MouseEvent, useEffect } from "react";
import { AiFillFacebook } from "react-icons/ai";
import { MIN_PASSWORD_LENGTH } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  changeLoginInput,
  changePasswordInput,
  clearInputs,
  hidePassword,
  showPassword,
} from "../../redux/signin/signin.slice";
import { RootState } from "../../redux/store";
import { requestSignIn } from "../../redux/user/user.slice";
import CardContainer from "../card-container/card-container.component";
import Logo from "../logo/logo.component";

const SignInCard = () => {
  const dispatch = useAppDispatch();
  const login: string = useAppSelector(
    (state: RootState) => state.signIn.login
  );
  const password: string = useAppSelector(
    (state: RootState) => state.signIn.password
  );
  const isPasswordVisible: boolean = useAppSelector(
    (state: RootState) => state.signIn.isPasswordVisible
  );
  const isSignInPending: boolean = false;
  const isFormDataValid: boolean =
    (login && password.length) >= MIN_PASSWORD_LENGTH;

  const submitHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    if (!isFormDataValid) return;
    dispatch(
      requestSignIn({
        testData: {
          userId: "lustervolt",
          avatarUrl:
            "https://scontent-frt3-2.cdninstagram.com/v/t51.2885-19/s150x150/72549396_389185031989753_382381312025034752_n.jpg?tp=1&_nc_ht=scontent-frt3-2.cdninstagram.com&_nc_ohc=x7AMNhpuNJUAX_eghOn&oh=b3fc4b38bd8450a60f749677d408e8ba&oe=60782C28",
          fullname: "Volt Luster",
        },
      })
    );
  };

  useEffect(() => {
    const listener: EventListener = (event: any) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        if (!isFormDataValid) return;
        dispatch(
          requestSignIn({
            testData: {
              userId: "lustervolt",
              avatarUrl:
                "https://scontent-frt3-2.cdninstagram.com/v/t51.2885-19/s150x150/72549396_389185031989753_382381312025034752_n.jpg?tp=1&_nc_ht=scontent-frt3-2.cdninstagram.com&_nc_ohc=x7AMNhpuNJUAX_eghOn&oh=b3fc4b38bd8450a60f749677d408e8ba&oe=60782C28",
              fullname: "Volt Luster",
            },
          })
        );
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
            dispatch(clearInputs());
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
