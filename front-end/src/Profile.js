import "./Profile.css";
import Sidebar from "./components/Sidebar";
import { Link } from "react-router-dom";
const userDetails = { username: "bob", userProfile: "temp" };
const Profile = (props) => {
  return (
    <div id="Profile">
      <Sidebar
        pageWrapId={"page-wrap"}
        outerContainerId={"Profile"}
        userDetails={userDetails}
      />

      <div id="page-wrap"></div>
    </div>
  );
};

export default Profile;
