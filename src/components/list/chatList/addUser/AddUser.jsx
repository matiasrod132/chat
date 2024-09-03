import React, { forwardRef } from "react";
import "./addUser.css";
import { db } from "../../../../lib/firebase";
import {
    arrayUnion,
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    serverTimestamp,
    setDoc,
    updateDoc,
    where,
} from "firebase/firestore";
import { useState } from "react";
import { useUserStore } from "../../../../lib/userStore";
import { toast } from "react-toastify";

const AddUser = forwardRef((props, ref) => {
    const [user, setUser] = useState(null);
    
    const { currentUser } = useUserStore();

    const handleSearch = async (e) =>{ 
        e.preventDefault()
        const formData = new FormData(e.target)
        const username = formData.get("username");

        try{
            const userRef = collection(db, "users");

            const q = query(userRef, where("username", "==", username));

            const querySnapShot = await getDocs(q)

            if(!querySnapShot.empty){
                setUser(querySnapShot.docs[0].data())
            }
        }catch(err){
            console.log(err)
        }
    };

    const handleAdd = async () => {
        const chatRef = collection(db, "chats");
        const userChatsRef = collection(db, "userchats");
    
        if (user.id === currentUser.id) {
            toast.error("No puedes iniciar un chat contigo mismo");
            return;
        }
    
        try {
            // Obtén todos los chats en los que el usuario actual es miembro
            const chatsQuery = query(chatRef, where("members", "array-contains", currentUser.id));
            const querySnapshot = await getDocs(chatsQuery);

            // Filtra en el cliente para ver si el otro usuario es miembro de algún chat
            const chatExists = querySnapshot.docs.some(doc =>
                doc.data().members.includes(user.id)
            );

            if (chatExists) {
                toast.error("Ya tienes un chat con este usuario.");
                return; // Detiene la ejecución de la función
            }

            // Si no existe un chat, crea uno nuevo
            const newChatRef = doc(chatRef);
            
            await setDoc(newChatRef, {
                createAt: serverTimestamp(),
                members: [currentUser.id, user.id], // Añade los miembros del chat
                messages: [],
            });
    
            // Función para actualizar los chats de un usuario
            const updateUserChat = async (userId) => {
                const userChatDocRef = doc(userChatsRef, userId);
                const userChatDocSnap = await getDoc(userChatDocRef);
    
                const chatData = {
                    chatId: newChatRef.id,
                    lastMessage: "",
                    receiverId: userId === currentUser.id ? user.id : currentUser.id,
                    updateAt: Date.now(),
                };
    
                if (userChatDocSnap.exists()) {
                    // Si el documento existe, actualiza el campo 'chats'
                    await updateDoc(userChatDocRef, {
                        chats: arrayUnion(chatData),
                    });
                } else {
                    // Si el documento no existe, créalo con el campo 'chats'
                    await setDoc(userChatDocRef, {
                        chats: [chatData],
                    });
                }
            };
    
            // Actualizar los chats para ambos usuarios
            await Promise.all([
                updateUserChat(currentUser.id),
                updateUserChat(user.id),
            ]);
    
        } catch (err) {
            console.log(err);
        }
    };
    

    return (
        <div className="addUser" ref={ref}>
            <form onSubmit={handleSearch}>
                <input type="text" placeholder="Nombre" name="username" autoComplete="off" />
                <button>Buscar</button>
            </form>
            {user && <div className="user">
                <div className="detail">
                    <img src={user.avatar || "./avatar.png"} alt="" />
                    <span>{user.username}</span>
                </div>
                <button onClick={handleAdd}>Agregar</button>
            </div>}
        </div>
    )
});

export default AddUser;
