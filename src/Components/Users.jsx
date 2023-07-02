import React, { useEffect, useState } from "react";
import { collection, getDocs,addDoc,doc,onSnapshot } from "firebase/firestore";
import { db } from "../Config/Firebase";
import { useSelector,useDispatch } from "react-redux";
import {
  showParticularUser,
  CurrentChatRoomId,
  savesenderid,
} from "../Features/UserSlice";
const Users = (props) => {
  const dispatch = useDispatch();
  const [Users, setUsers] = useState(null);
  const [senderid, setSenderid] = useState(null);
  const currentEmail = useSelector(
    (state) => state.authentication.currentUsername
  );
  useEffect(() => {
    const fetchData = async () => {
      const data = await getDocs(collection(db, "Users"));
      const users = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const FilteredData = users.filter((item) => {
        return item.email === currentEmail;
      });
      setSenderid(FilteredData[0]?.userid);
      dispatch(savesenderid(FilteredData[0]?.userid));
      setUsers(users);
    };
    fetchData();
  }, []);
  const createChats = async (chatRoomId, recieverid) => {
    const docRef = await addDoc(collection(db, "Chats"), {
      chatRoomId: chatRoomId,
      senderid: senderid,
      reciverid: recieverid,
      messages: [],
    });
    console.log(docRef.id);
  };
  const clickHandler=async(data)=>{
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
    return ()=>unsub;
  }
  return (
    <>
      <h3 style={{ color: "rgb(169, 170, 177)", height: "50px" }}>FRIENDS</h3>
      {Users?.map((item, idx) => {
        if (
          item.email !== currentEmail &&
          item.name.toLowerCase().includes(props.val.toLowerCase())
        )
          return (
            <>
              <div className="user" key={idx} onClick={()=>clickHandler(item)}>
                <div className="userimage">
                  <img
                    src="https://img.freepik.com/free-photo/young-man-wearing-blue-outfit-looking-confident_1298-291.jpg?size=626&ext=jpg&uid=R106874875&ga=GA1.2.2042889475.1686818793&semt=ais"
                    alt="Avatar"
                    className="Avatar"
                  />
                  {/* {item.status?<div style={{position:"absolute",width:"10px",height:"10px",borderRadius:"40px",backgroundColor:"green",right:"10px",bottom:"32px"}}></div>:<div style={{position:"absolute",width:"10px",height:"10px",borderRadius:"40px",backgroundColor:"red",right:"10px",bottom:"32px"}}></div>} */}
                </div>
                <div className="userdetails" >
                  <span
                    style={{
                      margin: "0px",
                      fontSize: "18px",
                      fontWeight: 500,
                      paddingTop: "0px",
                      
                    }}
                  >
                    {item.name}
                  </span>
                </div>
              </div>
            </>
          );
      })}
    </>
  );
};

export default Users;
