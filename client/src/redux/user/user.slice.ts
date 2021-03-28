import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HOUR, SERVER_URL } from "../../constants";
import { GraphqlQuery, RequestOptions } from "../interfaces";

export interface IUser {
  id: number;
  username: string;
  avatarUrl: string | null;
  name: string | null;
  bio: string | null;
  followers?: IUser[];
  following?: IUser[];
}

interface UserState {
  userId: number | null;
  currentUser: IUser | null;
  isLoggedIn: boolean;
  signInLoading: string;
  userLoading: string;
  errorMessage: string | null;
  userLoadingErrorMessage: string | null;
}

const initialState: UserState = {
  userId: null,
  currentUser: null,
  isLoggedIn: false,
  signInLoading: "idle",
  userLoading: "idle",
  errorMessage: null,
  userLoadingErrorMessage: null,
};

interface SignInResponse {
  data: {
    login: {
      userId: number;
      token: string;
    };
  };
}

export const requestSignIn = createAsyncThunk(
  "user/requestSignInStatus",
  async (requestOptions: RequestOptions, thunkAPI) => {
    if (requestOptions.testData) {
      return requestOptions.testData;
    }

    const graphqlQuery: GraphqlQuery = {
      query: `
        query SignIn($username: String!, $password: String!) {
          login(username: $username, password: $password) {
            userId
            token
          }
        }
      `,
      variables: {
        username: requestOptions.input.username,
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
      const json: SignInResponse = await res.json();
      return json.data.login;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

interface RequestUserByIdResponse {
  data: {
    getUserById: IUser;
  };
}

export const requestUserById = createAsyncThunk(
  "user/equestUserByIdStatus",
  async (requestOptions: RequestOptions, thunkAPI) => {
    if (requestOptions.testData) {
      return requestOptions.testData;
    }

    const graphqlQuery: GraphqlQuery = {
      query: `
        query GetUserById($userId: Int!) {
          getUserById(userId: $userId) {
            id
            username
            name
            avatarUrl
            bio
            following {
              id
              username
              name
              avatarUrl
              bio
            }
            followers {
              id
              username
              name
              avatarUrl
              bio
            }
          }
        }
      `,
      variables: {
        userId: requestOptions.input.userId,
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
      const json: RequestUserByIdResponse = await res.json();
      return json.data.getUserById;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: (state: UserState) => {
      state.userId = null;
      state.isLoggedIn = false;
      localStorage.removeItem("authToken");
    },
    checkIsLogged: (state: UserState) => {
      const token: string | null = localStorage.getItem("authToken");
      const userId: string | null = localStorage.getItem("userId");
      const expiryDate: string | null = localStorage.getItem("expiryDate");
      if (token && userId && Number(expiryDate) > Date.now()) {
        state.userId = Number(userId);
        state.isLoggedIn = true;
      }
    },
  },
  extraReducers: {
    [requestSignIn.pending as any]: (state: UserState) => {
      state.signInLoading = "loading";
      state.errorMessage = null;
    },
    [requestSignIn.fulfilled as any]: (
      state: UserState,
      action: PayloadAction<{ userId: number; token: string }>
    ) => {
      state.userId = action.payload.userId;
      state.isLoggedIn = true;
      state.signInLoading = "idle";
      localStorage.setItem("authToken", action.payload.token);
      localStorage.setItem("userId", action.payload.userId.toString());
      localStorage.setItem("expiryDate", (Date.now() + HOUR).toString());
    },
    [requestSignIn.rejected as any]: (
      state: UserState,
      action: PayloadAction<string>
    ) => {
      state.errorMessage = action.payload;
      state.signInLoading = "idle";
    },
    [requestUserById.pending as any]: (state: UserState) => {
      state.userLoading = "loading";
      state.userLoadingErrorMessage = null;
    },
    [requestUserById.fulfilled as any]: (
      state: UserState,
      action: PayloadAction<IUser>
    ) => {
      state.currentUser = action.payload;
      state.userLoading = "idle";
    },
    [requestUserById.rejected as any]: (
      state: UserState,
      action: PayloadAction<string>
    ) => {
      state.userLoading = "idle";
      state.userLoadingErrorMessage = action.payload;
    },
  },
});

export const { logOut, checkIsLogged } = userSlice.actions;

export default userSlice.reducer;
