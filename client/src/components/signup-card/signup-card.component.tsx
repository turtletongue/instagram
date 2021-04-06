import { Button } from "@chakra-ui/button";
import { FormControl } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { useToast } from "@chakra-ui/toast";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { MIN_PASSWORD_LENGTH } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  hidePassword,
  requestSignUp,
  resetInputs,
  resetSignUpSuccess,
  setNameInput,
  setPasswordInput,
  setUsernameInput,
  showPassword,
} from "../../redux/signup/signup.slice";
import { RootState } from "../../redux/store";
import { requestSignIn } from "../../redux/user/user.slice";
import CardContainer from "../card-container/card-container.component";
import Logo from "../logo/logo.component";

const SignUpCard = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const history = useHistory();
  const name: string = useAppSelector((state: RootState) => state.signUp.name);
  const username: string = useAppSelector(
    (state: RootState) => state.signUp.username
  );
  const password: string = useAppSelector(
    (state: RootState) => state.signUp.password
  );
  const isPasswordVisible: boolean = useAppSelector(
    (state: RootState) => state.signUp.isPasswordVisible
  );
  const isFormDataValid: boolean =
    !!name && !!username && password.length >= MIN_PASSWORD_LENGTH;
  const isSignUpPending: boolean = useAppSelector(
    (state: RootState) => state.signUp.loading === "loading"
  );
  const errorMessage: string | null = useAppSelector(
    (state: RootState) => state.signUp.errorMessage
  );
  const signUpSuccess: boolean | null = useAppSelector(
    (state: RootState) => state.signUp.signUpSuccess
  );
  const submitHandler = () => {
    if (!isFormDataValid) return;
    dispatch(requestSignUp({ input: { name, username, password } }));
  };
  useEffect(() => {
    const listener: EventListener = (event: any) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        if (!isFormDataValid) return;
        dispatch(requestSignUp({ input: { name, username, password } }));
      }
    };

    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [dispatch, isFormDataValid, name, username, password]);

  useEffect(() => {
    if (signUpSuccess === true) {
      dispatch(requestSignIn({ input: { username, password } }));
      dispatch(resetInputs());
      dispatch(resetSignUpSuccess());
      history.push("/");
    } else if (signUpSuccess === false) {
      toast({
        title: "Sign Up error",
        status: "error",
        description: errorMessage ? errorMessage : "",
      });
      dispatch(resetSignUpSuccess());
    }
  }, [
    dispatch,
    history,
    toast,
    signUpSuccess,
    errorMessage,
    username,
    password,
  ]);
  return (
    <CardContainer left={0}>
      <Logo fontSize="5xl" />
      <Flex w="100%" justify="center">
        <Text
          textAlign="center"
          color="#7b7b7b"
          fontWeight="500"
          fontSize="lg"
          maxW="15rem"
        >
          Sign Up to see photos from your friends.
        </Text>
      </Flex>
      <Box w="85%" mt="1.5rem">
        <FormControl id="fullname" mt="0.5rem">
          <Input
            value={name}
            onChange={(event) => dispatch(setNameInput(event.target.value))}
            textOverflow="ellipsis"
            p="0.5rem"
            bgColor="#fafafa"
            fontSize="xs"
            borderRadius={2}
            borderColor="gray.300"
            type="text"
            placeholder="Fullname"
            sx={{
              "&:focus": {
                boxShadow: "none",
                borderColor: "gray.500",
                bgColor: "#fafafa",
              },
            }}
          />
        </FormControl>
        <FormControl id="username" mt="0.5rem">
          <Input
            value={username}
            onChange={(event) => dispatch(setUsernameInput(event.target.value))}
            textOverflow="ellipsis"
            p="0.5rem"
            bgColor="#fafafa"
            fontSize="xs"
            borderRadius={2}
            borderColor="gray.300"
            type="text"
            placeholder="Username"
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
                dispatch(setPasswordInput(event.target.value))
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
          onClick={submitHandler}
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
          {!isSignUpPending ? "Sign Up" : <Spinner size="xs" />}
        </Button>
        <Flex w="100%" justify="center">
          <Text
            textAlign="center"
            color="#7b7b7b"
            fontSize="xs"
            maxW="15rem"
            m="1rem 0"
          >
            By signing up, you agree to our Terms , Data Policy and Cookies
            Policy.
          </Text>
        </Flex>
      </Box>
    </CardContainer>
  );
};

export default SignUpCard;
