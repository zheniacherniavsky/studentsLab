import useTypedSelector from "@/hooks/useTypedSelector";
import "./profilePage.scss";
import noPhotoImage from "@/assets/images/no-photo.png";
import { useEffect, useState } from "react";
import TextInput from "@/elements/inputs/textInput";
import Textarea from "@/elements/inputs/textarea";
import { GetProfile, GetProfileResponseType } from "@/api/apiGetProfile";

// FIXME: change name of username state
// TODO: Refactor progect architecture

const ProfilePage = () => {
  const { username: login } = useTypedSelector((state) => state.user);
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const updateData = async () => {
    let profile: GetProfileResponseType;
    if (login !== null) {
      profile = await GetProfile(login);
      setUsername(profile.username);
      setDescription(profile.description);
    }
  };

  useEffect(() => {
    updateData();
  }, []);

  return (
    <div className="profilepage page_content_container">
      <h2>{login} profile page</h2>
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
            value={username}
            maxLength={30}
            handleChange={setUsername}
            errorDispatch={setUsernameError}
          />
          <span className="error">{usernameError}</span>
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
          <button
            type="button"
            onClick={() => {
              updateData();
            }}
          >
            Save profile
          </button>
          <button type="button">Change password</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
