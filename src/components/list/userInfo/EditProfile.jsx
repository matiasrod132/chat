import { useState, useRef } from "react";
import "./editProfile.css";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../lib/firebase";
import { useUserStore } from "../../../lib/userStore";

const EditProfile = ({ onClose }) => {
  const { currentUser, updateUser } = useUserStore();
  const [username, setUsername] = useState(currentUser.username);
  const [description, setDescription] = useState(currentUser.description);
  const [avatar, setAvatar] = useState(null);

  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("Ningún archivo seleccionado");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setAvatar(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let avatarURL = currentUser.avatar;

      if (avatar) {
        const storageRef = ref(storage, `avatars/${currentUser.uid}`);
        await uploadBytes(storageRef, avatar);
        avatarURL = await getDownloadURL(storageRef);
      }

      await updateUser({
        username,
        description,
        avatar: avatarURL,
      });

      onClose(); // Cierra el modal correctamente
    } catch (error) {
      console.error("Error actualizando perfil:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="editModal">
      <div className="editContainer">
        <h2>Editar Perfil</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nuevo nombre de usuario"
            required
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Nueva descripción"
            required
          />

          <div className="avatar-upload-container">
            <button
              type="button"
              className="avatar-upload-button"
              onClick={() => fileInputRef.current.click()}
            >
              🖼️ Subir Avatar
            </button>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="avatar-hidden-input"
            />

            <span className="avatar-file-name">{fileName}</span>

            {previewUrl && (
              <img
                src={previewUrl}
                alt="Vista previa"
                className="avatar-preview"
              />
            )}
          </div>

          <div className="action-buttons">
            <button type="submit" disabled={loading}>
              {loading ? "Guardando..." : "Guardar cambios"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="cancel"
              disabled={loading}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
