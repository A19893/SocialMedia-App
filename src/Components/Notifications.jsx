import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../Config/Firebase";

const MyComponent = (props) => {
  const currentEmail = useSelector((state) => state.authentication.currentEmail);
    const [user, setUser] = useState(null);
    useEffect(() => {
      const userRef = collection(db, "Users");
      const getUsers = async () => {
        const data = await getDocs(userRef);
        const users = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        const filteredData = users.filter((item) => {
          return item.currentEmail === currentEmail;
        });
        console.log("filtered data", filteredData[0]);
         setUser(filteredData);
        // setProfile(FilteredData[0]);
      };
      getUsers();
    }, []);
  return (
  <>
  {
  console.log("users",user)
  }
  </>
  )
};

export default MyComponent;