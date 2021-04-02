import useTypedSelector from "@/hooks/useTypedSelector";
import "./profilePage.scss";
import noPhotoImage from "@/assets/images/no-photo.png";
import { useState } from "react";
import TextInput from "@/elements/inputs/textInput";
import Textarea from "@/elements/inputs/textarea";

const ProfilePage = () => {
  const { username } = useTypedSelector((state) => state.user);
  const [newUsername, setNewUsername] = useState("");
  const [newUsernameError, setNewUsernameError] = useState("");

  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  return (
    <div className="profilepage page_content_container">
      <h2>{username} profile page</h2>
      <div className="information">
        <div className="avatar">
          <img src={noPhotoImage} alt="Empty profile" />
          <button type="button" onClick={() => alert("This feature is currently disabled.")}>
            Change profile image
          </button>
        </div>
        <div className="data">
          <TextInput
            label="Username"
            id="login"
            value={newUsername}
            maxLength={30}
            handleChange={setNewUsername}
            errorDispatch={setNewUsernameError}
          />
          <span className="error">{newUsernameError}</span>
          <Textarea
            label="Profile description"
            id="description"
            value={description}
            maxLength={200}
            handleChange={setDescription}
            errorDispatch={setDescriptionError}
          />
          <span className="error">{descriptionError}</span>
        </div>
        <div className="buttons">
          <button type="button">Save profile</button>
          <button type="button">Change password</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
