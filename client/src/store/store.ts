import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

const storedState = localStorage.getItem("auth_detail");
let auth : Record<string, any>  = {};
if(storedState)
    auth = JSON.parse(storedState) as Record<string, any>;
else auth = {access_token : undefined, authDetail : undefined}
export const store =  configureStore({
  reducer: {
    authentication: authReducer
  },
  preloadedState : {authentication : auth}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;