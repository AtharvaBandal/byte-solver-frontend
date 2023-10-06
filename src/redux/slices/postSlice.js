import { createSlice } from "@reduxjs/toolkit";

const PostSlice = createSlice({
    name:'Post',
    initialState : {
        questions: []
    },

    reducers:{
        setQuestion: (state, action) => {
            state.questions = action.payload.questions;
        },
        addQuestion: (state, action) => {
            state.questions.unshift(action.payload.question);
        },
        setLogoutPosts: (state) =>{
            state.questions = null;
        },
    }
})

export const {setQuestion, addQuestion, setLogoutPosts} = PostSlice.actions;

export default PostSlice.reducer;