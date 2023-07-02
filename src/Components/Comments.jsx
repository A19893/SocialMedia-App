import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Button,Input } from 'antd';
import { Timestamp, arrayUnion, doc, onSnapshot, updateDoc,collection,getDocs } from 'firebase/firestore';
import { db } from '../Config/Firebase';
const Comments = () => {
const { TextArea } = Input;
const [comment,setComment]=useState("");
const [comments,setComments]=useState(null);
const[user,setUser]=useState(null);
const currentEmail = useSelector(
  (state) => state.authentication.currentUsername
);
  const currentPostId=useSelector((state)=>state.authentication.currentPostId);
  const currentUser=useSelector((state)=>state.authentication.currentUser);
  const showComments=useSelector((state)=>state.authentication.showComments);
  useEffect(()=>{
    if(currentPostId){
    const unsub = onSnapshot(doc(db, "Posts", currentPostId), (doc) => {
      console.log("currentData",doc.data().comments);
      setUser(doc.data())
      setComments(doc.data().comments);
  });
  return ()=>unsub;
}
  },[currentPostId])
  const AddNotification=async(uploadedByEmail,type)=>{
    const userRef = collection(db, "Users");
      const data = await getDocs(userRef);
      const users = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const filteredData = users.filter((item) => {
        return item.email === uploadedByEmail;
      });
      console.log("data jiski post hai",filteredData[0]);
      setUser(filteredData[0]);
      // if(user){
      const notificationRef=doc(db,"Users",filteredData[0]?.id)
      console.log(notificationRef);
      await updateDoc(notificationRef,{notification:arrayUnion({
        postUploadedBy:uploadedByEmail,
        reactionBy:currentUser,
        type:type,
        time:Date.now()
      })})
    // }
  }
  const postCmntBtn=async()=>{
    setComment("");
    await AddNotification(user?.currentEmail,"comment")
    // setUser(null)
    const cmntRef=doc(db,"Posts",currentPostId);
    await updateDoc(cmntRef,{comments:arrayUnion({
        name:currentUser,
        comment:comment,
        date:Timestamp.now()
      })
    })
  }
  return (
    <div className='comments'>
     {
      showComments?
      <>
      <div className='post-Comment'>
        <TextArea style={{height:600,background:"gray"}} showCount maxLength={100} onChange={(e)=>setComment(e.target.value)} placeholder='Enter Comment..' value={comment}/>
        <Button type="primary" onClick={postCmntBtn}>Post Comment</Button>
      </div>
      <div className='commentsDisplay'>
        {
          comments?.length>0?
          <div>
           {
            comments?.map((item,idx)=>{
               return(
                <div key={idx} className='eachCmnt'>
                <h3> {item.name}</h3>
                 <h5>{item.comment}</h5>
                </div>
               )
            })
           }
          </div>:
          <div className='noComment'>
            <h1>No Comments Yet</h1>
          </div>
        }
      </div>
      </>
      :
      <div className='noPost'>
       <h1>No Posts Selected Yet</h1>
      </div>
     }
    </div>
  )
}

export default Comments