import "./userinfo.css";
import { useUserStore } from "../../../lib/userStore";
import { useState } from "react";
import EditProfile from "./EditProfile";


const Userinfo = () => {
    const { currentUser } = useUserStore();
    const [openEdit, setOpenEdit] = useState(false);

    return (
        <div className="userInfo">
            <div className="user">
                <img src={currentUser.avatar} alt="" />
                <h2>{currentUser.username}</h2>
            </div>
            <div className="icons">
                <img src="./more.png" alt="" />
                <img src="./video.png" alt="" />
                <img className="edit" src="./edit.png" alt="" onClick={() => setOpenEdit(true)} />
            </div>
            {openEdit && <EditProfile onClose={() => setOpenEdit(false)} />}
        </div>
    );
};

export default Userinfo;
