import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: "theme",
    initialState: {
        isDark: true,
    },
    reducers: {
        changeTheme: (state, action) => {
            state.isDark = action.payload;
        }
    }
})

export default themeSlice.reducer;
export const { changeTheme } = themeSlice.actions;