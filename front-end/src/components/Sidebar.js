import "./Sidebar.css";
import { slide as Menu } from "react-burger-menu";

const Sidebar = (props) => {
  const { pageWrapId, outerContainerId, userDetails } = props;
  return (
    <>
      <Menu pageWrapId={pageWrapId} outerContainerId={outerContainerId}>
        <div>
          {Object.entries(userDetails).map(([key, value]) => (
            <>
              <div key={value}>{value}</div>
            </>
          ))}
        </div>
        <a id="sign-in" className="menu-item" href="/sign-in">
          Sign out
        </a>
        <a id="settings" className="menu-item" href="/settings">
          Settings
        </a>
      </Menu>
    </>
  );
};

export default Sidebar;
