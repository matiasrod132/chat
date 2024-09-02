import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useChatStore } from "../../lib/chatStore"
import { auth, db } from "../../lib/firebase"
import { useUserStore } from "../../lib/userStore";
import "./detail.css"

const Detail = () => {
    const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } =
        useChatStore();
    const { currentUser } = useUserStore();

    const handleBlock = async () => {
        if(!user) return;

        const userDocRef = doc(db, "users", currentUser.id)
        try{
            await updateDoc(userDocRef, {
                blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
            });
            changeBlock()
        }catch(err){
            console.log(err)
        }
    }
    return (
        <div className="detail">
            <div className="user">
                <img src={user?.avatar || "./avatar.png"} alt="" />
                <h2>{user?.username}</h2>
                <p>LDAODWA DAWOD WAD OAW ODAW ODWA ODA WOD.</p>
            </div>
            <div className="info">
                <div className="option">
                    <div className="title">
                        <span>Chat Settings</span>
                        <img src="./arrowUp.png" alt=""/>
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Privacy & helP</span>
                        <img src="./arrowUp.png" alt=""/>
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Shared photos</span>
                        <img src="./arrowUp.png" alt=""/>
                    </div>
                    <div className="photos">
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="https://lumiere-a.akamaihd.net/v1/images/3_avtr-460_2647266a.jpeg?region=0,0,1920,1080" alt="" />
                                <span>Photo_2024_2.png</span>
                            </div>
                            <img src="./download.png" alt="" className="icon"/>
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="https://lumiere-a.akamaihd.net/v1/images/3_avtr-460_2647266a.jpeg?region=0,0,1920,1080" alt="" />
                                <span>Photo_2024_2.png</span>
                            </div>
                            <img src="./download.png" alt="" className="icon"/>
                        </div>
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Shared Files</span>
                        <img src="./arrowUp.png" alt=""/>
                    </div>
                </div>
                <button onClick={handleBlock}>{
                    isCurrentUserBlocked
                    ? "Estas bloqueado!"
                    : isReceiverBlocked
                    ? "Usuario Bloqueado"
                    : "Bloquear Usuario"
                }
                </button>
                <button className="logout" onClick={()=>auth.signOut()}>Logout</button>
            </div>
        </div>
    )
}

export default Detail