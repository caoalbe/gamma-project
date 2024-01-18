import PageWrapper from "../../components/PageWrapper";
import { useParams } from "react-router-dom";

const Profile = (): JSX.Element => {
  const { userID } = useParams();

  return (
    <PageWrapper>
      <h2>profile page {userID}</h2>
    </PageWrapper>
  );
};

export default Profile;
