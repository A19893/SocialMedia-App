import {createSlice} from "@reduxjs/toolkit"
const initialState={
    isAuth:false,
    currentUsername:null,
    currentUser:null,
    showComments:false,
    currentPostId:null,
    showChats:false
}
export const AuthSlice=createSlice({
    name:"Authorization",
    initialState:initialState,
    reducers:{
      authenticateUser:(state,action)=>{
        console.log(action);
        state.isAuth=true;
        state.currentUsername=action.payload.email;
        state.currentUser=action.payload.name
      },
      removeAuthentication:(state,action)=>{
        state.isAuth=false;
        state.currentUsername=null;
        state.currentUser=null;
      },
      showComments:(state,action)=>{
        state.showComments=!state.showComments;
        state.currentPostId=action.payload;
      },
      showChats:(state)=>{
        state.showChats=!state.showChats;
      }
    }
})
export const {authenticateUser,removeAuthentication,showComments,showChats}=AuthSlice.actions;
export default AuthSlice.reducer
