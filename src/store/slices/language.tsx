import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
export interface LanguageState {
    language: string
}

const initialState: LanguageState = {
    language: localStorage.getItem("language") || "ar"
}

export const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setLanguage: (state, action: PayloadAction<string>) => {
            state.language = action.payload
            localStorage.setItem("language", state.language);
        }
    }
})

export const { setLanguage } = languageSlice.actions

export const selectLanguage = (state: RootState) => state.language.language

export default languageSlice.reducer