import useTypedSelector from "@/helpers/hooks/useTypedSelector";
import "./profilePage.scss";
import noPhotoImage from "@/api/assets/images/no-photo.png";
import { useEffect, useState } from "react";
import TextInput from "@/elements/inputs/textInput";
import Textarea from "@/elements/inputs/textarea";
import getProfile from "@/api/apiGetProfile";
import saveProfile from "@/api/apiSaveProfile";
import { InfoModal, InfoModalProps, InfoType } from "@/api/components/modal/infoModal";
import ChangePasswordModal from "@/api/components/modal/changePasswordModal";

// FIXME: change name of username state
// TODO: Refactor progect architecture

type ProfileType = {
  avatar: string;
  username: string;
  description: string;
};

const ProfilePage = () => {
  const { username: login } = useTypedSelector((state) => state.user);
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const [showInfoModalSuccess, toggleInfoModalSuccess] = useState(false);
  const [showInfoModalFailed, toggleInfoModalFailed] = useState(false);
  const [showChangePasswordModal, toggleChangePasswordModal] = useState(false);

  const updateData = async () => {
    let profile: ProfileType;
    if (login !== null) {
      profile = await getProfile(login);
      setUsername(profile.username);
      setDescription(profile.description);
    }
  };

  useEffect(() => {
    updateData();
  }, []);

  const InfoModalSuccessProps: InfoModalProps = {
    infoModalHeader: "Success!",
    infoModalText: "All data has been saved.",
    infoModalType: InfoType.ALERT,
    infoModalCallback: () => null,
    closeInfoModalCallback: () => toggleInfoModalSuccess(false),
  };

  const InfoModalFailedProps: InfoModalProps = {
    infoModalHeader: "Failed!",
    infoModalText: "Try again later.",
    infoModalType: InfoType.ALERT,
    infoModalCallback: () => null,
    closeInfoModalCallback: () => toggleInfoModalFailed(false),
  };

  return (
    <>
      {showInfoModalSuccess ? <InfoModal {...InfoModalSuccessProps} /> : null}
      {showInfoModalFailed ? <InfoModal {...InfoModalFailedProps} /> : null}
      {showChangePasswordModal ? <ChangePasswordModal closeCallback={() => toggleChangePasswordModal(false)} /> : null}
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
              onClick={async () => {
                if (login) {
                  const error = await saveProfile(login, username, description);
                  console.log(error);
                  if (!error) {
                    updateData();
                    toggleInfoModalSuccess(true);
                  } else toggleInfoModalFailed(true);
                }
              }}
            >
              Save profile
            </button>
            <button type="button" onClick={() => toggleChangePasswordModal(true)}>
              Change password
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
