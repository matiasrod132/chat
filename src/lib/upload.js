import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./firebase"

const upload = async (file) => {

    if(!file) {
        return
    }
    
    const date = new Date()
    const storageRef = ref(storage, `avatar/${date + file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve,reject)=>{
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Subir esta" + progress + "% hecho");
            },
            (error) => {
                reject("¡Algo salió mal!" + error.code)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL);
                });
            }
        );
    })
};

export default upload