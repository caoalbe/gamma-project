import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper";
import { UserContext } from "../../UserContext";
import { themes, brand } from "../../components/theme";
import {
  UserAPIProps,
  get_user_by_id,
  put_user,
} from "../../components/api_endpoints";

const ProfileEdit = (): JSX.Element => {
  const navigate = useNavigate();
  const { userID: contextUserID } = useContext(UserContext);
  const { userID: urlUserID } = useParams();
  const [userInfo, setUserInfo] = useState<UserAPIProps | null>(null);

  const [banner, setBanner] = useState<File | null>(null);
  const [pfp, setPfp] = useState<File | null>(null);

  useEffect(() => {
    if (contextUserID === null || contextUserID !== urlUserID) {
      navigate("/home");
      return;
    }

    get_user_by_id(contextUserID).then((res) => {
      setUserInfo(res);
    });
  }, []);

  if (userInfo === null) {
    return <></>;
  }

  return (
    <PageWrapper>
      <div className={`${themes["black"].textPrimary}`}>
        <div className={`py-6 border-b ${themes["black"].border}`} />
        <div className={`pb-2 border-b ${themes["black"].border}`}>
          Banner
          {userInfo.banner === null ? (
            <></>
          ) : (
            <img src={userInfo.banner} alt="banner" className="" />
          )}
          <input
            type="file"
            className="mt-2 ml-1"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setBanner(file);
                const reader = new FileReader();
                reader.onloadend = () => {
                  setUserInfo({ ...userInfo, banner: reader.result as string });
                };
                reader.readAsDataURL(file);
              } else {
                setBanner(null);
                setUserInfo({ ...userInfo, banner: "" });
              }
            }}
          />
        </div>
        <div className={`pb-2 border-b ${themes["black"].border}`}>
          Profile Picture
          {userInfo.pfp === null ? (
            <></>
          ) : (
            <img
              src={userInfo.pfp}
              alt="pfp"
              className="aspect-square rounded-full w-3/12 border-4 border-black pointer-events-none"
            />
          )}
          <input
            type="file"
            className="mt-2 ml-1"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setPfp(file);
                const reader = new FileReader();
                reader.onloadend = () => {
                  setUserInfo({ ...userInfo, pfp: reader.result as string });
                };
                reader.readAsDataURL(file);
              } else {
                setPfp(null);
                setUserInfo({ ...userInfo, pfp: "" });
              }
            }}
          />
        </div>
        <div className={`border-b ${themes["black"].border} px-2`}>
          Display Name <br />
          <textarea
            spellCheck={false}
            className={`resize-none w-full
                        ${themes["black"].bgHover} ${themes["black"].textPrimary}`}
            value={userInfo.nameDisplay}
            onChange={(e) =>
              setUserInfo({ ...userInfo, nameDisplay: e.target.value })
            }
            rows={1}
          />
        </div>
        <div className={`border-b ${themes["black"].border} px-2`}>
          Bio <br />
          <textarea
            spellCheck={false}
            className={`resize-none w-full
                        ${themes["black"].bgHover} ${themes["black"].textPrimary}`}
            value={userInfo.bio}
            onChange={(e) => setUserInfo({ ...userInfo, bio: e.target.value })}
            rows={4}
          />
        </div>
        <div className={`border-b ${themes["black"].border} text-center`}>
          <div
            className={`w-min py-2 px-4 mx-auto my-2 rounded-full text-white
                        ${brand.base} hover:${brand.hover} active:${brand.press}
                        cursor-pointer select-none`}
            onClick={() => {
              put_user(
                userInfo.userID,
                banner,
                pfp,
                userInfo.nameDisplay,
                userInfo.bio
              );
            }}
          >
            <span className={"text-lg"}>Save</span>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ProfileEdit;
