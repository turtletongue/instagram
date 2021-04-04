import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SERVER_URL } from "../../constants";
import { GraphqlQuery, RequestOptions } from "../interfaces";
import { IUser } from "../user/user.slice";

interface SignUpState {
  name: string;
  username: string;
  password: string;
  isPasswordVisible: boolean;
  errorMessage: string | null;
  loading: string;
  signUpSuccess: boolean | null;
}

const initialState: SignUpState = {
  name: "",
  username: "",
  password: "",
  isPasswordVisible: false,
  errorMessage: null,
  loading: "idle",
  signUpSuccess: null,
};

interface ServerError {
  message: string;
}

interface SignUpJSON {
  data?: {
    createUser: IUser;
  };
  errors?: ServerError[];
}

export const requestSignUp = createAsyncThunk(
  "signUp/requestSignUpStatus",
  async (requestOptions: RequestOptions, thunkAPI) => {
    if (requestOptions.testData) {
      return requestOptions.testData;
    }

    const graphqlQuery: GraphqlQuery = {
      query: `
        mutation SignUp($name: String!, $username: String!, $password: String!) {
          createUser(userInput: { name: $name, username: $username, password: $password, bio: "", avatarUrl: "" }) {
            id
          }
        }
      `,
      variables: {
        username: requestOptions.input.username,
        name: requestOptions.input.name,
        password: requestOptions.input.password,
      },
    };
    try {
      const res = await fetch(SERVER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(graphqlQuery),
      });
      const json: SignUpJSON = await res.json();
      if (!json.data) {
        return thunkAPI.rejectWithValue(
          json.errors ? json.errors[0]?.message : "Unknown server response."
        );
      }
      return json.data.createUser;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    setNameInput: (state: SignUpState, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setUsernameInput: (state: SignUpState, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setPasswordInput: (state: SignUpState, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    showPassword: (state: SignUpState) => {
      state.isPasswordVisible = true;
    },
    hidePassword: (state: SignUpState) => {
      state.isPasswordVisible = false;
    },
    resetSignUpSuccess: (state: SignUpState) => {
      state.signUpSuccess = null;
    },
    resetInputs: (state: SignUpState) => {
      state.name = "";
      state.username = "";
      state.password = "";
    },
  },
  extraReducers: {
    [requestSignUp.pending as any]: (state: SignUpState) => {
      state.errorMessage = null;
      state.loading = "loading";
      state.signUpSuccess = null;
    },
    [requestSignUp.fulfilled as any]: (
      state: SignUpState,
      action: PayloadAction<IUser>
    ) => {
      state.loading = "idle";
      state.signUpSuccess = !!action.payload.id;
    },
    [requestSignUp.rejected as any]: (
      state: SignUpState,
      action: PayloadAction<string>
    ) => {
      state.errorMessage = action.payload;
      state.loading = "idle";
      state.signUpSuccess = false;
    },
  },
});

export const {
  setNameInput,
  setUsernameInput,
  setPasswordInput,
  showPassword,
  hidePassword,
  resetSignUpSuccess,
  resetInputs,
} = signUpSlice.actions;

export default signUpSlice.reducer;
