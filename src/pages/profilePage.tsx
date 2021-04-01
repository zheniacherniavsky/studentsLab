import useTypedSelector from "@/hooks/useTypedSelector";
import "./profilePage.scss";

const ProfilePage = () => {
  const { username } = useTypedSelector((state) => state.user);
  return (
    <div className="profilepage page_content_container">
      <h2>{username} profile page</h2>
      <div className="information">
        <div>image</div>
        <form />
      </div>
    </div>
  );
};

export default ProfilePage;
