import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: []
}

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setAllPosts: (state, action) => {
            state.data = action.payload
        },
    }
})

export const {setAllPosts} = postSlice.actions
export default postSlice.reducer