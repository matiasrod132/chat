import { useState, useEffect } from "react";
import { arrayRemove, arrayUnion, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { useChatStore } from "../../lib/chatStore"
import { auth, db } from "../../lib/firebase"
import { useUserStore } from "../../lib/userStore";
import "./detail.css"

const Detail = () => {
    const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } =  useChatStore();
    const { currentUser } = useUserStore();
    const [sharedPhotos, setSharedPhotos] = useState([]);
    const [showPhotos, setShowPhotos] = useState(false);

    useEffect(() => {
        if (!chatId) return;

        const unsubscribe = onSnapshot(doc(db, "chats", chatId), (docSnap) => {
            if (docSnap.exists()) {
                const messages = docSnap.data().messages || [];
                const photos = messages
                    .filter(msg => msg.img)  // solo mensajes con imagen
                    .map(msg => msg.img);
                setSharedPhotos(photos);
            }
        });

        return () => unsubscribe();
    }, [chatId]);

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
                <img src={user?.avatar} alt="Avatar"/>
                <h2>{user?.username}</h2>
                <p>{user?.description}</p>
            </div>
            <div className="info">
                <div className="option">
                    <div className="title">
                        <span>Chat Settings</span>
                        <img src="./arrowUp.png" alt=""/>
                    </div>
                </div>
                <div className="option">
                    <div className="title" onClick={() => setShowPhotos(prev => !prev)} style={{ cursor: 'pointer' }}>
                        <span>Shared photos</span>
                        <img 
                            src="./arrowUp.png" 
                            alt=""
                            style={{
                                transform: showPhotos ? "rotate(0deg)" : "rotate(180deg)",
                                transition: "transform 0.3s ease",
                            }}
                        />
                    </div>
                    {showPhotos && (
                        <div className="photos">
                            {sharedPhotos.length === 0 ? (
                                <span style={{ color: "gray", fontSize: "14px" }}>No hay fotos compartidas aún.</span>
                            ) : (
                                sharedPhotos.map((url, i) => (
                                    <div className="photoItem" key={i}>
                                        <div className="photoDetail">
                                            <img src={url} alt={`shared-${i}`} />
                                            <span>{`Photo_${i + 1}.jpg`}</span>
                                        </div>
                                        <a href={url} download>
                                            <img src="./download.png" alt="download" className="icon" />
                                        </a>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
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