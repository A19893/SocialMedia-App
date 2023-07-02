import React, { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddCommentIcon from '@mui/icons-material/AddComment';
import { arrayUnion, collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../Config/Firebase';
import { useDispatch } from 'react-redux';
import { showComments } from '../Features/AuthSlice';
import { useSelector } from "react-redux";

const DisplayPost = (props) => {
  const currentUser=useSelector((state)=>state.authentication.currentUser);
  const[user,setUser]=useState(null)
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
    const dispatch=useDispatch();
    const likeBtn=async(item)=>{
      console.log("item",item);
    await AddNotification(item.currentEmail,"like")
    // setUser(null)
    const postRef=doc(db,"Posts",item.id);
    await updateDoc(postRef,{
        likes:item.likes+1
    })
    }
    const cmntBtn=(item)=>{
     dispatch(showComments(item.id))
    }
  return (
    <div className="posts">
    <div className="postDisplay">
      {props.Posts?.map((item, idx) => {
        return (
          <div key={idx} className="post">
            <div className='userTitle'>{item?.username}</div>
            <img src={item.url} alt="Missing" /><br/>
            <div className="likes-comment">{item?.likes} Likes  {item?.comments.length} Comments</div>
            <div className="post-icons">
                <FavoriteIcon fontSize='large' onClick={()=>likeBtn(item)}/>
                <AddCommentIcon  fontSize='large' onClick={()=>cmntBtn(item)}/>
            </div>
            <div className="caption"><p style={{margin:0}}>{item.username}</p> {item.caption}</div>
          </div>
        );
      })}
    </div>
    <div className="addIcon">
      <AddCircleIcon
        onClick={props.showModal}
        fontSize="large"
        style={{ cursor: "pointer" }}
      />
    </div>
  </div>
  );
}
export default DisplayPost;
