import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { db, storage } from "../Config/Firebase";
import { v4 } from "uuid";
import { CreatePost } from "./CreatePost";
import { collection, query, onSnapshot } from "firebase/firestore";
import { useSelector } from "react-redux";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import DisplayPost from "./DisplayPost";
const Posts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUpload, setImageUpload] = useState(null);
  const [caption,setCaption]=useState("");
  const currentEmail = useSelector(
    (state) => state.authentication.currentUsername
  );
  const username = useSelector(
    (state) => state.authentication.currentUser
  );
  const [Posts, setPosts] = useState(null);
  useEffect(() => {
    const q = query(collection(db, "Posts"));
    const querySnapshot = onSnapshot(q, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setPosts(messages);
    });
    return () => querySnapshot;
  }, []);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const uploadImage = async (e) => {
    e.preventDefault();
    if (imageUpload == null) alert("No image");
    const imageRef = ref(storage, `uploads/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      alert("Image Uploaded");
      getDownloadURL(snapshot.ref).then((url) => {
        const postData = {
          currentEmail,
          caption,
          url,
          time:Date.now(),
          username,
          likes:0,
          comments:[]
        };
        CreatePost(postData);
        setCaption("");
        setImageUpload(null);
      });
    });
  };
  return (
    <>
      <DisplayPost showModal={showModal} Posts={Posts}/>
      <Modal
        title="Upload Post"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        bodyStyle={{ height: 400 }}
      >
        <form style={{margin:"auto",display:"grid"}}>
          <textarea placeholder="Enter Caption..." value={caption} style={{width:"450px",height:"200px",margin:"0"}} onChange={(e)=>setCaption(e.target.value)}></textarea><br/>
          <input
            type="file"
            accept=".png,.jpg,.jpeg,.mp4"
            onChange={(event) => {
              setImageUpload(event.target?.files[0]);
            }}
            style={{ borderStyle: "none" }}
          />
          <br />
          <button type="submit" onClick={uploadImage} style={{width:"100px"}}> 
            Upload Image
          </button>
        </form>
      </Modal>
    </>
  );
};

export default Posts;
