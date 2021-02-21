import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import pickedUserReducer from '../features/pickedUserSlice';
export const store = configureStore({
  reducer: {
    user: userReducer,
    pickedUser: pickedUserReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
