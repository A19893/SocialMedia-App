import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  onSnapshot,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../Config/Firebase";
import { useSelector, useDispatch } from "react-redux";
const ChatRoomId = useSelector(
    (state) => state.userdetails.CurrentChatRoomId
  );
const dispatch=useDispatch();
const createChats = async (chatRoomId, recieverid) => {
    const docRef = await addDoc(collection(db, "Chats"), {
      chatRoomId: chatRoomId,
      senderid: senderid,
      reciverid: recieverid,
      messages: [],
    });
    console.log(docRef.id);
  };
export const clickHandler = async (data) => {
    console.log("clicked data", data);
    console.log("clicked", data.id);
    const unsub = onSnapshot(doc(db, "Users", data?.id), (doc) => {
      dispatch(showParticularUser(doc.data()));
    });
    let chatRoomId = null;
    console.log("Current clicked user", data?.userid, "Sender id", senderid);
    if (senderid < data?.userid) {
      console.log(senderid);
      chatRoomId = senderid?.toString() + data?.userid?.toString();
      console.log(chatRoomId);
    } else {
      console.log(senderid);
      chatRoomId = data?.userid?.toString() + senderid?.toString();
      console.log(chatRoomId);
    }
    dispatch(CurrentChatRoomId(chatRoomId));
    const chatRoom = await getDocs(collection(db, "Chats"));
    const users = chatRoom?.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const currentUser = users?.filter((item) => {
      return chatRoomId === item.chatRoomId;
    });
    console.log("mera logged in user", currentUser);
    if (currentUser?.length > 0) {
    } else {
      console.log("aaya");
      await createChats(chatRoomId, data?.userid);
    }
  };