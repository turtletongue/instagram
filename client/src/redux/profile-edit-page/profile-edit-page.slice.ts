import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SERVER_URL } from "../../constants";
import { GraphqlQuery } from "../interfaces";

export interface ITab {
  id: number;
  title: string;
}

interface ProfileEditPageState {
  tabs: ITab[];
  activeTabId: number;
  editProfile: {
    name: string;
    username: string;
    bio: string;
  };
  changePassword: {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  };
  updateUserDataLoading: string;
  updateUserDataErrorMessage: string | null;
  updateUserDataSuccess: boolean | null;
  updateUserPasswordLoading: string;
  updateUserPasswordErrorMessage: string | null;
  updateUserPasswordSuccess: boolean | null;
  removePhotoSuccess: boolean | null;
  uploadedImageUrl: string | null;
  updateAvatarUrlSuccess: boolean | null;
}

const initialState: ProfileEditPageState = {
  tabs: [
    { id: 0, title: "Edit Profile" },
    { id: 1, title: "Change Password" },
  ],
  activeTabId: 0,
  editProfile: {
    name: "",
    username: "",
    bio: "",
  },
  changePassword: {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  },
  updateUserDataLoading: "idle",
  updateUserDataErrorMessage: null,
  updateUserDataSuccess: null,
  updateUserPasswordLoading: "idle",
  updateUserPasswordErrorMessage: null,
  updateUserPasswordSuccess: null,
  removePhotoSuccess: null,
  uploadedImageUrl: null,
  updateAvatarUrlSuccess: null,
};

interface InitUserInputs {
  username: string;
  name: string;
  bio: string;
}

interface UpdateUserDataArgs {
  username: string;
  name?: string;
  bio?: string;
  token: string;
}

interface UpdateUserDataJSON {
  data: {
    updateUserData: boolean;
  };
}

