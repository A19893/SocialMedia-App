import React,{useState} from "react";
import { Input } from "antd";
import Users from './Users'
const { Search } = Input;
const SearchBar = () => {
  const[val,setVal]=useState("");
  const onSearch = (value) => setVal(value);
  return (
    <div className="searchBar">
      <div className="homeLogo">
        <img
          style={{
            width: "45px",
            height: "40px",
            margin: "0px",
            paddingLeft: "10px",
            paddingTop: "10px",
            borderTopRightRadius: "0px",
            borderTopLeftRadius: "20px",
            borderBottomLeftRadius: "0px",
            borderBottomRightRadius: "0px",
          }}
          src="https://i.pinimg.com/564x/8a/76/96/8a7696cb9ac02d0ea26945a8e563b04b.jpg"
          alt="Missing"
        />
        <div className="searchBarField">
          {/* <Search
            style={{ fontWeight: "bolder" }}
            placeholder="Find a User.."
            onSearch={onSearch}
            enterButton
          /> */}
          <input type="text" style={{ fontWeight: "bolder",border:"black" }}
            placeholder="Find a User.." onChange={(e)=>setVal(e.target.value)}/>
        </div>
      </div>
      <div
        style={{ marginTop: "10px", height: "6px", backgroundColor: "white" }}
      ></div>
          <Users val={val}/>
      </div>
  );
};

export default SearchBar;
