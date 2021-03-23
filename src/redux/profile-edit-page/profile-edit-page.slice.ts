import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
};

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
} = profileEditPageSlice.actions;

export default profileEditPageSlice.reducer;
