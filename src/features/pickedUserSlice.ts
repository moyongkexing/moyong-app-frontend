import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { auth } from "../firebase";

interface PICKED_USER{
  username: string;
  avatar: string;
}


export const pickedUserSlice = createSlice({
  name: "pickedUser",
  initialState: {
    pickedUser: {username: "", avatar: ""},
  },
  reducers: {
    setProfile: (state, action: PayloadAction<PICKED_USER>) => {
      state.pickedUser.username = action.payload.username;
      state.pickedUser.avatar = action.payload.avatar;
    },
  },
});

export const { setProfile } = pickedUserSlice.actions;
export const selectPickedUser = (state: RootState) => state.pickedUser.pickedUser
export default pickedUserSlice.reducer;
