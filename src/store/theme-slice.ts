import axios from 'axios';

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { env } from '../config';

type ThemeResponseType = {
    theme: "light" | "dark"
};
// First, create the thunk
export const fetchThemeThunk = createAsyncThunk('theme/getTheme', async (id: string) => {
    return await axios
        .get<ThemeResponseType>(`${env.BACK_END_URL}/users/${id}/theme`, {
            withCredentials: true,
            headers: {
                'x-id': id,
            },
        })
        .then((res) => res.data);
});

interface InitialState {
    entity: ThemeResponseType | undefined;
    loading: boolean;
    isError: boolean;
}

const initialState = {
    entity: undefined,
    loading: true,
    isError: false,
} as InitialState;

// Then, handle actions in your reducers:
const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        clearTheme: () => initialState,
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchThemeThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchThemeThunk.fulfilled, (state, action: PayloadAction<ThemeResponseType>) => {
            // Add user to the state array
            state.entity = { ...action.payload };
            const body = document.getElementsByTagName('body');
            if (body.length > 0) {
                body[0].setAttribute('data-theme', action.payload.theme);
                // Storage.Set("theme", data.theme)
            }
            state.loading = false;
        });
        builder.addCase(fetchThemeThunk.rejected, (state) => {
            state.loading = true;
            state.isError = true;
            // throw new Error("")
        });
    },
});

// Later, dispatch the thunk as needed in the app
// dispatch(fetchUserById(123))

export const themeReducer = themeSlice.reducer;
export const { clearTheme } = themeSlice.actions;
export default themeSlice;
