import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginResponse } from '../types';

const initialState: LoginResponse = {
    access_token: "",
    authDetail: {
        email: "",
        firstName: "",
        id: "",
        lastName: ""
    }
};

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        signInSuccess: (state, action : PayloadAction<LoginResponse>) => {
            state = action.payload;
        },
        registrationSuccess: (state, action : PayloadAction<LoginResponse>) => {

        }
    },
});

// Action creators are generated for each case reducer function
export const { signInSuccess, registrationSuccess } = counterSlice.actions;

export default counterSlice.reducer;