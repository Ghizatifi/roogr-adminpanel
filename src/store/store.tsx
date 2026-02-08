import { configureStore } from '@reduxjs/toolkit';
import  languageSlice  from './slices/language';
import  isLoggedinSlice from './slices/auth';
import  permissionsSlice  from './slices/permissions';

export const store = configureStore({
    reducer: {
        language:languageSlice,
        isLoggedin:isLoggedinSlice,
        permissions:permissionsSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store