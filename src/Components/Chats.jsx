import React, { useEffect, useState } from "react";
import Message from "./Message";
import Input from "./Input";
import OwnerMessage from "./OwnerMessage";
import { useSelector } from "react-redux";
import {collection,doc,updateDoc,arrayUnion,onSnapshot } from "firebase/firestore";
import { db } from "../Config/Firebase";
import { Timestamp } from "firebase/firestore";
const Chats = () => {
  const DocRef=collection(db,"Chats")
  const chatRoomId = useSelector(
    (state) => state.userdetails.currentChatRoomId
  );
  const senderid = useSelector(
    (state) => state.userdetails.UserDetail.senderid
  );
  console.log("chat id",chatRoomId)
  const[msg,setMsg]=useState("");
  const[text,setText]=useState([]);
  useEffect(() => {
  const unsubscribe = onSnapshot(DocRef, (QuerySnapshot) => {
    let messages = [];
    QuerySnapshot.forEach((doc) => {
      messages.push({ ...doc.data(), id: doc.id });
    });
    setText(messages.filter(item=>item.chatRoomId === chatRoomId));
    console.log("jo text",text);
  });
  return () => unsubscribe;
},[chatRoomId]);
  const clickHandler=async()=>{
    const date=new Date();
    console.log(date.getDate());
   const dRef = doc(db, "Chats", text[0]?.id);
   await updateDoc(dRef,{messages: arrayUnion({
    message:msg,
    senderid:senderid,
    date:Timestamp.now()
   })});
   setMsg(" ");
  }
  const particularUser = useSelector((state) => state.userdetails?.ParticularUser);
  const typeHandler=(e)=>{
    setMsg(e.target.value);
  }
  return (
    <>
    <div className="posts">
        <div className="user-name">
          <div className="user-status">
          <h3
            style={{
              fontWeight: "400",
              margin: "0px",
              paddingTop: "20px",
              fontSize: "22px",
              paddingLeft: "10px",
              color: "black",
            }}
          >
            {particularUser?.name}
          </h3>
          <span
          style={{
            fontWeight: "lighter",
            margin: "0px",
            fontSize: "12px",
            color: "lightgray",
          }}>
          </span>
          {/* <span>
            {particularUser?.status?<span style={{
              fontWeight: "lighter",
              margin: "0px",
              paddingTop: "5px",
              fontSize: "22px",
              paddingLeft: "10px",
              color: "green",
            }}>Online</span>:<span style={{fontWeight: "lighter",
            margin: "0px",
            paddingTop: "5px",
            fontSize: "14px",
            paddingLeft: "10px",
            color: "red",}}>Offline</span>}
          </span> */}
          </div>
        </div>
            <div className="chatBox">
            {
            // currentUser[0]?.
            text[0]?.messages?.map((item)=>{
            return(
                <>
                {console.log("aagya",item.senderid,"jisne likha",senderid,"date",item.date)}
                {item.senderid===senderid ?<OwnerMessage msg={item.message} timestamp={item.date?.seconds}/>:<Message msg={item.message} timestamp={item.date?.seconds}/>}
                </>
            )
            })
        } 
        </div>
        <Input msg={msg} clickHandler={clickHandler} typeHandler={typeHandler}/>
      </div>
    </>
  );
}

export default Chats;
