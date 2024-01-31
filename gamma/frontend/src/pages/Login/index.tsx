import { useContext, useState } from "react";
import PageWrapper from "../../components/PageWrapper";
import { UserContext } from "../../UserContext";
import { login } from "../../components/utils";
import { useNavigate } from "react-router-dom";

const Login = (): JSX.Element => {
  const navigate = useNavigate();
  const { setUserHandle, setUserDisplay, setUserPfp } = useContext(UserContext);

  // Form State
  const [loginName, setLoginName] = useState<string>("");
  const [loginPass, setLoginPass] = useState<string>("");

  const [createName, setCreateName] = useState<string>("");
  const [createPass, setCreatePass] = useState<string>("");

  return (
    <PageWrapper>
      <div className="flex-col">
        <div className="flex-col w-full py-4 border-b border-neutral-700 space-y-3">
          <div className="pl-6">
            <span className="text-2xl font-bold text-center">
              Existing User
            </span>
          </div>
          <div>
            <input
              placeholder="Username"
              value={loginName}
              onChange={(e) => setLoginName(e.target.value)}
              className="block w-9/12 bg-zinc-900 rounded-full mx-auto
                              py-1.5 pl-4 pr-8 text-xl text-white
                              placeholder:text-neutral-500 focus:outline-0"
            />
          </div>
          <div>
            <input
              placeholder="Password"
              type="password"
              value={loginPass}
              onChange={(e) => setLoginPass(e.target.value)}
              className="block w-9/12 bg-zinc-900 rounded-full mx-auto
                              py-1.5 pl-4 pr-8 text-xl text-white
                              placeholder:text-neutral-500 focus:outline-0"
            />
          </div>
          <div
            className="w-4/12 mx-auto text-center rounded-full
                            px-5 py-1
                            bg-blue-400 hover:bg-blue-500 active:bg-blue-600"
          >
            <button
              className="text-lg font-semibold select-none"
              onClick={async () => {
                const { handleName, displayName, pfp } = await login(
                  loginName,
                  loginPass
                );
                console.log(handleName);
                console.log(pfp);
                setUserHandle(handleName);
                setUserDisplay(displayName);
                setUserPfp(pfp);

                if (handleName !== null) {
                  navigate("/home");
                }
              }}
            >
              Login
            </button>
          </div>
        </div>
        <div className="flex-col w-full py-4 border-b border-neutral-700 space-y-3">
          <div className="pl-6">
            <span className="text-2xl font-bold text-center">New User</span>
          </div>
          <div>
            <input
              placeholder="Username"
              value={createName}
              onChange={(e) => setCreateName(e.target.value)}
              className="block w-9/12 bg-zinc-900 rounded-full mx-auto
                              py-1.5 pl-4 pr-8 text-xl text-white
                              placeholder:text-neutral-500 focus:outline-0"
            />
          </div>
          <div>
            <input
              placeholder="Password"
              type="password"
              value={createPass}
              onChange={(e) => setCreatePass(e.target.value)}
              className="block w-9/12 bg-zinc-900 rounded-full mx-auto
                              py-1.5 pl-4 pr-8 text-xl text-white
                              placeholder:text-neutral-500 focus:outline-0"
            />
          </div>
          <div
            className="w-4/12 mx-auto text-center rounded-full
                            px-5 py-1
                            bg-blue-400 hover:bg-blue-500 active:bg-blue-600"
          >
            <button className="text-lg font-semibold select-none">
              Create Account
            </button>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Login;