export const updateUserData = createAsyncThunk(
  "profileEditPage/updateUserDataStatus",
  async ({ username, name, bio, token }: UpdateUserDataArgs, thunkAPI) => {
    const graphqlQuery: GraphqlQuery = {
      query: `
        mutation UpdateUserData($username: String!, $name: String, $bio: String) {
          updateUserData(updateUserDataInput: { username: $username, name: $name, bio: $bio })
        }
      `,
      variables: {
        username,
        name,
        bio,
      },
    };
    try {
      const res = await fetch(SERVER_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(graphqlQuery),
      });
      const json: UpdateUserDataJSON = await res.json();
      return json.data.updateUserData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

interface UpdateUserPasswordArgs {
  oldPassword: string;
  newPassword: string;
  token: string;
}

interface UpdateUserPasswordJSON {
  data: {
    updatePassword: boolean;
  };
}

export const updateUserPassword = createAsyncThunk(
  "profileEditPage/updateUserPasswordStatus",
  async (
    { oldPassword, newPassword, token }: UpdateUserPasswordArgs,
    thunkAPI
  ) => {
    const graphqlQuery: GraphqlQuery = {
      query: `
        mutation UpdateUserPassword($oldPassword: String!, $newPassword: String!) {
          updatePassword(oldPassword: $oldPassword, newPassword: $newPassword)
        }
      `,
      variables: {
        oldPassword,
        newPassword,
      },
    };
    try {
      const res = await fetch(SERVER_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(graphqlQuery),
      });
      const json: UpdateUserPasswordJSON = await res.json();
      return json.data.updatePassword;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

interface RemoveCurrentPhotoArgs {
  token: string;
}

interface RemoveCurrentPhotoJSON {
  data: {
    removeCurrentPhoto: boolean;
  };
}

export const removeCurrentPhoto = createAsyncThunk(
  "profileEditPage/removeCurrentPhotoStatus",
  async ({ token }: RemoveCurrentPhotoArgs, thunkAPI) => {
    const graphqlQuery: GraphqlQuery = {
      query: `
        mutation {
          removeCurrentPhoto
        }
      `,
    };
    try {
      const res = await fetch(SERVER_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(graphqlQuery),
      });
      const json: RemoveCurrentPhotoJSON = await res.json();
      return json.data.removeCurrentPhoto;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

interface UploadPhotoArgs {
  fileData: any;
}

interface UploadPhotoJSON {
  data: {
    url: string;
  };
}

export const uploadPhoto = createAsyncThunk(
  "profileEditPage/uploadPhotoStatus",
  async ({ fileData }: UploadPhotoArgs, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("key", "798a24e7fe5a8ad72df54eaa8b47a87d");
      formData.append("image", fileData);
      const res = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: formData,
      });
      const json: UploadPhotoJSON = await res.json();
      return json.data.url;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

interface UpdateAvatarUrlArgs {
  token: string;
  avatarUrl: string;
}

interface UpdateAvatarUrlJSON {
  data: {
    changeAvatar: boolean;
  };
}

export const updateAvatarUrl = createAsyncThunk(
  "profileEditPage/updateAvatarlUrlStatus",
  async ({ token, avatarUrl }: UpdateAvatarUrlArgs, thunkAPI) => {
    const graphqlQuery: GraphqlQuery = {
      query: `
        mutation UpdateAvatarUrl($avatarUrl: String!) {
          changeAvatar(avatarUrl: $avatarUrl)
        }
      `,
      variables: {
        avatarUrl,
      },
    };
    try {
      const res = await fetch(SERVER_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(graphqlQuery),
      });
      const json: UpdateAvatarUrlJSON = await res.json();
      return json.data.changeAvatar;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const profileEditPageSlice = createSlice({
  name: "profileEditPage",
  initialState,
  reducers: {
    activateTab: (
      state: ProfileEditPageState,
      action: PayloadAction<number>
    ) => {
      state.activeTabId = action.payload;
    },
    setNameInput: (
      state: ProfileEditPageState,
      action: PayloadAction<string>
    ) => {
      state.editProfile.name = action.payload;
    },
    setUsernameInput: (
      state: ProfileEditPageState,
      action: PayloadAction<string>
    ) => {
      state.editProfile.username = action.payload;
    },
    setBioInput: (
      state: ProfileEditPageState,
      action: PayloadAction<string>
    ) => {
      state.editProfile.bio = action.payload;
    },
    setOldPasswordInput: (
      state: ProfileEditPageState,
      action: PayloadAction<string>
    ) => {
      state.changePassword.oldPassword = action.payload;
    },
    setNewPasswordInput: (
      state: ProfileEditPageState,
      action: PayloadAction<string>
    ) => {
      state.changePassword.newPassword = action.payload;
    },
    setConfirmNewPasswordInput: (
      state: ProfileEditPageState,
      action: PayloadAction<string>
    ) => {
      state.changePassword.confirmNewPassword = action.payload;
    },
    initInputs: (
      state: ProfileEditPageState,
      action: PayloadAction<InitUserInputs>
    ) => {
      const { username, name, bio } = action.payload;
      state.editProfile.username = username;
      state.editProfile.name = name;
      state.editProfile.bio = bio;
    },
    resetUpdateUserDataStatus: (state: ProfileEditPageState) => {
      state.updateUserDataErrorMessage = null;
      state.updateUserDataLoading = "idle";
      state.updateUserDataSuccess = null;
    },
    resetUpdateUserPasswordStatus: (state: ProfileEditPageState) => {
      state.updateUserPasswordErrorMessage = null;
      state.updateUserPasswordLoading = "idle";
      state.updateUserPasswordSuccess = null;
    },
    resetPasswordInputs: (state: ProfileEditPageState) => {
      state.changePassword.oldPassword = "";
      state.changePassword.newPassword = "";
      state.changePassword.confirmNewPassword = "";
    },
    resetRemovePhotoStatus: (state: ProfileEditPageState) => {
      state.removePhotoSuccess = null;
    },
    resetUploadedImageUrl: (state: ProfileEditPageState) => {
      state.uploadedImageUrl = null;
    },
    resetUpdateAvatarUrlSuccess: (state: ProfileEditPageState) => {
      state.updateAvatarUrlSuccess = null;
    },
  },
  extraReducers: {
    [updateUserData.pending as any]: (state: ProfileEditPageState) => {
      state.updateUserDataLoading = "loading";
      state.updateUserDataErrorMessage = null;
      state.updateUserDataSuccess = null;
    },
    [updateUserData.fulfilled as any]: (
      state: ProfileEditPageState,
      action: PayloadAction<boolean>
    ) => {
      state.updateUserDataSuccess = !!action.payload;
      state.updateUserDataLoading = "idle";
    },
    [updateUserData.rejected as any]: (
      state: ProfileEditPageState,
      action: PayloadAction<string>
    ) => {
      state.updateUserDataLoading = "idle";
      state.updateUserDataErrorMessage = action.payload;
      state.updateUserDataSuccess = false;
    },
    [updateUserPassword.pending as any]: (state: ProfileEditPageState) => {
      state.updateUserPasswordLoading = "loading";
      state.updateUserPasswordErrorMessage = null;
      state.updateUserPasswordSuccess = null;
    },
    [updateUserPassword.fulfilled as any]: (
      state: ProfileEditPageState,
      action: PayloadAction<boolean>
    ) => {
      state.updateUserPasswordSuccess = !!action.payload;
      state.updateUserPasswordLoading = "idle";
    },
    [updateUserPassword.rejected as any]: (
      state: ProfileEditPageState,
      action: PayloadAction<string>
    ) => {
      state.updateUserPasswordLoading = "idle";
      state.updateUserPasswordErrorMessage = action.payload;
      state.updateUserPasswordSuccess = false;
    },
    [removeCurrentPhoto.fulfilled as any]: (
      state: ProfileEditPageState,
      action: PayloadAction<boolean>
    ) => {
      state.removePhotoSuccess = !!action.payload;
    },
    [removeCurrentPhoto.rejected as any]: (state: ProfileEditPageState) => {
      state.removePhotoSuccess = false;
    },
    [uploadPhoto.fulfilled as any]: (
      state: ProfileEditPageState,
      action: PayloadAction<string>
    ) => {
      state.uploadedImageUrl = action.payload;
    },
    [updateAvatarUrl.fulfilled as any]: (
      state: ProfileEditPageState,
      action: PayloadAction<boolean>
    ) => {
      state.updateAvatarUrlSuccess = !!action.payload;
    },
  },
});

export const {
  activateTab,
  setBioInput,
  setConfirmNewPasswordInput,
  setNameInput,
  setNewPasswordInput,
  setOldPasswordInput,
  setUsernameInput,
  initInputs,
  resetUpdateUserDataStatus,
  resetUpdateUserPasswordStatus,
  resetPasswordInputs,
  resetRemovePhotoStatus,
  resetUploadedImageUrl,
  resetUpdateAvatarUrlSuccess,
} = profileEditPageSlice.actions;

export default profileEditPageSlice.reducer;
