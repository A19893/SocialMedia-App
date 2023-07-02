import {  collection, updateDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../Config/Firebase";
import { Button, Form, Input } from "antd";
import {useNavigate} from "react-router-dom"
import ExitToAppSharpIcon from '@mui/icons-material/ExitToAppSharp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddCommentIcon from '@mui/icons-material/AddComment';
const Profile = () => {
  const currentEmail = useSelector(
    (state) => state.authentication.currentUsername
  );
  const navigate=useNavigate();
  useEffect(() => {
    const userRef=collection(db,"Users");
   const getUser=async()=>{
   const data=await getDocs(userRef);
   const users = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const FilteredData = users.filter((item) => {
        return item.email === currentEmail;
      });
      // console.log(FilteredData);
       setProfile(FilteredData[0]);
   }
   getUser();
  }, []);
  useEffect(()=>{
    const userRef=collection(db,"Posts");
   const getPosts=async()=>{
   const data=await getDocs(userRef);
   const users = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const FilteredData = users.filter((item) => {
        return item.currentEmail === currentEmail;
      });
      console.log(FilteredData);
       setPosts(FilteredData);
      //  setProfile(FilteredData[0]);
    }
    getPosts();
  },[])
  const [profile, setProfile] = useState("");
  const[posts,setPosts]=useState("");
  const currentUser = useSelector(
    (state) => state.authentication.currentUser
  );
  const[name,setName]=useState(currentUser)
  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const updateBtn=async()=>{
    const updateRef=doc(db,"Users",profile?.id);
    await updateDoc(updateRef,{
      name:name
    })
    alert("You have to login again to see the chanages")
    navigate("/login");
    console.log(updateRef.id)
  }
  return (
    <div className="profileContainer">
    <div className="profileDisplay">
    <div className="updateForm">
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item label="Name">
          <Input value={name} style={{color:"black"}} onChange={(e)=>setName(e.target.value)}/>
        </Form.Item>
        <Form.Item label="Email">
          <Input disabled={true} value={profile?.email} style={{color:"black"}}/>
        </Form.Item>
        <Form.Item label="User-Id">
          <Input disabled={true} value={profile?.userid} style={{color:"black"}}/>
        </Form.Item>
      </Form>
      <Button type="primary" onClick={updateBtn}>Update Button</Button>
    </div>
    <div className="profile-posts">
    {posts.length>0?posts?.map((item, idx) => {
        return (
          <div key={idx} className="post">
            <div className='userTitle'>{item?.username}</div>
            <img src={item.url} alt="Missing" /><br/>
            <div className="likes-comment">{item?.likes} Likes  {item?.comments.length} Comments</div>
            <div className="post-icons">
                <FavoriteIcon fontSize='large' />
                <AddCommentIcon  fontSize='large'/>
            </div>
            <div className="caption"><p style={{margin:0}}>{item.username}</p> {item.caption}</div>
          </div>
        );
      }):<div className='noComment'>
      <h1>No Posts Yet</h1>
    </div>}
    </div>
  <div className="button">
  <ExitToAppSharpIcon style={{fontSize:"30px",cursor:"pointer"}}  fontSize="large" onClick={()=>navigate("/home")}/>
  </div>
  </div>
  </div>
  );
};

export default Profile;
