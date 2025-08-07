import { doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { create } from 'zustand';
import { db } from './firebase';

export const useUserStore = create((set, get) => ({
    currentUser: null,
    isLoading: true,
    unsubscribe: null,

    fetchUserInfo: async (uid) => {
        if (!uid) {
            get().unsubscribe?.(); // cancel previous listener if any
            return set({ currentUser: null, isLoading: false });
        }

        try {
            const docRef = doc(db, "users", uid);

            // Cancela listeners previos si hay
            get().unsubscribe?.();

            // Suscripción en tiempo real
            const unsubscribe = onSnapshot(docRef, async (docSnap) => {
                if (docSnap.exists()) {
                    set({ currentUser: { ...docSnap.data(), uid }, isLoading: false });
                } else {
                    const newUser = {
                        name: "Nuevo Usuario",
                        avatar: "./avatar.webp",
                        description: "Sin descripcion",
                        createdAt: new Date()
                    };
                    await setDoc(docRef, newUser);
                    set({ currentUser: { ...newUser, uid }, isLoading: false });
                }
            });

            // Guarda la función de cancelación para cuando el usuario cambie
            set({ unsubscribe });

        } catch (err) {
            console.log(err);
            set({ currentUser: null, isLoading: false });
        }
    },

    updateUser: async (newData) => {
        const { currentUser } = get();
        if (!currentUser?.uid) return;

        try {
            const userRef = doc(db, "users", currentUser.uid);
            await updateDoc(userRef, newData);
        } catch (err) {
            console.error("Error updating user:", err);
        }
    }
}));
