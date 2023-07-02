import { createSlice } from "@reduxjs/toolkit";
const initialState={
currentChatRoomId:null,
UserDetail:{},
ParticularUser:null,
}
export const UserSlice=createSlice({
    name:"userDetails",
    initialState:initialState,
    reducers:{
        CurrentChatRoomId:(state,action)=>{
            state.currentChatRoomId=action.payload;
         },
         showParticularUser:(state,action)=>{
            state.ParticularUser=action.payload
            console.log(action);
         },
         savesenderid:(state,action)=>{
            state.UserDetail.senderid=action.payload;
         },
         removeUserDetail:(state,action)=>{
            state.UserDetail={};
         },
         removeParticularUser:(state,action)=>{
            state.ParticularUser=null
         }
    }
})
export const {CurrentChatRoomId,showParticularUser,savesenderid,removeUserDetail,removeParticularUser}=UserSlice.actions;
export default UserSlice.reducer;