import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  registrationEmail: string | null;
  verificationToken: string | null;
}

const initialState: AuthState = {
  registrationEmail: null,
  verificationToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setRegistrationData: (
      state,
      action: PayloadAction<{ email: string; verificationToken: string }>
    ) => {
      state.registrationEmail = action.payload.email;
      state.verificationToken = action.payload.verificationToken;
    },
    clearRegistrationData: (state) => {
      state.registrationEmail = null;
      state.verificationToken = null;
    },
  },
});

export const { setRegistrationData, clearRegistrationData } = authSlice.actions;

export default authSlice.reducer;
