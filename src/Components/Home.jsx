import React from "react";
import SearchBar from "./SearchBar";
import NavBar from "./NavBar"
import Comments from "./Comments";
import Posts from "./Posts"
import Chats from "./Chats"
import { useSelector } from "react-redux";
const Home = () => {
  const chats=useSelector((state)=>state.authentication.showChats)
  console.log("chats",chats);
  return (
    <>
    <div className="homeContainer">
      <SearchBar/>
      <NavBar/>
      <Comments/>
    {chats?<Chats/>:<Posts/>}
    </div>
    </>
  );
};
export default Home;
