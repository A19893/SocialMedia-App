import React,{useEffect, useState} from 'react'
import { LogoutOutlined, HomeOutlined,MessageOutlined,ProfileOutlined,NotificationFilled } from '@ant-design/icons';
import { Menu,Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { removeAuthentication,showChats } from "../Features/AuthSlice";
import { CurrentChatRoomId,removeParticularUser,removeUserDetail } from '../Features/UserSlice';
import { collection, getDocs, updateDoc,doc } from 'firebase/firestore';
import { db } from '../Config/Firebase';
const NavBar = () => {
  const[notification,setNotifications]=useState(null);
  const currentEmail = useSelector(
    (state) => state.authentication.currentUsername
  );
  const[user,setUser]=useState(null)
  useEffect(()=>{
    const fetchData=async()=>{
      const notifyRef=collection(db,"Users");
      const data = await getDocs(notifyRef);
      const users = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const filteredData = users.filter((item) => {
        return item.email === currentEmail;
      });
      setUser(filteredData[0]);
      setNotifications(filteredData[0]?.notification);
    }
    fetchData();
  })
    //this func will select value from menu bar and perform a specific actions
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    //this func will remove authenticated user and redirect it to login page
    const logOutUser = async () => {
        const docRef=doc(db,"Users",user?.id)
        console.log(docRef);
        await updateDoc(docRef,{
          notification:[]
        })
        dispatch(removeAuthentication());
        dispatch(CurrentChatRoomId(null));
        dispatch(removeParticularUser());
        dispatch(removeUserDetail())
        navigate("/login");
      };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
    const items = [
        {
          
          key: 'home',
          icon: <HomeOutlined style={{fontSize:"30px",paddingLeft:"10px"}} onClick={()=>dispatch(showChats())}/>,
        },
        {
          key: 'setting',
          icon:<MessageOutlined style={{fontSize:"30px"}} onClick={()=>dispatch(showChats())}/>
        },
        {
            key: 'profile',
            icon:<ProfileOutlined style={{fontSize:"30px"}} onClick={()=>navigate("/profile")}/>
        },
        {
          
          key: 'notify',
          icon: <NotificationFilled style={{fontSize:"30px"}} onClick={showModal}/>
        },
        {
          
            key: 'logout',
            icon: <LogoutOutlined style={{fontSize:"30px"}} rotate="180" onClick={logOutUser}/>
        }
      ];
    const [current, setCurrent] = useState('mail');
    const navigate=useNavigate();
    const dispatch=useDispatch();
  return (
   <>
   <div className="navBar">
   <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} style={{backgroundColor:"rgb(245, 249, 250)",borderBottomLeftRadius:"25px",borderBottomRightRadius:"25px"}}/>
   </div>
   <Modal title="Notifications" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      {
        notification?.length?
        notification?.map((item,idx)=>{
          return(
            <div key={idx}>
            {item.reactionBy} {item.type}ed on  your post
            </div>
          )
        }):<div className="no-Notification"><h3>No Notifications Yet</h3></div>
      }
    </Modal>
   </>
  )
}

export default NavBar