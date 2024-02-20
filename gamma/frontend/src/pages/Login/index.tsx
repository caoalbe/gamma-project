import { useContext, useState } from "react";
import PageWrapper from "../../components/PageWrapper";
import { UserContext } from "../../UserContext";
import { api_login, post_user } from "../../components/api_endpoints";
import { useNavigate } from "react-router-dom";
import { themes } from "../../components/theme";

const Login = (): JSX.Element => {
  const navigate = useNavigate();
  const { setUserID, setUserHandle, setUserDisplay, setUserPfp } =
    useContext(UserContext);

  // Form State
  const [loginName, setLoginName] = useState<string>("");
  const [loginPass, setLoginPass] = useState<string>("");
  const [loginFailed, setLoginFailed] = useState<boolean>(false);

  const [createHandle, setCreateHandle] = useState<string>("");
  const [createDisplay, setCreateDisplay] = useState<string>("");
  const [createPass, setCreatePass] = useState<string>("");
  const [createFailed, setCreateFailed] = useState<number>(0); // 0 -> success, 1 -> taken username 2 -> other

  return (
    <PageWrapper>
      <div className="flex-col">
        <div
          className={`flex-col w-full py-4 border-b ${themes["black"].border} space-y-3`}
        >
          <div className="pl-6">
            <span
              className={`text-2xl font-bold text-center ${themes["black"].textPrimary}`}
            >
              Existing User
            </span>
          </div>
          <div>
            <input
              placeholder="Username"
              value={loginName}
              onChange={(e) => {
                setLoginName(e.target.value);
                setLoginFailed(false);
              }}
              className={`block w-9/12 ${themes["black"].bgHover} rounded-full mx-auto
                              py-1.5 pl-4 pr-8 text-xl ${themes["black"].textPrimary}
                              placeholder:${themes["black"].textSecondary} focus:outline-0`}
            />
          </div>
          <div>
            <input
              placeholder="Password"
              type="password"
              value={loginPass}
              onChange={(e) => {
                setLoginPass(e.target.value);
                setLoginFailed(false);
              }}
              className={`block w-9/12 ${themes["black"].bgHover} rounded-full mx-auto
                              py-1.5 pl-4 pr-8 text-xl ${themes["black"].textPrimary}
                              placeholder:${themes["black"].textSecondary} focus:outline-0`}
            />
          </div>
          <div
            className="w-4/12 mx-auto text-center rounded-full select-none cursor-pointer
                            px-5 py-1
                            bg-blue-400 hover:bg-blue-500 active:bg-blue-600"
            onClick={() => {
              api_login(loginName, loginPass).then((res) => {
                if (res === null) {
                  setLoginFailed(true);
                  return; // login failed
                }
                const { userID, nameHandle, nameDisplay, pfp } = res;
                setUserID(userID);
                setUserHandle(nameHandle);
                setUserDisplay(nameDisplay);
                setUserPfp(pfp);
                if (nameHandle !== null) {
                  navigate("/home");
                }
              });
            }}
          >
            <span
              className={`text-lg font-semibold ${themes["black"].textPrimary}`}
            >
              Login
            </span>
          </div>
          <div className="text-center">
            <span className={`text-red-500 ${loginFailed ? "" : "invisible"}`}>
              login failed
            </span>
          </div>
        </div>
        <div
          className={`flex-col w-full py-4 border-b ${themes["black"].border} space-y-3`}
        >
          <div className="pl-6">
            <span
              className={`text-2xl font-bold text-center ${themes["black"].textPrimary}`}
            >
              New User
            </span>
          </div>
          <div>
            <input
              placeholder="Username"
              value={createHandle}
              onChange={(e) => {
                setCreateHandle(e.target.value);
                setCreateFailed(0);
              }}
              className={`block w-9/12 ${themes["black"].bgHover} rounded-full mx-auto
                              py-1.5 pl-4 pr-8 text-xl ${themes["black"].textPrimary}
                              placeholder:${themes["black"].textSecondary} focus:outline-0`}
            />
          </div>
          <div>
            <input
              placeholder="Display Name"
              value={createDisplay}
              onChange={(e) => {
                setCreateDisplay(e.target.value);
                setCreateFailed(0);
              }}
              className={`block w-9/12 ${themes["black"].bgHover} rounded-full mx-auto
                              py-1.5 pl-4 pr-8 text-xl ${themes["black"].textPrimary}
                              placeholder:${themes["black"].textSecondary} focus:outline-0`}
            />
          </div>
          <div>
            <input
              placeholder="Password"
              type="password"
              value={createPass}
              onChange={(e) => {
                setCreatePass(e.target.value);
                setCreateFailed(0);
              }}
              className={`block w-9/12 ${themes["black"].bgHover} rounded-full mx-auto
                              py-1.5 pl-4 pr-8 text-xl ${themes["black"].textPrimary}
                              placeholder:${themes["black"].textSecondary} focus:outline-0`}
            />
          </div>
          <div
            className="w-4/12 mx-auto text-center rounded-full
                            px-5 py-1
                            bg-blue-400 hover:bg-blue-500 active:bg-blue-600"
          >
            <button
              className={`text-lg font-semibold select-none ${themes["black"].textPrimary}`}
              onClick={() => {
                if (
                  createHandle === "" ||
                  createDisplay === "" ||
                  createPass === ""
                ) {
                  setCreateFailed(2);
                  return;
                }

                post_user(createHandle, createPass, createDisplay).then(
                  (response) => {
                    if (
                      response.nameHandle !== createHandle ||
                      response.nameDisplay !== createDisplay
                    ) {
                      setCreateFailed(1);
                      return;
                    }

                    // direct to profile edit
                    setUserID(response.userID);
                    setUserHandle(createHandle);
                    setUserDisplay(createDisplay);
                    setUserPfp(null);
                    navigate(`/edit/${response.userID}`);
                  }
                );
              }}
            >
              Create Account
            </button>
          </div>
          <div className="text-center">
            <span
              className={`text-red-500 ${
                createFailed === 0 ? "invisible" : ""
              }`}
            >
              {createFailed === 1 ? "username already exists" : ""}
              {createFailed === 2 ? "missing field" : ""}
            </span>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Login;
